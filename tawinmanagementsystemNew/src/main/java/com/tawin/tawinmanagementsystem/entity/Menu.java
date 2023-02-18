package com.tawin.tawinmanagementsystem.entity;


import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.transaction.Transactional;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

import javax.persistence.Table;

@Entity
@Transactional
@Data
@Table(name = "menu")
public class Menu implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long menu_ID;
	
	@Column(nullable = false,length = 50)
	private String menu_Name;
	
	@Column(nullable = false,length = 10)
	private Integer menu_Price;
	
	@Column(length = 255)
	private String menu_Pic;
	
	
	@Column(length = 200)
	private LocalDateTime menu_TimeStamp;

	public Menu(){
		super();
	}
	
	@ManyToOne
	@JoinColumn(name = "typeMenu_ID")
	private Type_Menu typeMenu_ID;
	
	@JsonIgnore
	@OneToMany(mappedBy = "menu_ID",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Stock_Menu> stockMenu_ID;
    
    @JsonIgnore
    @OneToMany(mappedBy = "menu_ID",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private List<Order_Menu> orderMenu_ID;

}
