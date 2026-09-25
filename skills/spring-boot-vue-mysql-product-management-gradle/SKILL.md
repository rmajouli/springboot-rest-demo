---
name: spring-boot-vue-mysql-product-management-gradle
description: Expert full-stack agent for building product management applications with Spring Boot, Gradle, Vue.js, MySQL, JPA/Hibernate, REST APIs, validation, exception handling, Swagger, pagination, sorting, and automated tests.
---

# Spring Boot + Vue.js + MySQL Product Management (Gradle)

This skill provides expert guidance for creating and maintaining a full-stack product management application using Spring Boot, Gradle, Vue.js, MySQL, JPA/Hibernate, and REST APIs.

The agent must generate clean, maintainable, testable, and production-oriented code while keeping the implementation understandable for developers.

## Core principles

1. Use clean layered architecture.
2. Keep controllers thin and focused on HTTP concerns.
3. Keep business rules inside the service layer.
4. Use facades to coordinate application use cases.
5. Never expose JPA entities directly through REST endpoints.
6. Use DTOs for API requests and responses.
7. Validate all incoming data.
8. Return consistent structured error responses.
9. Use pagination and sorting for product listings.
10. Document the API with OpenAPI and Swagger UI.
11. Prefer focused tests before full integration tests.
12. Keep frontend and backend responsibilities clearly separated.

## Technical environment

### Backend

- Java 17+
- Gradle 8+
- Spring Boot 3.x
- Spring Web
- Spring Data JPA
- Hibernate
- MySQL 8+
- Jakarta Bean Validation
- Springdoc OpenAPI
- JUnit 5
- Mockito
- AssertJ
- MockMvc
- Testcontainers when real MySQL integration testing is required

### Frontend

- Vue.js 3
- Vite
- Composition API
- JavaScript or TypeScript
- Fetch API or Axios
- Vue Router when multiple views are required
- Optional: Pinia for shared state management

### Infrastructure

- Docker
- Docker Compose
- Git
- GitHub

## Architecture

Use the following backend package structure:

```text
src/main/java/com/example/demo
├── config
├── controller
├── dto
│   ├── request
│   └── response
├── entity
├── exception
├── facade
├── repository
└── service
```

Use the following frontend structure:

```text
web-ui
├── src
│   ├── components
│   ├── services
│   ├── views
│   ├── router
│   ├── stores
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
└── .env
```

## Backend responsibilities

### Entity layer

Create a `Product` JPA entity with:

- `id`
- `name`
- `price`

Use:

- `@Entity`
- `@Table`
- `@Id`
- `@GeneratedValue`
- `@Column`

The entity must not be returned directly by the controller.

### DTO layer

Create separate request and response DTOs.

Example request fields:

- `name`
- `price`

Example response fields:

- `id`
- `name`
- `price`

Use Jakarta validation annotations:

- `@NotBlank`
- `@NotNull`
- `@Positive`

### Repository layer

Create a repository interface extending `JpaRepository`.

Support:

- standard CRUD operations
- pagination
- sorting
- custom queries only when required

Example:

```java
public interface ProductRepository extends JpaRepository<Product, Long> {
}
```

### Service layer

The service layer must contain business logic for:

- retrieving paginated products
- retrieving a product by ID
- creating products
- updating products
- deleting products
- enforcing product business rules

The service must throw a custom exception when a product does not exist.

### Facade layer

The facade must:

- coordinate application use cases
- convert request DTOs into entities
- convert entities into response DTOs
- hide orchestration details from controllers

### Controller layer

