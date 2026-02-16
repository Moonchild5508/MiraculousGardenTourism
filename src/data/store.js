const STORAGE_KEYS = {
  events: 'mg_events',
  gallery: 'mg_gallery',
  reviews: 'mg_reviews',
  faqs: 'mg_faqs',
  tickets: 'mg_tickets',
  parks: 'mg_parks',
};

const defaultEvents = [
  { id: '1', title: 'Spring Bloom Festival', park: 'garden', date: '2025-03-15', endDate: '2025-03-30', description: 'Celebrate spring with thousands of tulips and daffodils.', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80' },
  { id: '2', title: 'Butterfly Week', park: 'butterfly', date: '2025-04-01', endDate: '2025-04-07', description: 'Special guided tours and butterfly releases.', image: 'https://images.unsplash.com/photo-1483809715206-0499044b5b69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '3', title: 'Rose Parade', park: 'garden', date: '2025-05-10', endDate: '2025-05-12', description: 'Stunning rose displays and live music.', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80' },
];

const defaultGallery = [
  { id: '1', title: 'Floral Heart', park: 'garden', url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80' },
  { id: '2', title: 'Butterfly Haven', park: 'butterfly', url: 'https://images.unsplash.com/photo-1483809715206-0499044b5b69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '3', title: 'Sunflower Field', park: 'garden', url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=800&q=80' },
  { id: '4', title: 'Lavender Path', park: 'garden', url: 'https://images.unsplash.com/photo-1719176411275-2905222eca22?q=80&w=1199&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '5', title: 'Tropical Butterflies', park: 'butterfly', url: 'https://images.unsplash.com/photo-1483809715206-0499044b5b69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '6', title: 'Rose Arch', park: 'garden', url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80' },
];

const defaultFaqs = [
  { id: '1', question: 'What are the opening hours?', answer: 'We are open daily from 9:00 AM to 9:00 PM. Last entry is at 8:00 PM.' },
  { id: '2', question: 'Can I bring my own food?', answer: 'Outside food and beverages are not permitted. We have cafés and kiosks on site.' },
  { id: '3', question: 'Is the garden wheelchair accessible?', answer: 'Yes, pathways are wheelchair-friendly and we offer wheelchair rental.' },
  { id: '4', question: 'Do you offer group discounts?', answer: 'Groups of 15+ receive 10% off. Contact us for school and corporate bookings.' },
];

const defaultParks = {
  garden: {
    name: 'Miraculous Garden',
    tagline: 'Where flowers tell stories',
    description: 'Over 50 million flowers in stunning displays, themed installations, and seasonal exhibits.',
    timings: '9:00 AM – 9:00 PM (last entry 8:00 PM)',
    ticketOptions: [
      { type: 'Adult', price: 55, description: 'Ages 12+' },
      { type: 'Child', price: 40, description: 'Ages 3–11' },
      { type: 'Senior', price: 45, description: '60+' },
      { type: 'Family', price: 180, description: '2 adults + 2 children' },
    ],
    attractions: [
      { id: '1', name: 'Floral Castle', description: 'A castle made entirely of flowers.' },
      { id: '2', name: 'Heart Passage', description: 'Walk through a tunnel of roses.' },
      { id: '3', name: 'Umbrella Sky', description: 'Colorful umbrella installations.' },
      { id: '4', name: 'Disney Avenue', description: 'Character-themed floral displays.' },
    ],
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=80',
  },
  butterfly: {
    name: 'Miraculous Butterfly Garden',
    tagline: 'Flutter into wonder',
    description: 'Thousands of butterflies in a climate-controlled dome with tropical plants and feeding stations.',
    timings: '10:00 AM – 8:00 PM (last entry 7:00 PM)',
    ticketOptions: [
      { type: 'Adult', price: 65, description: 'Ages 12+' },
      { type: 'Child', price: 50, description: 'Ages 3–11' },
      { type: 'Combo', price: 95, description: 'Garden + Butterfly (same day)' },
    ],
    attractions: [
      { id: '1', name: 'Butterfly Dome', description: 'Walk among free-flying butterflies.' },
      { id: '2', name: 'Cocoon Corner', description: 'See butterflies emerge from chrysalises.' },
      { id: '3', name: 'Feeding Station', description: 'Hand-feed butterflies with fruit.' },
      { id: '4', name: 'Photo Garden', description: 'Picture-perfect butterfly backdrops.' },
    ],
    image: 'https://images.unsplash.com/photo-1483809715206-0499044b5b69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
};

function load(key, defaultValue) {
  try {
    const s = localStorage.getItem(STORAGE_KEYS[key] || key);
    return s ? JSON.parse(s) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(STORAGE_KEYS[key] || key, JSON.stringify(value));
  } catch (_) {}
}

export const store = {
  getEvents: () => load('events', defaultEvents),
  setEvents: (events) => save('events', events),

  getGallery: () => load('gallery', defaultGallery),
  setGallery: (gallery) => save('gallery', gallery),

  getReviews: () => load('reviews', []),
  setReviews: (reviews) => save('reviews', reviews),
  addReview: (review) => {
    const reviews = store.getReviews();
    const newReview = { ...review, id: Date.now().toString(), date: new Date().toISOString().slice(0, 10) };
    store.setReviews([newReview, ...reviews]);
    return newReview;
  },

  getFaqs: () => load('faqs', defaultFaqs),
  setFaqs: (faqs) => save('faqs', faqs),

  getTickets: () => load('tickets', []),
  setTickets: (tickets) => save('tickets', tickets),
  addTicket: (booking) => {
    const tickets = store.getTickets();
    const newTicket = { ...booking, id: 'T' + Date.now(), date: new Date().toISOString().slice(0, 10) };
    store.setTickets([...tickets, newTicket]);
    return newTicket;
  },

  getParks: () => load('parks', defaultParks),
  setParks: (parks) => save('parks', parks),
};
