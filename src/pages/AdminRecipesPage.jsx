import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RecipeEditorForm from '../components/RecipeEditorForm.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function AdminRecipesPage({ create = false }) {
  const { recipes, saveRecipe, updateRecipe, deleteRecipe, notify } = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [editingRecipe, setEditingRecipe] = useState(null);
  const filtered = useMemo(() => recipes.filter((recipe) => `${recipe.name} ${recipe.cuisine}`.toLowerCase().includes(query.toLowerCase())), [recipes, query]);

  function add(recipe) {
    if (!saveRecipe({ ...recipe, id: `rec-${Date.now()}` })) {
      notify('Unable to add this recipe. Please sign in again.');
      return;
    }
    notify('Recipe added to the catalog.');
    navigate('/admin/recipes', { replace: true });
  }

  function edit(recipe) {
    const updated = updateRecipe(editingRecipe.id, {
      ...recipe,
      rating: editingRecipe.rating,
      ratingsCount: editingRecipe.ratingsCount,
    });
    if (!updated) {
      notify('Unable to update this recipe. Please sign in again.');
      return;
    }
    setEditingRecipe(null);
    notify('Recipe updated.');
  }

  if (create) return <section className="container form-max-container admin-section"><div className="form-page-card"><div className="form-page-header"><span className="section-tag">Admin Upload</span><h1 className="form-page-title">Add Recipe</h1><p className="form-page-subtitle">This recipe will immediately appear in the catalog.</p></div><RecipeEditorForm admin onSubmit={add} /></div></section>;

  return (
    <section className="container admin-section">
      {editingRecipe && <div className="form-page-card"><div className="form-page-header"><h2 className="form-page-title">Edit {editingRecipe.name}</h2><button className="btn btn-outline-dark btn-sm" onClick={() => setEditingRecipe(null)}>Cancel</button></div><RecipeEditorForm key={editingRecipe.id} admin initialRecipe={editingRecipe} submitLabel="Save Changes" onSubmit={edit} /></div>}
      <div className="section-page-header"><div><span className="section-tag">Catalog Management</span><h1 className="section-title">Manage Recipes</h1><p className="section-subtitle">View and remove recipes in the catalog.</p></div><Link to="/admin/recipes/new" className="btn btn-primary-green">+ Add Recipe</Link></div>
      <div className="admin-table-toolbar"><input className="form-control" aria-label="Search recipes" placeholder="Search recipe by name or cuisine..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
      <div className="table-responsive-wrapper"><table className="data-table"><thead><tr><th>Image</th><th>Recipe Name</th><th>Cuisine</th><th>Category</th><th>Rating</th><th>Actions</th></tr></thead><tbody>{filtered.map((recipe) => <tr key={recipe.id}><td><img className="admin-table-image" src={recipe.image} alt="" /></td><td>{recipe.name}</td><td>{recipe.cuisine}</td><td>{recipe.mealType}</td><td>★ {Number(recipe.rating || 0).toFixed(1)}</td><td><Link className="btn btn-outline-dark btn-sm" to={`/admin/recipes/${recipe.id}`}>View</Link> <button className="btn btn-outline-green btn-sm" onClick={() => { setEditingRecipe(recipe); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Edit</button> <button className="btn btn-outline-danger btn-sm" onClick={() => { if (window.confirm(`Delete ${recipe.name}?`)) deleteRecipe(recipe.id); }}>Delete</button></td></tr>)}</tbody></table></div>
      {!filtered.length && <div className="empty-state-box">No recipes match your search.</div>}
    </section>
  );
}
