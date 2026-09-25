package com.example.demo.service;

import com.example.demo.entity.Product;
import com.example.demo.exception.ProductNotFoundException;
import com.example.demo.repository.ProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    @Test
    void shouldThrowProductNotFoundException_WhenProductDoesNotExist() {
        when(productRepository.findById(10L)).thenReturn(Optional.empty());

        Product product = new Product("Laptop", 1500.0);

        assertThrows(ProductNotFoundException.class, () -> productService.updateProduct(10L, product));
    }

    @Test
    void shouldThrowProductNotFoundException_WhenDeletingMissingProduct() {
        when(productRepository.existsById(20L)).thenReturn(false);

        assertThrows(ProductNotFoundException.class, () -> productService.deleteProduct(20L));
    }
}
