-- Baseline schema for all microservices (scaffold)
-- Uses a single Postgres database and simple tables per feature.
-- Extend these tables as you implement real logic.

-- profile
CREATE TABLE IF NOT EXISTS profiles (
  user_id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  email TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- cart
CREATE TABLE IF NOT EXISTS carts (
  user_id TEXT PRIMARY KEY,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cart_items (
  user_id TEXT NOT NULL,
  sku TEXT NOT NULL,
  qty INT NOT NULL CHECK (qty >= 0),
  PRIMARY KEY (user_id, sku)
);

-- notifications
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- wishlist
CREATE TABLE IF NOT EXISTS wishlist_items (
  user_id TEXT NOT NULL,
  sku TEXT NOT NULL,
  name TEXT,
  PRIMARY KEY (user_id, sku)
);

-- orders
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- payments
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- helpcenter
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  q TEXT NOT NULL,
  a TEXT NOT NULL
);

-- address
CREATE TABLE IF NOT EXISTS addresses (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  line1 TEXT NOT NULL,
  line2 TEXT,
  city TEXT,
  state TEXT,
  country TEXT,
  postal_code TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- reviews
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- auth (minimal)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  password_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

