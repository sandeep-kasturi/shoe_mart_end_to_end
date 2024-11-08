package com.mart.user.exception;

import org.apache.http.auth.InvalidCredentialsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(InvalidCredentialsException.class)
	public ResponseEntity<Object> handleError(InvalidCredentialsException invalidCredentialsException){
		return new ResponseEntity<Object>(invalidCredentialsException.getMessage(),HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(InvalidPasswordException.class)
	public ResponseEntity<Object> handleInvalidPasswordException(InvalidPasswordException invalidPasswordException){
		return new ResponseEntity<Object>(invalidPasswordException.getMessage(),HttpStatus.BAD_REQUEST);
	}
	
	
	@ExceptionHandler(InvalidTokenException.class)
	public ResponseEntity<Object> handleInvalidTokenException(InvalidTokenException invalidTokenException){
		return new ResponseEntity<Object>(invalidTokenException.getMessage(),HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(InvalidUserException.class)
	public ResponseEntity<Object> handleInvalidUserException(InvalidUserException invalidUserException){
		return new ResponseEntity<Object>(invalidUserException.getMessage(),HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(InvalidProductException.class)
	public ResponseEntity<Object> InvalidProductException(InvalidProductException invalidProductException){
		return new ResponseEntity<Object>(invalidProductException.getMessage(),HttpStatus.BAD_REQUEST);
	}
}
