package com.mart.cart.service;

import java.util.List;

import org.springframework.util.MultiValueMap;

import com.mart.cart.entity.Cart;
import com.mart.cart.entity.PriceModel;

public interface CartService {

	public String add(String jwt, Long id) throws Exception;

	public List<Cart> getAll(String jwt) throws Exception ;

	public String deleteById(String jwt, Long id) throws Exception;

	public PriceModel getPrice(String jwt) throws Exception;

}
