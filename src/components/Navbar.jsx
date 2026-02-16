import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, admin, logout, isUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  const publicLinks = [
    { to: '/', label: 'About Us' },
    { to: '/home', label: 'Home' },
    { to: '/attractions', label: 'Attractions' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/events', label: 'Events' },
    { to: '/faq', label: 'FAQ' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="navbar" role="banner">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <span className="logo-icon">🌸</span>
          <span className="logo-text">Miraculous Garden</span>
        </Link>

        <button
          type="button"
          className="navbar-toggle"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span className="hamburger" />
          <span className="hamburger" />
          <span className="hamburger" />
        </button>

        <nav className={`navbar-nav ${open ? 'open' : ''}`} aria-label="Main">
          {publicLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </NavLink>
          ))}
          <div className="nav-dropdown">
            <span className="nav-link">Parks</span>
            <div className="dropdown-menu">
              <Link to="/park/garden" onClick={() => setOpen(false)}>Miraculous Garden</Link>
              <Link to="/park/butterfly" onClick={() => setOpen(false)}>Butterfly Garden</Link>
            </div>
          </div>
          {isUser && (
            <NavLink to="/dashboard" className="nav-link" onClick={() => setOpen(false)}>Dashboard</NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" className="nav-link" onClick={() => setOpen(false)}>Admin</NavLink>
          )}
          {!user && !admin && (
            <>
              <Link to="/login/user" className="btn btn-outline" onClick={() => setOpen(false)}>User Login</Link>
              <Link to="/login/admin" className="btn btn-primary" onClick={() => setOpen(false)}>Admin</Link>
            </>
          )}
          {(user || admin) && (
            <button type="button" className="btn btn-outline" onClick={handleLogout}>Logout</button>
          )}
        </nav>
      </div>
    </header>
  );
}
