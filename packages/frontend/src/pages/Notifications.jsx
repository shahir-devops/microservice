import React, { useEffect, useMemo, useState } from 'react';
import { fetchNotifications } from '../api/client';
import '../pages/Notifications.css';

export default function Notifications() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchNotifications('1').then(setData).catch((e) => setErr(e.message));
  }, []);

  const notifications = useMemo(() => {
    const raw = data?.notifications || [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  return (
    <section className="page">
      <div className="shell">
        <div className="hero">
          <h2>Notifications</h2>
          <div className="badge">{notifications.length} updates</div>
        </div>

        <div className="card">
          <div className="list">
            {err ? <div className="err">{err}</div> : null}
            {!data ? (
              <div style={{ padding: 12, opacity: 0.85 }}>Loading...</div>
            ) : notifications.length === 0 ? (
              <div style={{ padding: 12, opacity: 0.85 }}>No notifications.</div>
            ) : (
              notifications.map((n) => {
                const isOffer = (n.type || '').toUpperCase() === 'OFFER';
                return (
                  <div className="n" key={n.id}>
                    <div className={isOffer ? 'dot offer' : 'dot'} />
                    <div style={{ minWidth: 0 }}>
                      <h4 style={{ margin: 0 }}>
                        {isOffer ? 'New offer' : 'Update'}
                      </h4>
                      <p>{n.message || ''}</p>
                      {n.created_at ? <div className="meta">{String(n.created_at).slice(0, 19).replace('T', ' ')}</div> : null}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


