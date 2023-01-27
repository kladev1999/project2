import axios from "axios";
import authHeader from "./Auth-HeaderService";
const EMPLOYEE_BASE_REST_API_URL = "http://localhost:8080/api/v1/employees";

class EmployeeService {
  getAllEmployees() {
    return axios.get(EMPLOYEE_BASE_REST_API_URL, { headers: authHeader() });
  }

  createEmployee(employee) {
    const emp = {
      name_Emp: employee.name_Emp,
      username: employee.username,
      password: employee.password,
      phone: employee.phone,
      address: employee.address,
      line: employee.line,
      image: employee.image,
    };

    return axios.post("http://localhost:8080/api/auth/signup", emp, {
      headers: authHeader(),
    });
  }

  getEmployeeById(employeeId) {
    return axios.get(EMPLOYEE_BASE_REST_API_URL + "/" + employeeId, {
      headers: authHeader(),
    });
  }

  updateEmployee(employeeId, employee,name) {
    console.log(name);
    const emp = {
      id: employee.id,
      name_Emp: employee.name_Emp,
      username: employee.username,
      password: employee.password,
      phone: employee.phone,
      address: employee.address,
      line: employee.line,
      image: employee.image,
    };
    if(name === undefined){
      return axios.put(EMPLOYEE_BASE_REST_API_URL + "/" + employeeId, emp, {
        headers: authHeader(),
      });
    }else{
      return axios.put(EMPLOYEE_BASE_REST_API_URL + "/" + employeeId+"/"+name, emp, {
        headers: authHeader(),
      });
    }

    
   
  }

  deleteEmployee(employeeId) {
    return axios.delete(EMPLOYEE_BASE_REST_API_URL + "/" + employeeId, {
      headers: authHeader(),
    });
  }
}

export default new EmployeeService();
