package com.tawin.tawinmanagementsystem.entity;



import lombok.Data;

@Data
public class Income {

	private Long menu_ID;
	private String menu_Name;
	private int qtyByMenu;
	private int cost;
	private int totalSell;
	private int totalCost;
	private int menuPrice;
	private int proFit;
	private int discount;
}
