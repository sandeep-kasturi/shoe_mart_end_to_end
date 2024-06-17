package com.mart.user.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

import java.security.Key;
import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.mart.user.entity.User;
import com.mart.user.repository.UserRepository;

@Service
@Slf4j
public class JwtService {
//    @Value("${security.jwt.secret-key}")
    private String secretKey = "3cfa76ef14937c1c0ea519f8fc057a80fcd04a7420f8e8bcd0a7567c272e007b";

//    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration = 172800000;      //1hr

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    public long getExpirationTime() {
        return jwtExpiration;
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    
//    // refresh token 
//    
////    @Value("${security.jwt.refresh-expiration-time}")
//    private long refreshExpirationTime = 3600000;
//
//    @Autowired
//    private RefreshTokenRepository refreshTokenRepository;
//    
//    @Autowired
//    private UserRepository userRepository;
//    
//
//    public String generateRefreshToken(User user) {
////    	Optional<RefreshToken> existingToken = findRefreshToken(user.getEmail());
//    	Optional<RefreshToken> existingToken = refreshTokenRepository.findByUser(user);
//    	if (existingToken.isPresent()) {
//    		
//    		refreshTokenRepository.delete(existingToken.get());
//    		log.info("after delete existingToken: {}",existingToken.get());
//        }
////    	String refreshToken = generateRandomToken(user.getEmail());
//    	String refreshToken = UUID.randomUUID().toString();
//    	RefreshToken token = new RefreshToken();
//    	token.setExpiryDate(Instant.now().plusSeconds(refreshExpirationTime));
//    	token.setToken(refreshToken);
//    	token.setUser(user);
//    	refreshTokenRepository.save(token);
//
//        return refreshToken;
//    }
//    
////    private String generateRandomToken(String email) {
////        String randomToken = UUID.randomUUID().toString();
////        String uniqueToken = email + "_" + randomToken;
////        return uniqueToken;
////    }
//
//    public Optional<RefreshToken> findRefreshToken(String token) {
//        return refreshTokenRepository.findByToken(token);
//    }
//
//    public RefreshToken createRefreshToken(String email) {
//        RefreshToken refreshToken = refreshTokenRepository.findByUser(userRepository.findByEmail(email).get()).orElse(null);
//        if (refreshToken == null) {
//            User user = userRepository.findByEmail(email).get();
//            refreshToken = new RefreshToken();
//            refreshToken.setUser(user);
//            refreshToken.setExpiryDate(Instant.now().plusMillis(refreshExpirationTime));
//            refreshToken.setToken(UUID.randomUUID().toString());
//            refreshToken = refreshTokenRepository.save(refreshToken);
//        }
//        return refreshToken;
//    }
//
//    public void deleteRefreshToken(RefreshToken refreshToken) {
//        refreshTokenRepository.delete(refreshToken);
//    }
}


