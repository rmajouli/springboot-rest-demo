package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProductRequest(
        @NotBlank(message = "Product name is required") String name,
        @NotNull(message = "Price is required") @Positive(message = "Price must be positive") Double price
) {
}
