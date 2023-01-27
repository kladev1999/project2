import React, { useState, useEffect } from "react";
import MenuService from "../../services/MenuService";
import StockService from "../../services/StockService";
import StockMenuService from "../../services/StockMenuService";
import { useNavigate, useParams } from "react-router-dom";
import { MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";

function CreateStock_MenuComponent(props) {
  const navigate = useNavigate();

  const [stockMenu_Qty, setStockMenu_Qty] = useState([]);
  // const [menu_ID,setMenu_ID] = useState([]);
  const [stockType_ID, setStockType_ID] = useState([]);

  const [menu, setMenu] = useState([]);
  const [menuID, setMenuID] = useState([]);
  const [stockType, setStockType] = useState([]);

  const { menu_ID } = useParams();

  const saveStock_Menu = (e) => {
    e.preventDefault();

    const stock_menu = {
      stockMenu_Qty,
      menu_ID: {
        menu_ID,
      },
      stockType_ID: {
        stockType_ID,
      },
    };
    StockMenuService.addStockMenu(stock_menu)
      .then((response) => {
        console.log(response.data);
        navigate("/stockMenu");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMenu = () => {
    MenuService.getMenu()
      .then((response) => {
        setMenu(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getMenuID = (menu_ID) => {
    MenuService.getMenuById(menu_ID)
      .then((response) => {
        setMenuID(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  const getStockType = () => {
    StockService.getStockType()
      .then((response) => {
        setStockType(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getStockType();
    getMenuID(menu_ID);
  }, [menu_ID]);

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form>
                <div>
                  <label className="form-label">
                    Menu Name : {menuID.menu_Name}
                  </label>
                </div>
                <div>
                  <label className="form-label"> StockType Name</label>
                  <select
                    className="custom-select"
                    isMulti
                    style={{ width: "200px", marginLeft: "10px" }}
                    name="stockType_ID"
                    onChange={(e) => setStockType_ID(e.target.value)}
                  >
                    {stockType.map((stockType, index) => (
                      <option key={index} value={stockType.stockType_ID}>
                        {stockType.stockType_Name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> StockMenu Qty</label>
                  <input
                    type="text"
                    placeholder="Enter StockMenu Qty"
                    name="stockMenu_Qty"
                    className="form-control"
                    value={stockMenu_Qty}
                    onChange={(e) => setStockMenu_Qty(e.target.value)}
                  ></input>
                </div>
                <button
                  className="btn btn-success"
                  style={{ marginLeft: "5px" }}
                  onClick={(e) => saveStock_Menu(e)}
                >
                  Submit{" "}
                </button>

                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "5px" }}
                  onClick={() => navigate("/stockMenu")}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateStock_MenuComponent;
