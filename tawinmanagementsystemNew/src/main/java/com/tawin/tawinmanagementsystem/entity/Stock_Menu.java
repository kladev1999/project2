package com.tawin.tawinmanagementsystem.entity;
import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.transaction.Transactional;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Table;

@Entity
@Transactional
@Data
@NoArgsConstructor
@Table(name = "stock_menu")
public class Stock_Menu implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long stockMenu_ID;
	
	@Column(nullable = false,length = 10)
	private Integer stockMenu_Qty;
	
	@Column(nullable = false,length = 50)
	private String stockMenu_Status;
	
	@Column(nullable = false,length = 200)
	private LocalDateTime stockMenu_TimeStamp;
	

	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
	@JoinColumn(name = "stockType_ID")
	private StockType stockType_ID;
	
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
	@JoinColumn(name = "menu_ID")
	private Menu menu_ID;
	
}
