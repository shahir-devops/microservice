from node:20-alpine
workdir /app
copy services/auth/package.json ./
copy shared ./packages/shared
copy services/auth/ ./
copy  services/base-server/ ./base-server
RUN cd base-server && npm install
run npm install
expose 3010
CMD ["npm","start"]