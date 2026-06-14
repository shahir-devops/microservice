import React, { useEffect, useMemo, useState } from 'react';
import { fetchNotifications } from '../api/client';
import '../pages/Notifications.css';

export default function Notifications() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetchNotifications('1')
      .then(setData)
      .catch((e) => {
        setErr(e.message);
        setToast(e.message || 'Failed to load notifications');
      });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const notifications = useMemo(() => {
    const raw = data?.notifications || data?.items || [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  return (
    <section className="page">
      <div className="shell">
        <div className="row align-items-end mb-3">
          <div className="col">
            <h2 className="mb-0">Notifications</h2>
            <div className="text-muted fw-bold" style={{ fontSize: 13 }}>{notifications.length} updates</div>
          </div>
        </div>

        {!data ? (
          <div style={{ padding: 12, opacity: 0.85 }}>Loading...</div>
        ) : notifications.length === 0 ? (
          <div style={{ padding: 12, opacity: 0.85 }}>No notifications.</div>
        ) : (
          <div className="row g-3">
            {notifications.map((n) => {
              const type = (n.type || '').toUpperCase();
              const isOffer = type === 'OFFER';
              return (
                <div className="col-12" key={n.id}>
                  <div className="card border-0 shadow-sm">
                    <div className="card-body bb-sheen">
                      <div className="d-flex align-items-start justify-content-between gap-3">
                        <div>
                          <div className="fw-bold">{isOffer ? 'New offer' : 'Update'}</div>
                          <div className="mt-1" style={{ color: '#6b7280', fontSize: 13 }}>{n.message || ''}</div>
                        </div>
                        <div className="text-end">
                          <span className={`badge ${isOffer ? 'text-bg-success' : 'text-bg-secondary'}`}>{type || 'NOTICE'}</span>
                          <div className="text-muted" style={{ fontSize: 12, marginTop: 6 }}>
                            {n.created_at ? String(n.created_at).slice(0, 19).replace('T', ' ') : '—'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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


