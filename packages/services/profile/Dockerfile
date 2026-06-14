from node:20-alpine
workdir /app
copy services/profile/package.json ./
copy shared ./packages/shared
copy services/profile/ ./
copy  services/base-server/ ./base-server
RUN cd base-server && npm install
run npm install
expose 3001
cmd ["npm", "start"]




