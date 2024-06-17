package com.mart.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.mart.user.entity.VerificationToken;

//@Configuration
//@EnableWebSecurity
public class WebSecurity {
	
	
	
//	@Bean
//	public PasswordEncoder passwordEncoder(){
//        return new BCryptPasswordEncoder(11);
//	}
//	
////	this is throwing error while sending mail
////	@Bean
////    public JavaMailSender javaMailSender() { 					
////          return new JavaMailSenderImpl();					
////    }
//	
//	@Bean
//    public VerificationToken verificationToken() {
//        return new VerificationToken(); // Configure the bean as needed
//    }
//    
//	
//	@Bean
//	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
//		http.csrf().disable();
//		http.authorizeHttpRequests().anyRequest().permitAll();
//		return http.build();
//	}

}
