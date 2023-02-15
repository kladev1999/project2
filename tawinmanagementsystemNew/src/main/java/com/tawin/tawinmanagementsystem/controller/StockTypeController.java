package com.tawin.tawinmanagementsystem.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tawin.tawinmanagementsystem.entity.StockType;
import com.tawin.tawinmanagementsystem.exception.ResourceNotFoundException;
import com.tawin.tawinmanagementsystem.repository.StockTypeRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/stockType")
public class StockTypeController {
	@Autowired
	StockTypeRepository stockTypeRepo;
	

	@GetMapping("/getStockType")
	public List<StockType> getStockType(){
		return (List<StockType>) stockTypeRepo.findAll();
	}
	
	@GetMapping("/getstockType1/{stockType_ID}")
	public List<StockType> getStockTypeByIDd(@PathVariable Long stockType_ID){
	    return (List<StockType>) stockTypeRepo.findStockTypeByName(stockType_ID);
	}
	
	@PostMapping("/addStockType")
	public StockType setStockType(@RequestBody StockType stockType){
		
		return stockTypeRepo.save(stockType);
	}
	
	@GetMapping("/getStockType/{stockType_ID}")
	public ResponseEntity <StockType> getStockTypeById(@PathVariable Long stockType_ID) {
		StockType stockType = stockTypeRepo.findById(stockType_ID)
				.orElseThrow(() -> new ResourceNotFoundException("StockType not exist with id :" + stockType_ID));
		return ResponseEntity.ok(stockType);
	
	}

	
	@PutMapping("/updateStockType/{stockType_ID}")
	public ResponseEntity<StockType> updateStockType(@PathVariable Long stockType_ID,@RequestBody StockType stockTypeDetails){
		StockType stockType = stockTypeRepo.findById(stockType_ID)
				.orElseThrow(() -> new ResourceNotFoundException("StockType not exist with id :" + stockType_ID));
		
		stockType.setStockType_Name(stockTypeDetails.getStockType_Name());
		stockType.setStockType_Unit(stockTypeDetails.getStockType_Unit());
		StockType updateStockType = stockTypeRepo.save(stockType);
		return ResponseEntity.ok(updateStockType);
	}
	
	@DeleteMapping("/deleteStockType/{stockType_ID}")
	public ResponseEntity<Map<String, Boolean>> deleteStock(@PathVariable Long stockType_ID){
		StockType stockType = stockTypeRepo.findById(stockType_ID)
				.orElseThrow(() -> new ResourceNotFoundException("StockType not exist with id :" + stockType_ID));
		
		stockTypeRepo.delete(stockType);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
