const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function getToken() {
  return localStorage.getItem('miracle_garden_token');
}

function getHeaders(includeAuth = true) {
  const headers = { 'Content-Type': 'application/json' };
  if (includeAuth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function handleRes(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText || 'Request failed');
  return data;
}

export const api = {
  async register(name, email, password) {
    const res = await fetch(`${BASE}/api/auth/register`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ name, email, password }),
    });
    return handleRes(res);
  },

  async login(email, password) {
    const res = await fetch(`${BASE}/api/auth/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ email, password }),
    });
    return handleRes(res);
  },

  async me() {
    const res = await fetch(`${BASE}/api/auth/me`, {
      headers: getHeaders(true),
    });
    return handleRes(res);
  },

  async getBookings() {
    const res = await fetch(`${BASE}/api/bookings`, { headers: getHeaders(true) });
    return handleRes(res);
  },

  async createBooking(payload) {
    const res = await fetch(`${BASE}/api/bookings`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(payload),
    });
    return handleRes(res);
  },

  async getReviews(park) {
    const url = park ? `${BASE}/api/reviews?park=${park}` : `${BASE}/api/reviews`;
    const res = await fetch(url, { headers: getHeaders(false) });
    return handleRes(res);
  },

  async createReview(payload) {
    const res = await fetch(`${BASE}/api/reviews`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(payload),
    });
    return handleRes(res);
  },

  async getAdminBookings() {
    const res = await fetch(`${BASE}/api/admin/bookings`, { headers: getHeaders(true) });
    return handleRes(res);
  },

  async getAdminReviews() {
    const res = await fetch(`${BASE}/api/admin/reviews`, { headers: getHeaders(true) });
    return handleRes(res);
  },

  async deleteAdminReview(id) {
    const res = await fetch(`${BASE}/api/admin/reviews/${id}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    return handleRes(res);
  },
};
