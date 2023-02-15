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

@Entity
@Transactional
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "backupStock")
public class BackupStock implements Serializable{
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long backupStock_ID;	
	
	
	@Column(nullable = false,length = 10)
	private Integer backupStock_Qty;
	
	@Column(nullable = false,length = 10)
	private Integer backupStock_Cost;
	
	@Column(nullable = false,length = 5)
	private Integer backupStock_Min;
	
	
	@Column(length = 255)
	private LocalDateTime backupStock_TimeStamp;
	
	@Column(length = 30)
	private double backup_PricePerUnit;
	
	@ManyToOne
	@JoinColumn(name = "stockType_ID")
    private StockType stockType_ID;

   
	
}
