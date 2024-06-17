package com.mart.address.validation;

import org.springframework.stereotype.Component;

import com.mart.address.entity.Address;
import com.mart.address.exception.InvalidAddressException;

@Component
public class Validate {

	public String isValid(Address address) throws InvalidAddressException {
		if(!address.getName().isBlank()) {
			if(!address.getStreetName().isBlank()) {
				if(String.valueOf(address.getPincode()).length() == 6 ) {
					if(!address.getDistrict().isBlank()) {
						if(!address.getState().isBlank()) {
							return "valid";
						}
						throw new InvalidAddressException("enter proper state name");
					}
					throw new InvalidAddressException("enter proper district name");
				}
				throw new InvalidAddressException("enter proper pincode of 6 digits");
			}
			throw new InvalidAddressException("enter proper street name");
		}
		throw new InvalidAddressException("enter proper name");
	}

}
