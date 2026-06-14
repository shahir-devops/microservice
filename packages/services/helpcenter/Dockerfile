from node:20-alpine
workdir /app
copy services/helpcenter/package.json ./
copy shared ./packages/shared
copy services/helpcenter/ ./
copy  services/base-server/ ./base-server
run npm install
expose 3007
cmd ["npm", "start"]
