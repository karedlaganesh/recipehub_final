import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

export default function AuthForm({ role }) {
  const { login, notify, session } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const isAdmin = role === 'admin';
  const target = location.state?.from?.pathname || (isAdmin ? '/admin' : '/user/dashboard');

  useEffect(() => {
    if (session?.role === role) navigate(target, { replace: true });
  }, [session, role, target, navigate]);

  function submit(event) {
    event.preventDefault();
    if (!login(role, username, password)) {
      setError('Incorrect username or password.');
      return;
    }
    notify(`Welcome back, ${username.trim()}!`);
    navigate(target, { replace: true });
  }

  return (
    <section className="auth-page-body auth-page-main">
      <div className="container auth-container">
        <div className={`auth-card${isAdmin ? ' admin-auth-card' : ''}`}>
          <div className="auth-header">
            <div className={`auth-icon-wrap ${isAdmin ? 'admin-theme' : 'user-theme'}`}>
              {isAdmin ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </div>
            <h1 className="auth-title">{isAdmin ? 'Admin Login' : 'User Login'}</h1>
            <p className="auth-subtitle">{isAdmin ? 'Restricted access to manage recipes, monitor submissions, and view rating analytics.' : 'Sign in to save favorite recipes, rate dishes, and create personalized collections.'}</p>
          </div>
          <div className={`demo-helper-box${isAdmin ? ' admin-demo-helper' : ''}`}>
            <span>{isAdmin ? 'Demo Admin:' : 'Demo User:'}</span>
            <code>{isAdmin ? 'admin / admin123' : 'foodie / password123'}</code>
            <button
              type="button"
              className={`btn-demo-fill${isAdmin ? ' admin-fill-btn' : ''}`}
              onClick={() => {
                setUsername(isAdmin ? 'admin' : 'foodie');
                setPassword(isAdmin ? 'admin123' : 'password123');
                setError('');
              }}
            >
              Auto-Fill
            </button>
          </div>
          <form onSubmit={submit}>
            <div className="form-group">
              <label htmlFor={`${role}-username`}>Username or Email <span className="required">*</span></label>
              <input id={`${role}-username`} className="form-control" type="text" placeholder={isAdmin ? 'Enter admin username or email' : 'Enter username or email'} autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor={`${role}-password`}>Password <span className="required">*</span></label>
              <div className="input-password-wrap">
                <input id={`${role}-password`} className="form-control" type={showPassword ? 'text' : 'password'} placeholder={isAdmin ? 'Enter admin password' : 'Enter password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                <button type="button" className="toggle-password-btn" onClick={() => setShowPassword((shown) => !shown)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword}>👁️</button>
              </div>
              {error && <span className="field-error" role="alert">{error}</span>}
            </div>
            <button type="submit" className={`btn ${isAdmin ? 'btn-primary-green' : 'btn-primary-orange'} btn-block btn-lg`}>Login</button>
          </form>
          <div className="auth-footer">
            {!isAdmin && <p>Don't have an account? <Link to="/register" className="text-orange font-bold">Register</Link></p>}
            <p><Link to="/">&larr; Back to Home</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
}
