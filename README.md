# Spring Boot REST API Demo

This project is a simple Spring Boot application that exposes a REST API for products.

## Features
- GET all products
- GET one product by ID
- POST create a product
- PUT update a product
- DELETE remove a product

## Run locally

```bash
mvn spring-boot:run
```

## Base URL

```text
http://localhost:8080/api
```

## Example endpoints

```bash
curl http://localhost:8080/api/products
curl http://localhost:8080/api/products/1
curl -X POST http://localhost:8080/api/products -H "Content-Type: application/json" -d '{"name":"Monitor","price":300}'
curl -X PUT http://localhost:8080/api/products/1 -H "Content-Type: application/json" -d '{"name":"Gaming Laptop","price":1500}'
curl -X DELETE http://localhost:8080/api/products/1
```
