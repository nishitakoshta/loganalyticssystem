# Real-Time Log Analytics System (Custom ELK Alternative) 🚀

## Overview  
The **Real-Time Log Analytics System** is a custom-built alternative to the ELK (Elasticsearch, Logstash, Kibana) stack, designed to **ingest, process, and analyze logs in real-time**.  

It allows users to **upload log files**, **search logs**, and **visualize data on a dashboard**. This system is useful for monitoring application health, detecting issues, and performing log-based analytics.  

## Tech Stack  
- **Backend:** Spring Boot, Kafka, OpenSearch, MySQL  
- **Frontend:** React.js
- **Message Queue:** Apache Kafka (for real-time log processing)  
- **Storage:** OpenSearch (for full-text search & analytics), MySQL (for structured data)  

## Features  
✅ **Microservices-based architecture**  
✅ **Real-time log aggregation using Kafka**  
✅ **Upload & process `.log` files**  
✅ **Store logs in OpenSearch for full-text search**  
✅ **REST API to fetch logs using filters (timestamp, log level, service name, etc.)**  
✅ **Search logs dynamically**  
✅ **Interactive dashboard to visualize logs**  

## Why It’s Impressive  
📌 Showcases **real-time log processing** with OpenSearch & Kafka  
📌 Implements **distributed event streaming** using Kafka  
📌 Scales for **large-scale enterprise applications**  

---

## System Architecture 🏗  
```sql
                     +---------------------------+
                     |       React Frontend      |
                     | (Log Dashboard & Search)  |
                     +---------------------------+
                                  |
                                  ▼
                     +---------------------------+
                     |  Spring Boot API Gateway   |
                     | (Handles API Requests)     |
                     +---------------------------+
                                  |
                                  ▼
          -------------------------------------------------
          |                                               |
          ▼                                               ▼
+---------------------------+                 +--------------------------------+
| Log Ingestion Microservice|                 | Log Search Microservice        |
| (Receives & Processes Logs|                 | (Fetches logs from OpenSearch) |
+---------------------------+                 +--------------------------------+
          |                                               |
          ▼                                               ▼
+---------------------------+                 +---------------------------+
| Apache Kafka (Log Stream) |  --> Stream --> | OpenSearch (Log Indexing) |
+---------------------------+                 +---------------------------+
                                  |
                                  ▼
                        +------------------+
                        | MySQL (Metadata) |
                        | (Stores Log Info)|
                        +------------------+
```

## Installation & Setup  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/nishitakoshta/loganalyticssystem.git
cd loganalyticssystem
```

### 2️⃣  Backend Setup (Spring Boot)
#### Install dependencies
```sh
mvn clean install
```
#### Start the Backend Application
```sh
mvn spring-boot:run
```
This will start the backend server on http://localhost:8080.
### 3️⃣ Frontend Setup (React.js)
```sh
cd frontend
npm install
```
#### Start the React Application
```sh
npm start
```
This will start the frontend on http://localhost:3000.
### 4️⃣ Start Kafka & OpenSearch
```sh
docker-compose up -d
```
### 5️⃣ Start OpenSearch
```sh
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e "xpack.security.enabled=false" -e "xpack.security.transport.ssl.enabled=false" -e "xpack.security.http.ssl.enabled=false" -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" docker.elastic.co/elasticsearch/elasticsearch:8.6.0
```
### ⚡ How It Works
#### Frontend (React.js)
1. Users can upload log files, view logs, and search logs via the web dashboard.
2. Sends API requests to the backend.
#### Spring Boot API Gateway
1. Routes requests to the appropriate microservices.
2. Handles CORS.
#### Log Ingestion Microservice
1. Accepts logs from users or applications.
2. Pushes logs to Kafka for real-time processing.
#### Apache Kafka (Log Stream)

1. Stores log messages temporarily.
2. Streams logs to OpenSearch for fast indexing and search.
#### OpenSearch (Log Storage & Search)

1. Stores logs with full-text search capabilities.
2. Optimized for real-time queries.
#### Log Search Microservice

1. Provides REST API to query logs based on filters (keyword, log level, service name, etc.).
2. Queries OpenSearch.
#### MySQL (Metadata Storage)

1. Stores log metadata (e.g., file upload info, log sources).
2. Ensures data consistency.
