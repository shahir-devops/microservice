import React, { useEffect, useState } from 'react';
import { fetchProfile } from '../api/client';

export default function Profile() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchProfile().then(setData).catch((e) => setErr(e.message));
  }, []);

  return (
    <section style={{ padding: 12 }}>
      <h2>Profile</h2>
      {err && <pre style={{ color: 'crimson' }}>{err}</pre>}
      {!data ? <div>Loading...</div> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </section>
  );
}

