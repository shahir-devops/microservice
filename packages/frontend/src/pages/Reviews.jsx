import React, { useEffect, useMemo, useState } from 'react';
import { fetchReviews } from '../api/client';

export default function Reviews() {

  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchReviews('1').then(setData).catch((e) => setErr(e.message));
  }, []);


  const reviews = useMemo(() => {
    const raw = data?.reviews || [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  return (
    <section style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 980 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, marginBottom: 14 }}>
          <h2 style={{ margin: 0 }}>Reviews</h2>
          <div style={{ fontSize: 12, padding: '6px 10px', borderRadius: 999, background: '#111827', color: 'white', opacity: 0.9, fontWeight: 800 }}>
            {reviews.length} ratings
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          {err ? <div style={{ color: 'crimson', fontWeight: 900 }}>{err}</div> : null}
          {!data ? (
            <div style={{ padding: 12, opacity: 0.8 }}>Loading...</div>
          ) : reviews.length === 0 ? (
            <div style={{ padding: 12, opacity: 0.8 }}>No reviews yet.</div>
          ) : (
            reviews.map((r) => (
              <div
                key={r.id}
                style={{
                  border: '1px solid rgba(0,0,0,.08)',
                  borderRadius: 16,
                  padding: 14,
                  background: 'rgba(0,0,0,.02)',
                }}
              >
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 46, height: 46, borderRadius: 16, background: 'linear-gradient(90deg,#22c55e,#16a34a)', color: 'white', fontWeight: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {r.rating}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 1000 }}>Order/Product Review</div>
                    <div style={{ color: '#6b7280', fontWeight: 800, fontSize: 12, marginTop: 3 }}>
                      {r.order_id ? `Order: ${r.order_id}` : 'Order: —'} {r.sku ? `• SKU: ${r.sku}` : ''}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 10, color: '#4b5563', fontWeight: 750 }}>
                  {r.text || '—'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}


