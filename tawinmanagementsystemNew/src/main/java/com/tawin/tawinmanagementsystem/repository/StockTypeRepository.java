package com.tawin.tawinmanagementsystem.repository;




import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tawin.tawinmanagementsystem.entity.StockType;

import java.util.List;
 

public interface StockTypeRepository extends JpaRepository<StockType,Long>{

    
    @Query(value = "SELECT * FROM stock_type where stock_type_id = :stockType_ID",nativeQuery = true)
    List<StockType>findStockTypeByName(Long stockType_ID);  
	
	
}
