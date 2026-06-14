from node:20-alpine
workdir /app
copy  services/address/package.json ./
copy  shared ./packages/shared
copy  services/address/ ./
copy  services/base-server/ ./base-server
RUN cd base-server && npm install
run npm install
expose 3008
CMD ["npm","start"]
