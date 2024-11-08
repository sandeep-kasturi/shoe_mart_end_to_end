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
import com.mart.admin.exception.InValidException;
import com.mart.admin.service.ProductService;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/adm")
@Slf4j
public class ProductController {
	
	@Autowired
	private ProductService productService;
	
	
	@PostMapping("/product/add")
	public ResponseEntity<Object> add(@RequestBody Product product) throws InValidException{
			productService.add(product);
			return new ResponseEntity<Object>("Successfully Product Added", HttpStatus.OK);
		
	}
	
	@PostMapping("/product/addAll")
	public ResponseEntity<Object> addAll(@RequestBody Product[] product) throws InValidException{
		
			for(Product prod : product) {
				productService.add(prod);
			}
			return new ResponseEntity<Object>("Successfully all products added at once", HttpStatus.OK);
			
		
	}
	
	
	@CircuitBreaker(name="breaker1", fallbackMethod = "fallbackForBreaker1")
	@GetMapping("/product/getAll")
	public ResponseEntity<Object> getAll(){
		
		log.info("*****in admin controller getAll()*****");
		return new ResponseEntity<Object>(productService.getAll(), HttpStatus.OK);
//		throw new RuntimeException();						//intentionally throwing un-handled error

		
	}
	
	public ResponseEntity<Object> fallbackForBreaker1(Throwable throwable){
		log.info("*****in admin controller fallbackForBreaker1*****");
		return new ResponseEntity<Object>("circuit breaker is opened/half opened, please try again later!!!", HttpStatus.BANDWIDTH_LIMIT_EXCEEDED);
	}
	
	@GetMapping("/product/{id}")
	public ResponseEntity<Object> getById(@PathVariable Long id){

			return new ResponseEntity<Object>(productService.getById(id), HttpStatus.OK);
		
	}
	
	@DeleteMapping("/product/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable Long id){

			return new ResponseEntity<Object>(productService.deleteById(id), HttpStatus.OK);

		
	}
	
	@PutMapping("/product/{id}")
	public ResponseEntity<Object> updateById(@PathVariable Long id, @RequestBody Product product) throws InValidException{

			return new ResponseEntity<Object>(productService.updateById(id, product), HttpStatus.OK);

		
	}
}
