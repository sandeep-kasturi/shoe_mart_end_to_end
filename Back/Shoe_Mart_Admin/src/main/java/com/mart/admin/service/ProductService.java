package com.mart.admin.service;

import java.util.List;
import com.mart.admin.entity.Product;
import com.mart.admin.exception.InValidException;

public interface ProductService {

	public void add(Product product) throws InValidException;

	public List<Product> getAll();

	public Product getById(Long id);

	public String deleteById(Long id);

	public String updateById(Long id, Product product)throws InValidException;

}
