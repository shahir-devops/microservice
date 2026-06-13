-- Baseline schema for all microservices (scaffold)
-- MySQL version of the original Postgres scaffold.

-- profile
CREATE TABLE IF NOT EXISTS profiles (
  user_id VARCHAR(255) PRIMARY KEY,
  display_name TEXT NOT NULL,
  email VARCHAR(255),
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- cart
CREATE TABLE IF NOT EXISTS carts (
  user_id VARCHAR(255) PRIMARY KEY,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart_items (
  user_id VARCHAR(255) NOT NULL,
  sku VARCHAR(255) NOT NULL,
  qty INT NOT NULL,
  PRIMARY KEY (user_id, sku),
  CONSTRAINT cart_items_qty_ck CHECK (qty >= 0)
);

-- notifications
CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- wishlist
CREATE TABLE IF NOT EXISTS wishlist_items (
  user_id VARCHAR(255) NOT NULL,
  sku VARCHAR(255) NOT NULL,
  name TEXT,
  PRIMARY KEY (user_id, sku)
);

-- orders
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- payments
CREATE TABLE IF NOT EXISTS payments (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- helpcenter
CREATE TABLE IF NOT EXISTS faqs (
  id VARCHAR(255) PRIMARY KEY,
  q TEXT NOT NULL,
  a TEXT NOT NULL
);

-- address
CREATE TABLE IF NOT EXISTS addresses (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  line1 TEXT NOT NULL,
  line2 TEXT,
  city VARCHAR(255),
  state VARCHAR(255),
  country VARCHAR(255),
  postal_code VARCHAR(50),
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- reviews
CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  rating INT NOT NULL,
  text TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT reviews_rating_ck CHECK (rating >= 1 AND rating <= 5)
);

-- auth (minimal)
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_hash TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

