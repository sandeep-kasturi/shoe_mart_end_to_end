package com.mart.admin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mart.admin.entity.Product;
import com.mart.admin.exception.InValidException;
import com.mart.admin.repository.ProductRepository;
import com.mart.admin.validation.Validations;

@Service
public class ProductServiceImpl implements ProductService {
	
	@Autowired
	private Validations validations;
	
	@Autowired
	private ProductRepository productRepository;

	@Override
	public void add(Product product) throws InValidException {
		try {
			Optional<Product> obj = productRepository.findById(product.getId());
			if(obj.isPresent()) {
				throw new InValidException("already a product is in the db with this id");
			}
			
			String res = validations.isValid(product);
			if(res.equals("valid")) {
				productRepository.save(product);
			}			
		} catch (Exception e) {
			throw new InValidException(e.getMessage());
		}
	}

	@Override
	public List<Product> getAll() {
		try {
			if(productRepository.findAll().isEmpty()) {
				throw new NullPointerException("we got empty product list");
			}
			return productRepository.findAll();			
		} catch (Exception e) {
			throw new NullPointerException(e.getMessage());
		}
	}

	@Override
	public Product getById(Long id) {
		try {
			if(productRepository.findById(id).isEmpty()) {
				throw new NullPointerException("no product available with that id");
			}
			return productRepository.findById(id).get();			
		} catch (Exception e) {
			throw new NullPointerException(e.getMessage());
		}
	}

	@Override
	public String deleteById(Long id) {
		try {
			if(productRepository.findById(id).isEmpty()) {
				throw new NullPointerException("no product is available with that id to delete");
			}
			productRepository.deleteById(id);
			return "successfully deleted product by provided Id"; 			
		} catch (Exception e) {
			throw new NullPointerException(e.getMessage());
		}
	}

	@Override
	public String updateById(Long id, Product product) throws InValidException {
		try {
			if(productRepository.findById(id).isEmpty()) {
				throw new NullPointerException("no product is available with that id to update");
			}
			String res = validations.isValid(product);
			if(!res.equals("valid")) {
				throw new InValidException("provided new product isn't valid");
			}
			Product old = productRepository.findById(id).get();
			BeanUtils.copyProperties(product, old);					//after copying new data to old, the generated id value is changed, so we manully updated below
			old.setId(id);
			productRepository.save(old);
			return "Successfully updated product by provided Id";			
		} catch (Exception e) {
			throw new InValidException(e.getMessage());
		}
		
	}


}
