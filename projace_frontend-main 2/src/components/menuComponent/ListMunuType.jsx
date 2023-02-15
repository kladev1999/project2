import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MenuService from "../../services/MenuService";


function ListMunuType() {

    const [MenuType, setMenuType] = useState([]);

    useEffect(() => {

        getAllMenuType();

    },[MenuType.length])

    const getAllMenuType = () =>{
        MenuService.getMenuType().then((response) => {
            setMenuType(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        });
    }

    const deleteRole = (stock_ID) => {

        if(window.confirm('Are you sure you want to delete this MenuType?')){

            MenuService.deleteMenuType(stock_ID).then((response) => {
                getAllMenuType();
            }).catch((error) => {
                console.log(error);
                console.log(error.message);
    
            });    

        }
    }

    return (
        <div className='container'>
                <div className="py-4">
                    <h2 className="text-center"> List stockType </h2>
                    <Link to="/addMenuType" className="btn btn-primary mb-2" > Add MenuType </Link>
                    <table className='table table-striped table-bordered '>
                        <thead>
                            <tr>
                                <th >ID</th>
                                <th >Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MenuType?.map((MenuType, index) => (
                                <tr>
                                    <td scope="row" key={index}>
                                        T{index + 1}
                                    </td>
    
                                    <td> {MenuType.typeMenu_Name}</td>
                                    
                                    <td>
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to={`/UpdateMenutype/${MenuType.typeMenu_ID}`}
                                        >
                                            แก้ไข
                                        </Link>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => deleteRole(MenuType.typeMenu_ID)}
                                        >
                                            ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link className="btn btn-primary my-2" to={"/menu"}>
                  Back
                </Link>
            </div>
            
      )
    }


export default ListMunuType