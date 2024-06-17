package com.mart.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mart.user.entity.User;
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
}
