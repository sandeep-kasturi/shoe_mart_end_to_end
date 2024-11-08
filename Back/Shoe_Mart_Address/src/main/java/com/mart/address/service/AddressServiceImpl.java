package com.mart.address.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.mart.address.entity.Address;
import com.mart.address.entity.UserModel;
import com.mart.address.exception.InvalidAddressException;
import com.mart.address.repository.AddressRepository;


@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	private AddressRepository addressRepository;
	
	
	@Autowired
	private RestTemplate restTemplate;
	
	@Override
	public String add(String jwt, Address address) throws InvalidAddressException {
		try {
			UserModel user = restTemplate.exchange("http://localhost:8083/usr/profile", HttpMethod.GET, createRequestEntityWithJwt(jwt), UserModel.class).getBody();
			String email = user.getEmail();
			if(email.isBlank()) {
				throw new InvalidAddressException("there is no email assosiated with the jwt provided");
			}
			
			Address addobj = new Address();
			BeanUtils.copyProperties(address, addobj);
			addobj.setEmail(email);
			addressRepository.save(addobj);
			return "successfully address added";
			
		} catch (Exception e) {
			throw new InvalidAddressException(e.getMessage());
		}
		
		
	}

	@Override
	public void deleteById(Long id) throws InvalidAddressException {
		try {
			if(addressRepository.findById(id).isEmpty()) {
				throw new InvalidAddressException("address not available in database with this id to delete");
			}
			addressRepository.deleteById(id);			
		} catch (Exception e) {
			throw new InvalidAddressException(e.getMessage());
		}
		
	}

	@Override
	public void updateById(Long id, Address address) throws InvalidAddressException {
		try {
			if(addressRepository.findById(id).isEmpty()) {		
				throw new InvalidAddressException("address not available in database with this id");
			}
			Address old = addressRepository.findById(id).get();
			BeanUtils.copyProperties(address, old);
			old.setId(id);
			addressRepository.save(old);			
		} catch (Exception e) {
			throw new InvalidAddressException(e.getMessage());
		}
		
	}

	@Override
	public List<Address> getAll(String jwt) throws Exception {
		try {
			UserModel user = restTemplate.exchange("http://localhost:8083/usr/profile", HttpMethod.GET, createRequestEntityWithJwt(jwt), UserModel.class).getBody();
			String email = user.getEmail();
			if(email.isBlank()) {
				throw new Exception("something happened while getting addresses");
			}
			return (List<Address>) addressRepository.findByEmail(email);			
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
	public Address getById(String jwt, Long id) throws Exception {
		try {
			UserModel user = restTemplate.exchange("http://localhost:8083/usr/profile", HttpMethod.GET, createRequestEntityWithJwt(jwt), UserModel.class).getBody();
			String email = user.getEmail();
			if(email.isBlank()) {
				throw new Exception("something happened while getting addresses");
			}
			return addressRepository.getById(email,id);			
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		}
	}

}
