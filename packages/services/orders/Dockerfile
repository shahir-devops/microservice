from node:20-alpine
workdir /app
copy services/order/package.json ./
copy shared ./packages/shared
copy services/order/ ./
run npm install
expose 3005
cmd ["npm", "start"]