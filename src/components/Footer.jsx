import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-icon">🌸</span>
          <span className="logo-text">Miraculous Garden</span>
          <p className="tagline">Where flowers tell stories. A family-friendly floral paradise.</p>
        </div>
        <div className="footer-links">
          <h3>Explore</h3>
          <Link to="/">About Us</Link>
          <Link to="/home">Home</Link>
          <Link to="/attractions">Attractions</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/events">Events</Link>
          <Link to="/park/garden">Miraculous Garden</Link>
          <Link to="/park/butterfly">Butterfly Garden</Link>
        </div>
        <div className="footer-links">
          <h3>Support</h3>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-contact">
          <h3>Visit</h3>
          <p>Open daily 9:00 AM – 9:00 PM</p>
          <p>Last entry one hour before closing</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Miraculous Garden. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
