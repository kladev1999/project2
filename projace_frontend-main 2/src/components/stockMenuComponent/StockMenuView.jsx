import React from 'react';
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import StockMenuService from '../../services/StockMenuService';
import StockService from '../../services/StockService';
import MenuService from '../../services/MenuService';




function StockMenuView(props) {

    const [stock,setStock] = useState([]);
    const [menu,setMenu] = useState([]);
    const {stock_ID} = useParams();
    const {menu_ID} = useParams();
    const navigate = useNavigate();


    const filterMenu = () => {
        for(let i =0;i<stock.length;i++) {
            
        }
    }



    const stockMenuStatet = {
        stockMenu_ID: null,
        stockMenu_Qty: null,
        stock_ID:{
            stock_ID
        },
        menu_ID:{
            menu_ID
        }
    }
    const [stockMenu, setStockMenu] = useState([]);


    const getStock = () => {
        StockService.getStock()
        .then((response) => {
            setStock(response.data);
        })
    }
    const getMenuID = () => {
        MenuService.getMenu() 
        .then((response)=>{
            setMenu(response.data);
        })
    }

    const backToMenu = () => {
        navigate('/menu');
    }

    useEffect(() => {
        getMenuID();
        getStock();
    },[menu_ID]);

  return (
    <div>StockMenuView</div>
  )
}

export default StockMenuView