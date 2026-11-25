import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function SavedRecipesPage() {
  const { session, recipes, savedRecipes } = useApp();
  const ids = savedRecipes[session.account.id] || [];
  const saved = recipes.filter((recipe) => ids.includes(recipe.id));
  return (
    <section className="container saved-section">
      <div className="section-page-header"><div><span className="section-tag">Personal Cooklist</span><h1 className="section-title">Saved Recipes</h1><p className="section-subtitle">Your saved dishes, ready whenever hunger strikes.</p></div><Link to="/recipes" className="btn btn-primary-orange">Browse More Recipes</Link></div>
      {saved.length ? <div className="recipe-grid">{saved.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} removeSaved />)}</div> : <div className="empty-state-box"><div className="empty-icon">❤️</div><h2>No saved recipes yet.</h2><p>Browse recipes and save dishes to your personal list.</p><Link to="/recipes" className="btn btn-primary-orange">Browse Recipes</Link></div>}
    </section>
  );
}
