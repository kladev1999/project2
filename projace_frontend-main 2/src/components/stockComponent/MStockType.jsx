import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StockService from "../../services/StockService";

function MStockType() {

    const [stock, setStock] = useState([]);

    useEffect(() => {

        getAllstock();

    },[stock.length])

    const getAllstock = () =>{
        StockService.getStockType().then((response) => {
            setStock(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        });
    }

    const deleteRole = (stock_ID) => {

        if(window.confirm('Are you sure you want to delete this role?')){

            StockService.deleteStockType(stock_ID).then((response) => {
                getAllstock();
            }).catch((error) => {
                console.log(error);
                console.log(error.message);
    
            });    

        }
    }


    return (
        <div className='container'>
                <div className="py-4">
                    <h2 className="text-center"> ชื่อวัตถุดิบ </h2>
                    <Link to="/addStockType" className="btn btn-primary mb-2" > เพิ่มชื่อวัตถุดิบ </Link>
                    <table className='table table-striped table-bordered '>
                        <thead>
                            <tr>
                                <th >รหัสวัตถุดิบ</th>
                                <th >ชื่อวัตถุดิบ</th>
                                <th>การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stock?.map((stock, index) => (
                                <tr>
                                    <td scope="row" key={index}>
                                        S{index + 1}
                                    </td>
    
                                    <td> {stock.stockType_Name}</td>
                                    
                                    <td>
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to={`/UpdateStockType/${stock.stockType_ID}`}
                                        >
                                            แก้ไข
                                        </Link>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => deleteRole(stock.stockType_ID)}
                                        >
                                            ลบ
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link className="btn btn-primary my-2" to={"/stock"}>
                  กลับ
                </Link>
            </div>
            
      )
    }

export default MStockType