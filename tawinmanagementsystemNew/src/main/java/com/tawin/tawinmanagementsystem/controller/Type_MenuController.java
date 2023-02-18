package com.tawin.tawinmanagementsystem.controller;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import com.tawin.tawinmanagementsystem.entity.Type_Menu;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import com.tawin.tawinmanagementsystem.exception.ResourceNotFoundException;
import com.tawin.tawinmanagementsystem.repository.Type_MenuRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/TypeMenu")
public class Type_MenuController {
	@Autowired
	Type_MenuRepository typeMenuRepo;
	
	
	@GetMapping("/getTypeMenu")
	public List<Type_Menu> getMenu(){
		return (List<Type_Menu>) typeMenuRepo.findAll();
	}
	
	@PostMapping("/addTypeMenu")
	public Type_Menu createMenu(@RequestBody Type_Menu typeMenu) {
		typeMenuRepo.save(typeMenu);
		return typeMenu;
	}

	@PutMapping("/updateMenuType/{Type_Menu_ID}")
	public ResponseEntity<Type_Menu> updateStockType(@PathVariable Long Type_Menu_ID,@RequestBody Type_Menu Type_MenuDetails){
		Type_Menu type_Menu = typeMenuRepo.findById(Type_Menu_ID)
				.orElseThrow(() -> new ResourceNotFoundException("StockType not exist with id :" + Type_Menu_ID));
		
				type_Menu.setTypeMenu_Name(Type_MenuDetails.getTypeMenu_Name());
				type_Menu.setMenu_Type(Type_MenuDetails.getMenu_Type());
		Type_Menu updateStockType = typeMenuRepo.save(type_Menu);
		return ResponseEntity.ok(updateStockType);
	}

	@GetMapping("/getMenuTypeByID/{menuType_ID}")
	public ResponseEntity <Type_Menu> getMenuById(@PathVariable Long menuType_ID) {
		Type_Menu menuType = typeMenuRepo.findById(menuType_ID)
				.orElseThrow(() -> new ResourceNotFoundException("Menu not exist with id :" + menuType_ID));
		return ResponseEntity.ok(menuType);
	
	}



	@DeleteMapping("/deleteMenuType/{typeMenu_ID}")
	public ResponseEntity<Map<String, Boolean>> deleteMenu(@PathVariable Long typeMenu_ID){
		Type_Menu Type_Menu = typeMenuRepo.findById(typeMenu_ID)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + typeMenu_ID));
		
				typeMenuRepo.delete(Type_Menu);
	
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

}
