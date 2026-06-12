from node:20-alpine AS build
WORKDIR /app
copy package.json ./
run npm install
copy . . 
run npm run build

from nginx:alpine
copy --from=build /app/dist /usr/share/nginx/html
expose 80