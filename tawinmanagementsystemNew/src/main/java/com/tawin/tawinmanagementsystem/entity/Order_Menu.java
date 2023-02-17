package com.tawin.tawinmanagementsystem.entity;
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

import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Transactional
@Data
@NoArgsConstructor
@Table(name = "order_menu")
public class Order_Menu {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer orderMenu_ID;
	
	@Column(nullable = false,length = 10)
	private Integer orderMenu_Qty;

	@Column(nullable = false,length = 10)
	private String cencel;
	
	
	@Column(nullable = false,length = 200)
	private LocalDateTime orderMenu_TimeStamp;
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
	@JoinColumn(name = "totalOrder_ID")
	private Total_Order totalOrder_ID;
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
	@JoinColumn(name = "menu_ID")
	private Menu menu_ID;
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
	@JoinColumn(name = "emp_ID")
	private Employee id;

	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
	@JoinColumn(name = "status_ID")
	private Status status_ID;


}
