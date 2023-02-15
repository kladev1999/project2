import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MenuService from "../../services/MenuService";
import authHeader from "../../services/Auth-HeaderService";
const ViewMenuComponent = (props) => {
  const { menu_ID } = useParams();
  let pic = "http://localhost:8080/menu/getimages/"
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
        <h3 className="text-center" style={{margin:"5px"}}> ข้อมูลเมนู </h3>
        <div className="card-body">
        <div className="row" style={{margin:"5px"}}>
            <label> รูปภาพเมนู : </label>
           <img src={pic+menu.menu_Pic} 
                      alt="img"
                      width="100"
                      height="300" />
          </div>

          <div className="row" style={{margin:"5px"}}>
            <label> รหัสเมนู : {menu.menu_ID}</label>
          </div>
          <div className="row" style={{margin:"5px"}}>
            <label> ชนิดเมนู : {menu.typeMenu_ID.typeMenu_Name}</label>
          
          </div>

          <div className="row" style={{margin:"5px"}}>
            <label> ชื่อเมนู :  {menu.menu_Name}</label>
          </div>

          <div className="row" style={{margin:"5px"}}>
            <label> ราคาเมนู :{menu.menu_Price}</label>
          </div>

          
          {/* <div className="row">
            <label> Menu Cost : </label>
            <div> {menu.menu_Cost}</div>
          </div> */}
          <div className="row" style={{margin:"5px"}}>
            <label> Menu TimeStamp : {menu.menu_TimeStamp} </label>
          </div>

         
          <div align="center" style={{margin:"5px"}}>
            <button className="btn btn-primary" onClick={goBack} style={{margin:"5px"}}>
              {" "}
              ย้อนกลับ{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMenuComponent;
