import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import EmployeeService from '../../services/EmployeeService'
import authHeader from '../../services/Auth-HeaderService';

function ListEmployyComponent() {

        const [employees, setEmployees] =useState([])
        const [search,searchInput] = useState("");
        const navigate = useNavigate();

        let pic = "http://localhost:8080/menu/getimagesEmp/"

    const getAllEmployee = () =>{
       EmployeeService.getAllEmployees()
       .then((response) =>{
        setEmployees(response.data);
        console.log(response.data);
       }).catch((error) => {
        console.log(error)
       })
    }

    const deleteEmployee = (id) => {
      if(window.confirm("you wont to delete this employee?")){

        EmployeeService.deleteEmployee(id)
        .then((response) => {
          getAllEmployee();
        })
        .catch((error) => {
          console.log(error);
        });
      }
      };

    useEffect(()=>{

        getAllEmployee();

    },[])

    const viewEmployee = (id) => {
        navigate("/viewEmployee/" + id);
      };
    
      const editEmployee = (id) => {
        navigate("/addemployee/" + id);
      };
    
      const addEmployee = () => {
        navigate("/addemployee");
      };
    
      const addEmployeeRole = () => {
        navigate("/Role");
      };

    const filterEmp = employees.filter((employee) => {
      if(search.length> 2){

        return employee.name_Emp
        .toLowerCase()
        .includes(search.toLowerCase());
      }else{
        return employees
      }
      });



  return (
    <div className="container">
      <h2 className="text-center">พนักงาน</h2>
      <div className="">
        <button className="btn btn-primary mr-2 "style={{margin:5}} onClick={addEmployee}>
          {" "}
          Add Employee
        </button>
        {/* <button className="btn btn-primary mr-2 "style={{margin:5}} onClick={addEmployeeRole}>
          {" "}
          Roles
        </button> */}

        <input
          type="search"
          placeholder="ค้นหา"
          aria-label="Search"
          onChange={(e) => searchInput(e.target.value)}
        />
      </div>

      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> ID </th>
              <th> Picture </th>
              <th> Name</th>
              <th> Username </th>
              <th> Phone </th>
              <th> Line </th>
              <th> Role</th>
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {filterEmp.map((emp) => (
              
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td width="100" >
                <img src={pic+emp.image} alt="img" width="80" height="70" />
                </td>
                <td>{emp.name_Emp}</td>
                <td>{emp.username}</td>
                <td>{emp.phone}</td>
                <td>{emp.line}</td>
                <td>{emp.roles[0]?.name}</td>
                <td>
                
                  <button
                    onClick={() => editEmployee(emp.id)}
                    className="btn btn-info"
                  >
                    Update{" "}
                  </button>
                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => deleteEmployee(emp.id)}
                    className="btn btn-danger"
                  >
                    Delete{" "}
                  </button>
             
                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => viewEmployee(emp.id)}
                    className="btn btn-info"
                  >
                    View{" "}
                  </button>
       
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListEmployyComponent