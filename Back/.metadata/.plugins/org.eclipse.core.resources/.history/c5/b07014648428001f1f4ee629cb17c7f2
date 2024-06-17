package com.mart.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mart.admin.entity.Product;
import com.mart.admin.service.ProductService;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/adm")
@Slf4j
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	@PostMapping("/product/add")
	public ResponseEntity<Object> add(@RequestBody Product product){
		try {
			productService.add(product);
			return new ResponseEntity<Object>("Successfully Product Added", HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST) ;
		}
		
	}
	
	@PostMapping("/product/addAll")
	public ResponseEntity<Object> addAll(@RequestBody Product[] product){
		try {
			for(Product prod : product) {
				productService.add(prod);
			}
			return new ResponseEntity<Object>("Successfully all products added at once", HttpStatus.ACCEPTED);
			
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST) ; 
		}
		
	}
	
	@GetMapping("/product/getAll")
	public ResponseEntity<Object> getAll(){
		log.info("in admin controller getAll()");
		try {
			return new ResponseEntity<Object>(productService.getAll(), HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST) ;
		}
		
	}
	
	@GetMapping("/product/{id}")
	public ResponseEntity<Object> getById(@PathVariable Long id){
		try {
			return new ResponseEntity<Object>(productService.getById(id), HttpStatus.ACCEPTED);
//			return productService.getById(id);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
		
	}
	
	@DeleteMapping("/product/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable Long id){
		try {
			return new ResponseEntity<Object>(productService.deleteById(id), HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST) ;
		}
		
	}
	
	@PutMapping("/product/{id}")
	public ResponseEntity<Object> updateById(@PathVariable Long id, @RequestBody Product product){
		try {
			return new ResponseEntity<Object>(productService.updateById(id, product), HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST) ;
		}
		
	}
}
