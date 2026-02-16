import { Link } from 'react-router-dom';
import { store } from '../data/store';
import './Attractions.css';

export default function Attractions() {
  const parks = store.getParks();

  return (
    <div className="attractions-page">
      <section className="attractions-hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&q=80" alt="" />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <h1>Attractions</h1>
          <p>Explore floral installations and butterfly experiences across both parks.</p>
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">Miraculous Garden</h2>
        <p className="section-lead">{parks.garden.description}</p>
        <div className="attractions-grid">
          {parks.garden.attractions.map((a) => (
            <article key={a.id} className="attraction-card">
              <div className="attraction-icon">🌸</div>
              <h3>{a.name}</h3>
              <p>{a.description}</p>
              <Link to="/park/garden" className="link-small">View park details →</Link>
            </article>
          ))}
        </div>
        <div className="section-cta">
          <Link to="/park/garden" className="btn btn-primary">Visit Miraculous Garden</Link>
        </div>
      </section>

      <section className="attractions-alt section">
        <div className="container">
          <h2 className="section-title light">Miraculous Butterfly Garden</h2>
          <p className="section-lead light">{parks.butterfly.description}</p>
          <div className="attractions-grid">
            {parks.butterfly.attractions.map((a) => (
              <article key={a.id} className="attraction-card light">
                <div className="attraction-icon">🦋</div>
                <h3>{a.name}</h3>
                <p>{a.description}</p>
                <Link to="/park/butterfly" className="link-small light">View park details →</Link>
              </article>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/park/butterfly" className="btn btn-hero-light">Visit Butterfly Garden</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
