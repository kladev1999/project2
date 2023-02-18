package com.tawin.tawinmanagementsystem.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.sql.Connection;
import java.sql.DriverManager;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.util.SystemPropertyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tawin.tawinmanagementsystem.entity.Income;
import com.tawin.tawinmanagementsystem.entity.Menu;
import com.tawin.tawinmanagementsystem.entity.Order_Menu;
import com.tawin.tawinmanagementsystem.entity.Stock;
import com.tawin.tawinmanagementsystem.entity.StockType;
import com.tawin.tawinmanagementsystem.entity.Stock_Menu;
import com.tawin.tawinmanagementsystem.exception.ResourceNotFoundException;
import com.tawin.tawinmanagementsystem.repository.Order_MenuRepository;
import com.tawin.tawinmanagementsystem.repository.StockRepository;
import com.tawin.tawinmanagementsystem.repository.StockTypeRepository;
import com.tawin.tawinmanagementsystem.repository.Stock_MenuRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/OrderMenu")
public class OrderMenuController {

	@Autowired
	Order_MenuRepository orderMenuRepo;
	Stock stock;

	@Autowired
	Stock_MenuRepository stockMenuRepo;

	@Autowired
	StockRepository stockRepo;

	@Autowired
	StockTypeRepository stockTypeRepo;

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

