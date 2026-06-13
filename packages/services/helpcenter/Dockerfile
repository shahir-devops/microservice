from node:20-alpine
workdir /app
copy /shared ./packages/shared
copy /services/profile/ ./
run npm install
expose 3007
cmd ["npm", "start"]
