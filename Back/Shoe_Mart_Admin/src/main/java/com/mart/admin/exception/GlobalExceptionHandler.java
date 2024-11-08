package com.mart.admin.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(InValidException.class)
	public ResponseEntity<Object> handleInvalidAddressException(InValidException inValidException){
		return new ResponseEntity<Object>(inValidException.getMessage(),HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleException(Exception exception){
		return new ResponseEntity<Object>(exception.getMessage(),HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<Object> handleException(NullPointerException nullPointerException){
		return new ResponseEntity<Object>(nullPointerException.getMessage(),HttpStatus.BAD_REQUEST);
	}
	
	
}


