package com.mart.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mart.user.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String>{
	
//	@Query("select u from User u where u.email like ?1")
	public Optional<User> findByEmail(String email);
	
}
