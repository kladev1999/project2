import axios from "axios";
import authHeader from "./Auth-HeaderService";
const getOrderMenu = () =>{
    return axios.get("http://localhost:8080/OrderMenu/getOrderMenu",{ headers: authHeader()});
}
const addOrderMenu = (OrderMenu) =>{
    console.log("addOrderMenu",OrderMenu);
    return axios.post("http://localhost:8080/OrderMenu/addOrderMenu",OrderMenu,{ headers: authHeader()});
}

const kitchen = (dateData) =>{
    return axios.get("http://localhost:8080/OrderMenu/kitchenShow/"+dateData,{ headers: authHeader()});
}


const addOrderMenus = (OrderMenus) =>{

    let oor = OrderMenus;

        console.log(OrderMenus);
    return axios.post("http://localhost:8080/OrderMenu/addOrderMenus",oor,{ headers: authHeader()});
}

const getOrderMenuByID = (OrderMenu_ID) =>{
    return axios.get("http://localhost:8080/OrderMenu/getOrderMenu/"+ OrderMenu_ID,{ headers: authHeader()});
}
const updateOrderMenu = (OrderMenu_ID,OrderMenu) =>{
    return axios.put("http://localhost:8080/OrderMenu/updateOrderMenu/"+ OrderMenu_ID,OrderMenu,{ headers: authHeader()});
}

const deleteOrderMenu = (OrderMenu_ID) =>{
    return axios.delete("http://localhost:8080/OrderMenu/deleteOrderMenu/"+ OrderMenu_ID,{ headers: authHeader()});
}


// LoopStockCut
const loopStockCut = (menu_ID,qty) =>{
    console.log(qty);
    return axios.get("http://localhost:8080/OrderMenu/cutLoopStock/"+menu_ID+"/"+qty,{ headers: authHeader()});
}

// หาวัตถุดิบพร้อมเพิ่มสต๊อก
const addLoopStock = (menu_ID) =>{
    return axios.get("http://localhost:8080/OrderMenu/addLoppStock/"+menu_ID,{ headers: authHeader()});
}
//เมนู 5 อันดับแรก
const bestseller = () =>{
    return axios.get("http://localhost:8080/OrderMenu/getbestseller",{ headers: authHeader()});
}

const updateStatus = (orderMenu_ID) =>{
    return axios.get("http://localhost:8080/OrderMenu/status/"+ orderMenu_ID,{ headers: authHeader()});
}

const cancelStatus = (orderMenu_ID) =>{
    return axios.get("http://localhost:8080/OrderMenu/statusCancel/"+ orderMenu_ID,{ headers: authHeader()});
}

const finishedlStatus = (orderMenu_ID) =>{
    return axios.get("http://localhost:8080/OrderMenu/finished/"+ orderMenu_ID,{ headers: authHeader()});
}

const mergeTable = (totalOrder_ID,pointTable) =>{
    return axios.get("http://localhost:8080/OrderMenu/mergeTable/"+totalOrder_ID+"/"+pointTable,{ headers: authHeader()});
}

const monthCost = () => {
    return axios.get("http://localhost:8080/OrderMenu/monthCost",{ headers: authHeader()});
}



const OrderMenuService = {
    getOrderMenu,
    addOrderMenu,
    addOrderMenus,
    getOrderMenuByID,
    deleteOrderMenu,
    finishedlStatus,
    mergeTable,
    updateOrderMenu,
    kitchen,
    loopStockCut,
    addLoopStock,
    bestseller,
    updateStatus,
    mergeTable,
    cancelStatus,
    monthCost
}

export default OrderMenuService;

