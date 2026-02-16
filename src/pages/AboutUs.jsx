import { Link } from 'react-router-dom';
import './AboutUs.css';

export default function AboutUs() {
  return (
    <div className="about-us">
      <section className="about-hero">
        <div className="hero-bg" aria-hidden="true">
          <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&q=80" alt="" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content container animate-fade-in">
          <h1 className="hero-title">Welcome to Miraculous Garden</h1>
          <p className="hero-tagline">Where millions of flowers create a world of wonder</p>
          <div className="hero-actions">
            <Link to="/home" className="btn-hero btn-primary">Explore the Garden</Link>
            <Link to="/park/garden" className="btn-hero btn-outline">Plan Your Visit</Link>
          </div>
        </div>
        <div className="scroll-hint" aria-hidden="true">
          <span>Scroll to discover</span>
          <span className="arrow">↓</span>
        </div>
      </section>

      <section className="about-concept container section">
        <h2 className="section-title">Our Concept</h2>
        <p className="section-lead">
          Miraculous Garden is a family-friendly floral paradise inspired by the world’s most stunning flower gardens. 
          We bring together seasonal themes, unique installations, and immersive experiences for visitors of all ages.
        </p>
        <div className="concept-cards">
          <article className="concept-card animate-bloom">
            <div className="card-icon">🌺</div>
            <h3>Seasonal Themes</h3>
            <p>Every season brings new displays—spring tulips, summer roses, autumn chrysanthemums, and winter wonderlands.</p>
          </article>
          <article className="concept-card animate-bloom">
            <div className="card-icon">🏰</div>
            <h3>Unique Installations</h3>
            <p>Floral castles, heart-shaped tunnels, umbrella skies, and character-themed avenues you won’t find anywhere else.</p>
          </article>
          <article className="concept-card animate-bloom">
            <div className="card-icon">🦋</div>
            <h3>Butterfly Garden</h3>
            <p>Step into our climate-controlled dome and walk among thousands of free-flying butterflies in a tropical setting.</p>
          </article>
        </div>
      </section>

      <section className="about-parks section">
        <div className="parks-bg" />
        <div className="container">
          <h2 className="section-title light">Two Magical Parks</h2>
          <div className="parks-preview">
            <Link to="/park/garden" className="park-preview-card">
              <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80" alt="Miraculous Garden floral display" />
              <div className="park-preview-overlay">
                <h3>Miraculous Garden</h3>
                <p>Over 50 million flowers in stunning displays</p>
                <span className="link-arrow">Visit →</span>
              </div>
            </Link>
            <Link to="/park/butterfly" className="park-preview-card">
              <img src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80" alt="Butterfly Garden" />
              <div className="park-preview-overlay">
                <h3>Miraculous Butterfly Garden</h3>
                <p>Thousands of butterflies in a tropical dome</p>
                <span className="link-arrow">Visit →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="about-cta container section">
        <h2 className="section-title">Ready to Explore?</h2>
        <p className="section-lead">Book your tickets, check events, and plan the perfect day for the whole family.</p>
        <div className="cta-buttons">
          <Link to="/events" className="btn btn-primary">View Events</Link>
          <Link to="/contact" className="btn btn-outline">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
