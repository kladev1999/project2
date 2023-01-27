package com.tawin.tawinmanagementsystem.controller;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tawin.tawinmanagementsystem.entity.BackupStock;
import com.tawin.tawinmanagementsystem.entity.Stock;
import com.tawin.tawinmanagementsystem.exception.ResourceNotFoundException;
import com.tawin.tawinmanagementsystem.repository.BackupStockRepository;
import com.tawin.tawinmanagementsystem.repository.StockRepository;

//import Util.SecurityUtil;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/stock")
public class StockController {
	@Autowired
	StockRepository stockRepo;
	
	@Autowired
	BackupStockRepository backupRepo;
	
	Stock stock;
	
//	SecurityUtil util;
	
	
	
	@GetMapping("/stockFindAll")
	public List<Stock> getAll(){
		
	return (List<Stock>) stockRepo.findAllStockSQL();
	}
	
	// หาวัตถุดิบ
    @GetMapping("/getListInt/{menu_ID}")
    public List<String>getListInt(@PathVariable Long menu_ID){
        return (List<String>) stockRepo.findStock(menu_ID);
    }
	
	// Loop หาวัตถุดิบ พร้อมตัดสต๊อก
	//ตัวนี้เวิร์คลองแล้ว
    @GetMapping("/getLoopStock2/{menu_ID}")
    public void loopStockCut(@PathVariable Long menu_ID) {
        for(int i = 0; i < getListInt(menu_ID).size();i++ ) {
            stockRepo.stockCutLoop(getListInt(menu_ID).get(i));
        }
    }
    
	
	
	@GetMapping("/getStock")
	public List<Stock> getStock(){
		
		return (List<Stock>) stockRepo.findAll();
	}
	
//	ตัดสต๊อกแบบส่ง StockType_ID ไปที่ stockCut
	@GetMapping("/stockCut/{stockType_ID}")
	public int stockCut(@PathVariable Long stockType_ID){
	    return stockRepo.stockCut(stockType_ID);
	}
	
	@PostMapping("/addStock")
	public Stock createStock(@RequestBody Stock stock) {
		stock.setStock_TimeStamp(LocalDateTime.now());
		stockRepo.save(stock);
		backupRepo.insertBackupStock();
		return stock;
	}
	
	@GetMapping("/getStock/{stock_ID}")
	public ResponseEntity <Stock> getStockById(@PathVariable Long stock_ID) {
		Stock stock = stockRepo.findById(stock_ID)
				.orElseThrow(() -> new ResourceNotFoundException("Stock not exist with id :" + stock_ID));
		return ResponseEntity.ok(stock);
	
	}
	
	
	@PutMapping("/updateStock/{stock_ID}")
	public ResponseEntity<Stock> updateStock(@PathVariable Long stock_ID,@RequestBody Stock stockDetails){
		Stock stock = stockRepo.findById(stock_ID)
				.orElseThrow(() -> new ResourceNotFoundException("Stock not exist with id :" + stock_ID));
		stock.setStock_Qty(stockDetails.getStock_Qty());
		stock.setStock_Cost(stockDetails.getStock_Cost());
		stock.setStock_Min(stockDetails.getStock_Min());
		stock.setStockType_ID(stockDetails.getStockType_ID());
		Stock updateStock = stockRepo.save(stock);
		return ResponseEntity.ok(updateStock);
	}
	
	@DeleteMapping("/deleteStock/{stock_ID}")
	public ResponseEntity<Map<String, Boolean>> deleteStock(@PathVariable Long stock_ID){
		Stock stock =stockRepo.findById(stock_ID)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + stock_ID));
		
		stockRepo.delete(stock);
	
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
