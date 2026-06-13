from node:20-alpine
workdir /app
run pwd
run ls -l
copy /shared ./packages/shared
copy /services/profile/ ./
run npm install
expose 3001
cmd ["npm", "start" ]