import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function ShoppingListPage() {
  const { recipes, session, shoppingLists, saveShoppingList, toggleShoppingListItem, clearShoppingList, notify } = useApp();
  const [selectedIds, setSelectedIds] = useState([]);
  const items = shoppingLists[session.account.id] || [];
  const selectedRecipes = useMemo(() => recipes.filter((recipe) => selectedIds.includes(recipe.id)), [recipes, selectedIds]);

  function toggleRecipe(recipeId) {
    setSelectedIds((current) => current.includes(recipeId) ? current.filter((id) => id !== recipeId) : [...current, recipeId]);
  }

  function generateList() {
    if (!selectedRecipes.length) {
      notify('Choose at least one recipe to generate a shopping list.');
      return;
    }
    const entries = new Map();
    selectedRecipes.forEach((recipe) => (recipe.ingredients || []).forEach((ingredient) => {
      const label = typeof ingredient === 'string' ? ingredient.trim() : ingredient.name || ingredient.ingredient || '';
      if (!label) return;
      const key = label.toLowerCase();
      const existing = entries.get(key);
      if (existing) existing.recipes.push(recipe.name);
      else entries.set(key, { id: `shop-${entries.size}`, name: label, recipes: [recipe.name], checked: false });
    }));
    if (saveShoppingList([...entries.values()])) {
      notify(`Shopping list generated from ${selectedRecipes.length} recipe${selectedRecipes.length === 1 ? '' : 's'}.`);
    } else {
      notify('Unable to save your shopping list. Please sign in again.');
    }
  }

  return (
    <section className="container dashboard-section">
      <div className="section-page-header"><div><span className="section-tag">Kitchen Prep</span><h1 className="section-title">Shopping List</h1><p className="section-subtitle">Select recipes to combine their ingredients into one checklist.</p></div></div>
      <div className="shopping-recipe-picker">
        {recipes.map((recipe) => (
          <label className="shopping-recipe-option" key={recipe.id}>
            <input type="checkbox" checked={selectedIds.includes(recipe.id)} onChange={() => toggleRecipe(recipe.id)} />
            <span>{recipe.name}</span>
          </label>
        ))}
        <button className="btn btn-primary-orange" type="button" onClick={generateList}>Generate Shopping List</button>
      </div>
      <article className="admin-panel-card shopping-list-card">
        <div className="admin-panel-header"><h2>Ingredients to Buy</h2><button className="btn btn-outline-danger btn-sm" type="button" onClick={() => { if (clearShoppingList()) notify('Shopping list cleared.'); }} disabled={!items.length}>Clear List</button></div>
        {items.length ? <ul className="shopping-list-items">{items.map((item) => <li key={item.id} className={item.checked ? 'checked' : ''}><label><input type="checkbox" checked={Boolean(item.checked)} onChange={() => toggleShoppingListItem(item.id)} /><span>{item.name}</span></label><small>{item.recipes?.join(', ')}</small></li>)}</ul> : <p className="text-muted">Choose recipes above to build your shopping list.</p>}
      </article>
    </section>
  );
}
