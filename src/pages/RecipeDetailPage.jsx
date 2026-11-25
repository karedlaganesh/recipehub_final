import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { scaleIngredientText } from '../utils/ingredients.js';

function getInstructionText(instruction) {
  return typeof instruction === 'string'
    ? instruction
    : instruction?.text || instruction?.description || '';
}

function getSuggestedMinutes(instruction) {
  const explicitDuration = Number(instruction?.durationMinutes);
  if (Number.isFinite(explicitDuration) && explicitDuration > 0) return String(explicitDuration);
  const text = getInstructionText(instruction);
  const match = text.match(/(\d+(?:\.\d+)?)\s*(?:min(?:ute)?s?)/i);
  return match?.[1] || '';
}

export default function RecipeDetailPage() {
  const { recipeId } = useParams();
  const { recipes, ratings, submitRating, notify, session, savedRecipes, toggleSaved, collections, updateCollection, reviews, submitReview } = useApp();
  const navigate = useNavigate();
  const recipe = recipes.find((item) => item.id === recipeId);
  const userRating = session?.role === 'user' ? ratings[recipeId]?.[session.account.id] || 0 : 0;
  const [servings, setServings] = useState(recipe?.servings || 1);
  const [score, setScore] = useState(userRating);
  const [collectionId, setCollectionId] = useState('');
  const [reviewDraft, setReviewDraft] = useState('');
  const [cookingMode, setCookingMode] = useState(false);
  const [timerInputs, setTimerInputs] = useState(() => (recipe?.instructions || []).map(getSuggestedMinutes));
  const [timerSeconds, setTimerSeconds] = useState({});
  const [runningTimers, setRunningTimers] = useState({});
  const audioContextRef = useRef(null);
  const [speakingStep, setSpeakingStep] = useState(-1);
  const reviewsForRecipe = reviews[recipeId] || [];
  const userCollections = session?.role === 'user' ? collections[session.account.id] || [] : [];
  const selectedCollection = userCollections.find((collection) => collection.id === collectionId);
  const isInCollection = selectedCollection?.recipeIds?.includes(recipeId) || false;
  const isSaved = session?.role === 'user' && (savedRecipes[session.account.id] || []).includes(recipeId);

  useEffect(() => {
    setScore(userRating);
  }, [recipeId, userRating]);

  useEffect(() => {
    setTimerInputs((recipe?.instructions || []).map(getSuggestedMinutes));
    setTimerSeconds({});
    setRunningTimers({});
    setCookingMode(false);
    setReviewDraft('');
  }, [recipeId, recipe]);

  useEffect(() => {
    if (!Object.values(runningTimers).some(Boolean)) return undefined;
    const interval = window.setInterval(() => {
      if (Object.keys(runningTimers).some((index) => runningTimers[index] && (timerSeconds[index] || 0) <= 1)) {
        playTimerBeep();
      }
      setTimerSeconds((current) => Object.fromEntries(
        Object.entries(current).map(([index, seconds]) => [index, runningTimers[index] ? Math.max(0, seconds - 1) : seconds]),
      ));
      setRunningTimers((current) => {
        let changed = false;
        const next = { ...current };
        Object.keys(current).forEach((index) => {
          if (current[index] && (timerSeconds[index] || 0) <= 1) {
            next[index] = false;
            changed = true;
          }
        });
        return changed ? next : current;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [runningTimers, timerSeconds]);

  useEffect(() => () => {
    const audioContext = audioContextRef.current;
    if (audioContext && audioContext.state !== 'closed') {
      audioContext.close().catch((error) => console.error('Unable to close timer audio.', error));
    }
  }, []);

  useEffect(() => () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, [recipeId]);

  if (!recipe) {
    return <section className="container empty-state-box"><h1>Recipe not found</h1><Link className="btn btn-primary-orange" to="/recipes">Browse Recipes</Link></section>;
  }

  const servingMultiplier = servings / (recipe.servings || 1);
  const voiceSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  function playTimerBeep() {
    const audioContext = audioContextRef.current;
    if (!audioContext || audioContext.state === 'closed') return;

    const play = () => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const now = audioContext.currentTime;
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.0001, now);
      [0, 0.36, 0.72].forEach((offset) => {
        gain.gain.setValueAtTime(0.0001, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.8, now + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.28);
      });
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(now);
      oscillator.stop(now + 1.02);
    };

    if (audioContext.state === 'suspended') {
      audioContext.resume().then(play).catch((error) => console.error('Unable to play timer sound.', error));
      return;
    }
    play();
  }

  function startOrPauseTimer(index) {
    if (runningTimers[index]) {
      setRunningTimers((current) => ({ ...current, [index]: false }));
      return;
    }
    const remaining = timerSeconds[index] || 0;
    const initialSeconds = Math.round(Number(timerInputs[index]) * 60);
    if (!remaining && (!Number.isFinite(initialSeconds) || initialSeconds <= 0)) {
      notify('Enter a timer duration greater than zero minutes.');
      return;
    }
    if (!audioContextRef.current && typeof window.AudioContext === 'function') {
      audioContextRef.current = new window.AudioContext();
    }
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume().catch((error) => console.error('Unable to activate timer audio.', error));
    }
    if (!remaining) setTimerSeconds((current) => ({ ...current, [index]: initialSeconds }));
    setRunningTimers((current) => ({ ...current, [index]: true }));
  }

  function resetTimer(index) {
    setRunningTimers((current) => ({ ...current, [index]: false }));
    setTimerSeconds((current) => ({ ...current, [index]: 0 }));
  }

  function formatTimer(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  }

  function speakStep(index, instruction) {
    if (!voiceSupported) return;
    if (speakingStep === index) {
      window.speechSynthesis.cancel();
      setSpeakingStep(-1);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(getInstructionText(instruction));
    utterance.onend = () => setSpeakingStep(-1);
    utterance.onerror = () => setSpeakingStep(-1);
    setSpeakingStep(index);
    window.speechSynthesis.speak(utterance);
  }

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: recipe.name, text: recipe.description, url });
      else {
        await navigator.clipboard.writeText(url);
        notify('Recipe link copied to clipboard.');
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Unable to share recipe.', error);
        notify('Sharing is not available in this browser.');
      }
    }
  }

  function rate() {
    if (session?.role !== 'user') {
      notify('Sign in with a user account to rate recipes.');
      return;
    }
    if (!score) {
      notify('Choose a star rating first.');
      return;
    }
    if (submitRating(recipe.id, score)) notify('Thanks for rating this recipe!');
  }

  function review(event) {
    event.preventDefault();
    if (submitReview(recipe.id, reviewDraft)) {
      setReviewDraft('');
      notify('Your review was saved.');
    } else {
      notify('Enter a review before submitting.');
    }
  }

  return (
    <section className="container recipe-detail-page recipe-show-page">
      <button className="btn btn-outline-dark btn-sm recipe-show-back" onClick={() => navigate(-1)}>← Back to recipes</button>
      <article className="recipe-show-card">
        <header className="recipe-show-hero">
          <img className="recipe-show-image" src={recipe.image} alt={recipe.name} />
          <div className="recipe-show-hero-content">
            <div className="recipe-show-tags">
              <span>{recipe.cuisine}</span>
              <span>{recipe.dietaryPreference}</span>
              <span>{recipe.mealType}</span>
            </div>
            <p className="recipe-show-eyebrow">From the Recipe Hub kitchen</p>
            <h1>{recipe.name}</h1>
            <p>{recipe.description}</p>
          </div>
        </header>

        <div className="recipe-show-facts" aria-label="Recipe overview">
          {recipe.prepTime != null && recipe.prepTime !== '' && Number.isFinite(Number(recipe.prepTime)) && <div><span>Preparation</span><strong>{recipe.prepTime} min</strong></div>}
          {recipe.cookTime != null && recipe.cookTime !== '' && Number.isFinite(Number(recipe.cookTime)) && <div><span>Cooking time</span><strong>{recipe.cookTime} min</strong></div>}
          {recipe.prepTime != null && recipe.prepTime !== '' && recipe.cookTime != null && recipe.cookTime !== '' && Number.isFinite(Number(recipe.prepTime)) && Number.isFinite(Number(recipe.cookTime)) && <div><span>Total time</span><strong>{Number(recipe.prepTime) + Number(recipe.cookTime)} min</strong></div>}
          <div><span>Difficulty</span><strong>{recipe.difficulty || 'Not specified'}</strong></div>
          <div><span>Community rating</span><strong className="recipe-show-rating">★ {Number(recipe.rating || 0).toFixed(1)} <small>({recipe.ratingsCount || 0})</small></strong></div>
        </div>

        <div className="recipe-show-body">
          <section className="recipe-show-panel recipe-show-ingredients">
            <div className="recipe-show-section-heading">
              <div><span className="recipe-show-step-label">GET READY</span><h2>Ingredients</h2></div>
              <span className="recipe-show-item-count">{(recipe.ingredients || []).length} items</span>
            </div>
            <p className="recipe-show-helper">Check off ingredients as you prepare them.</p>
            <div className="recipe-show-serving-control">
              <label htmlFor="serving-count">Servings</label>
              <input id="serving-count" type="number" min="1" value={servings} onChange={(event) => setServings(Math.max(1, Number(event.target.value)))} />
            </div>
            <ul className="recipe-show-ingredient-list">
              {(recipe.ingredients || []).map((ingredient, index) => (
                <li key={`${ingredient}-${index}`}>
                  <label><input type="checkbox" /><span>{scaleIngredientText(ingredient, servingMultiplier)}</span></label>
                </li>
              ))}
            </ul>
          </section>

          <section className="recipe-show-panel recipe-show-instructions">
            <div className="recipe-show-section-heading">
              <div><span className="recipe-show-step-label">LET'S COOK</span><h2>Method</h2></div>
              <button className={`btn ${cookingMode ? 'btn-primary-orange' : 'btn-outline-orange'} btn-sm`} type="button" onClick={() => setCookingMode((active) => !active)}>{cookingMode ? 'Exit cooking mode' : 'Start cooking mode'}</button>
            </div>
            {cookingMode && <p className="recipe-show-helper recipe-show-cooking-hint">Follow one step at a time. Set a timer or use voice assistance where available.</p>}
            <ol className={`recipe-show-step-list${cookingMode ? ' cooking-mode-active' : ''}`}>
              {(recipe.instructions || []).map((instruction, index) => {
                const remaining = timerSeconds[index] || 0;
                const isRunning = Boolean(runningTimers[index]);
                return (
                  <li className="recipe-show-step" key={`${getInstructionText(instruction)}-${index}`}>
                    <span className="recipe-show-step-number">{String(index + 1).padStart(2, '0')}</span>
                    <div className="recipe-show-step-content">
                      <h3>Step {index + 1}</h3>
                      <p>{getInstructionText(instruction)}</p>
                      <div className="recipe-show-timer">
                        <label htmlFor={`step-timer-${index}`}>Timer (minutes)</label>
                        <input id={`step-timer-${index}`} className="form-control" type="number" min="0.1" step="0.1" value={timerInputs[index] || ''} onChange={(event) => setTimerInputs((current) => current.map((value, timerIndex) => timerIndex === index ? event.target.value : value))} disabled={isRunning || remaining > 0} />
                        <output aria-live="polite">{formatTimer(remaining)}</output>
                        <button className="btn btn-outline-orange btn-sm" type="button" onClick={() => startOrPauseTimer(index)}>{isRunning ? 'Pause' : remaining > 0 ? 'Resume' : 'Start'}</button>
                        <button className="btn btn-outline-dark btn-sm" type="button" onClick={() => resetTimer(index)} disabled={!remaining && !isRunning}>Reset</button>
                        {voiceSupported && <button className="btn btn-outline-dark btn-sm" type="button" onClick={() => speakStep(index, instruction)}>{speakingStep === index ? 'Stop voice' : 'Read step'}</button>}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        <div className="recipe-show-community">
          <section className="recipe-show-panel recipe-show-actions">
            <div className="recipe-show-section-heading"><div><span className="recipe-show-step-label">KEEP IT HANDY</span><h2>Save this recipe</h2></div></div>
            <p className="recipe-show-helper">Keep your favorites close or share this dish with someone.</p>
            <div className="recipe-detail-actions">
              <button className={`btn ${isSaved ? 'btn-outline-orange' : 'btn-primary-orange'}`} onClick={() => { if (toggleSaved(recipe.id)) notify(isSaved ? 'Removed from saved recipes.' : 'Recipe saved!'); }}>{isSaved ? '♥ Saved Recipe' : '♡ Save Recipe'}</button>
              <button className="btn btn-outline-dark" onClick={share}>Share Recipe</button>
            </div>
            {userCollections.length > 0 && <div className="collection-add-row"><label htmlFor="recipe-collection">Add to collection</label><select className="form-select" id="recipe-collection" value={collectionId} onChange={(event) => setCollectionId(event.target.value)}><option value="">Choose collection</option>{userCollections.map((collection) => <option value={collection.id} key={collection.id}>{collection.name}</option>)}</select><button className="btn btn-outline-orange btn-sm" disabled={!collectionId} onClick={() => { if (updateCollection(collectionId, recipe.id, isInCollection)) notify(isInCollection ? 'Recipe removed from collection.' : 'Recipe added to collection.'); }}>{isInCollection ? 'Remove' : 'Add'}</button></div>}
          </section>

          <section className="recipe-show-panel recipe-show-rating-panel">
            <div className="recipe-show-section-heading"><div><span className="recipe-show-step-label">YOUR FEEDBACK</span><h2>Rate this recipe</h2></div></div>
            {session?.role === 'user' ? (
              <div className="recipe-show-rate-content">
                <p className="recipe-show-helper">How was your cooking experience?</p>
                <div className="interactive-star-rating" role="radiogroup" aria-label="Rate recipe">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button key={value} type="button" role="radio" aria-checked={score === value} className={`star-pick${score >= value ? ' selected' : ''}`} aria-label={`${value} stars`} onClick={() => setScore(value)}>★</button>
                  ))}
                </div>
                <button className="btn btn-primary-orange btn-sm" disabled={!score} onClick={rate}>{userRating ? 'Update rating' : 'Submit rating'}</button>
                {userRating > 0 && <p className="text-sm text-muted">Your rating: {userRating} / 5</p>}
              </div>
            ) : <p className="recipe-show-helper">Sign in with a user account to rate this recipe.</p>}
          </section>
        </div>

        {recipe.nutrition?.verified === true && recipe.nutrition.source && <section className="nutrition-panel recipe-show-nutrition"><h2>Nutrition information</h2><p>Per serving · Source: {recipe.nutrition.source}</p><p>{Object.entries(recipe.nutrition.values || {}).map(([label, value]) => `${label}: ${value}`).join(' · ')}</p></section>}

        <section className="written-reviews recipe-show-reviews">
          <div className="recipe-show-section-heading"><div><span className="recipe-show-step-label">FROM THE COMMUNITY</span><h2>Reviews</h2></div></div>
          {session?.role === 'user' ? <form onSubmit={review}><div className="form-group"><label htmlFor="recipe-review">Share your experience</label><textarea id="recipe-review" className="form-control" rows="3" maxLength="1000" value={reviewDraft} onChange={(event) => setReviewDraft(event.target.value)} required /></div><button className="btn btn-primary-orange btn-sm" type="submit">Submit review</button></form> : <p className="text-muted">Sign in with a user account to write a review.</p>}
          {reviewsForRecipe.length ? <ul className="written-reviews-list">{reviewsForRecipe.map((item) => <li key={item.id}><strong>{item.userName}</strong><time dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleDateString()}</time><p>{item.text}</p></li>)}</ul> : <p className="text-muted recipe-show-no-reviews">No written reviews yet.</p>}
        </section>
      </article>
    </section>
  );
}