Expose the following REST endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | Get paginated and sorted products |
| GET | `/api/products/{id}` | Get one product |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/{id}` | Update a product |
| DELETE | `/api/products/{id}` | Delete a product |

The controller must use:

- `@RestController`
- `@RequestMapping`
- `@Valid`
- appropriate HTTP status codes
- Swagger/OpenAPI annotations

## Pagination and sorting

The product listing endpoint must support:

```text
GET /api/products?page=0&size=10&sortBy=name&direction=asc
```

Supported parameters:

- `page`: zero-based page number
- `size`: number of records per page
- `sortBy`: entity field used for sorting
- `direction`: `asc` or `desc`

Use Spring Data:

```java
Pageable pageable = PageRequest.of(page, size, sort);
```

Return pagination metadata, including:

- content
- current page
- page size
- total elements
- total pages
- first page indicator
- last page indicator

Reject or safely handle invalid values such as:

- negative page numbers
- zero or negative page sizes
- unsupported sort fields
- invalid sort directions

## Validation

Validate product requests using Jakarta Bean Validation.

Required rules:

- name must not be blank
- name must have a reasonable maximum length
- price must not be null
- price must be positive

Validation errors must return HTTP 400.

Use a structured response such as:

```json
{
  "timestamp": "2026-01-01T12:00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/products",
  "fieldErrors": {
    "name": "Product name is required",
    "price": "Price must be positive"
  }
}
```

## Exception management

Create custom exceptions, including:

```text
ProductNotFoundException
InvalidPaginationException
```

Create a `GlobalExceptionHandler` using `@RestControllerAdvice`.

Handle at least:

- product not found
- validation errors
- malformed JSON
- invalid path variables
- invalid request parameters
- invalid pagination and sorting values
- unexpected exceptions

Use consistent HTTP status codes:

| Situation | Status |
|---|---:|
| Successful read | 200 |
| Successful create | 201 |
| Successful delete | 204 |
| Invalid request | 400 |
| Product not found | 404 |
| Unexpected server error | 500 |

Never expose stack traces or sensitive database details in production responses.

## Database configuration

Configure MySQL through `application.properties` or environment variables.

Recommended properties:

```properties
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/product_db?createDatabaseIfNotExist=true&serverTimezone=UTC}
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:root}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

Do not hardcode production credentials.

Provide a `docker-compose.yml` containing:

- MySQL 8 image
- database name
- username
- password
- exposed port
- persistent volume
- health check when appropriate

## Swagger/OpenAPI

Configure Springdoc OpenAPI.

Expose:

```text
http://localhost:8080/swagger-ui.html
http://localhost:8080/v3/api-docs
```

Document:

- API title
- API description
- API version
- product endpoints
- request DTOs
- response DTOs
- error responses
- pagination parameters

Use annotations such as:

- `@Tag`
- `@Operation`
- `@ApiResponse`
- `@Parameter`
- `@Schema`

## Vue.js frontend

Create a Vue 3 application with Vite.

The frontend must provide:

- product list
- product creation form
- product update form
- product deletion action
- pagination controls
- sorting controls
- loading state
- empty state
- API error display
- form validation feedback

### Vue components

Create reusable components such as:

```text
ProductList.vue
ProductForm.vue
PaginationControls.vue
ErrorAlert.vue
LoadingIndicator.vue
```

### API service

Create a dedicated API service:

```text
web-ui/src/services/productService.js
```

The service must encapsulate:

- `getProducts`
- `getProductById`
- `createProduct`
- `updateProduct`
- `deleteProduct`

Do not place all HTTP calls directly inside Vue components.

### Frontend error handling

Parse backend error responses and display useful messages.

Handle:

- validation errors
- product-not-found errors
- network failures
- server errors
- loading failures
- failed create, update, and delete operations

Example frontend error:

```text
Unable to save the product. Please correct the highlighted fields.
```

For field validation errors, display messages next to the relevant form fields.

### Frontend configuration

Use an environment variable for the backend URL:

```properties
VITE_API_BASE_URL=http://localhost:8080/api
```

Do not hardcode production URLs in Vue components.

Configure CORS in Spring Boot for the development frontend origin:

```text
http://localhost:5173
```

## Gradle build configuration

Use Gradle instead of Maven.

Required files:

- `build.gradle`
- `settings.gradle`
- optionally `gradle.properties`

Recommended Gradle configuration:

```groovy
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.3.2'
    id 'io.spring.dependency-management' version '1.1.6'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    runtimeOnly 'com.mysql:mysql-connector-j'
    implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.6.0'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

tasks.named('test') {
    useJUnitPlatform()
}
```

Use these project commands:

```bash
./gradlew clean build
./gradlew bootRun
./gradlew test
```

## Testing strategy

Follow the test pyramid:

```text
Unit tests > Web slice tests > Repository tests > Full integration tests
```

### Service unit tests

Use:

- JUnit 5
- Mockito
- AssertJ

Test:

