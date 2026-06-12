/*
Smoke tests for local docker-compose.
- Waits for services to be healthy
- Calls each feature endpoint once

Usage: node scripts/smoke-test.js
*/

const http = require('http');

const SERVICES = [
  { name: 'profile', base: 'http://localhost:3001' },
  { name: 'cart', base: 'http://localhost:3002' },
  { name: 'notifications', base: 'http://localhost:3003' },
  { name: 'wishlist', base: 'http://localhost:3004' },
  { name: 'orders', base: 'http://localhost:3005' },
  { name: 'payments', base: 'http://localhost:3006' },
  { name: 'helpcenter', base: 'http://localhost:3007' },
  { name: 'address', base: 'http://localhost:3008' },
  { name: 'reviews', base: 'http://localhost:3009' },
  { name: 'auth', base: 'http://localhost:3010' }
];

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getJSON(urlPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlPath);
    const req = http.request({ hostname: url.hostname, port: url.port, path: url.pathname + url.search, method: 'GET', headers: { 'accept': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function waitHealthy(service, retries = 30) {
  for (let i = 0; i < retries; i++) {
    try {
      const r = await getJSON(`${service.base}/health`);
      if (r.status >= 200 && r.status < 300 && r.body && r.body.ok === true) return;
    } catch {
      // ignore
    }
    await wait(1000);
  }
  throw new Error(`Service not healthy: ${service.name}`);
}

async function run() {
  console.log('Waiting for services to become healthy...');
  for (const s of SERVICES) {
    process.stdout.write(`- ${s.name} `);
    await waitHealthy(s);
    console.log('OK');
  }

  const calls = [
    { name: 'profile', url: 'http://localhost:3001/api/profile?userId=1' },
    { name: 'cart', url: 'http://localhost:3002/api/cart?userId=1' },
    { name: 'notifications', url: 'http://localhost:3003/api/notifications?userId=1' },
    { name: 'wishlist', url: 'http://localhost:3004/api/wishlist?userId=1' },
    { name: 'orders', url: 'http://localhost:3005/api/orders?userId=1' },
    { name: 'payments', url: 'http://localhost:3006/api/payments?userId=1' },
    { name: 'helpcenter', url: 'http://localhost:3007/api/helpcenter' },
    { name: 'address', url: 'http://localhost:3008/api/address?userId=1' },
    { name: 'reviews', url: 'http://localhost:3009/api/reviews' },
    { name: 'auth', url: 'http://localhost:3010/api/auth/me' }
  ];

  console.log('\nCalling feature endpoints...');
  for (const c of calls) {
    const res = await getJSON(c.url);
    console.log(`- ${c.name} ${res.status}:`, typeof res.body === 'object' ? 'OK' : 'raw');
  }

  console.log('\nSmoke test done. You should now be able to open the frontend at http://localhost:5173');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

