import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

function Brand({ footer = false }) {
  return (
    <Link to="/" className={`brand-logo${footer ? ' footer-logo' : ''}`} aria-label="Recipe Hub Home">
      <span className="logo-icon-wrap" aria-hidden="true">
        <svg className="chef-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" />
          <line x1="6" y1="17" x2="18" y2="17" />
        </svg>
      </span>
      <span className="brand-text">
        <span className="brand-name">Recipe Hub</span>
        <span className="brand-tagline">Discover. Cook. Share.</span>
      </span>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="container footer-container">
        <div>
          <Brand footer />
          <p className="footer-desc">Your modern kitchen companion. Bringing authentic, delicious, and easy-to-follow recipes to home chefs everywhere.</p>
        </div>
        <div className="footer-links-col">
          <h4 className="footer-title">Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#features">Features</a></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-links-col">
          <h4 className="footer-title">Modules</h4>
          <ul>
            <li><Link to="/login">User Login</Link></li>
            <li><Link to="/register">User Registration</Link></li>
            <li><Link to="/admin/login">Admin Login</Link></li>
          </ul>
        </div>
        <div className="footer-links-col">
          <h4 className="footer-title">Campus &amp; Location</h4>
          <p className="text-sm"><strong>KL University</strong></p>
          <p className="text-sm text-muted">Vaddeswaram, Andhra Pradesh, India</p>
          <div className="demo-pill-footer"><span className="text-xs">Quick Demo: <code>foodie / password123</code></span></div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; Recipe Hub</p>
          <a className="footer-back-top" href="#app-header">Back to Top &uarr;</a>
        </div>
      </div>
    </footer>
  );
}

export default function SiteLayout() {
  const { session, logout, savedRecipes, submissions, toast } = useApp();
  const navigate = useNavigate();
  const { pathname, hash } = useLocation();
  const savedCount = session?.role === 'user' ? (savedRecipes[session.account.id] || []).length : 0;
  const pendingCount = submissions.filter((submission) => submission.status === 'pending').length;

  const publicLinks = [
    ['Home', '/'],
    ['About', '/#about'],
    ['Features', '/#features'],
    ['Recipes', '/recipes'],
    ['Contact', '/#contact'],
  ];

  return (
    <>
      {toast && <div className="toast-container" aria-live="polite"><div className="toast toast-info"><span>ℹ️</span><span>{toast}</span></div></div>}
      <header className="app-topbar" id="app-header">
        <Brand />
        {!session && (
          <div className="topbar-actions" aria-label="Account options">
            <Link to="/login" className="btn btn-outline-orange nav-btn">User</Link>
            <Link to="/admin/login" className="btn btn-primary-green nav-btn">Admin</Link>
          </div>
        )}
      </header>
      <aside className="app-sidebar">
        <nav id="primary-navigation" className="app-navigation" aria-label="Main navigation">
          {!session && (
            <ul className="nav-list">
              {publicLinks.map(([label, to]) => (
                <li key={label}><Link to={to} className={`nav-link${(to === '/' ? pathname === '/' && !hash : to.startsWith('/#') ? pathname === '/' && hash === to.slice(1) : pathname === to) ? ' active' : ''}`}>{label}</Link></li>
              ))}
            </ul>
          )}
          {session?.role === 'user' && (
            <ul className="nav-list">
              <li><NavLink end to="/user/dashboard" className="nav-link">Dashboard</NavLink></li>
              <li><NavLink to="/recipes" className="nav-link">Recipes</NavLink></li>
              <li><NavLink to="/user/saved" className="nav-link">Saved Recipes <span className="badge badge-orange">{savedCount}</span></NavLink></li>
              <li><NavLink to="/user/collections" className="nav-link">My Collections</NavLink></li>
              <li><NavLink to="/user/meal-plan" className="nav-link">Meal Planner</NavLink></li>
              <li><NavLink to="/user/shopping-list" className="nav-link">Shopping List</NavLink></li>
              <li><NavLink to="/user/submit" className="nav-link">Submit Recipe</NavLink></li>
            </ul>
          )}
          {session?.role === 'admin' && (
            <ul className="nav-list">
              <li><NavLink end to="/admin" className="nav-link">Dashboard</NavLink></li>
              <li><NavLink to="/admin/recipes" className="nav-link">Manage Recipes</NavLink></li>
              <li><NavLink to="/admin/recipes/new" className="nav-link">Add Recipe</NavLink></li>
              <li><NavLink to="/admin/users" className="nav-link">Users</NavLink></li>
              <li><NavLink to="/admin/submissions" className="nav-link">User Submissions <span className="badge badge-warning">{pendingCount}</span></NavLink></li>
              <li><NavLink to="/admin/ratings" className="nav-link">Ratings</NavLink></li>
            </ul>
          )}
        </nav>
        {session && (
          <div className="sidebar-account">
            <div className="admin-profile-badge">
              <span className={session.role === 'user' ? 'user-avatar-circle' : 'admin-avatar-circle'}>
                {session.account.name?.[0]?.toUpperCase() || (session.role === 'user' ? 'U' : 'A')}
              </span>
              <span className={session.role === 'user' ? 'user-name-display' : 'admin-name-display'}>{session.account.name}</span>
            </div>
            <button className="btn btn-outline-danger btn-sm" onClick={() => { logout(); navigate('/'); }}>Logout</button>
          </div>
        )}
      </aside>
      <main className="main-content"><Outlet /></main>
      {pathname === '/' && <div className="home-footer-wrap"><Footer /></div>}
    </>
  );
}
