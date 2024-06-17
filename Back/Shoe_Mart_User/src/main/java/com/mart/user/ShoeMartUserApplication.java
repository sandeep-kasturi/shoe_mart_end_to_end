package com.mart.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ShoeMartUserApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShoeMartUserApplication.class, args);
	}

}
