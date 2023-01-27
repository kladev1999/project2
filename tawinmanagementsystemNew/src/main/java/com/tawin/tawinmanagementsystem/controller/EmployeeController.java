package com.tawin.tawinmanagementsystem.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.Calendar;
import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.tawin.tawinmanagementsystem.entity.Employee;
import com.tawin.tawinmanagementsystem.entity.Role;
import com.tawin.tawinmanagementsystem.exception.ResourceNotFoundException;
import com.tawin.tawinmanagementsystem.repository.EmployeeRepository;
import com.tawin.tawinmanagementsystem.repository.RoleRepository;
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private RoleRepository roleRepo;


	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@GetMapping("/emp")
	public List<Employee> getEmp1(){
		return employeeRepository.findAll();
	}
	
	// get all employees
	@GetMapping("/employees")
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}

	@GetMapping("/Emp")
	public List<Employee> getEmp() {
		return employeeRepository.findByName();
	}

	// create employee rest api
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee) throws Exception {

		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Bangkok"));
		int hours = calendar.get(Calendar.HOUR_OF_DAY);
		int minutes = calendar.get(Calendar.MINUTE);
		int sec = calendar.get(Calendar.SECOND);
		int day = calendar.get(Calendar.DAY_OF_MONTH);
		int month = calendar.get(Calendar.MONTH);
		int year = calendar.get(Calendar.YEAR);
		String datetime = "D" + day + "-" + month + "-" + year + "-T" + hours + "." + minutes + "." + sec;
		employee.setImage(datetime + ".jpg");
		employee.setPassword(getEncodedPassword(employee.getPassword()));
		
		return employeeRepository.save(employee);
	}


	// get employee by id rest api
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		return ResponseEntity.ok(employee);
	}
	
	@PutMapping("/employees/{id}/{name}")
	public ResponseEntity<Employee> updateEmployeeRole(@PathVariable Long id, @RequestBody Employee employeeDetails,@PathVariable String name) {
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Bangkok"));
		
		int hours = calendar.get(Calendar.HOUR_OF_DAY);
		int minutes = calendar.get(Calendar.MINUTE);
		int sec = calendar.get(Calendar.SECOND);
		int day = calendar.get(Calendar.DAY_OF_MONTH);
		int month = calendar.get(Calendar.MONTH);
		int year = calendar.get(Calendar.YEAR);

		String datetime = "D" + day + "-" + month + "-" + year + "-T" + hours + "." + minutes + "." + sec;
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		
		String role_ID = employeeRepository.findRoleBefor_ID(id);
		employeeRepository.updateRole(id, name, role_ID);
		
		employee.setName_Emp(employeeDetails.getName_Emp());
		employee.setUsername(employeeDetails.getUsername());
		employee.setPassword(employeeDetails.getPassword());
		employee.setPhone(employeeDetails.getPhone());
		employee.setAddress(employeeDetails.getAddress());

		if (employeeDetails.getImage() == null) {

			employee.setImage(datetime + ".jpg");

		} else {

			employee.setImage(employeeDetails.getImage());
		}
		


		employee.setLine(employeeDetails.getLine());
//		employee.setRole("Admin");

		Employee updatedEmployee = employeeRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}


	// update employee rest api

	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
		Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Bangkok"));
		
		int hours = calendar.get(Calendar.HOUR_OF_DAY);
		int minutes = calendar.get(Calendar.MINUTE);
		int sec = calendar.get(Calendar.SECOND);
		int day = calendar.get(Calendar.DAY_OF_MONTH);
		int month = calendar.get(Calendar.MONTH);
		int year = calendar.get(Calendar.YEAR);

		String datetime = "D" + day + "-" + month + "-" + year + "-T" + hours + "." + minutes + "." + sec;
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		
		employee.setName_Emp(employeeDetails.getName_Emp());
		employee.setUsername(employeeDetails.getUsername());
		employee.setPassword(employeeDetails.getPassword());
		employee.setPhone(employeeDetails.getPhone());
		employee.setAddress(employeeDetails.getAddress());

		if (employeeDetails.getImage() == null) {

			employee.setImage(datetime + ".jpg");

		} else {

			employee.setImage(employeeDetails.getImage());
		}
		


		employee.setLine(employeeDetails.getLine());
//		employee.setRole("Admin");

		Employee updatedEmployee = employeeRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}

	// delete employee rest api
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
		employeeRepository.deleteEmployeeInUserRole(id);
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));

		
		employeeRepository.delete(employee);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}

	public String getEncodedPassword(String password) {
		return passwordEncoder.encode(password);
	}

}
