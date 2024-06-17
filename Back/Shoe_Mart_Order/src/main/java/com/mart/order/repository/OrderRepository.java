package com.mart.order.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mart.order.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{

	@Query("select s from Order s where s.email = ?1")
	List<Order> findAllByEmail(String email);

	@Query("select s from Order s where s.email = ?1 AND s.id = ?2")
	List<Order> fetchById(String email, Long id);

}
