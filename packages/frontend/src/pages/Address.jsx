import React, { useEffect, useMemo, useState } from 'react';
import { fetchAddress } from '../api/client';
import '../pages/Address.css';

export default function Address() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [toast, setToast] = useState('');


  useEffect(() => {
    fetchAddress('1')
      .then(setData)
      .catch((e) => {
        setErr(e.message);
        setToast(e.message || 'Failed to load address');
      });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const addresses = useMemo(() => {
    const raw = data?.addresses || [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  const latest = addresses[0];

  const formatAddressLine = (a) => {
    const street = a.street || a.line1 || '';
    const landmark = a.landmark ? `, ${a.landmark}` : '';
    const location = a.location ? `, ${a.location}` : '';
    return `${street}${landmark}${location}`.trim();
  };

  const formatCityLine = (a) => {
    const city = a.city || '';
    const state = a.state || '';
    const pin = a.pincode ? `• ${a.pincode}` : a.postal_code ? `• ${a.postal_code}` : '';
    return `${city} ${state} ${pin}`.trim();
  };

  return (
    <section className="page">
      <div className="shell">
        <div className="hero">
          <h2 className="mb-0">Address</h2>
          <div className="badgeDark">Saved delivery address</div>
        </div>

        {err ? (
          <div className="alert alert-danger" role="alert" style={{ fontWeight: 900 }}>
            {err}
          </div>
        ) : null}

        {!data ? (
          <div style={{ padding: 12, opacity: 0.8 }}>Loading...</div>
        ) : !latest ? (
          <div style={{ padding: 12, opacity: 0.8 }}>No address saved yet.</div>
        ) : (
          <div className="cardBox">
            <div className="cardBody">
              <div className="addrTitle">Deliver to</div>
              <div className="addrLine">{formatAddressLine(latest) || '—'}</div>
              <div className="addrMeta">{formatCityLine(latest) || '—'}</div>

              <div className="mt-3" style={{ color: '#6b7280', fontWeight: 900, fontSize: 12 }}>
                Address saved. (UI preview — wire edit form later.)
              </div>
            </div>
          </div>
        )}

        {toast ? (
          <div className="toast" role="status" aria-live="polite">
            <div className="toast-body">{toast}</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}


