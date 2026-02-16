import { store } from '../data/store';
import './Events.css';

export default function Events() {
  const events = store.getEvents();

  return (
    <div className="events-page">
      <section className="events-hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&q=80" alt="" />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <h1>Events</h1>
          <p>Seasonal festivals, butterfly releases, and family activities.</p>
        </div>
      </section>

      <section className="container section">
        <h2 className="section-title">Upcoming & Ongoing Events</h2>
        <div className="events-list">
          {events.map((event) => (
            <article key={event.id} className="event-card-full">
              <div className="event-card-image">
                <img src={event.image} alt={event.title} />
                <span className="event-badge">{event.park === 'garden' ? 'Miraculous Garden' : 'Butterfly Garden'}</span>
              </div>
              <div className="event-card-body">
                <div className="event-dates">
                  {event.date} – {event.endDate}
                </div>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
