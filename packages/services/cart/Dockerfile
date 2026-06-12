from node:20-alpine
WORKDIR /app
COPY package.json ./
COPY ../../shared ./packages/shared
COPY ./ ./
RUN npm install
EXPOSE 3002
cmd ["npm", "start"]
