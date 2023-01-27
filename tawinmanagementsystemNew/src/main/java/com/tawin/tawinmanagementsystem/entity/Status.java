package com.tawin.tawinmanagementsystem.entity;

import java.io.Serializable;
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

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;


@Data
@Entity
@Table(name = "status")
public class Status  implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "status_ID")
    private Long status_ID;

    @Column(name = "status")
    private String status;

    @JsonIgnore
	@OneToMany(mappedBy = "status_ID",fetch = FetchType.LAZY,cascade = CascadeType.MERGE)
    private List<Order_Menu> orderMenu_ID;
	

}
