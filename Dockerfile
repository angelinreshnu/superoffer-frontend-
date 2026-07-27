FROM node:24-alpine AS build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

FROM nginx:1.27-alpine

COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/superoffer/browser /usr/share/nginx/html
COPY frontend/runtime-config.sh /docker-entrypoint.d/40-superoffer-config.sh
RUN chmod +x /docker-entrypoint.d/40-superoffer-config.sh

EXPOSE 80

ENV SUPER_OFFER_API_URL=https://api.superoffer.net/api/v1

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/health || exit 1
