import React, { useEffect, useState } from 'react';
import { fetchPayments } from '../api/client';

export default function Payments() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    fetchPayments().then(setData).catch((e) => setErr(e.message));
  }, []);

  const totalFromQuery = Number(new URLSearchParams(window.location.search).get('total') || 0);

  return (
    <section style={{ padding: 16 }}>
      <div className="container" style={{ maxWidth: 960 }}>
        <div className="row g-3 align-items-stretch">
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h2 className="mb-2">Payment</h2>
                <div className="text-muted fw-bold" style={{ fontSize: 13 }}>
                  This is a UI preview. Wire your payment gateway on the backend.
                </div>

                <div className="alert alert-info mt-3 mb-3">
                  Total amount: <span className="fw-bold">{totalFromQuery.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</span>
                </div>

                <div className="row g-2">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Cardholder Name</label>
                    <input className="form-control" placeholder="John Doe" />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Card Number</label>
                    <input className="form-control" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">Expiry</label>
                    <input className="form-control" placeholder="MM/YY" />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">CVV</label>
                    <input className="form-control" placeholder="123" />
                  </div>
                  <div className="col-12 col-md-4">
                    <label className="form-label">Email</label>
                    <input className="form-control" placeholder="john@gmail.com" />
                  </div>
                </div>

                <div className="mt-4">
                  <button className="btn btn-primary w-100" type="button" onClick={() => alert('Payment flow not wired yet')}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Recent Payments</h5>
                {err ? <div className="alert alert-danger mb-0">{err}</div> : null}
                {!data ? <div>Loading...</div> : <div className="text-muted" style={{ fontSize: 13 }}>
                  Payments loading is currently placeholder UI.
                </div>}

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

