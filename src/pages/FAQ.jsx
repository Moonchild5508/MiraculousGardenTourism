import { useState } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../data/store';
import './FAQ.css';

export default function FAQ() {
  const [openId, setOpenId] = useState(null);
  const faqs = store.getFaqs();

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1920&q=80" alt="" />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <h1>FAQ</h1>
          <p>Common questions about visiting our gardens.</p>
        </div>
      </section>

      <section className="container section">
        <div className="faq-list">
          {faqs.map((faq) => (
            <article
              key={faq.id}
              className={`faq-item ${openId === faq.id ? 'open' : ''}`}
            >
              <button
                type="button"
                className="faq-question"
                aria-expanded={openId === faq.id}
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon" aria-hidden>+</span>
              </button>
              <div className="faq-answer" role="region" aria-labelledby={`faq-${faq.id}`}>
                <p id={`faq-${faq.id}`}>{faq.answer}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="faq-cta">
          <p>Still have questions?</p>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}
