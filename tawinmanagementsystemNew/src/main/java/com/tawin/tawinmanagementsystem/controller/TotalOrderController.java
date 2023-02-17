package com.tawin.tawinmanagementsystem.controller;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Calendar;
import java.util.TimeZone;
import org.springframework.security.access.prepost.PreAuthorize;
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

import com.tawin.tawinmanagementsystem.entity.Total_Order;
import com.tawin.tawinmanagementsystem.exception.ResourceNotFoundException;
import com.tawin.tawinmanagementsystem.repository.Total_OrderRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/totalOrder")
public class TotalOrderController {
	@Autowired
	Total_OrderRepository totalOrderRepo;

	@GetMapping("/getTotalOrder")
	public List<Total_Order> getTotalOrder() {
		return (List<Total_Order>) totalOrderRepo.getTotalOrder();
	}

	@GetMapping("/getDatetime/{Datetime}")
	public List<Total_Order> getDatetime(@PathVariable String Datetime) {
		return (List<Total_Order>) totalOrderRepo.getDatetime(Datetime);
	}

	@GetMapping("/getMytable/{Emp_id}/{Datetime}")
	public List<Total_Order> getMytable(@PathVariable Integer Emp_id,@PathVariable String Datetime) {
		return (List<Total_Order>) totalOrderRepo.getMytable(Emp_id,Datetime);
	}

	@GetMapping("/Update_TotalPrice/{totalPrice}/{total_order_ID}")
	public int Update_TotalPrice(@PathVariable int totalPrice, @PathVariable int total_order_ID) {
		return (int) totalOrderRepo.Update_Totalprice(totalPrice, total_order_ID);
	}

	@GetMapping("/Update_Discount/{discount_id}/{compo_site}")
	public int Update_Discount(@PathVariable int discount_id, @PathVariable int compo_site) {
		return (int) totalOrderRepo.Update_Discount(discount_id, compo_site);
	}

	@PostMapping("/addTotalOrder")
	public Total_Order addTotalOrder(@RequestBody Total_Order totalOrder) {
		totalOrder.setTotalOrder_TimeStamp(LocalDateTime.now());
		totalOrder.setTotalOrder_Status("0");
		totalOrder.setAfterDiscount(0);
		// totalOrder.setCompoSite(0);
		return totalOrderRepo.save(totalOrder);
	}

	@GetMapping("/getTotalOrder/{totalOrder_ID}")
	public ResponseEntity<Total_Order> getTotalOrderById(@PathVariable Integer totalOrder_ID) {
		Total_Order totalOrder = totalOrderRepo.findById(totalOrder_ID)
				.orElseThrow(() -> new ResourceNotFoundException("OrderMenu not exist with ID:" + totalOrder_ID));
		return ResponseEntity.ok(totalOrder);
	}

	@PutMapping("/updateTotalOrder/{totalOrder_ID}")
	public ResponseEntity<Total_Order> updateTotalOrder(@PathVariable Integer totalOrder_ID,
			@RequestBody Total_Order totalOrderDetails) {
		Total_Order totalOrder = totalOrderRepo.findById(totalOrder_ID)
				.orElseThrow(() -> new ResourceNotFoundException("TotalOrder not exist with ID:" + totalOrder_ID));
		totalOrder.setOrderMenu_ID(totalOrderDetails.getOrderMenu_ID());
		totalOrder.setTable_ID(totalOrderDetails.getTable_ID());
		totalOrder.setTotalOrder_Status(totalOrderDetails.getTotalOrder_Status());
		totalOrder.setTotalPrice(totalOrderDetails.getTotalPrice());
		totalOrder.setTable_ID(totalOrderDetails.getTable_ID());

		Total_Order updateTotalOrder = totalOrderRepo.save(totalOrder);
		return ResponseEntity.ok(updateTotalOrder);
	}

	@DeleteMapping("/deleteTotalOrder/{totalOrder_ID}")
	public ResponseEntity<Map<String, Boolean>> deleteTotalOrder(@PathVariable Integer totalOrder_ID) {
		Total_Order totalOrder = totalOrderRepo.findById(totalOrder_ID)
				.orElseThrow(() -> new ResourceNotFoundException("TotalOrder not exist with ID:" + totalOrder_ID));

		totalOrderRepo.delete(totalOrder);

		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/getTotalAndTable/{table_ID}")
	public List<String> getTable_ID(String table_ID) {

		return totalOrderRepo.total_ID_AND_Table_ID(table_ID);
	}

	@GetMapping("/checkPay/{status}")
	public List<Total_Order> checkPay(@PathVariable int status) {
		return (List<Total_Order>) totalOrderRepo.checkPay(status);
	}

	@GetMapping("/UpdateStatusPay/{compo_site}")
	public int Update_StatusPay(@PathVariable String compo_site) {
		return totalOrderRepo.Update_StatusPay(compo_site);
	}

	@GetMapping("/UploadSlip/{totalOrder_ID}")
	public int Update_ImgSlip(@PathVariable int totalOrder_ID) {
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Bangkok"));

		int hours = calendar.get(Calendar.HOUR_OF_DAY);
		int minutes = calendar.get(Calendar.MINUTE);
		int sec = calendar.get(Calendar.SECOND);
		int day = calendar.get(Calendar.DAY_OF_MONTH);
		int month = calendar.get(Calendar.MONTH);
		int year = calendar.get(Calendar.YEAR);

		String datetime = "D" + day + "-" + month + "-" + year + "-T" + hours + "." + minutes + "." + sec;

		return totalOrderRepo.Update_ImgSlip(totalOrder_ID,datetime+".jpg");
	}

	// @GetMapping("/totalPrice/{totalPrice}/{totalOrder_ID}")
	// public int totalPrice(@PathVariable int totalPrice,@PathVariable int
	// totalOrder_ID) {
	// return totalOrderRepo.totalPrice(totalPrice, totalOrder_ID);
	// }

	// การรวมโต๊ะ
	@GetMapping("/mergeTable/{totalOrder_ID}/{pointTable}")
	public int mergeTable(@PathVariable int totalOrder_ID, @PathVariable int pointTable) {
		totalOrderRepo.mergeTable(totalOrder_ID, pointTable);
		return pointTable;
	}

	@GetMapping("/UpdateDiscount/{discount_id}/{totalOrder_ID}/{distotal}")
	public int UpdateDiscount(@PathVariable Integer discount_id,@PathVariable Integer totalOrder_ID, @PathVariable Integer distotal) {
		totalOrderRepo.updateDiscount(discount_id, totalOrder_ID);
		totalOrderRepo.insertDiscount(totalOrder_ID, distotal);

		return discount_id;
	}

	// @GetMapping("/findMixTable/{compo_site}")
	// public List<Total_Order> findMixTable_ID(@PathVariable int compo_site) {
	// 	return totalOrderRepo.findByMixTable_ID(compo_site);
	// }

	@GetMapping("/getMixTable/{compo_site}/{Datetime}")
	public List<Total_Order> getMixtable(@PathVariable String compo_site,@PathVariable String Datetime) {
		return (List<Total_Order>) totalOrderRepo.findByMixTable_ID(compo_site,Datetime);
	}

	// @GetMapping("/Update_MoveTableAndMixtable/{table_id}/{compo_site}")
	// public int MoveTableAndMixtable(@PathVariable Integer compo_site,@PathVariable Integer table_id) {
	// 	return totalOrderRepo.Update_MoveTableAndMixtable(table_id, compo_site);
	// }

	

	@GetMapping("/getTableIntotal")
	public ArrayList<Integer> table_in_Total() {
		return totalOrderRepo.table_in_Total();
	}

}
