import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

function Field({ label, id, type = 'text', value, onChange, error, ...props }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label} <span className="required">*</span></label>
      <input id={id} type={type} className="form-control" value={value} onChange={onChange} required {...props} />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

export default function RegistrationPage() {
  const [params] = useSearchParams();
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const { register } = useApp();
  const navigate = useNavigate();
  const adminRegistrationRequested = params.get('role') === 'admin';

  function change(field) {
    return (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  }

  function submit(event) {
    event.preventDefault();
    if (adminRegistrationRequested) {
      navigate('/admin/login', { replace: true });
      return;
    }
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Please enter a valid email address.';
    if (form.username.trim().length < 3) nextErrors.username = 'Username must be at least 3 characters.';
    if (form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters.';
    if (form.password !== form.confirm) nextErrors.confirm = 'Passwords do not match.';
    setErrors(nextErrors);
    setMessage('');
    if (Object.keys(nextErrors).length) return;

    const result = register('user', {
      name: form.name.trim(),
      email: form.email.trim(),
      username: form.username.trim(),
      password: form.password,
    });
    if (!result.ok) {
      setMessage(result.error);
      return;
    }
    setMessage('User account created successfully.');
    window.setTimeout(() => navigate('/login', { replace: true }), 1200);
  }

  if (adminRegistrationRequested) {
    return <section className="container empty-state-box"><h1>Administrator registration is restricted</h1><p>Use the demo administrator account to access the admin module.</p><Link className="btn btn-primary-green" to="/admin/login">Go to Admin Login</Link></section>;
  }

  return (
    <section className="auth-page-main">
      <div className="container auth-container">
        <div className="auth-card">
          <div className="auth-header text-center">
            <div className="auth-logo-badge"><span aria-hidden="true">🍳</span></div>
            <h1 className="auth-title">Create Your Recipe Hub Account</h1>
            <p className="auth-subtitle">Join Recipe Hub to discover recipes, save favorites, and share your cooking ideas.</p>
          </div>
          {message && <div role="status" className={`alert-box ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
          <form onSubmit={submit} noValidate>
            <Field label="Full Name" id="reg-fullname" value={form.name} onChange={change('name')} error={errors.name} autoComplete="name" />
            <Field label="Email" id="reg-email" type="email" value={form.email} onChange={change('email')} error={errors.email} autoComplete="email" />
            <Field label="Username" id="reg-username" value={form.username} onChange={change('username')} error={errors.username} autoComplete="username" />
            <Field label="Password" id="reg-password" type="password" value={form.password} onChange={change('password')} error={errors.password} autoComplete="new-password" />
            <Field label="Confirm Password" id="reg-confirm" type="password" value={form.confirm} onChange={change('confirm')} error={errors.confirm} autoComplete="new-password" />
            <button type="submit" className="btn btn-primary-orange btn-block btn-lg">Create Account</button>
          </form>
          <div className="auth-footer text-center">
            <p>Already have an account? <Link to="/login" className="text-orange font-bold">Login</Link></p>
            <p><Link to="/">← Return to Home Page</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
}
