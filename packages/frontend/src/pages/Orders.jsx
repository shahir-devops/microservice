import React, { useEffect, useMemo, useState } from 'react';
import { fetchOrders } from '../api/client';
import '../pages/Orders.css';

export default function Orders() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchOrders('1').then(setData).catch((e) => setErr(e.message));
  }, []);

  const orders = useMemo(() => {
    const raw = data?.orders || [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  return (
    <section className="page">
      <div className="shell">
        <div className="hero">
          <h2>Orders</h2>
          <div className="badge">{orders.length} total</div>
        </div>

        <div className="card">
          <div className="list">
            {err ? <div className="err">{err}</div> : null}
            {!data ? (
              <div style={{ padding: 12, opacity: 0.85 }}>Loading...</div>
            ) : orders.length === 0 ? (
              <div style={{ padding: 12, opacity: 0.85 }}>No orders yet.</div>
            ) : (
              orders.map((o) => (
                <div className="order" key={o.id}>
                  <div className="orderTop">
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 1000, color: '#e5e7eb' }}>Order #{o.id}</div>
                      <div className="meta">Status: {o.status || '—'}</div>
                    </div>
                    <div className="status">{o.status || '—'}</div>
                  </div>
                  {o.items && Array.isArray(o.items) && o.items.length ? (
                    <div className="items">
                      {o.items.map((it, idx) => (
                        <div className="it" key={`${it.sku || idx}-${idx}`}>
                          {it.image_url ? (
                            <img className="thumb" src={it.image_url} alt={it.name || it.sku} />
                          ) : (
                            <div className="thumb imgPh">IMG</div>
                          )}
                          <div style={{ minWidth: 0 }}>
                            <div className="iName">{it.name || it.sku}</div>
                            <div className="iSub">Qty: {it.qty}</div>
                          </div>
                          <div className="iPrice">{it.unit_cost ? String(it.unit_cost) : ''}</div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


