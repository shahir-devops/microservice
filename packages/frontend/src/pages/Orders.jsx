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
        <div className="row align-items-end mb-3">
          <div className="col">
            <h2 className="mb-0">Orders</h2>
            <div className="text-muted fw-bold" style={{ fontSize: 13 }}>{orders.length} total</div>
          </div>
        </div>

        {err ? <div className="alert alert-danger">{err}</div> : null}

        {!data ? (
          <div style={{ padding: 12, opacity: 0.85 }}>Loading...</div>
        ) : orders.length === 0 ? (
          <div style={{ padding: 12, opacity: 0.85 }}>No orders yet.</div>
        ) : (
          <div className="row g-3">
            {orders.map((o) => (
              <div className="col-12" key={o.id}>
                <div className="card shadow-sm border-0">
<div className="card-body bb-sheen">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <div className="fw-bold">Order #{o.id}</div>
                        <div className="text-muted" style={{ fontSize: 12 }}>Created: {o.created_at ? String(o.created_at).slice(0, 19).replace('T', ' ') : '—'}</div>
                      </div>
                      <div>
                        <span className="badge text-bg-primary">{o.status || '—'}</span>
                      </div>
                    </div>

                    {o.items && Array.isArray(o.items) && o.items.length ? (
                      <div className="table-responsive mt-3">
                        <table className="table table-striped align-middle mb-0">
                          <thead>
                            <tr>
                              <th>Item</th>
                              <th style={{ width: 110 }}>Unit</th>
                              <th style={{ width: 90 }}>Qty</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {o.items.map((it, idx) => (
                              <tr key={`${it.sku || idx}-${idx}`}>
                                <td>
                                  <div className="d-flex align-items-center gap-2">
                                    {it.image_url ? (
                                      <img src={it.image_url} alt={it.name || it.sku} className="border rounded" style={{ width: 44, height: 44, objectFit: 'cover' }} />
                                    ) : (
                                      <div className="border rounded d-flex align-items-center justify-content-center" style={{ width: 44, height: 44, fontWeight: 900, color: '#6b7280' }}>IMG</div>
                                    )}
                                    <div>
                                      <div className="fw-bold">{it.name || it.sku}</div>
                                      <div className="text-muted" style={{ fontSize: 12 }}>{it.sku || ''}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="fw-bold">{it.unit_cost != null && it.unit_cost !== '' ? String(it.unit_cost) : '—'}</td>
                                <td className="fw-bold">{it.qty}</td>
                                <td className="text-muted">{it.description || '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-muted mt-3">No items in this order.</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}


