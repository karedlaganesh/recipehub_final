import { useState } from 'react';
import RecipeCard from '../components/RecipeCard.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function UserCollectionsPage() {
  const { session, recipes, collections, addCollection, removeCollection, updateCollection } = useApp();
  const [active, setActive] = useState(null);
  const [name, setName] = useState('');
  const userCollections = collections[session.account.id] || [];
  const selected = userCollections.find((collection) => collection.id === active);
  const selectedRecipes = selected ? recipes.filter((recipe) => selected.recipeIds?.includes(recipe.id)) : [];

  function create(event) {
    event.preventDefault();
    addCollection(name);
    setName('');
  }

  return (
    <section className="container collections-section">
      {selected ? (
        <>
          <button className="btn btn-outline-dark btn-sm" onClick={() => setActive(null)}>← Back to Collections</button>
          <div className="section-page-header"><div><h1 className="section-title">{selected.name}</h1><p className="section-subtitle">{selected.description}</p></div></div>
          {selectedRecipes.length ? <div className="recipe-grid">{selectedRecipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} onRemoveFromCollection={() => updateCollection(selected.id, recipe.id, true)} />)}</div> : <div className="empty-state-box"><h2>This collection is empty</h2><p>Save recipes from the catalog to add them to collections.</p></div>}
        </>
      ) : (
        <>
          <div className="section-page-header"><div><span className="section-tag">Personalized Folders</span><h1 className="section-title">My Collections</h1><p className="section-subtitle">Organize recipes into themed collections and cookbooks.</p></div></div>
          <form className="collection-create-form" onSubmit={create}><input className="form-control" aria-label="Collection name" placeholder="New collection name" value={name} onChange={(event) => setName(event.target.value)} required /><button className="btn btn-primary-orange">+ Create Collection</button></form>
          {userCollections.length ? <div className="collections-grid">{userCollections.map((collection) => <article className="collection-card" key={collection.id}><button className="collection-card-open" onClick={() => setActive(collection.id)}><span className="collection-icon">📚</span><h2>{collection.name}</h2><p>{collection.description || 'Your personal recipe collection.'}</p><span>{collection.recipeIds?.length || 0} recipes</span></button><button className="btn btn-outline-danger btn-sm" onClick={() => removeCollection(collection.id)}>Delete</button></article>)}</div> : <div className="empty-state-box">Create your first collection.</div>}
        </>
      )}
    </section>
  );
}
