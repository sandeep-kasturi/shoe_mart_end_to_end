package com.mart.payment.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.razorpay.RazorpayException;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleException(Exception exception){
		return new ResponseEntity<Object>(exception.getMessage(),HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(RazorpayException.class)
	public ResponseEntity<Object> handleRazorpayException(RazorpayException razorpayException){
		return new ResponseEntity<Object>(razorpayException.getMessage(),HttpStatus.BAD_REQUEST);
	}
	
	
}
