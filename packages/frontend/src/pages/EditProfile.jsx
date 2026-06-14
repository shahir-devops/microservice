import React, { useEffect, useMemo, useState } from 'react';
import { deleteProfile, fetchProfile, updateProfile } from '../api/client';

export default function EditProfile() {
  const userId = useMemo(() => '1', []);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    username: '',
    displayName: '',
    phoneNumber: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchProfile(userId)
      .then((res) => {
        const p = res?.profile?.row || res?.profile || {};
        setForm({
          username: p.username || '',
          displayName: p.display_name || p.displayName || '',
          phoneNumber: p.phone_number || p.phoneNumber || '',
          imageUrl: p.image_url || p.imageUrl || '',
        });
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [userId]);

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    setSuccess('');
    setSaving(true);
    try {
      await updateProfile({
        userId,
        username: form.username.trim(),
        displayName: form.displayName.trim(),
        phoneNumber: form.phoneNumber.trim(),
        imageUrl: form.imageUrl.trim(),
      });
      setSuccess('Profile updated successfully.');
      const res = await fetchProfile(userId);
      const p = res?.profile?.row || res?.profile || {};
      setForm({
        username: p.username || '',
        displayName: p.display_name || p.displayName || '',
        phoneNumber: p.phone_number || p.phoneNumber || '',
        imageUrl: p.image_url || p.imageUrl || '',
      });
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!confirm('Delete your profile? This cannot be undone.')) return;
    setErr('');
    setSuccess('');
    setSaving(true);
    try {
      await deleteProfile(userId);
      setSuccess('Profile deleted.');
      setForm({ username: '', displayName: '', phoneNumber: '', imageUrl: '' });
    } catch (e) {
      setErr(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={{ margin: 0 }}>Edit Profile</h2>
          <span style={styles.badge}>Update username & details</span>
        </div>

        {err && <div style={styles.error}>{err}</div>}
        {success && <div style={styles.success}>{success}</div>}

        {loading ? (
          <div style={{ padding: 12, opacity: 0.8 }}>Loading...</div>
        ) : (
          <form onSubmit={onSubmit}>
            <div style={styles.grid}>
              <div style={styles.col}>
                <label style={styles.label}>Username</label>
                <input
                  required
                  value={form.username}
                  onChange={(e) => setForm((s) => ({ ...s, username: e.target.value }))}
                  style={styles.input}
                  placeholder="e.g. john_doe"
                />
              </div>

              <div style={styles.col}>
                <label style={styles.label}>Display Name</label>
                <input
                  required
                  value={form.displayName}
                  onChange={(e) => setForm((s) => ({ ...s, displayName: e.target.value }))}
                  style={styles.input}
                  placeholder="e.g. John"
                />
              </div>

              <div style={styles.col}>
                <label style={styles.label}>Phone Number</label>
                <input
                  value={form.phoneNumber}
                  onChange={(e) => setForm((s) => ({ ...s, phoneNumber: e.target.value }))}
                  style={styles.input}
                  placeholder="e.g. 9876543210"
                />
              </div>

              <div style={styles.col}>
                <label style={styles.label}>Profile Image URL</label>
                <input
                  value={form.imageUrl}
                  onChange={(e) => setForm((s) => ({ ...s, imageUrl: e.target.value }))}
                  style={styles.input}
                  placeholder="https://..."
                />
                <div style={styles.previewWrap}>
                  {form.imageUrl ? (
                    <img src={form.imageUrl} alt="preview" style={styles.avatar} />
                  ) : (
                    <div style={styles.avatarPlaceholder}>No image</div>
                  )}
                </div>
              </div>
            </div>

            <div style={styles.actions}>
              <button type="submit" disabled={saving} style={styles.primaryBtn}>
                {saving ? 'Saving...' : 'Update Profile'}
              </button>
              <button type="button" disabled={saving} onClick={onDelete} style={styles.dangerBtn}>
                Delete Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

const styles = {
  page: {
    padding: 16,
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 920,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.75))',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: 16,
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    padding: 18,
    backdropFilter: 'blur(8px)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  badge: {
    background: '#111827',
    color: 'white',
    fontSize: 12,
    padding: '6px 10px',
    borderRadius: 999,
    opacity: 0.9,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 12,
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    fontSize: 13,
    color: '#374151',
    fontWeight: 600,
  },
  input: {
    padding: '10px 12px',
    borderRadius: 12,
    border: '1px solid rgba(0,0,0,0.12)',
    outline: 'none',
    background: 'rgba(255,255,255,0.9)',
  },
  actions: {
    display: 'flex',
    gap: 12,
    marginTop: 16,
  },
  primaryBtn: {
    flex: 1,
    padding: '12px 14px',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
    color: 'white',
    fontWeight: 700,
  },
  dangerBtn: {
    padding: '12px 14px',
    borderRadius: 12,
    border: '1px solid rgba(220,38,38,0.35)',
    cursor: 'pointer',
    background: 'rgba(220,38,38,0.08)',
    color: '#b91c1c',
    fontWeight: 700,
  },
  error: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 12,
    border: '1px solid rgba(185,28,28,0.25)',
    background: 'rgba(185,28,28,0.06)',
    color: '#b91c1c',
  },
  success: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 12,
    border: '1px solid rgba(22,163,74,0.25)',
    background: 'rgba(22,163,74,0.08)',
    color: '#15803d',
  },
  previewWrap: {
    marginTop: 8,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 24,
    objectFit: 'cover',
    border: '1px solid rgba(0,0,0,0.12)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6b7280',
    background: 'rgba(0,0,0,0.04)',
    border: '1px dashed rgba(0,0,0,0.18)',
  },
};


