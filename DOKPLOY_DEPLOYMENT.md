# SuperOffer: three separate Dokploy services

This repository is a monorepo containing three independently deployed services.

## 1. Database

- Dokploy type: Docker Compose
- Compose file: `/Database/docker-compose.yml`
- Environment:
  - `MONGO_INITDB_DATABASE=superoffer`
  - `MONGO_INITDB_ROOT_USERNAME=superoffer`
  - `MONGO_INITDB_ROOT_PASSWORD=<strong password>`
- Internal port: `27017`
- Generate an internal service hostname; do not expose MongoDB publicly.

## 2. Backend

- Dokploy type: Application
- Build type: Dockerfile
- Build path/context: `/backend`
- Dockerfile: `/backend/Dockerfile`
- Internal port: `3000`
- Health check: `/health`
- Environment:
  - `MONGODB_URI=mongodb://superoffer:<encoded password>@<mongodb service hostname>:27017/superoffer?authSource=admin`
  - `MONGODB_DATABASE=superoffer`
  - `CORS_ORIGIN=https://<frontend domain>`
- Generate or attach a public backend domain.

## 3. Frontend

- Dokploy type: Application
- Build type: Dockerfile
- Build path/context: `/frontend`
- Dockerfile: `/frontend/Dockerfile`
- Internal port: `3000` recommended (`80` is also supported)
- Health check: `/health`
- Environment:
  - `SUPER_OFFER_API_URL=https://<backend domain>/api/v1`
- Generate or attach a public frontend domain.

## API log demonstration

Open the backend Logs tab in Dokploy, then generate requests:

```bash
curl https://<backend-domain>/health
curl -X POST https://<backend-domain>/api/v1/university/search \
  -H "content-type: application/json" \
  -d '{"sort":"MATCH_SCORE","page":1,"page_size":5}'
```

The backend emits JSON lines containing `server_started`, `api_request`, `api_error`, and `admission_offer_sent`. This makes the live request path, status code, duration, and request ID visible in Dokploy.
