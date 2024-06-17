package com.mart.product.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.catalina.mapper.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.function.ServerRequest.Headers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mart.product.feignClient.AdmPrdFeign;
import com.mart.product.model.Product;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService{
	
	@Autowired
    private RestTemplate restTemplate;
	
	@Autowired
	private AdmPrdFeign admPrdFeign;
	
	
	
	@Override
	public List<Product> getAll() {
//		ResponseEntity<Object> response = restTemplate.getForEntity("http://localhost:8081/adm/product/getAll", Object.class);
		ResponseEntity<Object> response = admPrdFeign.getAll();
		List<Product> products = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		products = mapper.convertValue(response.getBody(), mapper.getTypeFactory().constructCollectionType(List.class, Product.class));
			
		return products;
	}

	@Override
	public Product getById(Long id) {
		Product product = restTemplate.getForObject("http://localhost:8081/adm/product/"+id, Product.class);
//		Product product =  admPrdFeign.getById(id);
		log.info("product : {}",product);
		return product;
	}

}
