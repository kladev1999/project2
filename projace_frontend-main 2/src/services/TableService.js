import axios from "axios";
import authHeader from "./Auth-HeaderService";
const getTable = () => {
  return axios.get("http://localhost:8080/table/getTable",{ headers: authHeader()});
};

const addTable = (table) => {
  return axios.post("http://localhost:8080/table/addTable", table,{ headers: authHeader()});
};

const MixTable = (table_ID,dateData) => {
  return axios.get("http://localhost:8080/totalOrder/getMixTable/"+ table_ID+"/"+dateData,{ headers: authHeader()});
};

const getTableDatetime = (dateData) => {
  return axios.get("http://localhost:8080/table/getDatetime/"+dateData,{ headers: authHeader()});
};

const getTableById = (table_ID) => {
  return axios.get("http://localhost:8080/table/getTable/" + table_ID,{ headers: authHeader()});
};

const updateTable = (table_ID, table) => {
  return axios.put("http://localhost:8080/table/updateTable/" + table_ID, table,{ headers: authHeader()});
};



const deleteTable = (table_ID) => {
  return axios.delete("http://localhost:8080/table/deleteTable/" + table_ID,{ headers: authHeader()});
};

const findTable = () =>{
  return  axios.get("http://localhost:8080/totalOrder/getTableIntotal",{ headers: authHeader()});
};

const getMoveTable = (dateData) => {
  return  axios.get("http://localhost:8080/table/getmoveTable"+"/"+dateData,{ headers: authHeader()});
}

const MoveTable = (table,totalOrder_ID) =>{
  return axios.get("http://localhost:8080/table/moveTable/" + table + "/" + totalOrder_ID,{ headers: authHeader()});
}


const getTotalOrder_ID = (table_ID) =>{
  return axios.get("http://localhost:8080/table/getTotalOrderID/"+table_ID,{ headers: authHeader()});
}
const TableService = {
  getTable,
  addTable,
  MixTable,
  getTableById,
  getTableDatetime,
  getMoveTable,
  updateTable,
  deleteTable,
  MoveTable,
  findTable,
  getTotalOrder_ID
};

export default TableService;