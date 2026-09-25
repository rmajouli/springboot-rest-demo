package com.example.demo.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI demoOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Demo API")
                        .description("Spring Boot REST API demo with MySQL, JPA, and Swagger")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Developer")
                                .email("developer@example.com")));
    }
}
