const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

async function postJSON(path, body) {
  const token = localStorage.getItem('auth_token');
  const headers = { 'content-type': 'application/json' };
  if (token) headers['authorization'] = `Bearer ${token}`;


  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers,

    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return res.json();
}


async function getJSON(path) {
  const token = localStorage.getItem('auth_token');
  const headers = token ? { authorization: `Bearer ${token}` } : undefined;
  const res = await fetch(`${API_BASE}${path}`, { headers });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Request failed ${res.status}: ${text}`);
  }
  return res.json();
}

export function apiLogin({ email, password }) {
  return postJSON('/auth/api/auth/login', { email, password });
}

export function apiMe() {
  return getJSON('/auth/api/auth/me');
}

export function apiSignup({ email, password }) {
  return postJSON('/auth/api/auth/signup', { email, password });
}


export function fetchProfile(userId = '1') {
  return getJSON(`/profile/api/profile?userId=${encodeURIComponent(userId)}`);
}


export function fetchCart(userId = '1') {
  return getJSON(`/cart/api/cart?userId=${encodeURIComponent(userId)}`);
}

export function fetchNotifications(userId = '1') {
  return getJSON(`/notifications/api/notifications?userId=${encodeURIComponent(userId)}`);
}

export function fetchWishlist(userId = '1') {
  return getJSON(`/wishlist/api/wishlist?userId=${encodeURIComponent(userId)}`);
}

export function fetchOrders(userId = '1') {
  return getJSON(`/orders/api/orders?userId=${encodeURIComponent(userId)}`);
}

export function fetchPayments(userId = '1') {
  return getJSON(`/payments/api/payments?userId=${encodeURIComponent(userId)}`);
}

export function fetchHelpCenter() {
  return getJSON(`/helpcenter/api/helpcenter`);
}

export function fetchAddress(userId = '1') {
  return getJSON(`/address/api/address?userId=${encodeURIComponent(userId)}`);
}

export function fetchReviews() {
  return getJSON(`/reviews/api/reviews`);
}

