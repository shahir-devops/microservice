from node:20-alpine
workdir /app
copy services/wishlist/package.json ./
copy shared ./packages/shared
copy services/wishlist/ ./
run npm install
expose 3004
cmd ["npm", "start"]