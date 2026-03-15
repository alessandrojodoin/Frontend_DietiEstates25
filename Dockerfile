FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./


RUN npm ci

COPY . .


RUN npm run build -- --configuration production



FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy build output to nginx
COPY --from=build /app/dist/Frontend_DietiEstates25/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]