package com.mart.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ShoeMartAdminApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShoeMartAdminApplication.class, args);
	}

}
