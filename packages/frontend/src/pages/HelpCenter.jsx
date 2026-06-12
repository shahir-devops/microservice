import React, { useEffect, useState } from 'react';
import { fetchHelpCenter } from '../api/client';

export default function HelpCenter() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchHelpCenter().then(setData).catch((e) => setErr(e.message));
  }, []);

  return (
    <section style={{ padding: 12 }}>
      <h2>Help Center</h2>
      {err && <pre style={{ color: 'crimson' }}>{err}</pre>}
      {!data ? <div>Loading...</div> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </section>
  );
}

