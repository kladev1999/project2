package com.tawin.tawinmanagementsystem.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.tawin.tawinmanagementsystem.entity.MirrorStock;

public interface MirrorStockRepo extends JpaRepository<MirrorStock, Long> {
	@Modifying
    @Transactional
	@Query(value = "INSERT INTO mirror_stock (mirror_stock.mirror_stock_id, mirror_stock.mirror_stock_cost, mirror_stock.mirror_stock_min, mirror_stock.mirror_stock_qty, mirror_stock.mirror_stock_time_stamp ,mirror_stock.stock_type_id,mirror_stock.mirror_price_per_unit)\n"
			+ "SELECT stock.stock_id, stock.stock_cost, stock.stock_min, stock.stock_qty, stock.stock_time_stamp, stock.stock_type_id, stock.price_per_unit\n"
			+ "FROM stock\n" + "ORDER BY stock.stock_id DESC\n" + "LIMIT 1", nativeQuery = true)
	void insertMirrorStock();
}
