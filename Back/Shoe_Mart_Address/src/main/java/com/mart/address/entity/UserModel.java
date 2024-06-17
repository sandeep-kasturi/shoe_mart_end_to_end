package com.mart.address.entity;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {

	private String firstName;
	
	private String lastName;

	private String phoneNumber;
	
	private String email;
	
	private String password;
	
	private boolean activated = false;
	
	private LocalDateTime registeredDate;			
	
	private Role role = Role.USER;	
}

