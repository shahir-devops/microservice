from node:20-alpine
workdir /app
copy services/reviews/package.json ./
copy shared ./packages/shared
copy services/reviews/ ./
copy  services/base-server/ ./base-server
RUN cd base-server && npm install
run npm install
expose 3009
cmd ["npm","start"]
