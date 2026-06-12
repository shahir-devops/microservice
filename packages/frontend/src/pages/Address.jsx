import React, { useEffect, useState } from 'react';
import { fetchAddress } from '../api/client';

export default function Address() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchAddress().then(setData).catch((e) => setErr(e.message));
  }, []);

  return (
    <section style={{ padding: 12 }}>
      <h2>Address</h2>
      {err && <pre style={{ color: 'crimson' }}>{err}</pre>}
      {!data ? <div>Loading...</div> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </section>
  );
}

