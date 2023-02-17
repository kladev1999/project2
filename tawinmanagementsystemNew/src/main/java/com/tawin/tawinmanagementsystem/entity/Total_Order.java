package com.tawin.tawinmanagementsystem.entity;

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
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Transactional
@Data
@NoArgsConstructor
@Table(name = "total_order")
public class Total_Order {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer totalOrder_ID;

	@Column(nullable = false, length = 10)
	private Integer totalPrice;

	@Column(nullable = false, length = 5)
	private String compoSite;

	@Column(nullable = false, length = 50)
	private String totalOrder_Status;

	@Column(nullable = false, length = 200)
	private LocalDateTime totalOrder_TimeStamp;

	@Column(name = "total_Order_image")
	private String totalOrder_image;
	
	@JsonIgnore
	@Column(nullable =true,name = "after_discount")
	private int afterDiscount;

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	@JoinColumn(name = "table_ID")
	private TableTawin table_ID;

	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
	@JoinColumn(name = "emp_ID")
	private Employee id;


	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
	@JoinColumn(name = "discount_ID")
	private DiscountPromotion discount_ID;

	@JsonIgnore
	@OneToMany(mappedBy = "totalOrder_ID", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Order_Menu> orderMenu_ID;

}
