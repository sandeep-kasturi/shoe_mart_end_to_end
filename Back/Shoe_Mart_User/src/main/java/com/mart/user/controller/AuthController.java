package com.mart.user.controller;

import org.apache.http.auth.InvalidCredentialsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mart.user.entity.ChangePasswordModel;
import com.mart.user.entity.ResetPasswordModel;
import com.mart.user.entity.User;
import com.mart.user.exception.InvalidPasswordException;
import com.mart.user.exception.InvalidTokenException;
import com.mart.user.exception.InvalidUserException;
import com.mart.user.jwt.AuthenticationResponse;
import com.mart.user.jwt.AuthenticationService;
import com.mart.user.jwt.JwtService;
import com.mart.user.jwt.LoginResponse;
import com.mart.user.jwt.LoginUserDto;
import com.mart.user.repository.UserRepository;
import com.mart.user.service.UserService;

import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private AuthenticationService authenticationService;
	
	@Autowired
	private JwtService jwtService;  
	
	

	
	
//	@PostMapping("/signup")
//    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
//        User registeredUser = authenticationService.signup(registerUserDto);
//
//        return ResponseEntity.ok(registeredUser);
//    }
	
	@PostMapping("/signup")
	public ResponseEntity<Object> add(@RequestBody User user, final HttpServletRequest request) throws InvalidUserException{

			userService.add(user, request);	
			return new ResponseEntity<Object>("successfully user added and verification link sent to registered mail", HttpStatus.OK);
	}
	
	
	@GetMapping("/verifyRegistration")
	public ResponseEntity<Object> verifyRegistration(@RequestParam("token") String token) throws InvalidTokenException{

			String result = userService.validateVerificationToken(token);
			return new ResponseEntity<Object>(result, HttpStatus.OK);
	
	}
	
	@PostMapping("/changePassword")
	public ResponseEntity<Object> changePassword(@RequestBody ChangePasswordModel changePasswordModel, String email) throws InvalidPasswordException{

			userService.changePassword(changePasswordModel,email);
			return new ResponseEntity<Object>("Password changed successfully", HttpStatus.OK);

	}
	
	//here only confirmation link sent to registered mail
	@RateLimiter(name="breaker1", fallbackMethod = "fallbackForBreaker1")
	@PostMapping("/resetPassword")
	public ResponseEntity<Object> reset(@RequestBody String email, final HttpServletRequest request) throws InvalidPasswordException, InvalidUserException{
			log.info("resetPassword of controller");
//			throw new RuntimeException();
			userService.reset(email, request);
			return new ResponseEntity<Object>("password reset initialised and confirmation link sent to your mail", HttpStatus.OK);

	}
	
	public ResponseEntity<Object> fallbackForBreaker1(String email, final HttpServletRequest request, Throwable throwable){
		log.info("fallback method of rate limiter");
		return new ResponseEntity<Object>("Rate limiter is turned on, make another call after 15 sec",HttpStatus.BANDWIDTH_LIMIT_EXCEEDED);
	}
	
	//here after confirming reset a passwd change window will open
	@PostMapping("/confirmReset")
	public ResponseEntity<Object> confirmReset(@RequestParam("token") String token, @RequestBody ResetPasswordModel resetPasswordModel) throws InvalidPasswordException{

			userService.confirmReset(token, resetPasswordModel);
			return new ResponseEntity<Object>("password reset successful", HttpStatus.OK);
	}
	
	//this is for without refresh token
	@PostMapping("/login")
	public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) throws InvalidCredentialsException {
	  User authenticatedUser = authenticationService.authenticate(loginUserDto);

	  String accessToken = jwtService.generateToken(authenticatedUser);

	  LoginResponse loginResponse = new LoginResponse(accessToken, jwtService.getExpirationTime());

	  return ResponseEntity.ok(loginResponse);
	}
	
//	@PostMapping("/login")
//	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
//	    AuthenticationResponse authResponse = authenticationService.authenticate(loginUserDto);
//	    System.out.println("auth response: "+ authResponse);
//	    return ResponseEntity.ok(authResponse);
//	}
	
}
