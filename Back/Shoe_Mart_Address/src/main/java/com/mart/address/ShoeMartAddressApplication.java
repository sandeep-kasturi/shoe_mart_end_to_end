package com.mart.address;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ShoeMartAddressApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShoeMartAddressApplication.class, args);
	}

}
