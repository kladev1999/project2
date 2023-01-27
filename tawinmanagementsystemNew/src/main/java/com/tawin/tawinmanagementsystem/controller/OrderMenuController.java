package com.tawin.tawinmanagementsystem.controller;


import java.util.HashMap;
import java.time.LocalDateTime;
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


import com.tawin.tawinmanagementsystem.entity.Order_Menu;
import com.tawin.tawinmanagementsystem.entity.Stock;
import com.tawin.tawinmanagementsystem.exception.ResourceNotFoundException;
import com.tawin.tawinmanagementsystem.repository.Order_MenuRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/OrderMenu")
public class OrderMenuController {

	@Autowired
	Order_MenuRepository orderMenuRepo;
	Stock stock;

	@GetMapping("/getOrderMenu")
	public List<Order_Menu> getOrderMenu() {
		return (List<Order_Menu>) orderMenuRepo.findAll();
	}

	@GetMapping("/getbestseller")
	public List<Object> getbestseller() {
		return (List<Object>) orderMenuRepo.Bestseller();
	}

	@GetMapping("/kitchenShow/{Datetime}")
	public List<Order_Menu> getKitchen(@PathVariable String Datetime) {
		return (List<Order_Menu>) orderMenuRepo.kitchenShow(Datetime);
	}

	@PostMapping("/addOrderMenu")
	public Order_Menu addOrderMenu(@RequestBody Order_Menu orderMenu) {
		orderMenu.setOrderMenu_TimeStamp(LocalDateTime.now());

		return orderMenuRepo.save(orderMenu);
	}

	@PostMapping("/addOrderMenus")
	public List<Order_Menu> createOrder_Menus(@RequestBody List<Order_Menu> order_menu) {
		order_menu.forEach(ordermenu -> {
			if (!ordermenu.equals(null)) {
				ordermenu.setOrderMenu_TimeStamp(LocalDateTime.now());

				orderMenuRepo.save(ordermenu);
			}
		});
		return order_menu;
	}

	@GetMapping("/getOrderMenu/{orderMenu_ID}")
	public ResponseEntity<Order_Menu> getOrderMenuById(@PathVariable Integer orderMenu_ID) {
		Order_Menu orderMenu = orderMenuRepo.findById(orderMenu_ID)
				.orElseThrow(() -> new ResourceNotFoundException("OrderMenu not exist with ID:" + orderMenu_ID));
		return ResponseEntity.ok(orderMenu);
	}

	@GetMapping("/getListOrderMenu/{totalOrder_ID}")
	public List<Order_Menu> getStockTypeByIDd(@PathVariable Integer totalOrder_ID) {

		return (List<Order_Menu>) orderMenuRepo.findByTotalOrder_ID(totalOrder_ID);
	}

	@PutMapping("/updateOrderMenu/{orderMenu_ID}")
	public ResponseEntity<Order_Menu> updateOrderMenu(@PathVariable Integer orderMenu_ID,
			@RequestBody Order_Menu orderMenuDetails) {
		Order_Menu orderMenu = orderMenuRepo.findById(orderMenu_ID)
				.orElseThrow(() -> new ResourceNotFoundException("OrderMenu not exist with ID:" + orderMenu_ID));

		orderMenu.setOrderMenu_Qty(orderMenuDetails.getOrderMenu_Qty());
		orderMenu.setMenu_ID(orderMenuDetails.getMenu_ID());
		orderMenu.setTotalOrder_ID(orderMenuDetails.getTotalOrder_ID());
		orderMenu.setMenu_ID(orderMenuDetails.getMenu_ID());
		orderMenu.setTotalOrder_ID(orderMenuDetails.getTotalOrder_ID());
		Order_Menu updateOrderMenu = orderMenuRepo.save(orderMenu);
		return ResponseEntity.ok(updateOrderMenu);

	}

