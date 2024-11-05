package com.mart.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mart.user.entity.ProductModel;
import com.mart.user.entity.User;
import com.mart.user.exception.InvalidProductException;
import com.mart.user.exception.InvalidUserException;
import com.mart.user.service.UserService;

@RestController
@RequestMapping("/usr")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/profile") 
	public ResponseEntity<Object> getUserByJwt(@RequestHeader("Authorization") String jwt) throws InvalidUserException{
			User user = userService.getUserByJwt(jwt);
			return new ResponseEntity<Object>(user,HttpStatus.OK);
	}
	
//	below endpoints are only accessible for the user who has ADMIN_ROLE
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/adm/product/add")
	public ResponseEntity<Object> addProduct(@RequestHeader("Authorization") String jwt, @RequestBody ProductModel productModel) throws InvalidProductException{
		userService.addProduct(productModel);
		return new ResponseEntity<Object>("product added successfully", HttpStatus.OK);
	}
}
