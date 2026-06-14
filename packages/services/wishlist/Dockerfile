from node:20-alpine
workdir /app
copy services/wishlist/package.json ./
copy shared ./packages/shared
copy services/wishlist/ ./
copy  services/base-server/ ./base-server
run npm install
expose 3004
cmd ["npm", "start"]