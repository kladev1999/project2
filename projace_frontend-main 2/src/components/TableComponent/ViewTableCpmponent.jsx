import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom";
import TableService from '../../services/TableService';
function ViewTableCpmponent() {

  const { table_ID } = useParams();

  const OrderState = {
    table_ID: "",
    Total_Price: "",
    Total_TimeStamp: "",
    table_Zone: "",
  };

  const [Order, setOrder] = useState(OrderState);

  
  
  const getTableById = (table_ID) => {
    TableService.getTableById(table_ID)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  useEffect(() => {
    getTableById(table_ID);
  
  }, [table_ID])




  return (
    <div>ViewTableCpmponent</div>
  )
}

export default ViewTableCpmponent