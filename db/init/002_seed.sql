-- Seed baseline records for dev (MySQL version)

-- Keep dev user id consistent with auth/signup deterministic scheme (email -> base64)

INSERT INTO profiles (user_id, display_name, email)
VALUES ('u:ZGV2QGV4YW1wbGUuY29t', 'Dev User', 'dev@example.com')
ON DUPLICATE KEY UPDATE user_id = user_id;

INSERT INTO carts (user_id)
VALUES ('1')
ON DUPLICATE KEY UPDATE user_id = user_id;

INSERT INTO cart_items (user_id, sku, qty)
VALUES ('1', 'SKU-1', 2)
ON DUPLICATE KEY UPDATE qty = VALUES(qty);

INSERT INTO notifications (id, user_id, message)
VALUES ('n1', '1', 'Welcome!')
ON DUPLICATE KEY UPDATE id = id;

INSERT INTO wishlist_items (user_id, sku, name)
VALUES ('1', 'SKU-99', 'Sample item')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO orders (id, user_id, status)
VALUES ('ord1', '1', 'PAID')
ON DUPLICATE KEY UPDATE id = id;

INSERT INTO payments (id, user_id, status)
VALUES ('pay1', '1', 'SUCCESS')
ON DUPLICATE KEY UPDATE id = id;

INSERT INTO faqs (id, q, a)
VALUES ('f1', 'How to order?', 'Go to cart and checkout.')
ON DUPLICATE KEY UPDATE id = id;

INSERT INTO addresses (id, user_id, line1)
VALUES ('a1', '1', '123 Main St')
ON DUPLICATE KEY UPDATE id = id;

INSERT INTO reviews (id, user_id, rating, text)
VALUES ('r1', '1', 5, 'Great!')
ON DUPLICATE KEY UPDATE id = id;

INSERT INTO users (id, email, password_hash)
VALUES ('u:ZGV2QGV4YW1wbGUuY29t', 'dev@example.com', 'dev')
ON DUPLICATE KEY UPDATE id = id;

