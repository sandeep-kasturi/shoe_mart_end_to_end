package com.mart.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mart.product.model.Product;
import com.mart.product.service.ProductService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/prd")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@GetMapping("/product/getAll")
	public ResponseEntity<Object> getAll(){
		try {
			return new ResponseEntity<Object>(productService.getAll(), HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST) ;
		}
		
	}
	
	@GetMapping("/product/{id}")
	public ResponseEntity<Product> getById(@PathVariable Long id) throws Exception{
		try {
			return new ResponseEntity<Product>(productService.getById(id), HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.ACCEPTED);
		}
		
	}
}

