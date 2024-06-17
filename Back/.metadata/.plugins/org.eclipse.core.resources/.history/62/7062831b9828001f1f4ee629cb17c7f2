package com.mart.cart.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mart.cart.entity.Cart;
import com.mart.cart.entity.PriceModel;
import com.mart.cart.entity.ProductModel;
import com.mart.cart.entity.UserModel;
import com.mart.cart.repository.CartRepository;

@Service
public class CartServiceImpl implements CartService{
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private CartRepository cartRepository;

	@Override
	public String add(String jwt, Long id) throws Exception {
		try {
//			HttpHeaders headers = new HttpHeaders();
//			headers.set("Authorization", "Bearer " + jwt);
//			UserModel user = restTemplate.getForObject("http://localhost:8083/usr/profile", UserModel.class, headers);
			UserModel user = restTemplate.exchange("http://localhost:8083/usr/profile", HttpMethod.GET, createRequestEntityWithJwt(jwt), UserModel.class).getBody();
			String email = user.getEmail();
			if(email.isBlank()) {
				throw new Exception("there is no email associate with provided jwt");
			}
			ProductModel product = restTemplate.getForObject("http://localhost:8085/prd/product/"+id, ProductModel.class);
//			ResponseEntity<Object> response = restTemplate.exchange("http://localhost:8085/prd/product/"+id, HttpMethod.GET, null, Object.class);
//			ProductModel product = new ProductModel();
//			ObjectMapper mapper = new ObjectMapper();
//			product = mapper.convertValue(response.getBody(), ProductModel.class);
			Cart cart = new Cart();
			BeanUtils.copyProperties(product, cart);
			cart.setEmail(email);
			cartRepository.save(cart);
			return "successfully added to cart";			
		} catch (RestClientResponseException e) {
			throw new Exception(e.getMessage());
		}
	}

	@Override
	public List<Cart> getAll(String jwt) throws Exception {
		
		try {
//			HttpHeaders headers = new HttpHeaders();
//			headers.set("Authorization", jwt);
//			UserModel user = restTemplate.getForObject("http://localhost:8083/usr/profile", UserModel.class, headers);
			UserModel user = restTemplate.exchange("http://localhost:8083/usr/profile", HttpMethod.GET, createRequestEntityWithJwt(jwt), UserModel.class).getBody();
			String email = user.getEmail();
			if(email.isBlank()) {
				throw new Exception("there is no email associate with provided jwt");
			}
			return (List<Cart>) cartRepository.findAllByEmail(email);
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
	public String deleteById(String jwt, Long id) throws Exception {
		try {
//			UserModel user = restTemplate.getForObject("http://localhost:8083/usr/profile", UserModel.class);
			UserModel user = restTemplate.exchange("http://localhost:8083/usr/profile", HttpMethod.GET, createRequestEntityWithJwt(jwt), UserModel.class).getBody();
			String email = user.getEmail();
			if(email.isBlank()) {
				throw new Exception("there is no email associate with provided jwt");
			}
			List<Cart> cart = cartRepository.fetchById(email,id);
			for(Cart obj: cart) {
				cartRepository.delete(obj);
			}
			return "cart item deleted successfully";
			
		} catch (Exception e) {
			throw new Exception("unable to delete the cart item");
		  }
	}

	@Override
	public PriceModel getPrice(String jwt) throws Exception {
		try {
			List<Cart> cart = getAll(jwt);
			if(cart.isEmpty()) {
				PriceModel price = new PriceModel(0.0f,0.0f,0.0f);
				return price;
			}
			PriceModel priceObj = new PriceModel();
			float selling_price = 0.0f;
			float price = 0.0f;

			for(Cart obj: cart) {
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
		