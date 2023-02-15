package com.tawin.tawinmanagementsystem.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tawin.tawinmanagementsystem.entity.BackupStock;

public interface BackupStockRepository extends JpaRepository<BackupStock, Long>{
	
	@Modifying
    @Transactional
    @Query(value = "INSERT INTO backup_stock (backup_stock_id, backup_stock_cost, backup_stock_min, backup_stock_qty, backup_stock_time_stamp ,stock_type_id,backup_price_per_unit)\n"
    		+ "SELECT stock.stock_id, stock.stock_cost, stock.stock_min, stock.stock_qty, stock.stock_time_stamp, stock.stock_type_id, stock.price_per_unit\n"
    		+ "FROM stock\n"
    		+ "ORDER BY stock.stock_id DESC\n"
    		+ "LIMIT 1 "
        , nativeQuery = true)
    void insertBackupStock();
}
