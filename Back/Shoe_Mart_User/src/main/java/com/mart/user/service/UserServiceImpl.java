package com.mart.user.service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.json.JSONObject;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.mart.user.config.RestTemplateConfig;
import com.mart.user.entity.ChangePasswordModel;
import com.mart.user.entity.ProductModel;
import com.mart.user.entity.ResetPasswordModel;
import com.mart.user.entity.User;
import com.mart.user.entity.VerificationToken;
import com.mart.user.exception.InvalidPasswordException;
import com.mart.user.exception.InvalidProductException;
import com.mart.user.exception.InvalidTokenException;
import com.mart.user.exception.InvalidUserException;
import com.mart.user.jwt.JwtService;
import com.mart.user.repository.UserRepository;
import com.mart.user.repository.VerificationTokenRepository;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private VerificationTokenRepository verificationTokenRepository;
	
	@Autowired
	private VerificationToken verificationToken;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
    private JavaMailSender mailSender;
	
	@Autowired
    private JwtService jwtService;
	
	@Autowired
	private RestTemplate restTemplate;

	@Override
	public void add(User user, final HttpServletRequest request) throws InvalidUserException {
		try {
			//user validation will be done in f-end
			User newUser = new User();
			BeanUtils.copyProperties(user, newUser);
			newUser.setPassword(passwordEncoder.encode(user.getPassword()));
			newUser.setRegisteredDate(LocalDateTime.now());
			
			
			//mail sending setup n mechanism
			
			String baseUrl = "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
			String token = UUID.randomUUID().toString();
			LocalDateTime current = LocalDateTime.now();
			
			VerificationToken verificationToken = new VerificationToken();
			verificationToken.setToken(token);
			verificationToken.setEmail(user.getEmail());
			verificationToken.setDateTime(current);
			verificationTokenRepository.save(verificationToken);
			
			String urlWithToken = baseUrl + "/usr/verifyRegistration?token=" + token;
			
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom("invaliduser409@gmail.com");
			message.setTo(user.getEmail());
			message.setText("Click the link to verify your account: {}" + urlWithToken);
			message.setSubject("Verification Link Action from Shoe_Mart");
			
			mailSender.send(message);
			
			userRepository.save(newUser);
				
		} catch (Exception e) {
			throw new InvalidUserException("user isn't saved");
		}
		
	}

	@Override
	public String validateVerificationToken(String token) throws InvalidTokenException {
		try {
			VerificationToken obj = verificationTokenRepository.findByToken(token);
			if(obj == null) {
				throw new InvalidTokenException("token not found in db");
			}
			
			LocalDateTime now = LocalDateTime.now();
			LocalDateTime old = obj.getDateTime();
			Duration difference = Duration.between(old, now);
			
			long minutesApart = Math.abs(difference.toMinutes()); // Get absolute difference;
			
			if (minutesApart<10) {
				String email = obj.getEmail();
				Optional<User> userobj = userRepository.findByEmail(email);
				if(userobj.isPresent()) {
					User newuser = userobj.get();
					newuser.setActivated(true);
					userRepository.save(newuser);
					return "successfully token verified";
				}
				throw new InvalidTokenException("User not found with provided E-mail");
			} else {
				verificationTokenRepository.delete(verificationToken);
				throw new InvalidTokenException("token expired, try to signin again");
			}		
		} catch (Exception e) {
			throw new InvalidTokenException(e.getMessage());
		}
	}

	@Override
	public void changePassword(ChangePasswordModel changePasswordModel, String email) throws InvalidPasswordException {
		try {
			Optional<User> user = userRepository.findByEmail(email);
			if(user.isPresent()) {
				User newuser = user.get();
				String dbPassword = newuser.getPassword();
				if(newuser.isActivated()) {
					if(passwordEncoder.matches(dbPassword, changePasswordModel.getOldPassword())) {
						if(changePasswordModel.getNewPassword() == changePasswordModel.getRetypeNewPassword()) {
							newuser.setPassword(passwordEncoder.encode(changePasswordModel.getNewPassword()));
							userRepository.save(newuser);
						}
						throw new InvalidPasswordException("please retype password correctly");
					}
					throw new InvalidPasswordException("your old password isn't matched with db password");
				}
			}
		} catch (Exception e) {
			throw new InvalidPasswordException("your password change wasn't successfull ");
		}
		
	}

	@Override
	public void reset(String email, final HttpServletRequest request) throws InvalidPasswordException, InvalidUserException {
		try {
//			log.info("email from reset method: {}",email);
			JSONObject obj = new JSONObject(email);
			String emailString = obj.getString("email");
			
			Optional<User> user = userRepository.findByEmail(emailString);
			if(user == null) {
				throw new InvalidUserException("User data not found with this E-mail");
			}
			
			String baseUrl = "http://" + request.getServerName() + ":" + 3000 + request.getContextPath();
			String token = UUID.randomUUID().toString();
			LocalDateTime current = LocalDateTime.now();
			
			VerificationToken verificationToken = new VerificationToken();
			verificationToken.setToken(token);
			verificationToken.setEmail(emailString);
			verificationToken.setDateTime(current);
			verificationTokenRepository.save(verificationToken);
			
			String urlWithToken = baseUrl + "/usr/confirmReset?token=" + token;
			
			SimpleMailMessage message = new SimpleMailMessage();
			message.setFrom("invaliduser409@gmail.com");
			message.setTo(emailString);
			message.setText("Click the link to confirm the reset password process: {}\n" + urlWithToken);
			message.setSubject("Verification Link Action from Shoe_Mart");
			
			mailSender.send(message);
			
		} catch (Exception e) {
			throw new InvalidUserException(e.getMessage());
		}
		
	}

	@Override
	public void confirmReset(String token, ResetPasswordModel resetPasswordModel) throws InvalidPasswordException {
		try {
			log.info("token in service of confirmReset: {}", token);
			log.info("resetPasswordModel in service of confirmReset: {}", resetPasswordModel);
			VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
			if(verificationToken == null) {
				throw new InvalidPasswordException("there is no data with the provided token");
			}
			String email = verificationToken.getEmail();
			Optional<User> userobj = userRepository.findByEmail(email);
			
			if(userobj.isPresent()) {
				User user = userobj.get();
				
				LocalDateTime now = LocalDateTime.now();
				LocalDateTime old = verificationToken.getDateTime();
				Duration difference = Duration.between(old, now);
				
				long minutesApart = Math.abs(difference.toMinutes()); // Get absolute difference;
				
				if (minutesApart<10) {
					user.setConfirmReset(true);
					userRepository.save(user);
					if(user.isConfirmReset()) {
						
						user.setPassword(passwordEncoder.encode(resetPasswordModel.getNewPassword()));
						user.setConfirmReset(false);			//after changing/reset password this variable is set to false for another time to use this process
						userRepository.save(user);
//						verificationToken.setToken("");
//						verificationTokenRepository.save(verificationToken);
						verificationTokenRepository.deleteById(verificationToken.getId());		//verification token also deleted after successful password reset
						
					}
			}
					
			}else {
				throw new InvalidPasswordException("token expired, please initiate reset process again");
			}
		
			
		} catch (Exception e) {
			throw new InvalidPasswordException(e.getMessage());
		}
		
	}

	@Override
	public User getUserByJwt(String jwt) throws InvalidUserException {
		try {
			String email = jwtService.extractUsername(jwt.substring(7));
			if(email.isBlank()) {
				throw new InvalidUserException("there is no users n email associated with the provided jwt");
			}
			Optional<User> user = userRepository.findByEmail(email);
			if(!user.isPresent()) {
				throw new InvalidUserException("there is no user data associated with the email");
			}
			return user.get();
			
		} catch (Exception e) {
			throw new InvalidUserException(e.getMessage());
		}
	}

	@Override
	public void addProduct(ProductModel productModel) throws InvalidProductException {
		try {
			String msg = restTemplate.postForObject("http://localhost:8081/adm/product/add", productModel, String.class);
			log.info(msg);
		} catch (Exception e) {
			throw new InvalidProductException("something happened while adding the product");
		}
		
	}
}
	


