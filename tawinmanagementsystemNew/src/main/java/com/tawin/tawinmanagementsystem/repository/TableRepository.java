package com.tawin.tawinmanagementsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import javax.transaction.Transactional;

import com.tawin.tawinmanagementsystem.entity.TableTawin;

public interface TableRepository extends JpaRepository<TableTawin, Integer> {

    @Query(value = "SELECT *  from table_tawin A left join total_order B on A.table_id = B.table_id where B.table_id is null", nativeQuery = true)
    List<TableTawin> GetmoveTableTawins();

    
    @Modifying
    @Transactional
    @Query(value = "UPDATE total_order SET table_id = :table_id WHERE total_order_id = :total_order_ID ", nativeQuery = true)
    public int moveTableTawins(@Param("table_id") Integer table_id, @Param("total_order_ID") Integer total_order_ID);

    @Query(value = "SELECT total_order.total_order_id FROM total_order WHERE total_order.table_id = :table_ID",nativeQuery = true)
    public int totalOrderFindID(@Param("table_ID") Integer table_ID);

    @Query(value = "SELECT * FROM table_tawin where table_time_stamp like :Datetime%",nativeQuery = true)
    List<TableTawin> getTableDatetime(@Param("Datetime") String Datetime);
}
    

