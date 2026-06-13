from node:20-alpine
WORKDIR /app
copy /shared ./packages/shared
copy /services/profile/ ./
RUN npm install
EXPOSE 3002
cmd ["npm", "start"]
