package com.mart.admin.validation;

import java.util.Objects;

import org.springframework.stereotype.Component;

import com.mart.admin.entity.Product;
import com.mart.admin.exception.InValidException;

@Component
public class Validations {

	public String isValid(Product product) throws InValidException {
		
		if(!product.getImage().isBlank()) {
			if(!product.getBrand().isBlank()) {
				if(!product.getTitle().isBlank()) {
					if( product.getPrice() != 0 || !Objects.isNull(product.getPrice())) {
						if(product.getSelling_price() != 0 || !Objects.isNull(product.getSelling_price())) {
							if(!Objects.isNull(product.getDiscount())) {
								return "valid";
							}
							throw new InValidException("Provide proper discount value");
						}
						throw new InValidException("Provide proper Selling_price value");
					}
					throw new InValidException("Provide proper price value");
				}
				throw new InValidException("Provide proper title");
			}
			throw new InValidException("Provide proper brand");
		}
		throw new InValidException("Provide proper ImageURL");
	}

}
