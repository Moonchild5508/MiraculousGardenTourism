import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { store } from '../data/store';
import { api } from '../api/client';
import './AdminDashboard.css';

function formatDate(str) {
  if (!str) return '';
  return new Date(str).toISOString().slice(0, 10);
}

export default function AdminDashboard() {
  const { admin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [events, setEvents] = useState(store.getEvents());
  const [gallery, setGallery] = useState(store.getGallery());
  const [reviews, setReviews] = useState(store.getReviews());
  const [faqs, setFaqs] = useState(store.getFaqs());
  const [parks, setParks] = useState(store.getParks());
  const [tickets, setTickets] = useState(store.getTickets());
  const [adminBookings, setAdminBookings] = useState([]);
  const [adminReviews, setAdminReviews] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchAdminBookings = useCallback(async () => {
    setLoadingBookings(true);
    try {
      const { bookings } = await api.getAdminBookings();
      setAdminBookings(bookings || []);
    } catch {
      setAdminBookings([]);
    } finally {
      setLoadingBookings(false);
    }
  }, []);

  const fetchAdminReviews = useCallback(async () => {
    setLoadingReviews(true);
    try {
      const { reviews: list } = await api.getAdminReviews();
      setAdminReviews(list || []);
    } catch {
      setAdminReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  }, []);

  const refresh = () => {
    setEvents(store.getEvents());
    setGallery(store.getGallery());
    setReviews(store.getReviews());
    setFaqs(store.getFaqs());
    setParks(store.getParks());
    setTickets(store.getTickets());
  };

  useEffect(refresh, [activeTab]);
  useEffect(() => { fetchAdminBookings(); }, [fetchAdminBookings]);
  useEffect(() => { fetchAdminReviews(); }, [fetchAdminReviews]);
  useEffect(() => { if (activeTab === 'tickets') fetchAdminBookings(); }, [activeTab, fetchAdminBookings]);
  useEffect(() => { if (activeTab === 'reviews') fetchAdminReviews(); }, [activeTab, fetchAdminReviews]);

  const showMsg = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleDeleteEvent = (id) => {
    store.setEvents(events.filter((e) => e.id !== id));
    refresh();
    showMsg('Event deleted.');
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const form = e.target;
    const newEvent = {
      id: Date.now().toString(),
      title: form.title.value,
      park: form.park.value,
      date: form.date.value,
      endDate: form.endDate.value,
      description: form.description.value,
      image: form.image.value || 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80',
    };
    store.setEvents([...events, newEvent]);
    form.reset();
    refresh();
    showMsg('Event added.');
  };

  const handleDeleteGallery = (id) => {
    store.setGallery(gallery.filter((g) => g.id !== id));
    refresh();
    showMsg('Image removed.');
  };

  const handleAddGallery = (e) => {
    e.preventDefault();
    const form = e.target;
    store.setGallery([...gallery, { id: Date.now().toString(), title: form.title.value, park: form.park.value, url: form.url.value }]);
    form.reset();
    refresh();
    showMsg('Image added.');
  };

  const handleDeleteReview = async (id) => {
    try {
      await api.deleteAdminReview(id);
      setAdminReviews((prev) => prev.filter((r) => r.id !== id));
      showMsg('Review removed.');
    } catch {
      showMsg('Failed to delete review.');
    }
  };

  const handleFaqSave = (e) => {
    e.preventDefault();
    const form = e.target;
    const id = form.id?.value;
    const faq = { question: form.question.value, answer: form.answer.value };
    if (id) {
      store.setFaqs(faqs.map((f) => (f.id === id ? { ...f, ...faq } : f)));
      showMsg('FAQ updated.');
    } else {
      store.setFaqs([...faqs, { id: Date.now().toString(), ...faq }]);
      showMsg('FAQ added.');
    }
    form.reset();
    form.id?.value && (form.id.value = '');
    refresh();
  };

  const handleDeleteFaq = (id) => {
    store.setFaqs(faqs.filter((f) => f.id !== id));
    refresh();
    showMsg('FAQ deleted.');
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="container">
          <h1>Admin Dashboard 🔐</h1>
          <p>Manage tickets, events, gallery, reviews, FAQs, and park content.</p>
          {message && <p className="admin-message" role="alert">{message}</p>}
        </div>
      </header>

      <nav className="admin-tabs container">
        <button type="button" className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
        <button type="button" className={activeTab === 'tickets' ? 'active' : ''} onClick={() => setActiveTab('tickets')}>Tickets</button>
        <button type="button" className={activeTab === 'events' ? 'active' : ''} onClick={() => setActiveTab('events')}>Events</button>
        <button type="button" className={activeTab === 'gallery' ? 'active' : ''} onClick={() => setActiveTab('gallery')}>Gallery</button>
        <button type="button" className={activeTab === 'reviews' ? 'active' : ''} onClick={() => setActiveTab('reviews')}>Reviews</button>
        <button type="button" className={activeTab === 'faqs' ? 'active' : ''} onClick={() => setActiveTab('faqs')}>FAQs</button>
        <button type="button" className={activeTab === 'parks' ? 'active' : ''} onClick={() => setActiveTab('parks')}>Parks</button>
      </nav>

      <div className="admin-content container">
        {activeTab === 'overview' && (
          <section className="admin-section">
            <h2>Overview</h2>
            <div className="admin-stats">
              <div className="stat-card"><span className="num">{adminBookings.length}</span><span>Bookings</span></div>
              <div className="stat-card"><span className="num">{events.length}</span><span>Events</span></div>
              <div className="stat-card"><span className="num">{gallery.length}</span><span>Gallery images</span></div>
              <div className="stat-card"><span className="num">{adminReviews.length}</span><span>Reviews</span></div>
              <div className="stat-card"><span className="num">{faqs.length}</span><span>FAQs</span></div>
            </div>
          </section>
        )}

        {activeTab === 'tickets' && (
          <section className="admin-section">
            <h2>Ticket Bookings</h2>
            <div className="admin-list">
              {loadingBookings ? <p>Loading…</p> : adminBookings.length === 0 ? <p>No bookings yet.</p> : adminBookings.map((t) => (
                <div key={t.id} className="list-item">
                  <span><strong>{t.park === 'garden' ? 'Miraculous Garden' : 'Butterfly Garden'}</strong> – {t.ticketType} x{t.quantity} – {formatDate(t.visitDate)} – ${t.price} – {t.email} {t.name ? `(${t.name})` : ''}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'events' && (
          <section className="admin-section">
            <h2>Events</h2>
            <form onSubmit={handleAddEvent} className="admin-form">
              <input name="title" placeholder="Event title" required />
              <select name="park"><option value="garden">Miraculous Garden</option><option value="butterfly">Butterfly Garden</option></select>
              <input name="date" type="date" required />
              <input name="endDate" type="date" required />
              <input name="description" placeholder="Description" required />
              <input name="image" placeholder="Image URL (optional)" />
              <button type="submit" className="btn btn-primary">Add Event</button>
            </form>
            <div className="admin-list">
              {events.map((e) => (
                <div key={e.id} className="list-item">
                  <span><strong>{e.title}</strong> – {e.date} to {e.endDate}</span>
                  <button type="button" className="btn-delete" onClick={() => handleDeleteEvent(e.id)}>Delete</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'gallery' && (
          <section className="admin-section">
            <h2>Gallery</h2>
            <form onSubmit={handleAddGallery} className="admin-form">
              <input name="title" placeholder="Image title" required />
              <select name="park"><option value="garden">Miraculous Garden</option><option value="butterfly">Butterfly Garden</option></select>
              <input name="url" placeholder="Image URL" required />
              <button type="submit" className="btn btn-primary">Add Image</button>
            </form>
            <div className="gallery-grid">
              {gallery.map((img) => (
                <div key={img.id} className="gallery-item">
                  <img src={img.url} alt={img.title} />
                  <span>{img.title}</span>
                  <button type="button" className="btn-delete" onClick={() => handleDeleteGallery(img.id)}>Remove</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'reviews' && (
          <section className="admin-section">
            <h2>User Reviews</h2>
            <div className="admin-list">
              {loadingReviews ? <p>Loading…</p> : adminReviews.length === 0 ? <p>No reviews yet.</p> : adminReviews.map((r) => (
                <div key={r.id} className="list-item review-item">
                  <div>
                    <strong>{r.park === 'garden' ? 'Miraculous Garden' : 'Butterfly Garden'}</strong> – {r.rating} ★ – {r.name} – {formatDate(r.date)}
                    <p>{r.comment}</p>
                  </div>
                  <button type="button" className="btn-delete" onClick={() => handleDeleteReview(r.id)}>Delete</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'faqs' && (
          <section className="admin-section">
            <h2>FAQs</h2>
            <form onSubmit={handleFaqSave} className="admin-form">
              <input type="hidden" name="id" />
              <input name="question" placeholder="Question" required />
              <textarea name="answer" placeholder="Answer" rows={3} required />
              <button type="submit" className="btn btn-primary">Add / Update FAQ</button>
            </form>
            <div className="admin-list">
              {faqs.map((f) => (
                <div key={f.id} className="list-item">
                  <div>
                    <strong>{f.question}</strong>
                    <p>{f.answer}</p>
                  </div>
                  <div>
                    <button type="button" className="btn-small" onClick={() => { const form = document.querySelector('.admin-form'); if (form) { form.question.value = f.question; form.answer.value = f.answer; form.id.value = f.id; } }}>Edit</button>
                    <button type="button" className="btn-delete" onClick={() => handleDeleteFaq(f.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'parks' && (
          <section className="admin-section">
            <h2>Park Content</h2>
            <p>Park details are stored in the data store. Edit <code>src/data/store.js</code> to change default park info, timings, ticket options, and attractions.</p>
            <div className="parks-preview">
              <div className="park-block">
                <h3>{parks.garden.name}</h3>
                <p>{parks.garden.description}</p>
                <p><strong>Timings:</strong> {parks.garden.timings}</p>
              </div>
              <div className="park-block">
                <h3>{parks.butterfly.name}</h3>
                <p>{parks.butterfly.description}</p>
                <p><strong>Timings:</strong> {parks.butterfly.timings}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
