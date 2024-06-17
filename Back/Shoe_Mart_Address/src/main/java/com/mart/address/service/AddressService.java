package com.mart.address.service;

import java.util.List;

import org.springframework.util.MultiValueMap;

import com.mart.address.entity.Address;
import com.mart.address.exception.InvalidAddressException;

public interface AddressService {

	public String add(String jwt, Address address) throws InvalidAddressException;

	public void deleteById(Long id) throws InvalidAddressException;

	public void updateById(Long id, Address address) throws InvalidAddressException;

	public List<Address> getAll(String jwt) throws Exception;

	public Address getById(String jwt, Long id) throws Exception;

}
