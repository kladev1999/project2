package com.tawin.tawinmanagementsystem.entity;


import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.transaction.Transactional;


import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Transactional
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "stock")
public class Stock implements Serializable{
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long stock_ID;	
	
	
	@Column(nullable = false,length = 10)
	private Integer stock_Qty;
	
	@Column(nullable = false,length = 10)
	private Integer stock_Cost;
	
	@Column(nullable = false,length = 5)
	private Integer stock_Min;
	
	
	@Column(length = 255)
	private LocalDateTime stock_TimeStamp;
	
	@Column(length = 30)
	private double pricePerUnit;
	
	@ManyToOne
	@JoinColumn(name = "stockType_ID")
    private StockType stockType_ID;

	
   
	
}
