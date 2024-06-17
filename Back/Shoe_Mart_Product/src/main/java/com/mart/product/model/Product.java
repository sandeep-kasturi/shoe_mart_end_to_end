package com.mart.product.model;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

	private Long id;

	private String image;
	
	private String brand;
	
	private String title;
	
	private List<String> color = new ArrayList<>();
	
	private int selling_price;
	
	private int price;
	
	private String discount;
	
	private List<Integer> size = new ArrayList<>();
	
}
