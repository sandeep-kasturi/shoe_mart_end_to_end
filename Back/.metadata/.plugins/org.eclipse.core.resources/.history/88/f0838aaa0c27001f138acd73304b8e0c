package com.mart.product.config;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.loadbalancer.annotation.LoadBalancerClient;
import org.springframework.context.annotation.Bean;

import feign.Feign;

@LoadBalancerClient(name="ShoeMartAdmin",configuration = CustomLoadBalancerConfiguration.class)		 
public class AdminSerLoadBalan {										

	@LoadBalanced												
	@Bean
	public Feign.Builder feBuilder(){
		return Feign.builder();
	}
}
