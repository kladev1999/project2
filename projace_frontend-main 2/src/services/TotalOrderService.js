import axios from "axios";
import authHeader from "./Auth-HeaderService";
const getTotalOrders = () =>{
    return axios.get("http://localhost:8080/totalOrder/getTotalOrder",{ headers: authHeader()});
}

const addTotalOrder = (totalOrder) =>{
    return axios.post("http://localhost:8080/totalOrder/addTotalOrder",totalOrder,{ headers: authHeader()});
}

const getTotalOrderById = (totalOrder_ID) =>{
    return axios.get("http://localhost:8080/totalOrder/getTotalOrder/" + totalOrder_ID,{ headers: authHeader()});
}

const getTotalListOrderById = (totalOrder_ID,statusTable) =>{
    return axios.get("http://localhost:8080/OrderMenu/getListOrderMenu/" + totalOrder_ID+"/"+statusTable,{ headers: authHeader()});
}
const getDate = (Datetime) =>{
    return axios.get("http://localhost:8080/totalOrder/getDatetime/" + Datetime);
}

const getMytable = (Emp_id,dateData) =>{
    return axios.get("http://localhost:8080/totalOrder/getMytable/" + Emp_id +"/"+dateData ,{ headers: authHeader()});
}
const checkPay = (status)=>{
    return axios.get("http://localhost:8080/totalOrder/checkPay/1",{ headers: authHeader()});
}
const updateTotalprice = (totalPrice,total_order_id)=>{
    return axios.get("http://localhost:8080/totalOrder/Update_TotalPrice/"+totalPrice+"/"+total_order_id,{ headers: authHeader()});
}

const updateTotalOrder = (totalOrder_ID, totalOrder)   =>{
    const totalOrderState = {
        totalOrder_ID : totalOrder.totalOrder_ID,
        totalPrice: totalOrder.totalPrice,
        disCount: totalOrder.disCount,
        totalOrder_Status: totalOrder.totalOrder_Status,
        table_ID: {
            table_ID:totalOrder.table_ID,
            table_Zone:totalOrder.table_Zone
        }
      };
    console.log(totalOrderState);
    return axios.put("http://localhost:8080/totalOrder/updateTotalOrder/"+totalOrder_ID,totalOrderState,{ headers: authHeader()});
}

const deleteTotalOrder = (totalOrder_ID) =>{
    return axios.delete("http://localhost:8080/totalOrder/deleteTotalOrder/"+ totalOrder_ID,{ headers: authHeader()});
}
const getTable =()=>{
    return axios.get("http://localhost:8080/table/getTable",{ headers: authHeader()});
}

const totalPrice = (totalPrice,totalOrder_ID)=>{
    return axios.get("http://localhost:8080/totalOrder/totalPrice/"+totalPrice+"/"+totalOrder_ID,{ headers: authHeader()});
}

const UpdateDiscount = (Discount_ID,totalOrder_ID,distotal)=>{
    return axios.get("http://localhost:8080/totalOrder/UpdateDiscount/"+Discount_ID+"/"+totalOrder_ID+"/"+distotal,{ headers: authHeader()});
}

const Update_Discount = (discount_id,totalOrder_ID)=>{
    return axios.get("http://localhost:8080/totalOrder/Update_Discount/"+discount_id+"/"+totalOrder_ID,{ headers: authHeader()});
}
const UpdateStatusPay = (totalOrder_ID)=>{
    return axios.get("http://localhost:8080/totalOrder/UpdateStatusPay/"+totalOrder_ID,{ headers: authHeader()});
}
const UpdateSlip = (totalOrder_ID)=>{
    return axios.get("http://localhost:8080/totalOrder/UploadSlip/"+totalOrder_ID,{ headers: authHeader()});
}

const TotalOrderService = {
    getTotalOrders,
    addTotalOrder,
    getTotalOrderById,
    UpdateStatusPay,
    getMytable,
    Update_Discount,
    updateTotalOrder,
    deleteTotalOrder,
    UpdateDiscount,
    UpdateSlip,
    getDate,
    getTable,
    getTotalListOrderById,
    checkPay,
    updateTotalprice,
    totalPrice
};

export default TotalOrderService;
