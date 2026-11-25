import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function RecipeCard({ recipe, removeSaved = false, onRemoveFromCollection }) {
  const { session, savedRecipes, toggleSaved, notify } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const saved = session?.role === 'user' && (savedRecipes[session.account.id] || []).includes(recipe.id);

  function showRecipe() {
    if (!session) {
      navigate('/login', { state: { from: { pathname: `/recipe/${recipe.id}` } } });
      notify('Please login to view recipes.');
      return;
    }
    navigate(`/recipe/${recipe.id}`, { state: { background: location } });
  }

  function handleSave() {
    if (!session || session.role !== 'user') {
      navigate('/login', { state: { from: location } });
      notify('Please login to save recipes.');
      return;
    }
    if (toggleSaved(recipe.id)) notify(saved ? 'Removed from saved recipes.' : 'Recipe saved!');
  }

  return (
    <article className="recipe-card" data-recipe-id={recipe.id}>
      <div className="recipe-card-media">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="recipe-card-img"
          loading="lazy"
          onError={(event) => { event.currentTarget.src = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'; }}
        />
        <div className="recipe-card-badges">
          <span className="recipe-tag tag-cuisine">{recipe.cuisine}</span>
          <span className="recipe-tag tag-diet">{recipe.dietaryPreference}</span>
          <span className="recipe-tag tag-meal">{recipe.mealType}</span>
        </div>
        <button type="button" className={`btn-save-recipe${saved ? ' saved' : ''}`} title={saved ? 'Remove from Saved' : 'Save Recipe'} aria-label={saved ? 'Remove saved recipe' : 'Save Recipe'} onClick={handleSave}>
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
        </button>
      </div>
      <div className="recipe-card-body">
        <h3 className="recipe-card-title">{recipe.name}</h3>
        <p className="recipe-card-desc">{recipe.description}</p>
        <div className="recipe-meta-row">
          {recipe.prepTime != null && recipe.prepTime !== '' && Number.isFinite(Number(recipe.prepTime)) && <span className="recipe-meta-item">⏱️ Prep: {recipe.prepTime}m</span>}
          {recipe.cookTime != null && recipe.cookTime !== '' && Number.isFinite(Number(recipe.cookTime)) && <span className="recipe-meta-item">🍳 Cook: {recipe.cookTime}m</span>}
          <span className="recipe-rating-badge"><span className="star-icon">★</span> {Number(recipe.rating || 0).toFixed(1)} <span className="text-muted text-sm">({recipe.ratingsCount || 0})</span></span>
        </div>
        <div className="recipe-card-footer">
          <button type="button" className="btn btn-primary-orange btn-view-recipe" onClick={showRecipe}>Show Recipe</button>
          {removeSaved && <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleSave}>Remove</button>}
          {onRemoveFromCollection && <button type="button" className="btn btn-outline-danger btn-sm" onClick={onRemoveFromCollection}>Remove from Collection</button>}
        </div>
      </div>
    </article>
  );
}
