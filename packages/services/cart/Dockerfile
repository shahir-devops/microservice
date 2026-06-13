from node:20-alpine
WORKDIR /app
copy  services/cart/package.json ./
copy shared ./packages/shared
copy services/cart/ ./
RUN npm install
EXPOSE 3002
cmd ["npm", "start"]
