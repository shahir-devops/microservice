-- Seed baseline records for dev

-- Keep dev user id consistent with auth/signup deterministic scheme (email -> base64)
-- user_id = 'u:' + base64('dev@example.com')
INSERT INTO profiles (user_id, display_name, email)
VALUES ('u:ZGV2QGV4YW1wbGUuY29t', 'Dev User', 'dev@example.com')
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO carts (user_id)
VALUES ('1')
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO cart_items (user_id, sku, qty)
VALUES ('1', 'SKU-1', 2)
ON CONFLICT (user_id, sku) DO UPDATE SET qty = EXCLUDED.qty;

INSERT INTO notifications (id, user_id, message)
VALUES ('n1', '1', 'Welcome!')
ON CONFLICT (id) DO NOTHING;

INSERT INTO wishlist_items (user_id, sku, name)
VALUES ('1', 'SKU-99', 'Sample item')
ON CONFLICT (user_id, sku) DO UPDATE SET name = EXCLUDED.name;

INSERT INTO orders (id, user_id, status)
VALUES ('ord1', '1', 'PAID')
ON CONFLICT (id) DO NOTHING;

INSERT INTO payments (id, user_id, status)
VALUES ('pay1', '1', 'SUCCESS')
ON CONFLICT (id) DO NOTHING;

INSERT INTO faqs (id, q, a)
VALUES ('f1', 'How to order?', 'Go to cart and checkout.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO addresses (id, user_id, line1)
VALUES ('a1', '1', '123 Main St')
ON CONFLICT (id) DO NOTHING;

INSERT INTO reviews (id, user_id, rating, text)
VALUES ('r1', '1', 5, 'Great!')
ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, email, password_hash)
VALUES ('u:ZGV2QGV4YW1wbGUuY29t', 'dev@example.com', 'dev')
ON CONFLICT (id) DO NOTHING;



