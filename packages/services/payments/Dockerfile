from node:20-alpine
workdir /app
copy services/payments/package.json ./
copy shared ./packages/shared
copy services/payments/ ./
expose 3006
run npm install
cmd ["npm", "start"]
