- [ ] Update packages/shared/src/db.js to use MySQL (mysql2/promise) instead of pg
- [ ] Update packages/shared/package.json to add mysql2 dependency
- [ ] Update docker-compose.yml: switch postgres service -> mysql:8 and change DATABASE_URLs
- [ ] Convert db/init/001_init.sql to MySQL syntax
- [ ] Convert db/init/002_seed.sql to MySQL syntax
- [ ] Update Kubernetes secret/manifests for MySQL connection (DATABASE_URL, secrets)
- [ ] Run docker compose up --build and verify schema + service connectivity

