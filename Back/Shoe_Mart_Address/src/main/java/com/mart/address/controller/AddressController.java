package com.mart.address.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mart.address.entity.Address;
import com.mart.address.exception.InvalidAddressException;
import com.mart.address.service.AddressService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/addrs")
public class AddressController {
	@Autowired
	private AddressService addressService;
	
	@PostMapping("/add")
	public ResponseEntity<Object> add(@RequestHeader("Authorization") String jwt, @RequestBody Address address) throws InvalidAddressException{
			
			return new ResponseEntity<Object>(addressService.add(jwt, address), HttpStatus.OK);
	}
	
	@GetMapping("/getAll")
	public ResponseEntity<Object> getAll(@RequestHeader("Authorization") String jwt) throws Exception{

			return new ResponseEntity<Object>(addressService.getAll(jwt), HttpStatus.OK);

	}
	
	@GetMapping("/getById/{id}")
	public ResponseEntity<Object> getById(@RequestHeader("Authorization") String jwt, @PathVariable Long id) throws Exception{

			return new ResponseEntity<Object>(addressService.getById(jwt,id), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Object> deleteById(@RequestHeader("Authorization") String jwt, @PathVariable Long id) throws InvalidAddressException{

			addressService.deleteById(id);
			return new ResponseEntity<Object>("address successfully deleted", HttpStatus.OK);

	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<Object> updateById(@RequestHeader("Authorization") String jwt, @PathVariable Long id, @RequestBody Address address) throws InvalidAddressException{

			addressService.updateById(id,address);
			return new ResponseEntity<Object>("address successfully updated", HttpStatus.OK);
	}
}
