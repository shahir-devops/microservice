import React, { useEffect, useState } from 'react';
import { fetchProfile } from '../api/client';

export default function Profile() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchProfile('1')
      .then((res) => setData(res?.profile?.row || res?.profile || res))
      .catch((e) => setErr(e.message));
  }, []);

  const p = data;

  return (
    <section style={styles.page}>
      <div style={styles.card}>
        <div style={styles.topRow}>
          {p?.image_url || p?.imageUrl ? (
            <img src={p.image_url || p.imageUrl} alt="profile" style={styles.avatar} />
          ) : (
            <div style={styles.avatarPlaceholder}>
              {(p?.display_name || p?.displayName || 'U').slice(0, 1).toUpperCase()}
            </div>
          )}
          <div style={{ flex: 1 }}>
            <div style={styles.nameRow}>
              <h2 style={{ margin: 0 }}>{p?.display_name || p?.displayName || '—'}</h2>
              <span style={styles.chip}>{p?.username || p?.userName || '—'}</span>
            </div>
            <div style={styles.sub}>Email: {p?.email || '—'}</div>
            <div style={styles.sub}>Phone: {p?.phone_number || p?.phoneNumber || '—'}</div>
          </div>
        </div>

        {err && <div style={styles.error}>{err}</div>}
        {!p && !err ? <div style={{ padding: 12, opacity: 0.8 }}>Loading...</div> : null}
      </div>
    </section>
  );
}

const styles = {
  page: { padding: 16, display: 'flex', justifyContent: 'center' },
  card: {
    width: '100%',
    maxWidth: 920,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.75))',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 16,
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    padding: 18,
    backdropFilter: 'blur(8px)',
  },
  topRow: { display: 'flex', gap: 14, alignItems: 'center' },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 28,
    objectFit: 'cover',
    border: '1px solid rgba(0,0,0,0.12)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
  },
  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
    fontWeight: 900,
    color: '#111827',
    background: 'rgba(0,0,0,0.04)',
    border: '1px dashed rgba(0,0,0,0.18)',
  },
  nameRow: { display: 'flex', gap: 10, alignItems: 'center' },
  chip: {
    background: '#111827',
    color: 'white',
    fontSize: 12,
    padding: '6px 10px',
    borderRadius: 999,
    opacity: 0.9,
    whiteSpace: 'nowrap',
  },
  sub: { color: '#4b5563', marginTop: 6, fontWeight: 600 },
  error: {
    marginTop: 14,
    padding: 10,
    borderRadius: 12,
    border: '1px solid rgba(185,28,28,0.25)',
    background: 'rgba(185,28,28,0.06)',
    color: '#b91c1c',
  },
};


