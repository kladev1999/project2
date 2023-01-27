package com.tawin.tawinmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tawin.tawinmanagementsystem.entity.Status;

@Repository
public interface StatusReponsitory extends JpaRepository<Status,Long>{

}
