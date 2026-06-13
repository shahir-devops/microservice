from node:20-alpine
workdir /app
copy /shared ./packages/shared
copy /services/profile/ ./
run npm install
expose 3009
cmd ["npm","start"]
