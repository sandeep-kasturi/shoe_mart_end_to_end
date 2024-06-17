package com.mart.product.feignClient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

import com.mart.product.model.Product;

@FeignClient(name="ShoeMartAdmin")
public interface AdmPrdFeign {
	
	@GetMapping("/adm/product/{id}")
	public Product getById(@PathVariable Long id ) throws Exception;
	
	@GetMapping("/adm/product/getAll")
	public ResponseEntity<Object> getAll();
}
