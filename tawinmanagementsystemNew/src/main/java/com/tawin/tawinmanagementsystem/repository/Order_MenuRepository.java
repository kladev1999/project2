package com.tawin.tawinmanagementsystem.repository;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tawin.tawinmanagementsystem.entity.Menu;
import com.tawin.tawinmanagementsystem.entity.Order_Menu;
import com.tawin.tawinmanagementsystem.entity.Stock;
import com.tawin.tawinmanagementsystem.entity.Stock_Menu;
import javax.persistence.EntityManager;

public interface Order_MenuRepository extends JpaRepository<Order_Menu, Integer> {

        @Query(value = "SELECT * \n"
        		+ "FROM order_menu \n"
        		+ "INNER JOIN total_order \n"
        		+ "ON order_menu.total_order_id = total_order.total_order_id \n"
        		+ "WHERE compo_site = :compoSite AND total_order_status = :statusTable \n"
        		+ "ORDER BY order_menu.status_id AND order_menu.order_menu_time_stamp ASC", nativeQuery = true)
        List<Order_Menu> findByTotalOrder_ID(@Param("compoSite") String compoSite,@Param("statusTable") Integer statusTable);

	@Query(value = "SELECT o.menu_id,m.menu_name,m.menu_pic FROM order_menu o inner join menu m on o.menu_id = m.menu_id group by menu_id order by SUM(order_menu_qty) DESC LIMIT 5", nativeQuery = true)
	List<Object> Bestseller();

	@Query(value = "SELECT * FROM order_menu where order_menu_time_stamp like :Datetime% ORDER BY order_menu_time_stamp ASC", nativeQuery = true)
	List<Order_Menu> kitchenShow(@Param("Datetime") String Datetime);

	@Query(value = "SELECT * FROM order_menu ORDER BY order_menu_time_stamp ASC", nativeQuery = true)
	List<Order_Menu> Bestsellermenu();

	@Query(value = "SELECT DISTINCT a.stock_type_id FROM stock_menu b  ,stock a WHERE  a.stock_type_id = b.stock_type_id  AND b.menu_id = :menu_ID", nativeQuery = true)
	public List<Long> findStock(@Param("menu_ID") Long menu_ID);

	// ตัดสต๊อกโดยการรับค่า stockType_ID เข้ามา
	// ตัวนี้เวิร์คลองแล้ว
	@Modifying
	@Transactional
	@Query(value = "SET @@sql_mode = '';UPDATE stock SET stock.stock_qty = "
			+ "(SELECT a.stock_qty - b.stock_menu_qty FROM stock a,stock_menu b WHERE  a.stock_type_id = b.stock_type_id AND a.stock_type_id = :stockType_ID GROUP BY a.stock_type_id HAVING MIN(a.stock_time_stamp)) "
			+ "WHERE stock.stock_type_id = :stockType_ID AND stock.stock_time_stamp = (SELECT MIN(stock.stock_time_stamp) FROM stock WHERE stock_type_id = :stockType_ID);", nativeQuery = true)
	public int stockCutLoop(@Param("stockType_ID") String stockType_ID);

	@Modifying
	@Transactional
	@Query(value = "SET @@sql_mode = ''; SELECT (a.stock_qty - b.stock_menu_qty) FROM stock a, stock_menu b WHERE a.stock_type_id = b.stock_type_id AND a.stock_type_id = 4 AND a.stock_time_stamp = (SELECT MIN(stock_time_stamp)  FROM stock WHERE stock.stock_type_id = 4   GROUP BY stock.stock_type_id) GROUP BY a.stock_type_id;\n", nativeQuery = true)
	public int beforeUpdateStock(Long stockType_ID);

//	@Modifying
//	@Transactional
//	@Query(value = "SET @@sql_mode='';\n"
//			+ "	SELECT CAST(a.stock_qty - b.stock_menu_qty AS SIGNED) as result\n"
//			+ "	FROM stock a\n"
//			+ "	INNER JOIN stock_menu b ON a.stock_type_id = b.stock_type_id\n"
//			+ "	WHERE a.stock_type_id = :stockType_ID\n"
//			+ "	AND a.stock_time_stamp = (SELECT MIN(stock_time_stamp) FROM stock WHERE stock.stock_type_id = :stockType_ID)\n"
//			+ "	GROUP BY a.stock_type_id"
//			,nativeQuery = true)
//	public int beforeUpdateStock(@Param("stockType_ID") String stockType_ID);
//	

