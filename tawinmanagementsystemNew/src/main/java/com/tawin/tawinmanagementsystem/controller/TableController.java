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


import com.tawin.tawinmanagementsystem.entity.TableTawin;
import com.tawin.tawinmanagementsystem.exception.ResourceNotFoundException;
import com.tawin.tawinmanagementsystem.repository.TableRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/table")
public class TableController {

	@Autowired
	TableRepository tableRepo;
	
	@GetMapping("/getTable")
	public List<TableTawin> getTable(){
		return (List<TableTawin>) tableRepo.findAll();
	}

	@GetMapping("/getDatetime/{Datetime}")
	public List<TableTawin> getDatetime(@PathVariable String Datetime) {
		return (List<TableTawin>) tableRepo.getTableDatetime(Datetime);
	}

	@GetMapping("/getmoveTable")
	public List<TableTawin> getmoveTable(){
		return (List<TableTawin>) tableRepo.GetmoveTableTawins();
	}
	

	@GetMapping("/moveTable/{table_id}/{total_order_ID}")
	public int mergeTable(@PathVariable int table_id,@PathVariable int total_order_ID) {
    	return (int) tableRepo.moveTableTawins(table_id,total_order_ID);
    	
    }
	
	@PostMapping("/addTable")
	public TableTawin addTable(@RequestBody TableTawin tableTawin) {
		return tableRepo.save(tableTawin);
	}

	
	@GetMapping("/getTotalOrderID/{table_ID}")
	public int getTotalOrder_ID(@PathVariable int table_ID) {
		return tableRepo.totalOrderFindID(table_ID);
	}


	
	@GetMapping("/getTable/{table_ID}")
	public ResponseEntity<TableTawin> getTableById(@PathVariable Integer table_ID){
		TableTawin tableTawin = tableRepo.findById(table_ID)
				.orElseThrow(()-> new ResourceNotFoundException("Table not exist with ID: "+ table_ID));
		return ResponseEntity.ok(tableTawin);
	}
	
	@PutMapping("/updateTable/{table_ID}")
	public ResponseEntity<TableTawin> updateTable(@PathVariable Integer table_ID,@RequestBody TableTawin tableTawinDetails){
		TableTawin tableTawin = tableRepo.findById(table_ID)
				.orElseThrow(() -> new ResourceNotFoundException("Table not exist with ID: "+ table_ID));
		tableTawin.setTable_Zone(tableTawinDetails.getTable_Zone());
		TableTawin updateTable = tableRepo.save(tableTawin);
		return ResponseEntity.ok(updateTable);
	}
	
	@DeleteMapping("/deleteTable/{table_ID}")
	public ResponseEntity<Map<String, Boolean>> deleteTable(@PathVariable Integer table_ID){
		TableTawin tableTawin = tableRepo.findById(table_ID)
				.orElseThrow(() -> new ResourceNotFoundException("Table not exist with id :" + table_ID));
		
		tableRepo.delete(tableTawin);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	
	

}
