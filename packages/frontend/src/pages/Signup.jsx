import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiSignup } from '../api/client';


export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('new@example.com');
  const [password, setPassword] = useState('dev');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = useMemo(() => email.trim().length > 0 && password.trim().length > 0, [email, password]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit || loading) return;

    setLoading(true);
    setError('');
    try {
      const { token } = await apiSignup({ email, password });
      localStorage.setItem('auth_token', token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }


  return (
    <section style={{ maxWidth: 420, margin: '40px auto', padding: 16, border: '1px solid #eee', borderRadius: 10 }}>
      <h2>Sign up</h2>
      <p style={{ color: '#666' }}>Scaffold signup uses Postgres `users` table.</p>

      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          Password
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </label>

        {error && <div style={{ color: 'crimson' }}>{error}</div>}

        <button disabled={!canSubmit || loading} type="submit" style={{ padding: '10px 12px' }}>
          {loading ? 'Creating...' : 'Create account'}
        </button>
      </form>
    </section>
  );
}

