import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { store } from '../data/store';
import { api } from '../api/client';
import './UserDashboard.css';

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return d.toISOString().slice(0, 10);
}

export default function UserDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingError, setBookingError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(null);
  const [reviewError, setReviewError] = useState('');
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  const [bookingForm, setBookingForm] = useState({ park: 'garden', ticketType: 'Adult', quantity: 1, date: '' });
  const [reviewForm, setReviewForm] = useState({ park: 'garden', rating: 5, comment: '' });

  const parks = store.getParks();
  const events = store.getEvents();
  const gardenTickets = parks.garden.ticketOptions;
  const butterflyTickets = parks.butterfly.ticketOptions;

  const fetchBookings = useCallback(async () => {
    setLoadingBookings(true);
    try {
      const { bookings: list } = await api.getBookings();
      setBookings(list || []);
    } catch {
      setBookings([]);
    } finally {
      setLoadingBookings(false);
    }
  }, []);

  const fetchReviews = useCallback(async () => {
    setLoadingReviews(true);
    try {
      const { reviews: list } = await api.getReviews();
      setReviews(list || []);
    } catch {
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'book') fetchBookings();
  }, [activeTab, fetchBookings]);

  useEffect(() => {
    if (activeTab === 'reviews') fetchReviews();
  }, [activeTab, fetchReviews]);

  const userReviews = reviews.filter((r) => r.email === user?.email);

  const handleBookTicket = async (e) => {
    e.preventDefault();
    setBookingError('');
    const parkData = bookingForm.park === 'garden' ? parks.garden : parks.butterfly;
    const option = parkData.ticketOptions.find((o) => o.type === bookingForm.ticketType);
    if (!option || !bookingForm.date) return;
    setSubmittingBooking(true);
    try {
      await api.createBooking({
        park: bookingForm.park,
        ticketType: bookingForm.ticketType,
        quantity: bookingForm.quantity,
        visitDate: bookingForm.date,
        price: option.price * bookingForm.quantity,
      });
      setBookingSuccess(true);
      setBookingForm({ park: 'garden', ticketType: 'Adult', quantity: 1, date: '' });
      setTimeout(() => setBookingSuccess(null), 4000);
      fetchBookings();
    } catch (err) {
      setBookingError(err.message || 'Booking failed');
    } finally {
      setSubmittingBooking(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.comment.trim()) return;
    setReviewError('');
    setSubmittingReview(true);
    try {
      await api.createReview({
        park: reviewForm.park,
        rating: reviewForm.rating,
        comment: reviewForm.comment.trim(),
      });
      setReviewSuccess(true);
      setReviewForm({ park: 'garden', rating: 5, comment: '' });
      setTimeout(() => setReviewSuccess(null), 4000);
      fetchReviews();
    } catch (err) {
      setReviewError(err.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="user-dashboard">
      <header className="dashboard-header">
        <div className="container">
          <h1>Welcome back, {user?.name || 'Guest'} 🌸</h1>
          <p>Manage your visits, bookings, and reviews.</p>
        </div>
      </header>

      <nav className="dashboard-tabs container">
        <button type="button" className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button type="button" className={activeTab === 'map' ? 'active' : ''} onClick={() => setActiveTab('map')}>Map</button>
        <button type="button" className={activeTab === 'book' ? 'active' : ''} onClick={() => setActiveTab('book')}>Book Tickets</button>
        <button type="button" className={activeTab === 'events' ? 'active' : ''} onClick={() => setActiveTab('events')}>Events</button>
        <button type="button" className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>Reviews</button>
        <button type="button" className={activeTab === 'directions' ? 'active' : ''} onClick={() => setActiveTab('directions')}>Directions</button>
      </nav>

      <div className="dashboard-content container">
        {activeTab === 'overview' && (
          <section className="dashboard-section">
            <h2>Quick Overview</h2>
            <div className="overview-cards">
              <Link to="/park/garden" className="overview-card">
                <span className="icon">🌸</span>
                <span>Miraculous Garden</span>
                <span className="sub">View park & book</span>
              </Link>
              <Link to="/park/butterfly" className="overview-card">
                <span className="icon">🦋</span>
                <span>Butterfly Garden</span>
                <span className="sub">View park & book</span>
              </Link>
              <div className="overview-card static">
                <span className="icon">🎫</span>
                <span>My Bookings</span>
                <span className="sub">{bookings.length} ticket(s)</span>
              </div>
              <Link to="/events" className="overview-card">
                <span className="icon">📅</span>
                <span>Events</span>
                <span className="sub">{events.length} upcoming</span>
              </Link>
            </div>
          </section>
        )}

        {activeTab === 'map' && (
          <section className="dashboard-section">
            <h2>Interactive Map</h2>
            <p className="section-desc">Locate sections and attractions across the gardens.</p>
            <div className="map-container">
              <div className="map-placeholder">
                <span className="map-icon">🗺️</span>
                <h3>Garden Map</h3>
                <p><strong>Miraculous Garden</strong> – Main entrance, Floral Castle, Heart Passage, Umbrella Sky, Disney Avenue.</p>
                <p><strong>Butterfly Garden</strong> – Dome entrance, Cocoon Corner, Feeding Station, Photo Garden.</p>
                <p className="map-note">Use the map at the park for live wayfinding. Printed maps available at the entrance.</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'book' && (
          <section className="dashboard-section">
            <h2>Book Tickets Online</h2>
            {bookingSuccess && <p className="success-msg" role="alert">Booking confirmed! Check your bookings below.</p>}
            {bookingError && <p className="login-error" role="alert">{bookingError}</p>}
            <form onSubmit={handleBookTicket} className="booking-form">
              <label>
                <span>Park</span>
                <select value={bookingForm.park} onChange={(e) => setBookingForm((f) => ({ ...f, park: e.target.value }))}>
                  <option value="garden">Miraculous Garden</option>
                  <option value="butterfly">Miraculous Butterfly Garden</option>
                </select>
              </label>
              <label>
                <span>Ticket type</span>
                <select value={bookingForm.ticketType} onChange={(e) => setBookingForm((f) => ({ ...f, ticketType: e.target.value }))}>
                  {(bookingForm.park === 'garden' ? gardenTickets : butterflyTickets).map((t) => (
                    <option key={t.type} value={t.type}>{t.type} – ${t.price}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>Quantity</span>
                <input type="number" min="1" max="20" value={bookingForm.quantity} onChange={(e) => setBookingForm((f) => ({ ...f, quantity: parseInt(e.target.value, 10) || 1 }))} />
              </label>
              <label>
                <span>Visit date</span>
                <input type="date" value={bookingForm.date} onChange={(e) => setBookingForm((f) => ({ ...f, date: e.target.value }))} required />
              </label>
              <button type="submit" className="btn btn-primary" disabled={submittingBooking}>
                {submittingBooking ? 'Booking…' : 'Confirm Booking'}
              </button>
            </form>
            <div className="my-bookings">
              <h3>My Bookings</h3>
              {loadingBookings ? <p>Loading…</p> : bookings.length === 0 ? <p>No bookings yet.</p> : (
                <ul>
                  {bookings.map((b) => (
                    <li key={b.id}>
                      <strong>{b.park === 'garden' ? 'Miraculous Garden' : 'Butterfly Garden'}</strong> – {b.ticketType} x{b.quantity} on {formatDate(b.visitDate)} – ${b.price}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {activeTab === 'events' && (
          <section className="dashboard-section">
            <h2>Upcoming & Ongoing Events</h2>
            <div className="events-list">
              {events.map((event) => (
                <article key={event.id} className="event-item">
                  <img src={event.image} alt={event.title} />
                  <div>
                    <span className="event-date">{event.date} – {event.endDate}</span>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <Link to="/events" className="btn btn-outline">View all events</Link>
          </section>
        )}

        {activeTab === 'reviews' && (
          <section className="dashboard-section">
            <h2>Leave a Review</h2>
            {reviewSuccess && <p className="success-msg" role="alert">Thank you! Your review has been submitted.</p>}
            {reviewError && <p className="login-error" role="alert">{reviewError}</p>}
            <form onSubmit={handleSubmitReview} className="review-form">
              <label>
                <span>Park</span>
                <select value={reviewForm.park} onChange={(e) => setReviewForm((f) => ({ ...f, park: e.target.value }))}>
                  <option value="garden">Miraculous Garden</option>
                  <option value="butterfly">Miraculous Butterfly Garden</option>
                </select>
              </label>
              <label>
                <span>Rating (1–5)</span>
                <select value={reviewForm.rating} onChange={(e) => setReviewForm((f) => ({ ...f, rating: parseInt(e.target.value, 10) }))}>
                  {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} ★</option>)}
                </select>
              </label>
              <label>
                <span>Your review</span>
                <textarea value={reviewForm.comment} onChange={(e) => setReviewForm((f) => ({ ...f, comment: e.target.value }))} rows={4} placeholder="Share your experience..." required />
              </label>
              <button type="submit" className="btn btn-primary" disabled={submittingReview}>
                {submittingReview ? 'Submitting…' : 'Submit Review'}
              </button>
            </form>
            <div className="my-reviews">
              <h3>My Reviews</h3>
              {loadingReviews ? <p>Loading…</p> : userReviews.length === 0 ? <p>No reviews yet.</p> : (
                <ul>
                  {userReviews.map((r) => (
                    <li key={r.id}>
                      <strong>{r.park === 'garden' ? 'Miraculous Garden' : 'Butterfly Garden'}</strong> – {r.rating} ★ – {r.comment} <span className="muted">({r.date ? formatDate(r.date) : ''})</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {activeTab === 'directions' && (
          <section className="dashboard-section">
            <h2>How to Reach the Park</h2>
            <p className="section-desc">Miraculous Garden – Floral Paradise Avenue, Garden City, GC 12345.</p>
            <div className="directions-cards">
              <div className="dir-card">
                <h3>By Car</h3>
                <p>Highway 1 exit 42 toward Garden City. Follow signs for Miraculous Garden. Free parking on site.</p>
              </div>
              <div className="dir-card">
                <h3>By Public Transport</h3>
                <p>Garden City Central Station – 10 min by shuttle. Shuttle every 20 min from 8:30 AM.</p>
              </div>
            </div>
            <Link to="/contact" className="btn btn-primary">Full contact & map</Link>
          </section>
        )}
      </div>
    </div>
  );
}
