import { useApp } from '../context/AppContext.jsx';

export default function AdminRatingsPage() {
  const { recipes, ratings } = useApp();
  return <section className="container admin-section"><div className="section-page-header"><div><span className="section-tag">Community Ratings</span><h1 className="section-title">Recipe Ratings &amp; Distribution</h1><p className="section-subtitle">Average score and rating count for each published recipe.</p></div></div>
    <div className="ratings-cards-grid">{recipes.map((recipe) => { const scores = Object.values(ratings[recipe.id] || {}); const average = scores.length ? (scores.reduce((sum, score) => sum + Number(score), 0) / scores.length).toFixed(1) : Number(recipe.rating || 0).toFixed(1); return <article className="admin-panel-card" key={recipe.id}><h2>{recipe.name}</h2><p className="text-orange">★ {average}</p><p className="text-muted">{scores.length || recipe.ratingsCount || 0} ratings</p></article>; })}</div>
  </section>;
}
