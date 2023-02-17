import React from "react";
import './App.css';


import Box from '@mui/material/Box';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListStockComponent from './components/stockComponent/ListStockComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateStockComponent from './components/stockComponent/CreateStockComponent';
import UpdateStockComponent from './components/stockComponent/UpdateStockComponent';
import ViewStockComponent from './components/stockComponent/ViewStockComponent';
import CreateStockTypeComponent from './components/stockComponent/CreateStockTypeComponent';
import ListMenuComponent from './components/menuComponent/ListMenuComponent';
import ViewMenuComponent from './components/menuComponent/ViewMenuComponent';
import CreateMenuTypeComponent from './components/menuComponent/CreateTypeMenuComponent';
import CreateMenuComponent from './components/menuComponent/CreateMenuComponent';
import UpdateMenuComponent from './components/menuComponent/UpdateMenuComponent';
import ListStockMenuComponent from './components/stockMenuComponent/ListStockMenuComponent';
import CreateStock_MenuComponent from './components/stockMenuComponent/CreateStock_MenuComponent';
import DashboardUser from './components/userComponent/DashboardUser';
import Cart from './components/userComponent/Cart';
import CartEmp from "./components/userComponent/CartEmp";
import Cashier from './components/cashierComponent/Cashier';
import TaotalOrder from './components/cashierComponent/totalOrder/TatalOrder';
import TableComponent from './components/TableComponent/TebleComponent';
import CreateTableComponent from './components/TableComponent/CreateTableComponent';
import ListEmployyComponent from './components/EmployeeComponent/ListEmployyComponent';
import CreateEmployeeComponent from './components/EmployeeComponent/CreateEmployeeComponent';
import ListRoleComponent from './components/EmployeeComponent/Role/ListRoleComponent';
import AddRoleComponent from './components/EmployeeComponent/Role/AddRoleComponent';
import ViewEmployeeComponent from './components/EmployeeComponent/ViewEmployeeComponent';
import ListTotalOrdermenu from './components/cashierComponent/totalOrder/ListTotalOrdermenu';
import KitchenComponent from './components/KitchenComponent/KitchenComponent';
import CashierComponent from "./components/KitchenComponent/CashierComponent";
import MixTable from './components/TableComponent/MixTable';
import MoveTable from './components/TableComponent/MoveTable';
import Checkbill from './components/cashierComponent/totalOrder/Checkbill';
import Promotion from './components/promotion/Promotion';
import Uploadslipcomponent from './components/cashierComponent/totalOrder/Uploadslipcomponent';
import LoginComponent from './components/LoginComponent';
import MonthCost from './components/cashierComponent/totalOrder/MonthCost';
import TableOrderEmp from './components/cashierComponent/totalOrder/TableOrderEmp';
import TableWithPagination from './components/cashierComponent/totalOrder/TableWithPagination';
import IncomeExpense from './components/Income-expenseComponent/IncomeExpense';
import Profile from './components/ProfileComponent/Profile';
import Form from "./components/Form";
import UpdateUser from "./components/EmployeeComponent/UpdateUser";
import ListTotalOrdermenuEmp from "./components/cashierComponent/totalOrder/ListTotalOrdermenuEmp";
import DashboardEmp from "./components/userComponent/DashboardEmp";
import TableEmp from "./components/TableComponent/TableEmp";
import UploadspilEmp from "./components/cashierComponent/totalOrder/UploadspilEmp";
import OrderMenuAdmin from "./components/userComponent/OrderMenuAdmin";
import OrderMenuEmp from "./components/userComponent/OrderMenuEmp";
import CreateTableEmp from "./components/TableComponent/CreateTableEmp";
import UpdateTable from "./components/TableComponent/UpdateTable";
import UpdateTableEmp from "./components/TableComponent/UpdateTableEmp";
import BackupStock from "./components/stockComponent/BackupStock";
import MStockType from "./components/stockComponent/MStockType";
import UpdateStockType from "./components/stockComponent/UpdateStockType";
import ListMunuType from "./components/menuComponent/ListMunuType";
import UpdateMenutype from "./components/menuComponent/UpdateMenutype";
import StockEmp from "./components/stockComponent/StockEmp";


