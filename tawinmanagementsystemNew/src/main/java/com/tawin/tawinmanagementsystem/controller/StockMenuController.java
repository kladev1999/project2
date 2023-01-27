package com.tawin.tawinmanagementsystem.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.tawin.tawinmanagementsystem.entity.Stock_Menu;
import com.tawin.tawinmanagementsystem.exception.ResourceNotFoundException;
import com.tawin.tawinmanagementsystem.repository.Stock_MenuRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/stock_menu")
public class StockMenuController {
	@Autowired
	Stock_MenuRepository stockMenuRepo;
	
	@GetMapping("/getStockMenu")
	public List<Stock_Menu> getStock_Menu() {
		return (List<Stock_Menu>) stockMenuRepo.findAll();
	}
	
	@PostMapping("/addStockMenu")
	public Stock_Menu createStock_Menu(@RequestBody Stock_Menu stock_menu) {
		
		stock_menu.setStockMenu_TimeStamp(LocalDateTime.now());
		stock_menu.setStockMenu_Status("null");
		stockMenuRepo.save(stock_menu);
		return stock_menu;
	}
	
	@PostMapping("/addStockMenus")
	public List<Stock_Menu> createStock_Menus(@RequestBody List<Stock_Menu> stock_menu) {
		
		stock_menu.forEach(stock->{
			if(!stock.equals(null)) {
				stock.setStockMenu_TimeStamp(LocalDateTime.now());
				stock.setStockMenu_Status("null");
				stockMenuRepo.save(stock);
			}
		});
		return stock_menu;
	}
	
	@GetMapping("/getStockMenu/{stockMenu_ID}")
	public ResponseEntity <Stock_Menu> getStock_MenuById(@PathVariable Long stockMenu_ID) {
		Stock_Menu stock_menu = stockMenuRepo.findById(stockMenu_ID)
				.orElseThrow(() -> new ResourceNotFoundException("Stock not exist with id :" + stockMenu_ID));
		return ResponseEntity.ok(stock_menu);
	
	}
	
	
	@PutMapping("/updateStockMenu/{stockMenu_ID}")
	public ResponseEntity<Stock_Menu> updateStockMenu(@PathVariable Long stockMenu_ID,@RequestBody Stock_Menu stockMenuDetails){
		Stock_Menu stock_menu = stockMenuRepo.findById(stockMenu_ID)
				.orElseThrow(() -> new ResourceNotFoundException("StockMenu not exist with id :" + stockMenu_ID));
		
		stock_menu.setStockMenu_Qty(stockMenuDetails.getStockMenu_Qty());
		Stock_Menu updateStockMenu = stockMenuRepo.save(stock_menu);
		return ResponseEntity.ok(updateStockMenu);
	}
	
	@DeleteMapping("/deleteStockMenu/{stockMenu_ID}")
	public ResponseEntity<Map<String, Boolean>> deleteStockMenu(@PathVariable Long stockMenu_ID){
		Stock_Menu stock_menu =stockMenuRepo.findById(stockMenu_ID)
				.orElseThrow(() -> new ResourceNotFoundException("StockMenu not exist with id :" + stockMenu_ID));
		
		stockMenuRepo.delete(stock_menu);
	
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
