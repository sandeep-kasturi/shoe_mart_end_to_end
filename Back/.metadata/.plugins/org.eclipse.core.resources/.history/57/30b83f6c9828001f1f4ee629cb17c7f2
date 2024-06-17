package com.mart.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.mart.order.entity.Order;
import com.mart.order.service.OrderService;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8087"})
@RestController
@RequestMapping("/ord")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@PostMapping("/add")
	public ResponseEntity<Object> add(@RequestHeader("Authorization") String jwt){
		try {
			return new ResponseEntity<Object>(orderService.add(jwt),HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(@RequestHeader("Authorization") String jwt){
		try {
			return new ResponseEntity<Object>(orderService.getAll(jwt),HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Object> deleteById(@RequestHeader("Authorization") String jwt, @PathVariable Long id){
		try {
			return new ResponseEntity<Object>(orderService.deleteById(jwt, id),HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getPrice")
	public ResponseEntity<Object> getPrice(@RequestHeader("Authorization") String jwt){
		try {
			return new ResponseEntity<Object>(orderService.getPrice(jwt),HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	
	}
}
