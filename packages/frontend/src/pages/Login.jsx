import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLogin } from '../api/client';
import './auth/AuthCard.css';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('dev@example.com');
  const [password, setPassword] = useState('dev');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = useMemo(
    () => email.trim().length > 0 && password.trim().length > 0,
    [email, password]
  );

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit || loading) return;

    setLoading(true);
    setError('');
    try {
      const { token } = await apiLogin({ email, password });
      localStorage.setItem('auth_token', token);
      navigate('/');
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card border-0 auth-card mt-5">
              <div className="card-body p-4">
                <div className="d-flex align-items-start justify-content-between gap-3">
                  <div>
                    <h3 className="mb-1">Login</h3>
                    <p className="text-muted mb-3">
                      Dev test: <b>dev@example.com</b> / <b>dev</b>
                    </p>
                  </div>
                  <div className="text-end">
                    <div className="badge text-bg-light border">MySQL Auth</div>
                  </div>
                </div>

                <div className="mb-3">
                  <a className="auth-link text-decoration-none" href="/signup">
                    New here? Create an account
                  </a>
                </div>

                {error && (
                  <div className="alert alert-danger py-2" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      autoComplete="current-password"
                      required
                    />
                  </div>

                  <button
                    disabled={!canSubmit || loading}
                    type="submit"
                    className="btn btn-primary w-100 py-2"
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>

                  <div className="text-center mt-3">
                    <span className="text-muted">By continuing you agree to the Terms.</span>
                  </div>
                </form>
              </div>
            </div>

            <div className="text-center text-muted small mt-3 mb-5">
              Only authenticated users can access services.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


