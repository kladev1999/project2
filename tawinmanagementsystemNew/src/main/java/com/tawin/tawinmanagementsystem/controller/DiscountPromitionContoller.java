package com.tawin.tawinmanagementsystem.controller;

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
import com.tawin.tawinmanagementsystem.entity.DiscountPromotion;
import com.tawin.tawinmanagementsystem.exception.ResourceNotFoundException;
import com.tawin.tawinmanagementsystem.repository.DiscountPromotionRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/discountPromotion")
public class DiscountPromitionContoller {
	@Autowired
	DiscountPromotionRepository discountRepo;
	
	@GetMapping("/getDiscount")
	public List<DiscountPromotion> getAllDiscount() {
		return (List<DiscountPromotion>)discountRepo.findAll();
	}

	@GetMapping("/getDiscountByID/{discountPromo_ID}")
	public ResponseEntity<DiscountPromotion> getMethodName(@PathVariable Integer discountPromo_ID) {
		DiscountPromotion discountPromo = discountRepo.findById(discountPromo_ID)
			.orElseThrow(() -> new ResourceNotFoundException("discountPromo_ID not found." + discountPromo_ID));
		return ResponseEntity.ok(discountPromo);
	}

	
	@PostMapping("/addDiscount")
	public DiscountPromotion addDiscount(@RequestBody DiscountPromotion disPromo) {
		return discountRepo.save(disPromo);
	}
	
	@PutMapping("/updatePromo/{discountPromo_ID}")
	public ResponseEntity<DiscountPromotion> updatePromo(@PathVariable int discountPromo_ID,@RequestBody DiscountPromotion discountPromoDetails){
		DiscountPromotion discoutPromo = discountRepo.findById(discountPromo_ID)
				.orElseThrow(()-> new ResourceNotFoundException("Not found Promotion ID "+ discountPromo_ID));
		discoutPromo.setDiscount_Name(discountPromoDetails.getDiscount_Name());
		discoutPromo.setDiscount_Percent(discountPromoDetails.getDiscount_Percent());
		
		DiscountPromotion updatePromo = discountRepo.save(discoutPromo);
		
		return ResponseEntity.ok(updatePromo);
	}
	
	@DeleteMapping("/deleteMenu/{discount_ID}")
	public ResponseEntity<Map<String, Boolean>> deletePromo(@PathVariable int discount_ID){
		DiscountPromotion discountPromo = discountRepo.findById(discount_ID)
				.orElseThrow(() -> new ResourceNotFoundException("Promotion not exist with id :" + discount_ID));
		
		discountRepo.delete(discountPromo);
	
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
	
	
}
