import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function UserDashboardPage() {
  const { session, recipes, savedRecipes, collections } = useApp();
  const savedIds = savedRecipes[session.account.id] || [];
  const saved = recipes.filter((recipe) => savedIds.includes(recipe.id)).slice(0, 3);
  const userCollections = collections[session.account.id] || [];
  return (
    <section className="container dashboard-section">
      <div className="dashboard-welcome-banner"><div className="welcome-text-col"><span className="welcome-tag">Kitchen Workspace</span><h1 className="welcome-heading">Welcome to Recipe Hub, {session.account.name}!</h1><p className="welcome-subtext">Manage your personal favorites, collections, and submitted recipes.</p></div><div className="welcome-actions-col"><Link className="btn btn-primary-orange" to="/recipes">Browse Recipes →</Link><Link className="btn btn-outline-white" to="/user/submit">+ Submit Recipe</Link></div></div>
      <div className="dashboard-stats-grid"><Stat icon="❤️" label="Saved Favorites" value={savedIds.length} to="/user/saved" action="View Saved Recipes →" /><Stat icon="📚" label="My Collections" value={userCollections.length} to="/user/collections" action="Manage Collections →" /><Stat icon="📝" label="Community Kitchen" value="+" to="/user/submit" action="Share Your Recipe →" /></div>
      <div className="dashboard-section-block"><div className="section-header-flex"><div><h2 className="results-title">Your Saved Highlights</h2><p className="text-muted text-sm">Quick access to the dishes you love.</p></div><Link to="/user/saved" className="btn btn-outline-orange btn-sm">See All Saved →</Link></div>{saved.length ? <div className="recipe-grid">{saved.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}</div> : <p className="text-muted">No saved recipes yet. Browse the catalog to save favorites.</p>}</div>
    </section>
  );
}

function Stat({ icon, label, value, to, action }) {
  return <article className="dash-stat-card"><div className="dash-stat-icon-wrap bg-orange-light">{icon}</div><div className="dash-stat-info"><span className="dash-stat-label">{label}</span><span className="dash-stat-num">{value}</span></div><Link className="dash-stat-link" to={to}>{action}</Link></article>;
}