	@GetMapping("/getListOrderMenu/{totalOrder_ID}/{statusTable}")
	public List<Order_Menu> getStockTypeByIDd(@PathVariable String totalOrder_ID,@PathVariable Integer statusTable) {

		return (List<Order_Menu>) orderMenuRepo.findByTotalOrder_ID(totalOrder_ID, statusTable);
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
	@GetMapping("/loopList/{menu_ID}")
	public List<Long> getListInt(@PathVariable Long menu_ID) {
		return (List<Long>) orderMenuRepo.findStock(menu_ID);
	}

	@GetMapping("/loopCost/{menu_ID}")
	public int getCost(@PathVariable Long menu_ID) {
		int cost = 0;
		for (int i = 0; i < getListInt(menu_ID).size(); i++) {
			cost += orderMenuRepo.findCostMenu(getListInt(menu_ID).get(i), menu_ID);
		}
		return cost;
	}

	//ใช้แล้ว
	// รายรับ รายจ่าย รวมทุกเมนู
	@GetMapping("/incomeAllDetailMenu")
	public ArrayList<Income> incomeAllMenu() {
		List<Long> ss = orderMenuRepo.findMenu();
		ArrayList<Income> income = new ArrayList<Income>();
		for (int index = 0; index < ss.size(); index++) {
			Income newIncome = new Income();
			String nameMenu = orderMenuRepo.findMenuByID(ss.get(index));
			
			int cost = 0;
			int qtyByMenu = 0;
			int menuPrice = 0;
			int totalCost = 0;
			int totalSell = 0;
			int proFit = 0;
//			for (int i = 0; i < getListInt(ss.get(index)).size(); i++) {
//				cost += orderMenuRepo.findCostMenu(getListInt(ss.get(i)).get(i), ss.get(i));
			cost += getCost(ss.get(index));
//			}
			qtyByMenu = orderMenuRepo.findAllDetail(ss.get(index));
			menuPrice = orderMenuRepo.findMenuInOrderMenu(ss.get(index));
			totalCost = (cost * qtyByMenu);
			totalSell = (qtyByMenu * menuPrice);
			proFit = (totalSell - totalCost);
			if (proFit < 0) {
				proFit = (proFit * -1);
			}

			newIncome.setMenu_ID(ss.get(index));
			newIncome.setMenu_Name(nameMenu);
			newIncome.setCost(cost);
			newIncome.setMenuPrice(menuPrice);
			newIncome.setQtyByMenu(qtyByMenu);
			newIncome.setTotalCost(totalCost);
			newIncome.setTotalSell(totalSell);
			newIncome.setProFit(proFit);

			income.add(newIncome);

		}

		return income;
	}

	
	//ใช้แล้ว 
	@GetMapping("/incomeAllDetailMenus")
	public ArrayList<Integer> incomeAllMenus() {
		ArrayList<Income> income = new ArrayList<Income>();
		ArrayList<Integer> total = new ArrayList<Integer>();
		int totalAllSell = 0;
		int totalAllProfit = 0;
		int totalDiscount = orderMenuRepo.totalDiscount();
		int totalCost = 0;
		income.addAll(incomeAllMenu());

		for (int i = 0; i < income.size(); i++) {
			totalAllSell += (income.get(i).getMenuPrice() * income.get(i).getQtyByMenu());
			totalAllProfit += (income.get(i).getTotalSell() - income.get(i).getTotalCost());
			totalCost += income.get(i).getTotalCost();
		}


		total.add(totalAllSell);
		total.add(totalAllProfit);
		total.add(totalDiscount);
		total.add(totalAllProfit - totalDiscount);
		total.add(totalCost);

		
		

		return total;
	}

	//ใช้แล้ว
	//ใช้เฉพาะวัน 
	@GetMapping("/incomeAllByDate/{date}")
	public ArrayList<Income> incomeAllByDate(@PathVariable String date) {
		List<Long> ss = orderMenuRepo.findMenu();
		ArrayList<Income> income = new ArrayList<Income>();
		for (int index = 0; index < ss.size(); index++) {
			income.add(incomeOneMenu(ss.get(index), date));
		}
		return income;
	}
	
	//ใช้แล้ว
	@GetMapping("/incomeAllBetweenBydate/{startDate}/{endDate}")
	public ArrayList<Income> incomeAllBetWeen(@PathVariable String startDate,@PathVariable String endDate){
		List<Long> ss = orderMenuRepo.findMenu();
		ArrayList<Income> income = new ArrayList<Income>();
		for (int index = 0; index < ss.size(); index++) {
			income.add(incomeBetween(ss.get(index),startDate,endDate));
		}
		return income;
	}

	
	//ใช้แล้ว
	//จะใช้อันนี้เฉพาะตอนที่ enddate == null
	// รายงานข้อมูลรายรับ - รายจ่าย เฉพาะเมนู
	@GetMapping("/incomeCost/{menu_ID}/{date}")
	public Income incomeOneMenu(@PathVariable Long menu_ID, @PathVariable String date) {
		String[] date2 = date.split("-");
		Income income = new Income();
		String nameMenu = orderMenuRepo.findMenuByID(menu_ID);
		int distcount = orderMenuRepo.discountByDate(date2[2], date2[1], date2[0]);
		int cost = 0;
		int qtyByMenu = 0;
		int menuPrice = 0;
		int totalCost = 0;
		int totalSell = 0;
		int proFit = 0;
		for (int i = 0; i < getListInt(menu_ID).size(); i++) {
			cost += orderMenuRepo.findCostMenu(getListInt(menu_ID).get(i), menu_ID);
		}
		qtyByMenu = orderMenuRepo.findMenuDate(menu_ID, date2[2], date2[1], date2[0]);
		menuPrice = orderMenuRepo.findMenuInOrderMenu(menu_ID);
		totalCost = (cost * qtyByMenu);
		totalSell = (qtyByMenu * menuPrice);
		proFit = (totalSell - totalCost);
		if (proFit < 0) {
			proFit = (proFit * -1);
		}
		income.setMenu_ID(menu_ID);
		income.setMenu_Name(nameMenu);
		income.setCost(cost);
		income.setMenuPrice(menuPrice);
		income.setQtyByMenu(qtyByMenu);
		income.setTotalCost(totalCost);
		income.setTotalSell(totalSell);
		income.setProFit(proFit);
		income.setDiscount(distcount);

		return income;
	}

	//ใช้แล้ว
	//ใช้ตอนที่ enddate != null
	// การดูรายรับ รายจ่าย ระหว่างช่วงเวลา เฉพาะเมนู
	// http://localhost:8080/OrderMenu/incomeBetween/18/2023-02-10/2023-02-14
	// ฟอร์มการส่ง
	@GetMapping("/incomeBetween/{menu_ID}/{startDate}/{endDate}")
	public Income incomeBetween(@PathVariable Long menu_ID, @PathVariable String startDate,
			@PathVariable String endDate) {
		Income income = new Income();
		String nameMenu = orderMenuRepo.findMenuByID(menu_ID);
		int discount = orderMenuRepo.discountBetween(startDate, endDate);
		int cost = 0;
		int qtyByMenu = 0;
		int menuPrice = 0;
		int totalCost = 0;
		int totalSell = 0;
		int proFit = 0;
		for (int i = 0; i < getListInt(menu_ID).size(); i++) {
			cost += orderMenuRepo.findCostMenu(getListInt(menu_ID).get(i), menu_ID);
		}
		qtyByMenu = orderMenuRepo.findQtyMenu(menu_ID, startDate, endDate);
		menuPrice = orderMenuRepo.findMenuInOrderMenu(menu_ID);
		totalCost = (cost * qtyByMenu);
		totalSell = (qtyByMenu * menuPrice);
		proFit = (totalSell - totalCost);
		if (proFit < 0) {
			proFit = (proFit * -1);
		}

		income.setMenu_ID(menu_ID);
		income.setMenu_Name(nameMenu);
		income.setCost(cost);
		income.setMenuPrice(menuPrice);
		income.setQtyByMenu(qtyByMenu);
		income.setTotalCost(totalCost);
		income.setTotalSell(totalSell);
		income.setProFit(proFit);
		income.setDiscount(discount);
		return income;
	}

	
	//ใช้แล้ว
	//ใช้เฉพาะ enddate == null
	// รายงานข้อมูลรายรับ - รายจ่าย ทุกเมนู
	@GetMapping("/incomeAll/{date}")
	public ArrayList<Integer> incomeMenus(@PathVariable String date) {

		ArrayList<Income> income = new ArrayList<Income>();
		ArrayList<Integer> total = new ArrayList<Integer>();
		int totalAllSell = 0;
		int totalAllProfit = 0;
		int discount = 0;
		int totalCost = 0;
		List<Long> ss = orderMenuRepo.findMenu();
		for (int i = 0; i < ss.size(); i++) {
			income.add(incomeOneMenu(ss.get(i), date));
		}
		for (int i = 0; i < income.size(); i++) {
			totalAllSell += (income.get(i).getMenuPrice() * income.get(i).getQtyByMenu());
			totalAllProfit += (income.get(i).getTotalSell() - income.get(i).getTotalCost());
			totalCost += income.get(i).getTotalCost();
		}
		
		
		
		
		total.add(totalAllSell);
		total.add(totalAllProfit);
		total.add(income.get(0).getDiscount());
		total.add(totalAllProfit - income.get(0).getDiscount());
		total.add(totalCost);
		
		System.out.println(total);

		

		return total;
	}

	
	//ใช้ตอนที่ enddate != null
	// การรายงานรายรับรายจ่าย ระหว่างช่วงเวลาทุกเมนู
	// http://localhost:8080/OrderMenu/incomeBetweenAllMenu/2023-02-10/2023-02-14
	// แบบฟอร์มการส่ง
	@GetMapping("/incomeBetweenAllMenu/{startDate}/{endDate}")
	public ArrayList<Integer> incomeBetweenAllMenu(@PathVariable String startDate, @PathVariable String endDate) {
		ArrayList<Income> income = new ArrayList<Income>();
		ArrayList<Integer> total = new ArrayList<Integer>();
		int totalAllSell = 0;
		int totalAllProfit = 0;
		int totalCost = 0;
		List<Long> ss = orderMenuRepo.findMenu();
		for (int i = 0; i < ss.size(); i++) {
			income.add(incomeBetween(ss.get(i), startDate, endDate));
		}
		for (int i = 0; i < income.size(); i++) {
			totalAllSell += (income.get(i).getMenuPrice() * income.get(i).getQtyByMenu());
			totalAllProfit += (income.get(i).getTotalSell() - income.get(i).getTotalCost());
			totalCost += income.get(i).getTotalCost();
		}
		total.add(totalAllSell);
		total.add(totalAllProfit);
		total.add(income.get(0).getDiscount());
		total.add(totalAllProfit - income.get(0).getDiscount());
		total.add(totalCost);
		
		

		System.out.println(totalAllSell);
		System.out.println(totalAllProfit);

		return total;
	}



	
	// Loop หาวัตถุดิบ พร้อมตัดสต๊อก
	// ตัวนี้เวิร์คลองแล้ว
	@GetMapping("/cutLoopStock/{menu_ID}/{qtyMenu}")
	public String loopStockCut(@PathVariable Long menu_ID, @PathVariable int qtyMenu) {
		int stocktypeid = 5;
		for (int q = 0; q < qtyMenu; q++) {
			for (int i = 0; i < getListInt(menu_ID).size(); i++) {
				int qtyStock = 0;
				int qtyStock_Menu = 0;
				int qtyNagative = 0;
				LocalDateTime qty_timeStamp = LocalDateTime.now();
				List<Stock> stock = stockRepo.findAll();
				List<Stock_Menu> stock_menu = stockMenuRepo.findAll();

				Stock stockUpdate = null;
				Stock stockNagative = null;

				for (int a = 0; a < stock_menu.size(); a++) {
					if (stock_menu.get(a).getStockType_ID().getStockType_ID() == getListInt(menu_ID).get(i)
							&& stock_menu.get(a).getMenu_ID().getMenu_ID() == menu_ID) {
						qtyStock_Menu = stock_menu.get(a).getStockMenu_Qty();
						break;
					}
				}
				for (int b = 0; b < stock.size(); b++) {
					if (stock.get(b).getStockType_ID().getStockType_ID() == getListInt(menu_ID).get(i)) {
						qtyStock = stock.get(b).getStock_Qty();
						stockUpdate = stockRepo.findById(stock.get(b).getStock_ID())
								.orElseThrow(() -> new ResourceNotFoundException("Stock not exist with id :" + 2));
						if (stock.get(b).getStock_Qty() <= 0 || stock.get(b).getStock_Qty() - qtyStock_Menu <= 0) {
							qtyNagative = stock.get(b).getStock_Qty();
							qty_timeStamp = stock.get(b).getStock_TimeStamp();
							stockRepo.delete(stockUpdate);
							System.out.println(qtyNagative * -1);
							for (int k = 0; k < stock.size(); k++) {
								if (stock.get(k).getStock_TimeStamp().isAfter(qty_timeStamp)
										&& stock.get(k).getStockType_ID().getStockType_ID() == getListInt(menu_ID)
												.get(i)
										&& stock.get(k).getStock_Qty() >= 0
										|| stock.get(k).getStock_Qty() - qtyStock_Menu > 0 && stock.get(k)
												.getStockType_ID().getStockType_ID() == getListInt(menu_ID).get(i)) {
									stockNagative = stockRepo.findById(stock.get(k).getStock_ID()).orElseThrow(
											() -> new ResourceNotFoundException("Stock not exist with id :" + 2));
									stockNagative.setStock_Qty(stockNagative.getStock_Qty() - qtyNagative);

									stockRepo.save(stockNagative);

									break;
								}
							}
						}

						else {
							stockUpdate.setStock_Qty(qtyStock - qtyStock_Menu);
							stockRepo.save(stockUpdate);
						}
						break;

					}

				}

			}
		}
		try {

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

	@GetMapping("/Cancel/{orderMenu_ID}/{Emp}")
	public int cancel(@PathVariable Long orderMenu_ID,@PathVariable String Emp) {
		return orderMenuRepo.Cancel(orderMenu_ID,Emp);
	}

	@GetMapping("/finished/{orderMenu_ID}")
	public int finishedStatus(@PathVariable Long orderMenu_ID) {
		return orderMenuRepo.finishedStatus(orderMenu_ID);
	}

// การรวมโต๊ะ
	@GetMapping("/mergeTable/{totalOrder_ID}/{pointTable}")
	public int mergeTable(@PathVariable int totalOrder_ID, @PathVariable String pointTable) {
		orderMenuRepo.mergeTable(totalOrder_ID, pointTable);
		return orderMenuRepo.mergeTable(totalOrder_ID, pointTable);
	}



}
