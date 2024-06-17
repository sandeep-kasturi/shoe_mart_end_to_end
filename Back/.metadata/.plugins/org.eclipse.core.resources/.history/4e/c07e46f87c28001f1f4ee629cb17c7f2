package com.mart.cart.controller;

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

import com.mart.cart.service.CartService;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8086"})
@RestController
@RequestMapping("/cart")
public class CartController {
	
	@Autowired
	private CartService cartService;
	
	@PostMapping("/add/{id}")
	public ResponseEntity<Object> add(@RequestHeader("Authorization") String jwt, @PathVariable Long id){
		try {
			return new ResponseEntity<Object>(cartService.add(jwt, id),HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(@RequestHeader("Authorization") String jwt){
		try {
			return new ResponseEntity<Object>(cartService.getAll(jwt),HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Object> deleteById(@RequestHeader("Authorization") String jwt, @PathVariable Long id){
		try {
			return new ResponseEntity<Object>(cartService.deleteById(jwt, id),HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getPrice")
	public ResponseEntity<Object> getPrice(@RequestHeader("Authorization") String jwt){
		try {
			return new ResponseEntity<Object>(cartService.getPrice(jwt),HttpStatus.ACCEPTED);
		} catch (Exception e) {
			return new ResponseEntity<Object>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
}
