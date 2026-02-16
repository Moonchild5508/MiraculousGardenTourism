import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&q=80" alt="" />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <h1>Contact & Directions</h1>
          <p>Find us and plan your journey to the garden.</p>
        </div>
      </section>

      <section className="container section">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Visit Us</h2>
            <address>
              <p><strong>Miraculous Garden</strong></p>
              <p>Floral Paradise Avenue</p>
              <p>Garden City, GC 12345</p>
            </address>
            <div className="contact-details">
              <p><strong>General Enquiries</strong></p>
              <p>Tel: +1 (555) 123-4567</p>
              <p>Email: hello@miraculousgarden.com</p>
            </div>
            <div className="contact-details">
              <p><strong>Opening Hours</strong></p>
              <p>Miraculous Garden: 9:00 AM – 9:00 PM</p>
              <p>Butterfly Garden: 10:00 AM – 8:00 PM</p>
              <p>Last entry one hour before closing.</p>
            </div>
          </div>
          <div className="contact-directions">
            <h2>How to Reach Us</h2>
            <div className="directions-card">
              <h3>By Car</h3>
              <p>Take Highway 1 exit 42 toward Garden City. Follow signs for Miraculous Garden. Free parking available on site.</p>
            </div>
            <div className="directions-card">
              <h3>By Public Transport</h3>
              <p>Garden City Central Station is 10 minutes by shuttle. Shuttle runs every 20 minutes from 8:30 AM.</p>
            </div>
            <div className="directions-card">
              <h3>Map</h3>
              <div className="map-placeholder" aria-hidden="true">
                <span className="map-icon">📍</span>
                <p>Interactive map available after login in your dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
