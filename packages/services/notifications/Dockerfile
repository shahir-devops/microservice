from node:20-alpine
workdir /app
copy services/notifications/package.json ./
copy shared ./packages/shared
copy services/notifications/ ./
copy  services/base-server/ ./base-server
run npm install
expose 3003
cmd ["npm", "start"]
