import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const { type } = useParams();
  const isAdmin = type === 'admin';
  const navigate = useNavigate();
  const { loginUser, loginAdmin, registerUser } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }
    if (isRegister && !name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (isRegister && password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setSubmitting(true);
    try {
      if (isRegister && !isAdmin) {
        await registerUser(name.trim(), email.trim(), password);
        navigate('/dashboard');
      } else if (isAdmin) {
        await loginAdmin(email.trim(), password);
        navigate('/admin');
      } else {
        await loginUser(email.trim(), password);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-bg" aria-hidden="true">
        <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&q=80" alt="" />
        <div className="login-overlay" />
      </div>
      <div className="login-card">
        <div className="login-header">
          <span className="login-icon">{isAdmin ? '🔐' : '🌸'}</span>
          <h1>
            {isRegister && !isAdmin ? 'Create account' : isAdmin ? 'Admin Login' : 'User Login'}
          </h1>
          <p>
            {isAdmin ? 'Manage tickets, events, and content' : 'Book tickets, view map, leave reviews'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          {isRegister && !isAdmin && (
            <label>
              <span className="label-text">Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                aria-required="true"
              />
            </label>
          )}
          <label>
            <span className="label-text">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoComplete="email"
              aria-required="true"
            />
          </label>
          <label>
            <span className="label-text">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRegister ? 'Min 6 characters' : '••••••••'}
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              aria-required="true"
              minLength={isRegister ? 6 : undefined}
            />
          </label>
          {error && <p className="login-error" role="alert">{error}</p>}
          <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
            {submitting ? 'Please wait…' : isRegister && !isAdmin ? 'Create account' : isAdmin ? 'Sign in as Admin' : 'Sign in'}
          </button>
        </form>
        <p className="login-footer">
          {isAdmin ? (
            <Link to="/login/user">User login instead</Link>
          ) : (
            <>
              {isRegister ? (
                <button type="button" className="login-toggle" onClick={() => { setIsRegister(false); setError(''); }}>
                  Already have an account? Sign in
                </button>
              ) : (
                <button type="button" className="login-toggle" onClick={() => { setIsRegister(true); setError(''); }}>
                  Create an account
                </button>
              )}
              {' · '}
              <Link to="/login/admin">Admin login</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
