package com.mart.address.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mart.address.entity.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

	public List<Address> findByEmail(String email);

	@Query("select s from Address s where s.email = ?1 AND s.id = ?2")
	public Address getById(String email, Long id);

}