- successful product creation
- successful product update
- successful deletion
- product-not-found behavior
- validation of business rules
- repository failures where relevant

Avoid loading the Spring context for service unit tests.

### Controller tests

Use `@WebMvcTest`.

Test:

- successful GET requests
- successful POST requests
- validation failures
- malformed request bodies
- product-not-found responses
- correct HTTP status codes
- structured JSON error responses
- pagination and sorting query parameters

Use `MockMvcTester` when supported by the selected Spring Boot version. Otherwise use `MockMvc`.

### Repository tests

Use `@DataJpaTest`.

Test:

- saving products
- retrieving products
- pagination
- sorting
- custom repository queries

Use Testcontainers with MySQL when behavior must be verified against the real database engine.

### Full integration tests

Use `@SpringBootTest` only when testing the complete application flow.

Test:

- controller to database behavior
- MySQL persistence
- validation and exception handling
- complete CRUD flows

Keep full integration tests limited because they are slower.

## Code quality

The agent must:

- keep methods focused
- avoid duplicated mapping code
- use helper methods for repeated test setup
- avoid unnecessary abstractions
- use constructor injection
- avoid field injection
- use meaningful names
- avoid leaking internal exceptions
- avoid exposing entities in API responses
- avoid hardcoded credentials
- keep configuration environment-aware

If a class or method becomes difficult to test, recommend refactoring it into smaller focused components before adding excessive tests.

## Required files

The generated project should include, when applicable:

```text
build.gradle
settings.gradle
docker-compose.yml
README.md
src/main/java/.../config
src/main/java/.../controller
src/main/java/.../dto
src/main/java/.../entity
src/main/java/.../exception
src/main/java/.../facade
src/main/java/.../repository
src/main/java/.../service
src/main/resources/application.properties
src/test/java/.../controller
src/test/java/.../repository
src/test/java/.../service
web-ui/package.json
web-ui/vite.config.js
web-ui/index.html
web-ui/src/main.js
web-ui/src/App.vue
web-ui/src/components
web-ui/src/services
web-ui/src/views
```

## README requirements

The README must explain:

1. Project purpose
2. Technology stack
3. Architecture
4. Prerequisites
5. How to start MySQL with Docker Compose
6. How to configure environment variables
7. How to run the Spring Boot backend with Gradle
8. How to run the Vue frontend
9. Swagger URLs
10. REST endpoint examples
11. Test commands
12. Common troubleshooting steps

Example commands:

```bash
docker compose up -d
./gradlew bootRun
cd web-ui
npm install
npm run dev
./gradlew test
```

## Completion checklist

Before considering the task complete, verify:

- [ ] Spring Boot application starts successfully
- [ ] MySQL connection is configured
- [ ] Product table is created or updated
- [ ] CRUD endpoints are available
- [ ] Pagination works
- [ ] Sorting works
- [ ] Request validation works
- [ ] 404 errors are handled
- [ ] Global exception handling works
- [ ] Swagger UI is available
- [ ] Vue frontend starts successfully
- [ ] Vue frontend can list products
- [ ] Vue frontend can create products
- [ ] Vue frontend displays backend errors
- [ ] Unit tests pass
- [ ] Controller tests pass
- [ ] Repository tests pass when included
- [ ] README contains complete setup instructions
- [ ] Gradle project builds successfully

## Agent workflow

When given a product-management request:

1. Inspect the existing repository before changing files.
2. Identify the current Spring Boot, Gradle, and Vue.js versions.
3. Preserve existing working behavior.
4. Create or update the layered backend structure.
5. Add or update MySQL and JPA configuration.
6. Add DTO validation.
7. Add custom exceptions and global error handling.
8. Add pagination and sorting.
9. Add Swagger/OpenAPI documentation.
10. Create or update Vue components and API services.
11. Add unit, web-layer, repository, and integration tests as appropriate.
12. Run or recommend backend and frontend verification commands.
13. Update the README.
14. Summarize changed files, behavior, and run instructions.

## Expected response format

When completing an implementation, report:

1. Summary of the changes
2. Backend files created or modified
3. Frontend files created or modified
4. Database and Docker changes
5. Test coverage added
6. Commands to run the application
7. Swagger URL
8. Known limitations or follow-up recommendations
