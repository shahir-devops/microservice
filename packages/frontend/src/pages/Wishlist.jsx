import React, { useEffect, useMemo, useState } from 'react';
import { fetchWishlist } from '../api/client';
import './Wishlist.css';

export default function Wishlist() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetchWishlist()
      .then(setData)
      .catch((e) => {
        setErr(e.message);
        setToast(e.message || 'Failed to load wishlist');
      });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const items = useMemo(() => {
    const raw = data?.wishlist || data?.items || data?.rows || data || [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  return (
    <section className="page">
      <div className="shell">
        <div className="hero">
          <h2 className="mb-0">Wishlist</h2>
          <div className="badgeDark">Saved for later</div>
        </div>

        {err ? (
          <div className="alert alert-danger" role="alert" style={{ fontWeight: 900 }}>
            {err}
          </div>
        ) : null}

        {!data ? (
          <div style={{ padding: 12, opacity: 0.85 }}>Loading...</div>
        ) : items.length === 0 ? (
          <div style={{ padding: 12, opacity: 0.85 }}>No wishlist items.</div>
        ) : (
          <div className="cardBox">
            <div className="cardBody">
              <div className="row g-3 align-items-stretch">
                {items.map((it, idx) => {
                  const img = it.image_url || it.image || '';
                  return (
                    <div key={it.sku || it.id || idx} className="col-12 col-md-6">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                          <div className="d-flex gap-3 align-items-center">
                            {img ? (
                              <img className="wlItemImg" src={img} alt={it.name || it.sku || 'item'} />
                            ) : (
                              <div className="wlItemImg d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,.04)', color: '#6b7280', fontWeight: 900 }}>
                                IMG
                              </div>
                            )}
                            <div className="flex-grow-1">
                              <div className="fw-bold">{it.name || it.title || it.sku || 'Wishlist item'}</div>
                              <div className="text-muted" style={{ fontSize: 12, fontWeight: 800, marginTop: 2 }}>
                                SKU: {it.sku || '—'}
                              </div>
                            </div>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              type="button"
                              onClick={() => setToast('Add to cart not wired yet')}
                            >
                              Move to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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


