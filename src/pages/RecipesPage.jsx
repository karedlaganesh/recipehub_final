import { useMemo, useState } from 'react';
import RecipeCard from '../components/RecipeCard.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function RecipesPage() {
  const { recipes } = useApp();
  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('all');
  const [diet, setDiet] = useState('all');
  const [meal, setMeal] = useState('all');
  const [sort, setSort] = useState('highest-rated');

  const filtered = useMemo(() => {
    const terms = ingredients.split(',').map((item) => item.trim().toLowerCase()).filter(Boolean);
    const matching = recipes.filter((recipe) => {
      const text = `${recipe.name} ${recipe.description} ${recipe.cuisine} ${recipe.mealType} ${recipe.ingredients.join(' ')}`.toLowerCase();
      return (!query || text.includes(query.toLowerCase()))
        && (!terms.length || terms.some((term) => recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(term))))
        && (cuisine === 'all' || recipe.cuisine === cuisine)
        && (diet === 'all' || recipe.dietaryPreference === diet)
        && (meal === 'all' || recipe.mealType === meal);
    });
    return matching.sort((a, b) => {
      if (sort === 'most-ratings') return Number(b.ratingsCount || 0) - Number(a.ratingsCount || 0);
      if (sort === 'shortest-prep') return Number(a.prepTime || 0) - Number(b.prepTime || 0);
      if (sort === 'alpha-asc') return a.name.localeCompare(b.name);
      return Number(b.rating || 0) - Number(a.rating || 0);
    });
  }, [recipes, query, ingredients, cuisine, diet, meal, sort]);

  function reset() {
    setQuery('');
    setIngredients('');
    setCuisine('all');
    setDiet('all');
    setMeal('all');
    setSort('highest-rated');
  }

  return (
    <section className="recipes-browsing-section">
      <div className="container">
        <div className="section-page-header"><div><span className="section-tag">Recipe Catalog</span><h1 className="section-title">Discover &amp; Browse Recipes</h1><p className="section-subtitle">Search by recipe name, pantry ingredients, cuisine, or dietary guidelines.</p></div></div>
        <div className="search-filter-card">
          <div className="search-bar-wrap"><div className="search-input-box"><input className="search-input" aria-label="Search recipes" placeholder="Search recipes, ingredients or cuisines..." value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button className="search-clear-btn" aria-label="Clear search" onClick={() => setQuery('')}>×</button>}</div><button className="btn btn-primary-orange search-action-btn" type="button">Search</button></div>
          <div className="ingredient-search-box"><div className="ingredient-search-header"><span className="ingredient-search-icon">🥕</span><div><strong>Ingredient Search: “What's in your kitchen?”</strong><p className="text-sm text-muted">Enter ingredients you already have, separated by commas.</p></div></div><div className="ingredient-search-input-row"><input className="form-control" placeholder="e.g. tomato, onion, rice" value={ingredients} onChange={(event) => setIngredients(event.target.value)} /><button className="btn btn-primary-green" type="button">Find Recipes</button></div></div>
          <div className="filter-dropdowns-row">
            <Filter label="Cuisine" value={cuisine} onChange={setCuisine} options={['Indian', 'Italian', 'Chinese', 'Mexican', 'American', 'Mediterranean']} />
            <Filter label="Dietary Preference" value={diet} onChange={setDiet} options={['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Non-Vegetarian']} />
            <Filter label="Meal Type" value={meal} onChange={setMeal} options={['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks']} />
            <div className="filter-select-group"><label htmlFor="filter-sort">Sort By</label><select id="filter-sort" className="form-select" value={sort} onChange={(event) => setSort(event.target.value)}><option value="highest-rated">Highest Rated ★</option><option value="most-ratings">Most Reviewed</option><option value="shortest-prep">Shortest Prep Time</option><option value="alpha-asc">Name (A → Z)</option></select></div>
            <div className="filter-btn-group"><label>&nbsp;</label><button className="btn btn-outline-dark btn-block" onClick={reset}>Reset All</button></div>
          </div>
        </div>
        <div className="results-header-row"><h2 className="results-title">Recipe Results <span className="results-count">({filtered.length})</span></h2><span className="text-muted text-sm">Showing verified recipes</span></div>
        {filtered.length ? <div className="recipe-grid">{filtered.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}</div> : <div className="empty-state-box"><div className="empty-icon">🍳</div><h3>No matching recipes found</h3><p>Try changing your search or filters.</p><button className="btn btn-primary-orange" onClick={reset}>Clear All Filters</button></div>}
      </div>
    </section>
  );
}

function Filter({ label, value, onChange, options }) {
  const id = `filter-${label.toLowerCase().replaceAll(' ', '-')}`;
  return <div className="filter-select-group"><label htmlFor={id}>{label}</label><select id={id} className="form-select" value={value} onChange={(event) => onChange(event.target.value)}><option value="all">All {label === 'Cuisine' ? 'Cuisines' : label === 'Meal Type' ? 'Meal Types' : 'Diets'}</option>{options.map((option) => <option key={option}>{option}</option>)}</select></div>;
}
