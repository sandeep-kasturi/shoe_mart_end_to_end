package com.mart.user.service;

import com.mart.user.entity.ChangePasswordModel;
import com.mart.user.entity.ProductModel;
import com.mart.user.entity.ResetPasswordModel;
import com.mart.user.entity.User;
import com.mart.user.exception.InvalidPasswordException;
import com.mart.user.exception.InvalidProductException;
import com.mart.user.exception.InvalidTokenException;
import com.mart.user.exception.InvalidUserException;

import jakarta.servlet.http.HttpServletRequest;

public interface UserService {

	public void add(User user, final HttpServletRequest request) throws InvalidUserException;

	public String validateVerificationToken(String token) throws InvalidTokenException;

	public void changePassword(ChangePasswordModel changePasswordModel, String email) throws InvalidPasswordException;

	public void reset(String email, final HttpServletRequest request) throws InvalidPasswordException, InvalidUserException;

	public void confirmReset(String token, ResetPasswordModel resetPasswordModel) throws InvalidPasswordException;

	public User getUserByJwt(String jwt) throws InvalidUserException;

	public void addProduct(ProductModel productModel) throws InvalidProductException;
}
