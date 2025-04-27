package com.mindtree.restaurant.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mindtree.restaurant.entity.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item,Long>{
	
	List<Item> findByCategory(String category);

}