	@DeleteMapping("/deleteOrderMenu/{orderMenu_ID}")
	public ResponseEntity<Map<String, Boolean>> deleteOrderMenu(@PathVariable Integer orderMenu_ID) {
		Order_Menu orderMenu = orderMenuRepo.findById(orderMenu_ID)
				.orElseThrow(() -> new ResourceNotFoundException("OrderMenu not exist with ID:" + orderMenu_ID));
		orderMenuRepo.delete(orderMenu);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	// หาวัตถุดิบ
	public List<String> getListInt(@PathVariable Long menu_ID) {
		return (List<String>) orderMenuRepo.findStock(menu_ID);
	}

	// Loop หาวัตถุดิบ พร้อมตัดสต๊อก
	// ตัวนี้เวิร์คลองแล้ว
	@GetMapping("/cutLoopStock/{menu_ID}/{qtyMenu}")
	public String loopStockCut(@PathVariable Long menu_ID, @PathVariable int qtyMenu) {
		int menuID;
		int qty_nagative = 0;
		for (int q = 0; q < qtyMenu; q++) {
			for (int i = 0; i < getListInt(menu_ID).size(); i++) {
				qty_nagative = orderMenuRepo.findStock_Nagative_Qty(getListInt(menu_ID).get(i), menu_ID);
				if (qty_nagative <= 0) {
					findStock_Nagative(menu_ID, i, qty_nagative);
				} else {
					orderMenuRepo.stockCutLoop(getListInt(menu_ID).get(i));
				}
				qty_nagative = 0;
			}
		}
		try {
			menuID = orderMenuRepo.menuFind(menu_ID);
		} catch (Exception e) {
			return "Menu_ID not found";
		}

		return "Menu_ID OK";
	}

	// Loop หาวัตถุดิบพร้อมเพิ่มสต๊อก
	@GetMapping("/addLoppStock/{menu_ID}")
	public void loopStockAdd(@PathVariable Long menu_ID) {
		for (int i = 0; i < getListInt(menu_ID).size(); i++) {
			orderMenuRepo.stockAddLoop(getListInt(menu_ID).get(i));
		}
	}

	// ถูกเรียกใช้ใน loopStockCut
	public void findStock_Nagative(@PathVariable Long menu_ID, int i, int qty_nagative) {
		String qty_timeStamp;
		qty_timeStamp = orderMenuRepo.findStock_Nagative_TimeStamp(getListInt(menu_ID).get(i));
		// หาเวลาเพื่อ ลบ Record ที่ติดลบ
		orderMenuRepo.findStockDateTime(qty_timeStamp.toString());
		orderMenuRepo.updateStockFromNagative(qty_nagative, getListInt(menu_ID).get(i).toString());
		qty_nagative = 0;
	}

	@GetMapping("/orderMenuTop5")
	public List<Order_Menu> menu_top_5() {
		return orderMenuRepo.menuTop5();
	}

//    Update Status
	@GetMapping("/status/{orderMenu_ID}")
	public int updateStatus(@PathVariable Long orderMenu_ID) {
		return orderMenuRepo.updateStatus(orderMenu_ID);
	}

	@GetMapping("/statusCancel/{orderMenu_ID}")
	public int cancelStatus(@PathVariable Long orderMenu_ID) {
		return orderMenuRepo.cancelStatus(orderMenu_ID);
	}

// การรวมโต๊ะ
	@GetMapping("/mergeTable/{totalOrder_ID}/{pointTable}")
	public int mergeTable(@PathVariable int totalOrder_ID, @PathVariable int pointTable) {
		orderMenuRepo.mergeTable(totalOrder_ID, pointTable);
		return pointTable;
	}
	
	@GetMapping("/dayCost")
	public List<Object> dayCost() {
		return orderMenuRepo.dayCost();
	}
	
	@GetMapping("/monthCost")
	public List<Object> monthCost(){
		return orderMenuRepo.monthCost();
	}
	
	@GetMapping("/yearCost")
	public List<Object> yearCost(){
		return orderMenuRepo.yearCost();
	}
	
	@GetMapping("/yearIncome")
	public List<Object> yearIncome(){
		return orderMenuRepo.yearIncome();
	}
	
	@GetMapping("/monthIncome")
	public List<Object> monthIncome(){
		return orderMenuRepo.monthIncome();
	}
	
	@GetMapping("/dayIncome")
	public List<Object> dayIncome(){
		return orderMenuRepo.dayIncome();
	}

}
