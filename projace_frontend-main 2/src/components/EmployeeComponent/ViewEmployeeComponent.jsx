import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EmployeeService from '../../services/EmployeeService'
import authHeader from "../../services/Auth-HeaderService";
function ViewEmployeeComponent() {
  const { id } = useParams();

  let pic = "http://localhost:8080/menu/getimagesEmp/"
  
  const employeeState ={
    name_Emp:null,
    username:null,
    password:null,
    phone:null,
    address:null,
    line:null,
    image:null,
    idRole:''
  }
  const [employee, setEmployee] = useState(employeeState);

 const getEmployeeId = (employeeId) => {
    EmployeeService.getEmployeeById(employeeId).then(response => {
      setEmployee(response.data);
      console.log(response.data);
      
 }).catch(error => {
  console.log('Something went wrong', error);
});
 }

 useEffect(() => {
  getEmployeeId(id);
}, [id]);
  

 
  return (
    <div className="container">

      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Employee Details</h2>
          <div className="card">
            <div className="card-header">
              Details of employee
              <ul className="list-group list-group-flush">
              <li className="text-center">
                <img src={pic+employee.image} alt="img" width="150" height="150" />
                </li>
                <li className="list-group-item">
                  <b>Name:</b>
                  &nbsp; {employee.name_Emp}
                </li>
                <li className="list-group-item">
                  <b>UserName:</b>
                  &nbsp; {employee.username}
                </li>
                <li className="list-group-item">
                  <b>Phone:</b>
                  &nbsp; {employee.phone}
                </li>
                <li className="list-group-item">
                  <b>Address:</b>
                  &nbsp; {employee.address}
                </li>
                <li className="list-group-item">
                  <b>Line:</b>
                  &nbsp; {employee.line}
                </li>
                <li className="list-group-item">
                  <b>Role:</b>
                  &nbsp; {employee.roles?.name}
                </li>
              </ul>
            </div>
          </div>

          <Link className="btn btn-primary my-2" to={"/employee"}>
            Back
          </Link>
        </div>
      </div>

    </div>
  )
}

export default ViewEmployeeComponent


