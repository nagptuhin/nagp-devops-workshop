# nagp-devops-workshop
Multi-tier Web application deployed in K8s

# Node.js + PostgreSQL Microservice on Kubernetes

## 🔗 Project Links

- **GitHub Repository**: https://github.com/nagptuhin/nagp-devops-workshop
- **Docker Hub Image**: https://hub.docker.com/r/nagptuhin/node-api
- **Live API Endpoint**: http://node.localtest.me/data  # Needs to be Replaced

## 📽️ Demo Video

TODO

## 🧩 Project Structure

- `index.js` – Node.js Express API
- `Dockerfile` – Image for the API
- `k8s/` – Kubernetes YAMLs for API, DB, Configs, Secrets, Ingress, Volumes

## 📌 Endpoints

- `GET /data` – Fetch all data
- `GET /data?name=alice` – Search by name
- `POST /data` – Add new record (JSON body)

```json
{
  "name": "Zara",
  "age": 29,
  "gender": "Female",
  "contact_info": "zara@example.com"
}
```

## ✅ Requirement Understanding

- Create a multi-tier system on Kubernetes with:
  - One microservice (API) to expose data from a database.
  - One PostgreSQL database to store data.
- Use Kubernetes features like:
  - ConfigMap for configuration
  - Secrets for sensitive data
  - Persistent volume for DB
  - Ingress for external access
- Handle pod restarts with data persistence.

## ✅ Assumptions

- The user will access the API using `node.localtest.me` locally via Rancher Desktop.
- A single-node Kubernetes cluster is sufficient for demo purposes.
- PostgreSQL is used with default credentials and port.
- Sample data is loaded into the database on first startup using Configmap

## ✅ Solution Overview

- **Node.js API**: Connects to PostgreSQL using credentials from ConfigMap and Secret.
- **PostgreSQL DB**: Initialized with 5+ records via `init.sql`.
- **Dockerized**: Both app and database run as containers.
- **Kubernetes**:
  - API and DB are deployed using `Deployment` + `Service`.
  - `Ingress` exposes the API externally.
  - `PersistentVolumeClaim` ensures DB data is preserved.

## ✅ Justification for Resources Utilized

| Resource            | Reason                                                                 |
|---------------------|------------------------------------------------------------------------|
| Node.js + Express   | Lightweight, fast to develop, easy to deploy                          |
| PostgreSQL          | Reliable relational DB with easy init and setup                       |
| ConfigMap           | Clean separation of DB host, name, and user settings                  |
| Secret              | Secure handling of DB password                                         |
| PVC                 | Ensures DB retains data across pod restarts                           |
| Ingress             | Provides friendly external API access without exposing NodePorts      |
