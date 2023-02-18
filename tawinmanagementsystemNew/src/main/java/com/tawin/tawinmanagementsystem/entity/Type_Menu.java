package com.tawin.tawinmanagementsystem.entity;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.transaction.Transactional;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Transactional
@Data
@NoArgsConstructor
@Table(name = "type_menu")
public class Type_Menu {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long typeMenu_ID;
	
	@Column(nullable = false,length = 50)
	private String typeMenu_Name;
	
	@Column(nullable = false,length = 50)
	private Integer menu_Type;
	
	@JsonIgnore
	@OneToMany(mappedBy = "menu_ID",fetch = FetchType.LAZY)
    private List<Menu> menu_ID;
	
	
}
