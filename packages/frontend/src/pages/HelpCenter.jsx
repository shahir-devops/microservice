import React, { useEffect, useMemo, useState } from 'react';
import { createHelpCenterContact, fetchHelpCenter } from '../api/client';

export default function HelpCenter() {

  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetchHelpCenter().then(setData).catch((e) => setErr(e.message));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const faqs = useMemo(() => {
    const raw = data?.faqs || [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  return (
    <section style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 980 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12, marginBottom: 14 }}>
          <h2 style={{ margin: 0 }}>Help Center</h2>
          <div style={{ fontSize: 12, padding: '6px 10px', borderRadius: 999, background: '#111827', color: 'white', opacity: 0.9, fontWeight: 800 }}>
            FAQ + Contact
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 14 }}>
          <div style={{ background: 'rgba(0,0,0,.03)', border: '1px solid rgba(0,0,0,.06)', borderRadius: 16, padding: 14 }}>
            <h3 style={{ marginTop: 0 }}>FAQs</h3>
            {err ? <div style={{ color: 'crimson', fontWeight: 800 }}>{err}</div> : null}
            {!data ? (
              <div style={{ padding: 12, opacity: 0.8 }}>Loading...</div>
            ) : faqs.length === 0 ? (
              <div style={{ padding: 12, opacity: 0.8 }}>No FAQs.</div>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {faqs.map((f) => (
                  <div key={f.id} style={{ border: '1px solid rgba(0,0,0,.08)', borderRadius: 14, padding: 12, background: 'rgba(255,255,255,.8)' }}>
                    <div style={{ fontWeight: 1000 }}>{f.q}</div>
                    <div style={{ marginTop: 6, color: '#4b5563', fontWeight: 700, fontSize: 13 }}>{f.a}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ background: 'rgba(0,0,0,.03)', border: '1px solid rgba(0,0,0,.06)', borderRadius: 16, padding: 14 }}>
            <h3 style={{ marginTop: 0 }}>Contact us</h3>
            <div style={{ fontSize: 13, color: '#6b7280', fontWeight: 700, marginTop: -4, marginBottom: 12 }}>
              One contact box. We’ll get back with answers.
            </div>

            {toast ? <div style={{ marginBottom: 10, color: 'green', fontWeight: 900 }}>{toast}</div> : null}

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  setSaving(true);
                  await createHelpCenterContact({
                    userId: '1',
                    name: form.name,
                    email: form.email,
                    message: form.message,
                  });
                  setToast('Message sent!');
                  setForm({ name: '', email: '', message: '' });
                } catch (e2) {
                  setErr(e2.message || 'Failed to send message');
                } finally {
                  setSaving(false);
                }
              }}
            >

              <label style={{ display: 'block', marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6, color: '#374151' }}>Name</div>
                <input
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,.12)', background: 'rgba(255,255,255,.9)' }}
                  placeholder="Your name"
                />
              </label>

              <label style={{ display: 'block', marginBottom: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6, color: '#374151' }}>Email</div>
                <input
                  value={form.email}
                  onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,.12)', background: 'rgba(255,255,255,.9)' }}
                  placeholder="you@example.com"
                />
              </label>

              <label style={{ display: 'block', marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 6, color: '#374151' }}>Message</div>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                  style={{ width: '100%', minHeight: 120, padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(0,0,0,.12)', background: 'rgba(255,255,255,.9)', resize: 'vertical' }}
                  placeholder="How can we help?"
                />
              </label>

              <button type="submit" disabled={saving} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: 'none', cursor: 'pointer', background: 'linear-gradient(90deg, #2563eb, #7c3aed)', color: 'white', fontWeight: 900 }}>
                {saving ? 'Sending...' : 'Send message'}
              </button>
            </form>

            <div style={{ marginTop: 10, color: '#6b7280', fontWeight: 800, fontSize: 12, lineHeight: 1.4 }}>
              Backend endpoint will store this message into MySQL (Phase 4).
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