	@Query(value = "SELECT (a.price_per_unit * b.stock_menu_qty) \n" + "FROM stock a,stock_menu b \n"
			+ "WHERE  a.stock_type_id = b.stock_type_id AND a.stock_type_id = :stockType_ID AND b.menu_id = :menu_ID\n"
			+ "AND a.stock_time_stamp = (SELECT MIN(a.stock_time_stamp) \n"
			+ "                              FROM stock a \n"
			+ "                              WHERE a.stock_type_id = :stockType_ID)", nativeQuery = true)
	public int findCostMenu(Long stockType_ID, Long menu_ID);

//	@Query(value = "SET @@sql_mode = '';"+"SELECT (a.stock_qty - b.stock_menu_qty)\n"
//			+ "  FROM stock a,stock_menu b\n" + "  WHERE  a.stock_type_id = b.stock_type_id    AND \n"
//			+ "  a.stock_type_id = :stockType_ID AND menu_id = :menu_ID\n" + "  GROUP BY a.stock_type_id\n"
//			+ "  HAVING MIN(a.stock_time_stamp);", nativeQuery = true)
//	public int findStock_Nagative_Qty(@Param("stockType_ID") String stockType_ID, @Param("menu_ID") Long menu_ID);

	@Modifying
	@Transactional
	@Query(value = "UPDATE stock\n" + "SET stock_qty = :num\n"
			+ "WHERE stock_type_id = :stockType_ID AND stock_time_stamp = \n"
			+ "(SELECT min_ts FROM (SELECT MIN(stock_time_stamp) AS min_ts FROM stock WHERE stock_type_id = :stockType_ID) AS temp)", nativeQuery = true)
	public void updateStock(int num, String stockType_ID);

	@Query(value = "SET @@sql_mode = '';" + "" + "SELECT (a.stock_qty - b.stock_menu_qty)\n"
			+ "  FROM stock a,stock_menu b\n" + "  WHERE  a.stock_type_id = b.stock_type_id    AND \n"
			+ "  a.stock_type_id = :stockType_ID AND menu_id = :menu_ID\n" + "  GROUP BY a.stock_type_id\n"
			+ "  HAVING MIN(a.stock_time_stamp);", nativeQuery = true)
	public int findStock_Nagative_Qty(@Param("stockType_ID") String stockType_ID, @Param("menu_ID") Long menu_ID);

	@Query(value = "SET @@sql_mode = '';" + "SELECT  stock_time_stamp \n" + "    FROM stock a,stock_menu b\n"
			+ "    WHERE  a.stock_type_id = b.stock_type_id    AND \n" + "  a.stock_type_id = :stockType_ID \n"
			+ "  GROUP BY a.stock_type_id \n" + "  HAVING MIN(a.stock_time_stamp);", nativeQuery = true)
	public String findStock_Nagative_TimeStamp(@Param("stockType_ID") Long stockType_ID);

	// เพิ่มสต๊อกโดยการรับค่า stockType_ID เข้ามา
	// ตัวนี้เวิร์คลองแล้ว
	@Modifying
	@Transactional
	@Query(value = "UPDATE stock " + "SET stock.stock_qty = (SELECT a.stock_qty + b.stock_menu_qty "
			+ "FROM stock a,stock_menu b " + "WHERE  a.stock_type_id = b.stock_type_id "
			+ "AND a.stock_type_id = :stockType_ID " + "GROUP BY a.stock_type_id " + "HAVING MIN(a.stock_time_stamp)) "
			+ "WHERE stock.stock_type_id = :stockType_ID "
			+ "AND stock.stock_time_stamp = (SELECT MIN(stock.stock_time_stamp) "
			+ "FROM stock WHERE stock_type_id = :stockType_ID)", nativeQuery = true)
	public int stockAddLoop(@Param("stockType_ID") Long stockType_ID);

	// หา stockTimeStamp แล้วก็ลบ record ออก
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM stock\n" + "WHERE stock_time_stamp = :stock_TimeStamp", nativeQuery = true)
	public int findStockDateTime(@Param("stock_TimeStamp") String stock_TimeStamp);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM stock\n" + "WHERE stock.stock_type_id = :stockType_ID", nativeQuery = true)
	public int findStockTypeID(@Param("stockType_ID") String stockType_ID);

	@Modifying
	@Transactional
	@Query(value = "INSERT INTO backup_stock (backup_stock_id, backup_stock_cost, backup_stock_min, backup_stock_qty, backup_stock_time_stamp ,stock_type_id) "
			+ "SELECT stock.stock_id, stock.stock_cost, stock.stock_min, stock.stock_qty, stock.stock_time_stamp, stock.stock_type_id "
			+ "FROM stock " + "WHERE stock.stock_time_stamp = :stockTimeStamp", nativeQuery = true)
	void insertBackupStock(@Param("stockTimeStamp") String stockTimeStamp);

