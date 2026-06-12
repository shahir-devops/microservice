# DB Init (Postgres / RDS scaffold)

This project mounts SQL init scripts into Postgres at:
- `./db/init:/docker-entrypoint-initdb.d`

Files:
- `db/init/001_init.sql`: baseline tables for all features (profile/cart/notifications/wishlist/orders/payments/helpcenter/address/reviews/auth)
- `db/init/002_seed.sql`: dev seed rows for user `1`

Extend these tables/migrations when you implement real logic in each microservice.

