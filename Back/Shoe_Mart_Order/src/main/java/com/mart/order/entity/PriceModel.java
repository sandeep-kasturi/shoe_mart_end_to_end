package com.mart.order.entity;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class PriceModel {
	
	private float price_without_discount;
	
	private float totalPrice;
	
	private float discounted_price;
}
