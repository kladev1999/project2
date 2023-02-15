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
          <h2 className="text-center m-4">ข้อมูลพนักงาน</h2>
          <div className="card">
            <div className="card-header">
            
              <ul className="list-group list-group-flush">
              <li className="text-center">
                <img src={pic+employee.image} alt="img" width="150" height="150" />
                </li>
                <li className="list-group-item">
                  <b>ชื่อ:</b>
                  &nbsp; {employee.name_Emp}
                </li>
                <li className="list-group-item">
                  <b>ชื่อผู้ใช้:</b>
                  &nbsp; {employee.username}
                </li>
                <li className="list-group-item">
                  <b>เบอร์โทรศัพท์:</b>
                  &nbsp; {employee.phone}
                </li>
                <li className="list-group-item">
                  <b>ที่อยู่:</b>
                  &nbsp; {employee.address}
                </li>
                <li className="list-group-item">
                  <b>ไลน์ไอดี:</b>
                  &nbsp; {employee.line}
                </li>
                
              </ul>
            </div>
          </div>

          <Link className="btn btn-primary my-2" to={"/employee"}>
            ย้อนกลับ
          </Link>
        </div>
      </div>

    </div>
  )
}

export default ViewEmployeeComponent


