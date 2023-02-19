import axios from "axios";
import authHeader from "./Auth-HeaderService";

const getStockMenu = () => {
    return axios.get("http://localhost:8080/stock_menu/getStockMenu",{ headers: authHeader()});
}

const addStockMenu = (stock_menu) => {
    console.log(stock_menu);
    return axios.post("http://localhost:8080/stock_menu/addStockMenu",stock_menu,{ headers: authHeader()});
}

const updateStockMenu = (stockMenu_ID,stock_menu) => {
    return axios.put("http://localhost:8080/stock_menu/updateStockMenu/"+stockMenu_ID,stock_menu,{ headers: authHeader()});
}

const deleteStockMenu = (stockMenu_ID) => {
    return axios.delete("http://localhost:8080/stock_menu/deleteStockMenu/"+stockMenu_ID,{ headers: authHeader()});
}


const findMenuInStockMenu = (menu_ID) =>{
}

const StockMenuService = {
    getStockMenu,
    addStockMenu,
    updateStockMenu,
    deleteStockMenu,
    findMenuInStockMenu
}

export default StockMenuService;