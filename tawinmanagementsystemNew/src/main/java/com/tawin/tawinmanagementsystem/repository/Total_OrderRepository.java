package com.tawin.tawinmanagementsystem.repository;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.tawin.tawinmanagementsystem.entity.Total_Order;

public interface Total_OrderRepository extends JpaRepository<Total_Order, Integer> {


	@Query(value = "SELECT * "
			+ "FROM total_order "
			+ "WHERE table_id NOT IN (SELECT table_id FROM total_order WHERE compo_site = :compo_site) AND total_order_status = 0 AND discount_id is null AND total_order_time_stamp like :Datetime%", nativeQuery = true)
	List<Total_Order> findByMixTable_ID(@Param("compo_site") String compo_site,@Param("Datetime") String Datetime);

	@Query(value = "SELECT * FROM total_order where total_order_time_stamp like :Datetime% order by total_order_status ASC", nativeQuery = true)
	List<Total_Order> getDatetime(@Param("Datetime") String Datetime);

	@Query(value = "SELECT * FROM total_order where emp_id = :Emp_id AND total_order_time_stamp like :Datetime%", nativeQuery = true)
	List<Total_Order> getMytable(@Param("Emp_id") Integer Emp_id,@Param("Datetime") String Datetime);



// 	@Query(value = "SELECT * "
// 	+ "FROM total_order "
// 	+ "WHERE table_id NOT IN (SELECT table_id FROM total_order WHERE compo_site = :table_ID)", nativeQuery = true)
// List<Total_Order> findByMixTable_ID(@Param("table_ID") Integer table_ID);


	@Modifying
	@Transactional
	@Query(value = "UPDATE total_order SET total_order.total_price = :totalPrice WHERE total_order.total_order_id = :totalOrderID"
			, nativeQuery = true)
	public int Update_Totalprice(int totalPrice,int totalOrderID);
	
	@Modifying
	@Transactional
	@Query(value="UPDATE total_order\n"
			+ "SET after_discount = :afterDiscount\n"
			+ "WHERE total_order_id = :total_order_ID",nativeQuery = true)
	public int insertDiscount(int total_order_ID,int afterDiscount);

	@Modifying
	@Transactional
	@Query(value = "UPDATE total_order SET discount_id = :discount_id WHERE compo_site = :compo_site", nativeQuery = true)
	public int Update_Discount(@Param("discount_id") Integer discount_id, @Param("compo_site") Integer compo_site);

	@Modifying
	@Transactional
	@Query(value = "UPDATE total_order SET total_order_status = 1 WHERE compo_site = :compo_site", nativeQuery = true)
	public int Update_StatusPay(@Param("compo_site") String compo_site);

	// @Modifying
	// @Transactional
	// @Query(value = "UPDATE total_order SET compo_site = :table_id WHERE compo_site = :compo_site", nativeQuery = true)
	// public int Update_MoveTableAndMixtable(@Param("compo_site") Integer compo_site,@Param("table_id") Integer table_id);

	@Modifying
	@Transactional
	@Query(value = "UPDATE total_order SET total_order_image = :datetime WHERE (total_order_id = :total_order_ID)", nativeQuery = true)
	public int Update_ImgSlip(@Param("total_order_ID") Integer total_order_ID,@Param("datetime") String datetime);

	@Query(value = " SELECT MAX(total_order.total_order_id),MAX(total_order.total_order_time_stamp),total_order.table_id \n"
			+ "FROM total_order \n"
			+ "GROUP BY total_order.table_id \n"
			+ "HAVING total_order.table_id = :table_ID ", nativeQuery = true)
	public List<String> total_ID_AND_Table_ID(@Param("table_ID") String table_ID);

	@Query(value = "SELECT * \n"
			+ "FROM total_order \n"
			+ "WHERE total_order.total_order_status = :status", nativeQuery = true)
	public List<Total_Order> checkPay(int status);

	@Modifying
    @Transactional
    @Query(value = "UPDATE total_order SET discount_id = :discount_id WHERE total_order_id = :total_order_id",nativeQuery = true)
    public void updateDiscount(@Param("discount_id") Integer discount_id,@Param("total_order_id")Integer total_order_id);

	// @Modifying
	// @Transactional
	// @Query(value = "UPDATE total_order\n"
	// 		+ "SET total_order.total_price = total_order.total_price + :totalPrice\n"
	// 		+ "WHERE total_order.total_order_id = :totalOrder_ID", nativeQuery = true)
	// public int totalPrice(int totalPrice, int totalOrder_ID);

	@Modifying
	@Transactional
	@Query(value = "UPDATE total_order\n"
			+ "SET total_order.compo_site = :pointTable\n"
			+ "WHERE total_order.total_order_id = :totalOrder_ID", nativeQuery = true)
	public int mergeTable(int totalOrder_ID, int pointTable);

	@Query(value = "SELECT total_order.table_id \n"
			+ "FROM total_order, table_tawin\n"
			+ "WHERE total_order.table_id = table_tawin.table_id", nativeQuery = true)
	public ArrayList<Integer> table_in_Total();

	@Query(value = "SELECT * FROM total_order order by total_order_status ASC", nativeQuery = true)
	List<Total_Order>  getTotalOrder();
}
