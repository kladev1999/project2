import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MenuService from "../../services/MenuService";
import authHeader from "../../services/Auth-HeaderService";
const ViewMenuComponent = (props) => {
  const { menu_ID } = useParams();
  let pic = ("http://localhost:8080/menu/getimages/",{ headers: authHeader()});
  const navigate = useNavigate();

  const menuState = {
    menu_ID: "",
    typeMenu_ID: "",
    menu_Name: "",
    menu_Price: "",
    menu_Qty: "",
    menu_Pic: "",
    menu_Cost: "",
    menu_TimeStamp: "",
    menu_Status: "",
  };
  const [menu, setMenu] = useState(menuState);

  const getMenuID = (menu_ID) => {
    MenuService.getMenuById(menu_ID)
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  useEffect(() => {
    getMenuID(menu_ID);
  }, [menu_ID]);

  const goBack = () => {
    navigate("/menu");
  };

  return (
    <div>
      <br></br>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center"> View Menu Details</h3>
        <div className="card-body">
        <div className="row">
            <label> Menu Picture : </label>
           <img src={pic+menu.menu_Pic} />
          </div>

          <div className="row">
            <label> Menu ID : </label>
            <div> {menu.menu_ID}</div>
          </div>
          <div className="row">
            <label> Type Menu : </label>
            <div>{menu.typeMenu_ID.typeMenu_Name}</div>
          </div>

          <div className="row">
            <label> Menu Name : </label>
            <div> {menu.menu_Name}</div>
          </div>
          <div className="row">
            <label> Menu Price : </label>
            <div> {menu.menu_Price}</div>
          </div>

          <div className="row">
            <label> Menu Qty : </label>
            <div> {menu.menu_Qty}</div>
          </div>
          <div className="row">
            <label> Menu Cost : </label>
            <div> {menu.menu_Cost}</div>
          </div>
          <div className="row">
            <label> Menu TimeStamp : </label>
            <div> {menu.menu_TimeStamp}</div>
          </div>
          <div className="row">
            <label> Menu Status : </label>
            <div> {menu.menu_Status}</div>
          </div>
         
          <div align="center">
            <button className="btn btn-primary" onClick={goBack}>
              {" "}
              Back{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMenuComponent;
