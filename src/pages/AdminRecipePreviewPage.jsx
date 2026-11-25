import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function AdminRecipePreviewPage() {
  const { recipeId } = useParams();
  const { recipes } = useApp();
  const recipe = recipes.find((item) => item.id === recipeId);

  if (!recipe) {
    return <section className="container empty-state-box"><h1>Recipe not found</h1><Link className="btn btn-primary-green" to="/admin/recipes">Back to Manage Recipes</Link></section>;
  }

  return (
    <section className="container recipe-detail-page">
      <Link className="btn btn-outline-dark btn-sm" to="/admin/recipes">← Back to Manage Recipes</Link>
      <article className="recipe-detail-card">
        <img className="recipe-detail-image" src={recipe.image} alt={recipe.name} />
        <div className="recipe-detail-content">
          <div className="recipe-card-badges"><span className="recipe-tag tag-cuisine">{recipe.cuisine}</span><span className="recipe-tag tag-diet">{recipe.dietaryPreference}</span><span className="recipe-tag tag-meal">{recipe.mealType}</span></div>
          <span className="section-tag">Admin Preview</span>
          <h1 className="section-title">{recipe.name}</h1>
          <p className="recipe-detail-hero-desc">{recipe.description}</p>
          <div className="recipe-meta-row">
            {recipe.prepTime != null && recipe.prepTime !== '' && Number.isFinite(Number(recipe.prepTime)) && <span>⏱️ Prep {recipe.prepTime} min</span>}
            {recipe.cookTime != null && recipe.cookTime !== '' && Number.isFinite(Number(recipe.cookTime)) && <span>🍳 Cook {recipe.cookTime} min</span>}
            <span>★ {Number(recipe.rating || 0).toFixed(1)} ({recipe.ratingsCount || 0})</span>
            <span>{recipe.difficulty}</span>
          </div>
          <h2>Ingredients</h2>
          <ul className="recipe-ingredients-list">{(recipe.ingredients || []).map((ingredient, index) => <li key={`${ingredient}-${index}`}>{typeof ingredient === 'string' ? ingredient : ingredient.name || ingredient.ingredient}</li>)}</ul>
          <h2>Cooking Instructions</h2>
          <ol className="recipe-instructions-list">{(recipe.instructions || []).map((instruction, index) => <li key={index}>{typeof instruction === 'string' ? instruction : instruction.text || instruction.description}</li>)}</ol>
        </div>
      </article>
    </section>
  );
}
