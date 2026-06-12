import React, { useState } from 'react';

export default function EditProfile() {
  const [form, setForm] = useState({ displayName: 'Dev User' });
  return (
    <section style={{ padding: 12 }}>
      <h2>Edit Profile</h2>
      <label>
        Display Name
        <input
          value={form.displayName}
          onChange={(e) => setForm((s) => ({ ...s, displayName: e.target.value }))}
          style={{ marginLeft: 10 }}
        />
      </label>
      <p style={{ color: '#666' }}>Wired API pending; this page is scaffolded for end-to-end flow.</p>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </section>
  );
}

