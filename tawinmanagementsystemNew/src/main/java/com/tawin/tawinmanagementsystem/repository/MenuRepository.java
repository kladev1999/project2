package com.tawin.tawinmanagementsystem.repository;


import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tawin.tawinmanagementsystem.entity.Menu;
import com.tawin.tawinmanagementsystem.entity.Stock_Menu;


public interface MenuRepository extends JpaRepository<Menu, Long> {

	@Query(value = "SELECT * FROM menu where menu_Name like :Datetime", nativeQuery = true)
	List<Menu> getDatetime(@Param("Datetime") String Datetime);
	
	@Query(value="SELECT * FROM stock_menu WHERE stock_menu.menu_id = :menu_ID",nativeQuery = true)
	public ArrayList<Stock_Menu> findMenuInStockMenu(Long menu_ID);

}
