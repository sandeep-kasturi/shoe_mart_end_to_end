package com.mart.cart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mart.cart.entity.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
	
	@Query("select s from Cart s where s.email = ?1 AND s.id = ?2")
	public List<Cart> fetchById(String email, Long id);

	@Query("select s from Cart s where s.email = ?1")
	public List<Cart> findAllByEmail(String email);
}
