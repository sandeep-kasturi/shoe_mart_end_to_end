package com.mart.address.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(InvalidAddressException.class)
	public ResponseEntity<Object> handleInvalidAddressException(InvalidAddressException invalidAddressException){
		return new ResponseEntity<Object>(invalidAddressException.getMessage(),HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleException(Exception exception){
		return new ResponseEntity<Object>(exception.getMessage(),HttpStatus.BAD_REQUEST);
	}
}

