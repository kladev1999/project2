package com.tawin.tawinmanagementsystem.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tawin.tawinmanagementsystem.entity.Menu;


public interface MenuRepository extends JpaRepository<Menu, Long> {

	@Query(value = "SELECT * FROM menu where menu_Name like :Datetime", nativeQuery = true)
	List<Menu> getDatetime(@Param("Datetime") String Datetime);

}
