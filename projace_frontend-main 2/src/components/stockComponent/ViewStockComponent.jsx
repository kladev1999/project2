import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import StockService from '../../services/StockService'

const ViewStockComponent = (props) => {
    
    const {stock_ID} = useParams();
    
    const navigate = useNavigate();
    
    const stockState = {
        stock_ID: null,
        stockType_ID: '',
        stock_Qty: null,
        stock_Cost: null,
        stock_Min: '',
        stock_TimeStamp: '',
      };
    const [stock,setStock] = useState(stockState);

   const getStockID = (stock_ID) => {
    StockService.getStockById(stock_ID).then(response => {setStock(response.data);
      })
      .catch(error => {
        console.log('Something went wrong', error);
      });
      
  }

   useEffect(() => {
    getStockID(stock_ID);
  }, [stock_ID]);

    const goBack = () =>{
        navigate("/stock");
    }


        
        return (
           
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Stock Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Stock ID :  </label>
                            <div> { stock.stock_ID}</div>
                        </div>
                        <div className = "row">
                            <label> Stock Name :  </label>
                            <div> { stock.stockType_ID.stockType_Name}</div>
                        </div>
                        <div className = "row">
                            <label> Stock Qty :  </label>
                            <div> { stock.stock_Qty }</div>
                        </div>
                        <div className = "row">
                            <label> Stock Cost :  </label>
                            <div> {  stock.stock_Cost}</div>
                        </div>
                        <div className = "row">
                            <label> Stock Min :  </label>
                            <div> {  stock.stock_Min}</div>
                        </div>
                        <div className = "row">
                            <label> Stock TimeStamp :  </label>
                            <div> { stock.stock_TimeStamp}</div>
                        </div>
                       <div align = "center">
                        <button className="btn btn-primary" onClick={goBack}> Back </button>
                       </div>
                    </div>

                </div>
            </div>
        )

}

export default ViewStockComponent
