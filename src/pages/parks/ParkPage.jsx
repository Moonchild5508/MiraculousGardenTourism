import { useParams, Link } from 'react-router-dom';
import { store } from '../../data/store';
import './ParkPage.css';

export default function ParkPage() {
  const { parkId } = useParams();
  const parks = store.getParks();
  const park = parkId === 'butterfly' ? parks.butterfly : parks.garden;
  const parkName = park.name;

  return (
    <div className={`park-page park-${parkId}`}>
      <section className="park-hero">
        <div className="hero-bg">
          <img src={park.image} alt={parkName} />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <h1>{parkName}</h1>
          <p className="tagline">{park.tagline}</p>
          <Link to="/login/user" className="btn-hero btn-primary">Book Tickets</Link>
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">About {parkName}</h2>
        <p className="section-lead">{park.description}</p>
        <div className="park-timings">
          <h3>Opening Hours</h3>
          <p>{park.timings}</p>
        </div>
      </section>

      <section className="park-attractions section">
        <div className="container">
          <h2 className="section-title">Attractions</h2>
          <div className="attractions-grid">
            {park.attractions.map((a) => (
              <article key={a.id} className="attraction-card">
                <div className="attraction-icon">{parkId === 'butterfly' ? '🦋' : '🌸'}</div>
                <h3>{a.name}</h3>
                <p>{a.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">Ticket Options</h2>
        <div className="ticket-options">
          {park.ticketOptions.map((t, i) => (
            <div key={i} className="ticket-card">
              <h3>{t.type}</h3>
              <p className="ticket-desc">{t.description}</p>
              <p className="ticket-price">${t.price}</p>
              <Link to="/login/user" className="btn btn-outline">Book Now</Link>
            </div>
          ))}
        </div>
        <p className="ticket-note">Log in to book tickets online. Combo tickets (Garden + Butterfly) available for same-day visits.</p>
      </section>

      <section className="park-cta section">
        <div className="container">
          <h2 className="section-title light">Plan Your Visit</h2>
          <div className="cta-links">
            <Link to="/events" className="btn btn-hero-light">View Events</Link>
            <Link to="/contact" className="btn btn-outline light">Directions & Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
