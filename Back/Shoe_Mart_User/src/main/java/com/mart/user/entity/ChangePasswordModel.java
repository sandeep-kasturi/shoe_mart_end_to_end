package com.mart.user.entity;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordModel {
	private String oldPassword;
	private String newPassword;
	private String retypeNewPassword;
	private String token;
}
