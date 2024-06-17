package com.mart.order.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mart.order.entity.CartModel;
import com.mart.order.entity.Order;
import com.mart.order.entity.PriceModel;
import com.mart.order.entity.UserModel;
import com.mart.order.repository.OrderRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Override
	public String add(String jwt) throws Exception {
		try {
//			List<CartModel> cartobj = (List<CartModel>) restTemplate.exchange("http://localhost:8084/cart/getAll", HttpMethod.GET, createRequestEntityWithJwt(jwt), CartModel.class).getBody();
//			if(cartobj.isEmpty()) {
//				throw new Exception("cart is empty for this user/jwt");
//			}
			ResponseEntity<Object> response = restTemplate.exchange("http://localhost:8084/cart/getAll", HttpMethod.GET, createRequestEntityWithJwt(jwt), Object.class);
			List<CartModel> cartModel = new ArrayList<>();
			ObjectMapper mapper = new ObjectMapper();
			cartModel = mapper.convertValue(response.getBody(), mapper.getTypeFactory().constructCollectionType(List.class, CartModel.class) );
			for(CartModel obj: cartModel) {
				Order order = new Order();
				BeanUtils.copyProperties(obj, order);
				orderRepository.save(order);
				String url = "http://localhost:8084/cart/delete/" + obj.getId();
				 restTemplate.exchange(url, HttpMethod.DELETE, createRequestEntityWithJwt(jwt), String.class).getBody();
				log.info("deleting cart data after adding it to order repo");
			}	
			return "successfully cart added to order repo";
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
		 
	}
	
	public HttpEntity<Void> createRequestEntityWithJwt(String jwt) {
	    HttpHeaders headers = new HttpHeaders();
	    headers.set("Authorization", jwt); // Assuming JWT format is "Bearer <token>"
	    return new HttpEntity<>(headers);
	}
	
	@Override
	public List<Order> getAll(String jwt) throws Exception {
		
		try {
//			
			UserModel user = restTemplate.exchange("http://localhost:8083/usr/profile", HttpMethod.GET, createRequestEntityWithJwt(jwt), UserModel.class).getBody();
			String email = user.getEmail();
			if(email.isBlank()) {
				throw new Exception("there is no email associate with provided jwt");
			}
			return (List<Order>) orderRepository.findAllByEmail(email);
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
		
	}
	
	@Override
	public String deleteById(String jwt, Long id) throws Exception {
		try {
			UserModel user = restTemplate.exchange("http://localhost:8083/usr/profile", HttpMethod.GET, createRequestEntityWithJwt(jwt), UserModel.class).getBody();
			String email = user.getEmail();
			if(email.isBlank()) {
				throw new Exception("there is no email associate with provided jwt");
			}
			List<Order> order = orderRepository.fetchById(email,id);
			for(Order obj: order) {
				
//				String url = "http://localhost:8084/cart/add/" + obj.getId();
////				String msg = restTemplate.exchange(url, HttpMethod.POST, createRequestEntityWithJwt(jwt), String.class).getBody();
//				restTemplate.exchange(url, HttpMethod.POST, createRequestEntityWithJwt(jwt), String.class).getBody();
				
				orderRepository.delete(obj);
			}
			return "order item deleted successfully";
			
		} catch (Exception e) {
			throw new Exception("unable to delete the order item");
		  }
	}

	@Override
	public PriceModel getPrice(String jwt) throws Exception {
		try {
			List<Order> order = getAll(jwt);
			if(order.isEmpty()) {
				PriceModel price = new PriceModel(0.0f,0.0f,0.0f);
				return price;
			}
			PriceModel priceObj = new PriceModel();
			float selling_price = 0.0f;
			float price = 0.0f;

			for(Order obj: order) {
				selling_price += obj.getSelling_price();
				price += obj.getPrice();
			}
			priceObj.setPrice_without_discount(price);
			priceObj.setDiscounted_price(price - selling_price);
			priceObj.setTotalPrice(selling_price);
			return priceObj;
			
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

}
