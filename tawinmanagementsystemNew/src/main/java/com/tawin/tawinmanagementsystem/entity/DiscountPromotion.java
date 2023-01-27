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
import javax.persistence.OneToMany;
import javax.persistence.Table;
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
@Table(name = "discountPromotion")
public class DiscountPromotion {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "discount_ID")
	private int discount_ID;
	
	@Column(name = "discount_Name")
	private String discount_Name;
	
	@Column(name = "discount_Percent")
	private double discount_Percent;
	
	@JsonIgnore
	@OneToMany(mappedBy = "discount_ID",fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
    private List<Total_Order> totalOrder_ID;
	
}
