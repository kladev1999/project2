import axios from "axios";
import authHeader from "./Auth-HeaderService";
const STOCK_API_BASE_URL = "http://localhost:8080/stock";
const STOCKTYPE_API_BASE_URL = "http://localhost:8080/stockType";

const getStockType = () => {
  return axios.get(STOCKTYPE_API_BASE_URL + "/getStockType",{ headers: authHeader()});
};

const getBackUpStock = () => {
  return axios.get("http://localhost:8080/stock/backupStockFindAll",{ headers: authHeader()});
};
const addStockType = (stockType) => {
  return axios.post(STOCKTYPE_API_BASE_URL + "/addStockType",stockType,{ headers: authHeader()});
};
const getStockTypeById = (stockType_ID) => {
  return axios.get(
    "http://localhost:8080/stockType/getStockType/" + stockType_ID,{ headers: authHeader()});
};
const updateStockType = (stockType_ID, stockType) => {
  return axios.put(
    STOCKTYPE_API_BASE_URL + "/updateStockType/" + stockType_ID,
    stockType,{ headers: authHeader()}
  );
};
const deleteStockType = (stockType_ID) => {
  return axios.delete(
    STOCKTYPE_API_BASE_URL + "/deleteStockType/" + stockType_ID,{ headers: authHeader()}
  );
};

const getStock = () => {
  return axios.get(STOCK_API_BASE_URL + "/getStock",{ headers: authHeader()});
};

const addStock = (stock) => {
  console.log(stock);
  return axios.post("http://localhost:8080/stock/addStock",stock,{ headers: authHeader()});
};

const getStockById = (stock_ID) => {
  return axios.get("http://localhost:8080/stock/getStock/" + stock_ID,{ headers: authHeader()});
};

const updateStock = (stock_ID,stock) => {
  return axios.put(STOCK_API_BASE_URL + "/updateStock/"+stock_ID,stock,{ headers: authHeader()});
};

const deleteStock = (stock_ID) => {
  return axios.delete(STOCK_API_BASE_URL + "/deleteStock/" + stock_ID,{ headers: authHeader()});
};

const StockService = {
  getStock,
  addStock,
  getStockById,
  updateStock,
  getBackUpStock,
  deleteStock,
  getStockType,
  addStockType,
  getStockTypeById,
  updateStockType,
  deleteStockType,
};

export default StockService;
