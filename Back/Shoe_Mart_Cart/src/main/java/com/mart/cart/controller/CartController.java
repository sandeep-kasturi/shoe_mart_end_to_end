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

import io.github.resilience4j.retry.annotation.Retry;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8086"})
@RestController
@RequestMapping("/cart")
@Slf4j
public class CartController {
	
	@Autowired
	private CartService cartService;
	
	@Retry(name="breaker1", fallbackMethod = "fallbackForBreaker1")
	@PostMapping("/add/{id}")
	public ResponseEntity<Object> add(@RequestHeader("Authorization") String jwt, @PathVariable Long id) throws Exception{

			log.info("***********add method of cart controller *********");
//			throw new RuntimeException();
			return new ResponseEntity<Object>(cartService.add(jwt, id),HttpStatus.OK);

	}
	
	public ResponseEntity<Object> fallbackForBreaker1(String jwt, Long id, Throwable throwable){
		log.info("***********fallback mehtod of retry*********");
		return new ResponseEntity<Object>("retry after 2 sec",HttpStatus.BANDWIDTH_LIMIT_EXCEEDED);
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(@RequestHeader("Authorization") String jwt) throws Exception{

			return new ResponseEntity<Object>(cartService.getAll(jwt),HttpStatus.OK);

	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Object> deleteById(@RequestHeader("Authorization") String jwt, @PathVariable Long id) throws Exception{
	
			return new ResponseEntity<Object>(cartService.deleteById(jwt, id),HttpStatus.OK);

	}
	
	@GetMapping("/getPrice")
	public ResponseEntity<Object> getPrice(@RequestHeader("Authorization") String jwt) throws Exception{

			return new ResponseEntity<Object>(cartService.getPrice(jwt),HttpStatus.OK);

	}
}
