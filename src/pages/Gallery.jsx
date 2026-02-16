import { useState } from 'react';
import { store } from '../data/store';
import './Gallery.css';

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const gallery = store.getGallery();

  return (
    <div className="gallery-page">
      <section className="gallery-hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=1920&q=80" alt="" />
          <div className="hero-overlay" />
        </div>
        <div className="container hero-content">
          <h1>Gallery</h1>
          <p>Moments from our floral paradise and butterfly haven.</p>
        </div>
      </section>

      <section className="container section">
        <div className="gallery-filters">
          <button
            type="button"
            className={selected === null ? 'active' : ''}
            onClick={() => setSelected(null)}
          >
            All
          </button>
          <button
            type="button"
            className={selected === 'garden' ? 'active' : ''}
            onClick={() => setSelected('garden')}
          >
            Miraculous Garden
          </button>
          <button
            type="button"
            className={selected === 'butterfly' ? 'active' : ''}
            onClick={() => setSelected('butterfly')}
          >
            Butterfly Garden
          </button>
        </div>
        <div className="gallery-grid">
          {gallery
            .filter((img) => !selected || img.park === selected)
            .map((img) => (
              <article key={img.id} className="gallery-item">
                <img src={img.url} alt={img.title} loading="lazy" />
                <div className="gallery-item-overlay">
                  <span>{img.title}</span>
                </div>
              </article>
            ))}
        </div>
      </section>
    </div>
  );
}
