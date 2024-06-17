package com.mart.user.jwt;

import java.time.Instant;
import java.util.Optional;

import org.apache.http.auth.InvalidCredentialsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mart.user.entity.User;
import com.mart.user.repository.UserRepository;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
        UserRepository userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }



    // this is for without refresh token
    
    public User authenticate(LoginUserDto input) throws InvalidCredentialsException {
    	try {
    		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));			
		} catch (Exception e) {
			throw new InvalidCredentialsException("Invalid username or password");
		}

        return userRepository.findByEmail(input.getEmail()).orElseThrow();
    }
    
//    @Autowired
//    private JwtService jwtService;
//    
//    public AuthenticationResponse authenticate(LoginUserDto input) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));
//        System.out.println(authentication.isAuthenticated());
//        User user = userRepository.findByEmail(input.getEmail()).orElseThrow();
//        String accessToken = jwtService.generateToken(user);
//        String refreshToken = jwtService.generateRefreshToken(user);
//
//        return new AuthenticationResponse(accessToken, refreshToken, jwtService.getExpirationTime());
//    }
//    
//    public AuthenticationResponse refreshToken(String refreshToken) {
//        Optional<RefreshToken> refreshTokenOptional = jwtService.findRefreshToken(refreshToken);
//        if (refreshTokenOptional.isPresent()) {
//            RefreshToken token = refreshTokenOptional.get();
//            if (!token.getExpiryDate().isBefore(Instant.now())) {
//                String email = token.getUser().getEmail();
//                User user = userRepository.findByEmail(email).orElseThrow();
//                String accessToken = jwtService.generateToken(user);
//                jwtService.deleteRefreshToken(token);
//                String newRefreshToken = jwtService.generateRefreshToken(user);
//                return new AuthenticationResponse(accessToken, newRefreshToken, jwtService.getExpirationTime());
//            }
//        }
//        return null;
//    }

}
