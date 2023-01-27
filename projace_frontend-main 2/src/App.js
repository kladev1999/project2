import React, { useState, useEffect } from "react";
import './App.css';

import AuthService from "./services/Auth-service";



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


function App() {


  return (
    <div>
      <div className="container">
      <HeaderComponent />
        <Routes>
          <Route path="/" element={<LoginComponent />}></Route>
          <Route path="/monthCost" element={<MonthCost />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/IncomeExpense" element={<IncomeExpense />}></Route>
          <Route path="/TableWithPagination" element={<TableWithPagination />}></Route>
          <Route path="/TableOrderEmp" element={<TableOrderEmp />}></Route>
          <Route path="/stock" element={<ListStockComponent />}></Route>
          <Route path="/addStock" element={<CreateStockComponent />}></Route>
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
          <Route path="/Checkbill/:compoSite" element={<Checkbill />}></Route>
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
          {/* <Route path="/ListTotalOrderMenu/:compoSite" element={<ListTotalOrdermenu />}></Route> */}
          <Route
            path="/ListTotalOrderMenu/:compoSite/:totalOrder_ID"
            element={<ListTotalOrdermenu />}
          ></Route>
          <Route path="/Kitchen" element={<KitchenComponent />}></Route>
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
      </div>
    </div>
  );
}

export default App;
