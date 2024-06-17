package com.mart.product.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.cloud.client.loadbalancer.reactive.LoadBalancedExchangeFilterFunction;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

import com.mart.product.feignClient.AdmPrdFeign;

@Configuration
public class RestTemplateConfig {
    @Bean				
    RestTemplate restTemplate() {	
        return new RestTemplate(); 
    }
    
    @Autowired
    private LoadBalancedExchangeFilterFunction filterFunction;
    
    @Bean
    public WebClient employeeWebClient() {
        return WebClient.builder()
                .baseUrl("http://localhost:8081")				
                .filter(filterFunction)						
                .build();
    }
	
    @Bean
    @LoadBalanced								
    public AdmPrdFeign employeeClient() {
        HttpServiceProxyFactory httpServiceProxyFactory
                = HttpServiceProxyFactory
                .builder(WebClientAdapter.forClient(employeeWebClient()))	
                .build();
        return httpServiceProxyFactory.createClient(AdmPrdFeign.class);	
    }
}
