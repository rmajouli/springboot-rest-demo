package com.example.demo.facade;

import com.example.demo.dto.ProductRequest;
import com.example.demo.dto.ProductResponse;
import com.example.demo.entity.Product;
import com.example.demo.exception.ProductNotFoundException;
import com.example.demo.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductFacade {

    private final ProductService productService;

    public ProductFacade(ProductService productService) {
        this.productService = productService;
    }

    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return productService.getAllProducts(pageable)
                .map(this::toResponse);
    }

    public List<ProductResponse> getAllProducts() {
        return productService.getAllProducts().stream()
                .map(this::toResponse)
                .toList();
    }

    public ProductResponse getProductById(Long id) {
        Product product = productService.getProductById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        return toResponse(product);
    }

    public ProductResponse createProduct(ProductRequest request) {
        Product product = new Product();
        product.setName(request.name());
        product.setPrice(request.price());

        Product savedProduct = productService.createProduct(product);
        return toResponse(savedProduct);
    }

    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = new Product();
        product.setName(request.name());
        product.setPrice(request.price());

        Product updatedProduct = productService.updateProduct(id, product);
        return toResponse(updatedProduct);
    }

    public boolean deleteProduct(Long id) {
        productService.deleteProduct(id);
        return true;
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(product.getId(), product.getName(), product.getPrice());
    }
}