function App() {
  return (
    <div>
      <HeaderComponent />
      <div className="container">
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<LoginComponent />}></Route>
          <Route path="/Form/:totalOrder_ID/:table_ID/:compoSite" element={<Form />}></Route>
          <Route path="/OrderMenuAdmin/:totalOrder_ID/:table_ID/:compoSite" element={<OrderMenuAdmin />}></Route>
          <Route path="/OrderMenuEmp/:totalOrder_ID/:table_ID/:compoSite" element={<OrderMenuEmp />}></Route>
          <Route path="/TableEmp" element={<TableEmp />}></Route>
          <Route path="/ListMunuType" element={<ListMunuType />}></Route>
          <Route path="/MStockType" element={<MStockType />}></Route>
          <Route path="/BackupStock" element={<BackupStock />}></Route>
          <Route path="/CreateTableEmp" element={<CreateTableEmp />}></Route>
          <Route path="/UpdateUser/:id" element={<UpdateUser />}></Route>
          <Route path="/UpdateTable/:table_ID" element={<UpdateTable />}></Route>
          <Route path="/UpdateStockType/:StockType_ID" element={<UpdateStockType />}></Route>
          <Route path="/UpdateMenutype/:Menutype_ID" element={<UpdateMenutype />}></Route>
          <Route path="/UpdateTableEmp/:table_ID" element={<UpdateTableEmp />}></Route>
          <Route path="/monthCost" element={<MonthCost />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/IncomeExpense" element={<IncomeExpense />}></Route>
          <Route path="/TableWithPagination" element={<TableWithPagination />}></Route>
          <Route path="/TableOrderEmp" element={<TableOrderEmp />}></Route>
          <Route path="/stock" element={<ListStockComponent />}></Route>
          <Route path="/addStock" element={<CreateStockComponent />}></Route>
          <Route path="/stockEmp" element={<StockEmp/>}></Route>
          <Route
            path="/addStockType"
            element={<CreateStockTypeComponent />}
          ></Route>
          <Route
            path="/viewStock/:stock_ID"
            element={<ViewStockComponent />}
          ></Route>
          <Route
            path="/update-Stock/:stock_ID"
            element={<UpdateStockComponent />}
          ></Route>
          <Route path="/menu" element={<ListMenuComponent />}></Route>
          <Route
            path="/DashboardUser/:totalOrder_ID/:table_ID/:compoSite"
            element={<DashboardUser />}
          ></Route>
          <Route
            path="/DashboardEmp/:totalOrder_ID/:table_ID/:compoSite"
            element={<DashboardEmp />}
          ></Route>
          <Route path="/DashboardUser/" element={<DashboardUser />}></Route>
          <Route
            path="/viewMenu/:menu_ID"
            element={<ViewMenuComponent />}
          ></Route>
          <Route
            path="/addMenuType"
            element={<CreateMenuTypeComponent />}
          ></Route>
          <Route path="/addMenu" element={<CreateMenuComponent />}></Route>
          <Route
            path="/update-Menu/:menu_ID"
            element={<UpdateMenuComponent />}
          ></Route>
          <Route path="/stockMenu" element={<ListStockMenuComponent />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/CartEmp" element={<CartEmp />}></Route>
          <Route
            path="/addStockMenu/:menu_ID"
            element={<CreateStock_MenuComponent />}
          ></Route>
          <Route path="/cashier" element={<Cashier />}></Route>
          <Route path="/TotalOrder" element={<TaotalOrder />}></Route>
          <Route path="/table" element={<TableComponent />}></Route>
          <Route
            path="/CreateTableComponent"
            element={<CreateTableComponent />}
          ></Route>
          <Route path="/employee" element={<ListEmployyComponent />}></Route>
          <Route
            path="/addemployee"
            element={<CreateEmployeeComponent />}
          ></Route>
          <Route
            path="/addemployee/:id"
            element={<CreateEmployeeComponent />}
          ></Route>
          <Route path="/Role" element={<ListRoleComponent />}></Route>
          <Route path="/Checkbill/:compoSite/:status" element={<Checkbill />}></Route>
          <Route path="/AddRole" element={<AddRoleComponent />}></Route>
          <Route
            path="/edit-AddRole/:id"
            element={<AddRoleComponent />}
          ></Route>
          <Route
            path="/viewEmployee/:id"
            element={<ViewEmployeeComponent />}
          ></Route>
          <Route path="/promotion" element={<Promotion />}></Route>
          <Route
            path="/UploadSlip/:totalOrder_ID"
            element={<Uploadslipcomponent />}
          ></Route>
          <Route
            path="/UploadspilEmp/:totalOrder_ID"
            element={<UploadspilEmp />}
          ></Route>
          {/* <Route path="/ListTotalOrderMenu/:compoSite" element={<ListTotalOrdermenu />}></Route> */}
          <Route
            path="/ListTotalOrderMenu/:compoSite/:totalOrder_ID/:statusTable"
            element={<ListTotalOrdermenu />}
          ></Route>
          <Route
            path="/ListTotalOrderMenuEmp/:compoSite/:totalOrder_ID/:statusTable"
            element={<ListTotalOrdermenuEmp />}
          ></Route>
          <Route path="/Kitchen" element={<KitchenComponent />}></Route>
          <Route path="/CashierComponent" element={<CashierComponent />}></Route>
          <Route
            path="/Movetable/:totalOrder_ID/:table_ID"
            element={<MoveTable />}
          ></Route>
          <Route path="/MixTable/:table_ID" element={<MixTable />}></Route>
          <Route
            path="/MixTable/:table_ID/:totalOrder_ID/:compoSite"
            element={<MixTable />}
          ></Route>
          <Route path="/Login" element={<LoginComponent />}></Route>
        </Routes>
          </Box>
      </div>
    </div>
  );
}

export default App;