	// ทำการอัพเดท stock qty โดยรับค่า ตัวแปร qty_negative และ stockType_ID
	@Modifying
	@Transactional
	@Query(value = "UPDATE stock \n" + "SET stock.stock_qty = (stock.stock_qty + :qty_Nagative) \n"
			+ "WHERE stock.stock_time_stamp = (SELECT MIN(stock_time_stamp) \n" + "      FROM stock \n"
			+ "      WHERE stock_type_id = :stockType_ID) \n"
			+ "AND stock.stock_type_id = :stockType_ID", nativeQuery = true)
	public int updateStockFromNagative(@Param("qty_Nagative") int qty_Nagative,
			@Param("stockType_ID") String stockType_ID);

	@Query(value = "SELECT * " + "FROM order_menu " + "ORDER BY order_menu_qty " + "DESC LIMIT 5", nativeQuery = true)
	List<Order_Menu> menuTop5();

	@Query(value = "SELECT * FROM menu WHERE menu.menu_id = :menu_ID", nativeQuery = true)
	public int menuFind(@Param("menu_ID") Long menu_ID);

	@Modifying
	@Transactional
	@Query(value = "UPDATE order_menu " + "SET order_menu.status_id = (order_menu.status_id +1)%4 "
			+ "WHERE order_menu.order_menu_id = :orderMenu_ID", nativeQuery = true)
	public int updateStatus(@Param("orderMenu_ID") Long orderMenu_ID);

	@Modifying
	@Transactional
	@Query(value = "UPDATE order_menu " + "SET order_menu.status_id = 4 "
			+ "WHERE order_menu.order_menu_id = :orderMenu_ID", nativeQuery = true)
	public int cancelStatus(@Param("orderMenu_ID") Long orderMenu_ID);

	// รวมโต๊ะ
	@Modifying
	@Transactional
	@Query(value = "UPDATE total_order\n" + "SET total_order.compo_site = :pointTable\n"
			+ "WHERE total_order.total_order_id = :totalOrder_ID", nativeQuery = true)
	public int mergeTable(@Param("totalOrder_ID") int totalOrder_ID, @Param("pointTable") int pointTable);

	@Query(value = "SELECT SUM(total_order.total_price) FROM total_order", nativeQuery = true)
	public int sumIncome();

	@Query(value = "SELECT EXTRACT(DAY FROM backup_stock.backup_stock_time_stamp) as day, SUM(backup_stock.backup_stock_cost) as cost,SUM(backup_stock.backup_stock_qty)\n"
			+ "FROM backup_stock\n" + "GROUP BY day", nativeQuery = true)
	public int sumCost();

	@Query(value = "SELECT backup_stock.stock_type_id,EXTRACT(DAY FROM backup_stock.backup_stock_time_stamp) as day, SUM(backup_stock.backup_stock_cost) as cost,backup_stock.backup_stock_qty\n"
			+ "FROM backup_stock\n" + "GROUP BY day, backup_stock.stock_type_id" + "", nativeQuery = true)
	public List<Object> dayCost();

	@Query(value = "SELECT EXTRACT(MONTH FROM backup_stock.backup_stock_time_stamp) as month, SUM(backup_stock.backup_stock_cost) as total_value,SUM(backup_stock.backup_stock_qty)\n"
			+ "FROM backup_stock\n" + "GROUP BY month, backup_stock.stock_type_id\n" + "", nativeQuery = true)
	public List<Object> monthCost();

	@Query(value = "SELECT EXTRACT(YEAR FROM backup_stock.backup_stock_time_stamp) as year, SUM(backup_stock.backup_stock_cost) as total_value,SUM(backup_stock.backup_stock_qty)\n"
			+ "FROM backup_stock\n" + "GROUP BY year, backup_stock.stock_type_id\n" + "", nativeQuery = true)
	public List<Object> yearCost();

	@Query(value = "SELECT EXTRACT(YEAR FROM total_order.total_order_time_stamp) as year, SUM(total_order.total_price) as total_value\n"
			+ "FROM total_order\n" + "GROUP BY year", nativeQuery = true)
	public List<Object> yearIncome();

	@Query(value = "SELECT EXTRACT(MONTH FROM total_order.total_order_time_stamp) as month, SUM(total_order.total_price) as total_value\n"
			+ "FROM total_order\n" + "GROUP BY month", nativeQuery = true)
	public List<Object> monthIncome();

	@Query(value = "SELECT EXTRACT(DAY FROM total_order.total_order_time_stamp) as day, SUM(total_order.total_price) as total_value\n"
			+ "FROM total_order\n" + "GROUP BY day", nativeQuery = true)
	public List<Object> dayIncome();

	@Query(value = "SELECT EXTRACT(DAY FROM order_menu.order_menu_time_stamp) as day ,EXTRACT(MONTH FROM order_menu.order_menu_time_stamp) as month,EXTRACT(YEAR FROM order_menu.order_menu_time_stamp) as year\n"
			+ "FROM order_menu\n" + "GROUP BY day,month,year", nativeQuery = true)
	public List<Object> extractDMY();

