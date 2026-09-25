# Demo API - Spring Boot + MySQL + JPA + Swagger + Vue.js UI

This project contains a Spring Boot REST API with MySQL, JPA/Hibernate, a repository/service/facade architecture, Swagger/OpenAPI documentation, and a Vue.js frontend.

## Project structure

- `src/main/java/com/example/demo` - backend application
- `src/main/resources/application.properties` - MySQL and Swagger configuration
- `web-ui/` - Vue.js frontend application
- `docker-compose.yml` - MySQL database container

## Backend requirements

- Java 17+
- Maven 3.9+
- Docker (to run MySQL)

## Start MySQL with Docker

```bash
docker-compose up -d
```

## Run backend

```bash
mvn spring-boot:run
```

The API will be available at:
- http://localhost:8080/api/products
- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs

## Example API calls

```bash
curl http://localhost:8080/api/products
curl http://localhost:8080/api/products/1
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Monitor","price":300}'
```

## Run frontend

```bash
cd web-ui
npm install
npm run dev
```

The frontend runs by default on:
- http://localhost:5173

## Architecture used

- Controller layer
- Facade layer
- Service layer
- Repository layer
- JPA Entity layer
- DTO layer

## Technologies

- Spring Boot 3
- Spring Data JPA
- Hibernate
- MySQL
- OpenAPI/Swagger
- Vue.js + Vite
