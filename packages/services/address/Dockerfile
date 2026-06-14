from node:20-alpine
workdir /app
copy  services/address/package.json ./
copy  shared ./packages/shared
copy  services/address/ ./
copy  services/base-server/ ./base-server
run npm install
expose 3008
CMD ["npm","start"]
