package com.mart.order.service;

import java.util.List;

import com.mart.order.entity.Order;
import com.mart.order.entity.PriceModel;

public interface OrderService {

	public String add(String jwt) throws Exception ;

	public List<Order> getAll(String jwt) throws Exception;
	
	public String deleteById(String jwt, Long id) throws Exception;

	public PriceModel getPrice(String jwt) throws Exception;

}
