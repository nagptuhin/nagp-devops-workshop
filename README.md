# nagp-devops-workshop
Multi-tier Web application deployed in K8s

# Node.js + PostgreSQL Microservice on Kubernetes

## 🔗 Project Links

- **GitHub Repository**: https://github.com/nagptuhin/nagp-devops-workshop
- **Docker Hub Image**: https://hub.docker.com/r/nagptuhin/node-api



## 🧩 Project Structure

- `index.js` – Node.js Express API
- `Dockerfile` – Image for the API
- `k8s/` – Kubernetes YAMLs for API, DB, Configs, Secrets, Ingress, Volumes

## 📌 Endpoints

- `GET /v1/data` – Fetch all data
```
curl "http://34.160.214.176.nip.io/v1/data"
```
- `GET /v1/data/byName?name=tuhin` – Search by name
```
curl "http://34.160.214.176.nip.io/v1/data/byName\?name\=tuhin"
```
- `POST /v1/data` – Add new record (JSON body)

```json
{
  "name": "Zara",
  "age": 29,
  "gender": "Female",
  "contact_info": "zara@example.com"
}
```
```
ccurl -X POST http://34.160.214.176.nip.io/v1/data \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Anmol",
    "age": 28,
    "gender": "Male",
    "contact_info": "anmol@example.com"
  }'
```


