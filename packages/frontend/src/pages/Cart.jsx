import React, { useEffect, useMemo, useState } from 'react';
import { fetchCart } from '../api/client';
import '../pages/Cart.css';

function formatMoney(n) {
  const x = Number(n || 0);
  return x.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

export default function Cart() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchCart('1').then(setData).catch((e) => setErr(e.message));
  }, []);

  const items = useMemo(() => {
    const raw = data?.cart?.items || data?.items || [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, it) => {
      const price = Number(it.unit_cost ?? it.cost ?? 0);
      const qty = Number(it.qty ?? 0);
      return sum + price * qty;
    }, 0);
  }, [items]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <section className="page">
      <div className="shell">
        <div className="row align-items-end mb-3">
          <div className="col">
            <h2 className="mb-0">Your Cart</h2>
            <div className="text-muted fw-bold" style={{ fontSize: 13 }}>{items.length} items</div>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                {err ? <div className="alert alert-danger mb-0">{err}</div> : null}

                {!data ? (
                  <div style={{ padding: 12, opacity: 0.8 }}>Loading...</div>
                ) : items.length === 0 ? (
                  <div style={{ padding: 12, opacity: 0.8 }}>Cart is empty</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table align-middle mb-0">
                      <thead>
                        <tr>
                          <th style={{ width: 88 }}>Item</th>
                          <th>Details</th>
                          <th style={{ width: 140 }}>Unit</th>
                          <th style={{ width: 210 }}>Quantity</th>
                          <th style={{ width: 110 }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((it, idx) => {
                          const img = it.image_url || it.image || '';
                          return (
                            <tr key={`${it.sku || idx}-${idx}`}>
                              <td>
                                {img ? (
                                  <img className="border rounded" src={img} alt={it.name || it.sku} style={{ width: 72, height: 72, objectFit: 'cover' }} />
                                ) : (
                                  <div className="border rounded d-flex align-items-center justify-content-center" style={{ width: 72, height: 72, color: '#6b7280', fontWeight: 900 }}>IMG</div>
                                )}
                              </td>
                              <td>
                                <div className="fw-bold">{it.name || it.sku || 'Item'}</div>
                                <div className="text-muted" style={{ fontSize: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                  {it.description || it.desc || '—'}
                                </div>
                              </td>
                              <td className="fw-bold">{formatMoney(it.unit_cost ?? it.cost ?? 0)}</td>
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <button
                                    className="btn btn-outline-secondary btn-sm"
                                    type="button"
                                    onClick={async () => {
                                      try {
                                        const nextQty = Number(it.qty ?? 0) - 1;
                                        const { upsertCartItem } = await import('../api/client');
                                        await upsertCartItem({ userId: '1', sku: it.sku, qty: nextQty });
                                        const fresh = await (await import('../api/client')).fetchCart('1');
                                        setData(fresh);
                                      } catch (e) {
                                        setToast(e.message || 'Cart update failed');
                                      }
                                    }}
                                  >-
                                  </button>
                                  <div className="fw-bold" style={{ minWidth: 42, textAlign: 'center' }}>{it.qty ?? 0}</div>
                                  <button
                                    className="btn btn-outline-secondary btn-sm"
                                    type="button"
                                    onClick={async () => {
                                      try {
                                        const nextQty = Number(it.qty ?? 0) + 1;
                                        const { upsertCartItem } = await import('../api/client');
                                        await upsertCartItem({ userId: '1', sku: it.sku, qty: nextQty });
                                        const fresh = await (await import('../api/client')).fetchCart('1');
                                        setData(fresh);
                                      } catch (e) {
                                        setToast(e.message || 'Cart update failed');
                                      }
                                    }}
                                  >+
                                  </button>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex gap-2">
                                  <button
                                    className="btn btn-danger btn-sm"
                                    type="button"
                                    onClick={async () => {
                                      try {
                                        const { upsertCartItem } = await import('../api/client');
                                        await upsertCartItem({ userId: '1', sku: it.sku, qty: 0 });
                                        const fresh = await (await import('../api/client')).fetchCart('1');
                                        setData(fresh);
                                      } catch (e) {
                                        setToast(e.message || 'Remove failed');
                                      }
                                    }}
                                  >Remove</button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {items.length ? (
                  <div className="mt-3">
                    <button
                      className="btn btn-primary w-100"
                      type="button"
                      onClick={() => {
                        // Redirect to payment page with total amount
                        const total = subtotal + (items.length ? 5 : 0);
                        const params = new URLSearchParams({ total: String(total) });
                        window.location.href = `/payments?${params.toString()}`;
                      }}
                    >
                      Purchase
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title mb-3">Order Summary</h5>
                <div className="d-flex justify-content-between text-muted fw-bold"><span>Subtotal</span><span>{formatMoney(subtotal)}</span></div>
                <div className="d-flex justify-content-between text-muted fw-bold mt-2"><span>Shipping</span><span>{items.length ? formatMoney(5) : formatMoney(0)}</span></div>
                <hr />
                <div className="d-flex justify-content-between fw-bold" style={{ fontSize: 16 }}><span>Total</span><span>{formatMoney(subtotal + (items.length ? 5 : 0))}</span></div>
                <div className="mt-3 text-muted" style={{ fontSize: 12, lineHeight: 1.4 }}>
                  Totals and item details depend on cart/order persistence and product data in DB.
                </div>
                <button className="btn btn-outline-primary w-100 mt-3" type="button" onClick={() => setToast('Checkout not wired yet')}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>

        {toast ? (
          <div className="toast" role="status" aria-live="polite">
            <div className="toast-body">{toast}</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}


