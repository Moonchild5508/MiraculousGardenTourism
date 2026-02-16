import { Link } from 'react-router-dom';
import { store } from '../data/store';
import './Home.css';

export default function Home() {
  const events = store.getEvents().slice(0, 3);
  const parks = store.getParks();

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-image-wrap">
          <img src="https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=1920&q=80" alt="Colorful flower garden" />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <h1>Discover a World of Flowers</h1>
          <p>Two parks, endless wonder. Plan your visit today.</p>
          <Link to="/park/garden" className="btn btn-primary">Miraculous Garden</Link>
          <Link to="/park/butterfly" className="btn btn-outline light">Butterfly Garden</Link>
        </div>
      </section>

      <section className="home-parks container section">
        <h2 className="section-title">Our Parks</h2>
        <div className="parks-grid">
          <article className="park-card">
            <img src={parks.garden.image} alt={parks.garden.name} />
            <div className="park-card-content">
              <h3>{parks.garden.name}</h3>
              <p>{parks.garden.tagline}</p>
              <Link to="/park/garden" className="link-cta">Visit & Book →</Link>
            </div>
          </article>
          <article className="park-card">
            <img src={parks.butterfly.image} alt={parks.butterfly.name} />
            <div className="park-card-content">
              <h3>{parks.butterfly.name}</h3>
              <p>{parks.butterfly.tagline}</p>
              <Link to="/park/butterfly" className="link-cta">Visit & Book →</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="home-events section">
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-grid">
            {events.map((event) => (
              <Link key={event.id} to="/events" className="event-card">
                <img src={event.image} alt={event.title} />
                <div className="event-card-content">
                  <span className="event-date">{event.date}</span>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/events" className="btn btn-primary">View All Events</Link>
          </div>
        </div>
      </section>

      <section className="home-quick-links container section">
        <h2 className="section-title">Quick Links</h2>
        <div className="quick-links-grid">
          <Link to="/attractions" className="quick-link-card">
            <span className="icon">🌸</span>
            <span>Attractions</span>
          </Link>
          <Link to="/gallery" className="quick-link-card">
            <span className="icon">📷</span>
            <span>Gallery</span>
          </Link>
          <Link to="/faq" className="quick-link-card">
            <span className="icon">❓</span>
            <span>FAQ</span>
          </Link>
          <Link to="/contact" className="quick-link-card">
            <span className="icon">📍</span>
            <span>Contact & Directions</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
