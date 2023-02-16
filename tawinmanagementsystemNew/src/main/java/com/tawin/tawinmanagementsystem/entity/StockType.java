package com.tawin.tawinmanagementsystem.entity;


import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.OneToMany;
import javax.transaction.Transactional;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Transactional
@Data
@NoArgsConstructor
@AllArgsConstructor

public class StockType implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int stockType_ID;
	private String stockType_Name;
	private String stockType_Unit;
	

	@JsonIgnore
	@OneToMany(mappedBy = "stockType_ID",fetch = FetchType.LAZY)
    private List<Stock> stock_ID;

	@JsonIgnore
	@OneToMany(mappedBy = "stockType_ID",fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
    private List<BackupStock> backupStock_ID;
	
	
	@JsonIgnore
	@OneToMany(mappedBy = "stockType_ID",fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
    private List<Stock_Menu> stockMenu_ID;
	
	
}
