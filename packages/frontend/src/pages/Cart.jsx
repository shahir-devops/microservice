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
        <div className="hero">
          <h2>Your Cart</h2>
          <div className="badge">{items.length} items</div>
        </div>

        <div className="grid">
          <div className="card">
            <div className="list">
              {err && <div className="err">{err}</div>}
              {!data ? (
                <div style={{ padding: 12, opacity: 0.8 }}>Loading...</div>
              ) : items.length === 0 ? (
                <div style={{ padding: 12, opacity: 0.8 }}>Cart is empty</div>
              ) : (
                items.map((it, idx) => {
                  const img = it.image_url || it.image || '';
                  return (
                    <div className="item" key={`${it.sku || idx}-${idx}`}>
                      {img ? <img className="thumb" src={img} alt={it.name || it.sku} /> : <div className="thumb imgPh">IMG</div>}
                      <div className="meta">
                        <p className="name">{it.name || it.sku || 'Item'}</p>
                        <div className="desc">{it.description || it.desc || '—'}</div>
                        <div className="row">
                          <div className="price">{formatMoney(it.unit_cost ?? it.cost ?? 0)}</div>
                          <div className="controls">
                            <div className="step" title="Quantity">
                              <button
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
                              <span>{it.qty ?? 0}</span>
                              <button
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
                            <button
                              className="btn btnDanger"
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
                            >
                              Remove
                            </button>

                          </div>
                        </div>
                        <div style={{ marginTop: 10 }}>
                          <button
                            className="btn btnPrimary"
                            type="button"
                            onClick={async () => {
                              try {
                                setToast('Placing order...');
                                const { buyNow, fetchCart } = await import('../api/client');
                                const r = await buyNow({ userId: '1', message: 'Your order has been placed!' });
                                if (!r?.ok) throw new Error('Buy Now failed');
                                const freshCart = await fetchCart('1');
                                setData(freshCart);
                                setToast('Order placed!');
                              } catch (e) {
                                setToast(e.message || 'Buy Now failed');
                              }
                            }}
                          >
                            Buy Now
                          </button>
                        </div>

                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="card">
            <div className="summary">
              <h3>Order Summary</h3>
              <div className="kv">
                <span>Subtotal</span>
                <strong>{formatMoney(subtotal)}</strong>
              </div>
              <div className="kv">
                <span>Shipping</span>
                <strong>{items.length ? formatMoney(5) : formatMoney(0)}</strong>
              </div>
              <div className="hr" />
              <div className="kv" style={{ fontSize: 16 }}>
                <span>Total</span>
                <strong>{formatMoney(subtotal + (items.length ? 5 : 0))}</strong>
              </div>
              <div className="note" style={{ marginTop: 10 }}>
                UI is upgraded. Backend “Buy Now” + cart persistence is implemented in the Phase 3 backend work.
              </div>
              <div style={{ marginTop: 14 }}>
                <button className="btn btnPrimary" style={{ width: '100%' }} type="button" onClick={() => setToast('Checkout not wired yet')}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>

        {toast ? (
          <div className="toast">
            <div className="t">{toast}</div>
            <div className="s">&nbsp;</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}


