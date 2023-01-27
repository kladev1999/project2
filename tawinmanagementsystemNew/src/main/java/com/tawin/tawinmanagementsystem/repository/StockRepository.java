package com.tawin.tawinmanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.tawin.tawinmanagementsystem.entity.Stock;

public interface StockRepository extends JpaRepository<Stock, Long>{
    
    @Query(value = "SELECT * FROM Stock", nativeQuery = true)
    public List<Stock> findAllStockSQL();
    
    //Loop หา stockType_ID
    @Query(value = "SELECT a.stock_type_id FROM stock_menu b  ,stock a WHERE  a.stock_type_id = b.stock_type_id  AND b.menu_id = :menu_ID",nativeQuery = true)
    public List<String> findStock(Long menu_ID);
    
    //ตัดสต๊อกโดยการรับค่า stockType_ID เข้ามา
    @Modifying
    @Transactional
    @Query(value = "UPDATE stock SET stock.stock_qty = (SELECT a.stock_qty - b.stock_menu_qty FROM stock a,stock_menu b WHERE  a.stock_type_id = b.stock_type_id AND a.stock_type_id = :stockType_ID GROUP BY a.stock_type_id HAVING MIN(a.stock_time_stamp)) WHERE stock.stock_type_id = :stockType_ID AND stock.stock_time_stamp = (SELECT MIN(stock.stock_time_stamp) FROM stock WHERE stock_type_id = :stockType_ID)",nativeQuery = true)
    public int stockCut(Long stockType_ID);
    
    //ตัดสต๊อกโดยการรับค่า stockType_ID เข้ามา
    //ตัวนี้เวิร์คลองแล้ว
    @Modifying
    @Transactional
    @Query(value = "UPDATE stock SET stock.stock_qty = (SELECT a.stock_qty - b.stock_menu_qty FROM stock a,stock_menu b WHERE  a.stock_type_id = b.stock_type_id AND a.stock_type_id = :stockType_ID GROUP BY a.stock_type_id HAVING MIN(a.stock_time_stamp)) WHERE stock.stock_type_id = :stockType_ID AND stock.stock_time_stamp = (SELECT MIN(stock.stock_time_stamp) FROM stock WHERE stock_type_id = :stockType_ID)",nativeQuery = true)
    public int stockCutLoop(String stockType_ID);

  
}
