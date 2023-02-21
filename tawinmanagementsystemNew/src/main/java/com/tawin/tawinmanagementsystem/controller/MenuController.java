package com.tawin.tawinmanagementsystem.controller;


import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.TimeZone;

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

import com.tawin.tawinmanagementsystem.entity.Menu;
import com.tawin.tawinmanagementsystem.entity.Stock_Menu;
import com.tawin.tawinmanagementsystem.exception.ResourceNotFoundException;
import com.tawin.tawinmanagementsystem.repository.MenuRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/menu")
public class MenuController {
	@Autowired
	MenuRepository menuRepo;
	
	
	@GetMapping("/getMenu")
	public List<Menu> getMenu(){
		return (List<Menu>) menuRepo.findAll();
	}

	@GetMapping("/getMenu/{menu_ID}")
	public ResponseEntity <Menu> getMenuById(@PathVariable Long menu_ID) {
		Menu menu = menuRepo.findById(menu_ID)
				.orElseThrow(() -> new ResourceNotFoundException("Menu not exist with id :" + menu_ID));
		return ResponseEntity.ok(menu);
	
	}
	
	@CrossOrigin(origins = "*")
	@GetMapping("/findMenuInStockMenu/{menu_ID}")
	public ArrayList<Stock_Menu> findMenuInStockMenu(@PathVariable Long menu_ID){
		ArrayList<Stock_Menu> stockMenu = new ArrayList<Stock_Menu>();
		stockMenu.addAll(menuRepo.findMenuInStockMenu((Long) menu_ID));
		return stockMenu;
	}

	@PostMapping("/addMenu")
	public Menu createMenu(@RequestBody Menu menu) {
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Bangkok"));
		int hours = calendar.get(Calendar.HOUR_OF_DAY);
        int minutes = calendar.get(Calendar.MINUTE);
        int sec = calendar.get(Calendar.SECOND);
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        int month = calendar.get(Calendar.MONTH);
        int year = calendar.get(Calendar.YEAR);

        String datetime = "D"+day+"-"+month+"-"+year+"-T"+hours+"."+minutes+"."+sec;

		menu.setMenu_TimeStamp(LocalDateTime.now());
		menu.setMenu_Pic(datetime+".jpg");
		menuRepo.save(menu);
		
		return menu;
	}

	@GetMapping("/getSearchMenu/{Datetime}")
	public List<Menu> getDatetime(@PathVariable String Datetime) {
		System.out.println("ssssss"+Datetime);
		return (List<Menu>) menuRepo.getDatetime(Datetime);
	}
	
	@PutMapping("/updateMenu/{menu_ID}")
	public ResponseEntity<Menu> updateStock(@PathVariable Long menu_ID,@RequestBody Menu menuDetails){

		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Bangkok"));

		int hours = calendar.get(Calendar.HOUR_OF_DAY);
        int minutes = calendar.get(Calendar.MINUTE);
        int sec = calendar.get(Calendar.SECOND);
        int day = calendar.get(Calendar.DAY_OF_MONTH);
        int month = calendar.get(Calendar.MONTH);
        int year = calendar.get(Calendar.YEAR);

        String datetime = "D"+day+"-"+month+"-"+year+"-T"+hours+"."+minutes+"."+sec;

		Menu menu = menuRepo.findById(menu_ID)
				.orElseThrow(() -> new ResourceNotFoundException("menu not exist with id :" + menu_ID));
		menu.setMenu_Name(menuDetails.getMenu_Name());
		menu.setMenu_Price(menuDetails.getMenu_Price());
	
		menu.setTypeMenu_ID(menuDetails.getTypeMenu_ID());
		
		if(menuDetails.getMenu_Pic() == null){
			menu.setMenu_Pic(datetime+".jpg");
		}else{
			menu.setMenu_Pic(menuDetails.getMenu_Pic());
		}
		System.out.println(menuDetails.getMenu_Pic());
		Menu updateMenu = menuRepo.save(menu);
		return ResponseEntity.ok(updateMenu);
	}
	
	@DeleteMapping("/deleteMenu/{menu_ID}")
	public ResponseEntity<Map<String, Boolean>> deleteMenu(@PathVariable Long menu_ID){
		Menu menu = menuRepo.findById(menu_ID)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + menu_ID));
		
		menuRepo.delete(menu);
	
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
