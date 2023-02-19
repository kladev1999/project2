package com.tawin.tawinmanagementsystem.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tawin.tawinmanagementsystem.entity.Stock_Menu;

public interface Stock_MenuRepository extends JpaRepository<Stock_Menu, Long>{
	
	
	
	@Query(value="SELECT * FROM stock_menu WHERE stock_menu.menu_id = :menu_ID",nativeQuery = true)
	public ArrayList<Stock_Menu> findMenuInStockMenu(Long menu_ID);
}
