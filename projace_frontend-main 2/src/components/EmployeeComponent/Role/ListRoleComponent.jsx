import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RoleService from '../../../services/RoleService'

function ListRoleComponent() {
    const [role,setRole] = useState([])

    useEffect(() => {

        getAllRoles();

    },[])

    const getAllRoles = () =>{
        RoleService.getAllRoles().then((response) => {
            setRole(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        });
    }

    const deleteRole = (roleId) => {

        if(window.confirm('Are you sure you want to delete this role?')){

            RoleService.deleteRole(roleId).then((response) => {
                getAllRoles();
            }).catch((error) => {
                console.log(error);
                console.log(error.message);
    
            });    

        }

       
    }




  return (
    <div className='container'>
            <div className="py-4">
                <h2 className="text-center"> List Role </h2>
                <Link to="/AddRole" className="btn btn-primary mb-2" > Add Role </Link>
                <table className='table table-striped table-bordered '>
                    <thead>
                        <tr>
                            <th >ID</th>
                            <th >Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {role.map((role, index) => (
                            <tr>
                                <td scope="row" key={index}>
                                    R{index + 1}
                                </td>

                                <td> {role.roleName}</td>
                                
                                <td>
                                    <Link
                                        className="btn btn-primary mx-2"
                                        to={`/edit-AddRole/${role.idRole}`}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="btn btn-danger mx-2"
                                        onClick={() => deleteRole(role.idRole)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link className="btn btn-primary my-2" to={"/employee"}>
              Back
            </Link>
        </div>
        
  )
  return (
    <div>ListRoleComponent</div>
  )
}

export default ListRoleComponent



