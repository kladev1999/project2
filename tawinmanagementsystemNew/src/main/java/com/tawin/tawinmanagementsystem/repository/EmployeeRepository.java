package com.tawin.tawinmanagementsystem.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.tawin.tawinmanagementsystem.entity.Employee;
import com.tawin.tawinmanagementsystem.entity.Role;




@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{
    
    @Query(value = "SELECT * FROM Employee",nativeQuery = true)
    public List<Employee>findByName();
    
    @Query(value = "SELECT * FROM employee WHERE employee.username = :userName"
    		+ "	",nativeQuery = true)
	Employee findByUserName(String userName);
    
    
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM user_roles WHERE user_roles.user_id = :emp_ID",nativeQuery = true)
    public int deleteEmployeeInUserRole(Long emp_ID);
    
    
    Optional<Employee> findByUsername(String username);

    Boolean existsByUsername(String username);
    
    @Query(value = "SELECT user_roles.role_id FROM user_roles WHERE user_roles.user_id = :emp_ID",nativeQuery = true)
    public String findRoleBefor_ID(Long emp_ID);
    
    @Modifying
    @Transactional
    @Query(value = "UPDATE user_roles SET role_id = :role_id WHERE user_roles.user_id = :emp_ID AND user_roles.role_id = :role_After",nativeQuery = true)
    public void updateRole(Long emp_ID,String role_id,String role_After);
    
}
