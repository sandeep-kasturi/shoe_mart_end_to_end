package com.mart.user.entity;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails{
	
	
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;
	
	@Column(name = "firstName")
	private String firstName;
	
	@Column(name = "lastName")
	private String lastName;
	
	@Column(name = "phoneNumber")
	private String phoneNumber;
	
	@Id
	@Column(name = "email")
	private String email;
	
	@Column(name = "password")
	private String password;
	
	@Column(name = "activated")
	private boolean activated = false;
	
	@Column(name = "registeredDate")
	private LocalDateTime registeredDate;			//date will come fron-end when onclick invoked
	
	@Column(name = "role")
	@Enumerated(EnumType.STRING)
	private Role role = Role.USER;					//to set multiple roles for a user use below 
													// List<Role> roles = new ArrayList<>(Arrays.asList(Role.USER, Role.ADMIN));
													//List<Role> roles = Stream.of(Role.USER, Role.ADMIN).collect(Collectors.toList());
													//List<Role> roles = new ArrayList<>();    Collections.addAll(roles, Role.USER, Role.ADMIN);
	

													
	@Column(name = "confirmReset")
	private boolean confirmReset;

	
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// this is for only one user has one role												
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.name());				//for one user has multiple roles scenario use below one
        return Arrays.asList(authority);														//roles.stream().map(role -> new SimpleGrantedAuthority("ROLE_" + role.name())).collect(Collectors.toList());
	}
	@Override
	public String getUsername() {
		
		return email;
	}
	@Override
	public String getPassword() {
		
		return password;
	}
	@Override
	public boolean isAccountNonExpired() {
		
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		
		return true;
	}
	@Override
	public boolean isEnabled() {
		
		return activated;
	}		
	
}
