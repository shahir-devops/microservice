from node:20-alpine
workdir /app
copy services/profile/package.json ./
copy shared ./packages/shared
copy services/profile/ ./
run npm install
expose 3001
cmd ["npm", "start"]




