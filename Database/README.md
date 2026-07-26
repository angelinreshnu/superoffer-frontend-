# SuperOffer MongoDB Database

Independent MongoDB deployment for Dokploy.

## Dokploy configuration

- Service type: Docker Compose
- Compose path: `/database/docker-compose.yml`
- Required environment variable: `MONGO_INITDB_ROOT_PASSWORD`
- Internal port: `27017`
- Persistent named volume: `superoffer-mongodb-data`

Collection validators, indexes, and demonstration records are initialized on the first start of a new database volume. MongoDB logs are available separately in this service's Dokploy Logs tab.

The backend receives its connection string separately:

```text
MONGODB_URI=mongodb://superoffer:<password>@<database-service-host>:27017/superoffer?authSource=admin
```
