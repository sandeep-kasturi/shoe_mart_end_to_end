package com.mart.order.entity;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartModel {
	@Id
	private Long id;
	
	private String image;
	
	private String brand;
	
	private String title;
	
	private List<String> color = new ArrayList<>();
	
	private int selling_price;
	
	private int price;
	
	private String discount;
	
	private List<Integer> size = new ArrayList<>();

	private String email;
	
}
