import React, { useEffect, useMemo, useState } from 'react';
import { fetchAddress } from '../api/client';

export default function Address() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchAddress('1').then(setData).catch((e) => setErr(e.message));
  }, []);

  const addresses = useMemo(() => {
    const raw = data?.addresses || [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  const latest = addresses[0];

  return (
    <section style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 980 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, marginBottom: 14 }}>
          <h2 style={{ margin: 0 }}>Address</h2>
          <div style={{ fontSize: 12, padding: '6px 10px', borderRadius: 999, background: '#111827', color: 'white', opacity: 0.9, fontWeight: 800 }}>
            Saved delivery address
          </div>
        </div>

        {err ? <div style={{ color: 'crimson', fontWeight: 900 }}>{err}</div> : null}
        {!data ? (
          <div style={{ padding: 12, opacity: 0.8 }}>Loading...</div>
        ) : !latest ? (
          <div style={{ padding: 12, opacity: 0.8 }}>No address saved yet.</div>
        ) : (
          <div style={{ border: '1px solid rgba(0,0,0,.08)', borderRadius: 16, padding: 14, background: 'rgba(0,0,0,.02)' }}>
            <div style={{ fontWeight: 1100, fontSize: 16 }}>Deliver to</div>
            <div style={{ marginTop: 8, color: '#374151', fontWeight: 800, lineHeight: 1.5 }}>
              {latest.street || latest.line1}
              {latest.landmark ? `, ${latest.landmark}` : ''}
              {latest.location ? `, ${latest.location}` : ''}
            </div>
            <div style={{ marginTop: 8, color: '#6b7280', fontWeight: 900 }}>
              {latest.city || ''} {latest.state || ''} {latest.pincode ? `• ${latest.pincode}` : latest.postal_code ? `• ${latest.postal_code}` : ''}
            </div>
            <div style={{ marginTop: 10, color: '#6b7280', fontWeight: 800, fontSize: 12 }}>
              Address saved. (Add edit/save form in a later step.)
            </div>

          </div>
        )}
      </div>
    </section>
  );
}


