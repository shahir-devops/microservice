from node:20-alpine
workdir /app
copy package.json ./
copy ../../shared ./packages/shared
copy ./ ./
run npm install
expose 3007
cmd ["npm", "start"]
