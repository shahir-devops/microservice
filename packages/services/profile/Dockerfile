from node:20-alpine
workdir /app
copy ./services/profile/ ./
copy ./shared ./packages/shared
run npm install
expose 3001
cmd ["npm", "start" ]