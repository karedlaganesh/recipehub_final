import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function AdminDashboardPage() {
  const { session, recipes, users, submissions, ratings, savedRecipes } = useApp();
  const allRatings = Object.values(ratings).flatMap((recipeRatings) => Object.values(recipeRatings).map(Number));
  const ratingCount = allRatings.length;
  const pending = submissions.filter((submission) => submission.status === 'pending').length;
  const submissionCounts = ['pending', 'approved', 'rejected'].map((status) => ({
    status,
    count: submissions.filter((submission) => submission.status === status).length,
  }));
  const ratingDistribution = [1, 2, 3, 4, 5].map((score) => ({
    score,
    count: allRatings.filter((rating) => rating === score).length,
  }));
  const popularRecipes = [...recipes]
    .map((recipe) => ({
      ...recipe,
      savedCount: Object.values(savedRecipes).reduce((count, recipeIds) => count + (Array.isArray(recipeIds) ? recipeIds.filter((id) => id === recipe.id).length : 0), 0),
    }))
    .sort((a, b) => b.savedCount - a.savedCount)
    .slice(0, 5);
  const maxPopularity = Math.max(1, ...popularRecipes.map((recipe) => recipe.savedCount));
  const maxRatingCount = Math.max(1, ...ratingDistribution.map((item) => item.count));
  return (
    <section className="container admin-section dashboard-section">
      <div className="dashboard-welcome-banner"><div className="welcome-text-col"><span className="welcome-tag">Administration</span><h1 className="welcome-heading">Welcome, {session.account.name}!</h1><p className="welcome-subtext">Manage the Recipe Hub catalog and community.</p></div><div className="welcome-actions-col"><Link className="btn btn-outline-green" to="/admin/submissions">View User Submissions ({pending})</Link><Link className="btn btn-primary-green" to="/admin/recipes/new">+ Add Recipe</Link></div></div>
      <div className="dashboard-stats-grid"><Stat label="Recipes" value={recipes.length} icon="🍽️" /><Stat label="Users" value={users.length} icon="👥" /><Stat label="Ratings" value={ratingCount} icon="⭐" /><Stat label="Pending Submissions" value={pending} icon="📝" /></div>
      <div className="admin-analytics-grid">
        <article className="admin-panel-card">
          <div className="admin-panel-header"><h2>Most Saved Recipes</h2><Link to="/admin/recipes">Manage recipes →</Link></div>
          {popularRecipes.length ? popularRecipes.map((recipe) => {
            const count = recipe.savedCount;
            return <div className="analytics-bar-row" key={recipe.id}><div className="analytics-label"><span>{recipe.name}</span><strong>{count} saves</strong></div><div className="analytics-track"><span style={{ width: `${(count / maxPopularity) * 100}%` }} /></div></div>;
          }) : <p>No recipe popularity data available.</p>}
        </article>
        <article className="admin-panel-card">
          <div className="admin-panel-header"><h2>Submission Statistics</h2><Link to="/admin/submissions">Review →</Link></div>
          {submissionCounts.map(({ status, count }) => <p className="analytics-stat-row" key={status}><span>{status[0].toUpperCase() + status.slice(1)}</span><strong>{count}</strong></p>)}
        </article>
        <article className="admin-panel-card">
          <div className="admin-panel-header"><h2>Rating Distribution</h2><Link to="/admin/ratings">Ratings →</Link></div>
          {ratingDistribution.map(({ score, count }) => <div className="analytics-bar-row" key={score}><div className="analytics-label"><span>{score} star{score === 1 ? '' : 's'}</span><strong>{count}</strong></div><div className="analytics-track"><span style={{ width: `${(count / maxRatingCount) * 100}%` }} /></div></div>)}
        </article>
      </div>
      <div className="admin-dash-grid">
        <article className="admin-panel-card"><div className="admin-panel-header"><h2>Manage Catalog</h2><Link to="/admin/recipes">View Recipes →</Link></div><p>Add, inspect, and remove published recipes.</p></article>
        <article className="admin-panel-card"><div className="admin-panel-header"><h2>Manage Users</h2><Link to="/admin/users">View Users →</Link></div><p>Search user accounts and manage account access.</p></article>
        <article className="admin-panel-card"><div className="admin-panel-header"><h2>User Submissions</h2><Link to="/admin/submissions">View User Submissions →</Link></div><p>{pending} recipes are awaiting review.</p></article>
        <article className="admin-panel-card"><div className="admin-panel-header"><h2>Ratings Overview</h2><Link to="/admin/ratings">View Ratings →</Link></div><p>Explore community recipe ratings and feedback.</p></article>
      </div>
    </section>
  );
}

function Stat({ label, value, icon }) {
  return <article className="stat-card"><div className="stat-card-icon-wrap">{icon}</div><div className="stat-card-content"><span className="stat-card-title">{label}</span><span className="stat-card-value">{value}</span></div></article>;
}
