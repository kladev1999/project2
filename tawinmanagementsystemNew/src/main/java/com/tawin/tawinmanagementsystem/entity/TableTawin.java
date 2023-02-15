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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.transaction.Transactional;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Transactional
@Data
@NoArgsConstructor
@Table(name = "table_tawin")
public class TableTawin {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer table_ID;

	
	@Column(nullable = true,length = 50)
	private String table_Zone;
	
	@JsonIgnore
	@OneToMany(mappedBy = "table_ID",fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
    private List<Total_Order> totalOrder_ID;
	
	
	
}
