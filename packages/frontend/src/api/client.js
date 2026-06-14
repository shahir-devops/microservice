const API_BASE = import.meta.env.VITE_API_BASE || '';

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
  return postJSON('/api/auth/login', { email, password });
}


export function apiMe() {
  return getJSON('/api/auth/me');
}

export function apiSignup({ email, password }) {
  return postJSON('/api/auth/signup', { email, password });
}


export function fetchProfile(userId = '1') {
  return getJSON(`/api/profile?userId=${encodeURIComponent(userId)}`);
}

export function updateProfile({ userId, username, displayName, phoneNumber, imageUrl }) {
  return postJSON('/api/profile', {
    userId,
    username,
    displayName,
    phoneNumber,
    imageUrl,
  });
}

export function deleteProfile(userId = '1') {
  return postJSON('/api/profile/delete', { userId });
}





export function fetchCart(userId = '1') {
  return getJSON(`/api/cart?userId=${encodeURIComponent(userId)}`);
}

export function upsertCartItem({ userId = '1', sku, qty }) {
  return postJSON('/api/cart/items', { userId, sku, qty });
}

export function buyNow({ userId = '1', message }) {
  return postJSON('/api/orders/buy-now', { userId, message });
}

export function fetchNotifications(userId = '1') {
  return getJSON(`/api/notifications?userId=${encodeURIComponent(userId)}`);
}



export function fetchWishlist(userId = '1') {
  return getJSON(`/api/wishlist?userId=${encodeURIComponent(userId)}`);
}

export function fetchOrders(userId = '1') {
  return getJSON(`/api/orders?userId=${encodeURIComponent(userId)}`);
}

export function fetchPayments(userId = '1') {
  return getJSON(`/api/payments?userId=${encodeURIComponent(userId)}`);
}

export function fetchHelpCenter() {
  return getJSON(`/api/helpcenter`);
}

export function createHelpCenterContact({ userId = '1', name, email, message }) {
  return postJSON('/api/helpcenter/contact', { userId, name, email, message });
}

export function fetchAddress(userId = '1') {
  return getJSON(`/api/address?userId=${encodeURIComponent(userId)}`);
}

export function upsertAddress({ userId = '1', id, line1, line2, street, landmark, location, city, state, country, postalCode, pincode }) {
  return postJSON('/api/address', {
    userId,
    id,
    line1,
    line2,
    street,
    landmark,
    location,
    city,
    state,
    country,
    postalCode,
    pincode,
  });
}

export function fetchReviews(userId = '1') {
  return getJSON(`/api/reviews?userId=${encodeURIComponent(userId)}`);
}