	@Query(value = "SELECT *\n" + "FROM order_menu\n" + "WHERE EXTRACT(DAY FROM order_menu.order_menu_time_stamp) = 11 "
			+ "AND EXTRACT(MONTH FROM order_menu.order_menu_time_stamp) = 2;", nativeQuery = true)
	public List<Order_Menu> extractDMY2();

	@Query(value = "SELECT SUM(order_menu.order_menu_qty)\n" + "FROM order_menu\n"
			+ "WHERE order_menu.menu_id = :menu_ID " + "AND EXTRACT(DAY FROM order_menu.order_menu_time_stamp) = :day "
			+ "AND  EXTRACT(MONTH FROM order_menu.order_menu_time_stamp) = :month "
			+ "AND  EXTRACT(YEAR FROM order_menu.order_menu_time_stamp) = :year", nativeQuery = true)
	public int findMenuDate(Long menu_ID, String day, String month, String year);

	// แสดงรายรับรายจ่ายทั้งหมด
	@Query(value = "SELECT SUM(order_menu.order_menu_qty)\n" + "FROM order_menu\n"
			+ "WHERE order_menu.menu_id = :menu_ID\n" + "GROUP BY order_menu.menu_id", nativeQuery = true)
	public int findAllDetails(Long menu_ID);

	// แสดงรายรับรายจ่ายทั้งหมด
	@Query(value = "SELECT SUM(order_menu.order_menu_qty)\n" + "FROM order_menu\n"
			+ "WHERE order_menu.menu_id = :menu_ID ", nativeQuery = true)
	public int findAllDetail(Long menu_ID);

	@Query(value = "SELECT SUM(order_menu.order_menu_qty)\n" + "FROM order_menu\n"
			+ "WHERE order_menu.menu_id = :menu_ID\n"
			+ "AND  EXTRACT(MONTH FROM order_menu.order_menu_time_stamp) = :month\n"
			+ "AND  EXTRACT(YEAR FROM order_menu.order_menu_time_stamp) = :year", nativeQuery = true)
	public int findMenuByMonth(Long menu_ID, int month, int year);

	@Query(value = "SELECT SUM(order_menu.order_menu_qty)\n" + "FROM order_menu\n"
			+ "WHERE order_menu.menu_id = :menu_ID\n"
			+ "AND  EXTRACT(YEAR FROM order_menu.order_menu_time_stamp) = :year", nativeQuery = true)
	public int findMenuByYear(Long menu_ID, int year);

	// http://localhost:8080/OrderMenu/incomeBetween/18/2023-02-10/2023-02-14
	// รูปแบบการส่งฟอร์ม
	@Query(value = "SELECT SUM(order_menu.order_menu_qty)\n" + "FROM order_menu\n"
			+ "WHERE order_menu.menu_id = :menu_ID AND order_menu.order_menu_time_stamp BETWEEN :startDate AND :endDate \n", nativeQuery = true)
	public int findQtyMenu(Long menu_ID, String startDate, String endDate);

	@Query(value = "SELECT menu.menu_price\n" + "FROM menu\n" + "WHERE menu.menu_id = :menu_ID", nativeQuery = true)
	public int findMenuInOrderMenu(Long menu_ID);

	@Query(value = "SELECT menu.menu_id FROM menu ", nativeQuery = true)
	public List<Long> findMenu();

	@Query(value = "SELECT menu.menu_name FROM menu WHERE menu.menu_id = :menu_ID", nativeQuery = true)
	public String findMenuByID(Long menu_ID);

	@Modifying
	@Transactional
	@Query(value = "UPDATE order_menu " + "SET order_menu.status_id = 3 "
			+ "WHERE order_menu.order_menu_id = :orderMenu_ID", nativeQuery = true)
	public int finishedStatus(@Param("orderMenu_ID") Long orderMenu_ID);

        @Modifying
        @Transactional
        @Query(value = "UPDATE order_menu SET cencel = :Emp WHERE (order_menu_id = :orderMenu_ID)", nativeQuery = true)
        public int Cancel(@Param("orderMenu_ID") Long orderMenu_ID,@Param("Emp") String Emp);

        // รวมโต๊ะ
        @Modifying
        @Transactional
        @Query(value = "UPDATE total_order\n"
                        + "SET total_order.compo_site = :pointTable\n"
                        + "WHERE total_order.total_order_id = :totalOrder_ID", nativeQuery = true)
        public int mergeTable(@Param("totalOrder_ID") int totalOrder_ID, @Param("pointTable") String pointTable);
        
       
        
}
