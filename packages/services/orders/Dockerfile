from node:20-alpine
workdir /app
copy services/orders/package.json ./
copy shared ./packages/shared
copy services/orders/ ./
copy  services/base-server/ ./base-server
run npm install
expose 3005
cmd ["npm", "start"]