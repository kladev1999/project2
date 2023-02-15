package com.tawin.tawinmanagementsystem.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.transaction.Transactional;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Transactional
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "mirror_stock")
public class MirrorStock {

	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long mirrorStock_ID;	
	
	
	@Column(nullable = false,length = 10)
	private Integer mirrorStock_Qty;
	
	@Column(nullable = false,length = 10)
	private Integer mirrorStock_Cost;
	
	@Column(nullable = false,length = 5)
	private Integer mirrorStock_Min;
	
	
	@Column(length = 255)
	private LocalDateTime mirrorStock_TimeStamp;
	
	@Column(length = 30)
	private double mirrorPricePerUnit;
	
	@ManyToOne
	@JoinColumn(name = "stockType_ID")
    private StockType stockType_ID;
}
