import React, { useState, useEffect } from "react";
import MenuService from "../../services/MenuService";
import StockService from "../../services/StockService";
import StockMenuService from "../../services/StockMenuService";
import stockTypeRow from "./stockTypeRow";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


function CreateStock_MenuComponent() {
  const navigate = useNavigate();

  const [searchName, setsearchName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState([]);
  const [menuID, setMenuID] = useState([]);
  const [stockType, setStockType] = useState([]);

  const [inputValue, setInputValue] = useState([]);
  const { menu_ID } = useParams();

  const [stockMenu_Qty, setStockQty] = useState({});

  const saveStock_Menu = (e, stockType_ID) => {
    e.preventDefault();
    // setStockType_ID(stockTy);
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
        // navigate("/stockMenu");
      })
      .catch((error) => {
        console.log(error);
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

  let arr = [];

  useEffect(() => {
    getStockType();
    getMenuID(menu_ID);
  }, [menu_ID]);

  const back = () => {
    navigate("/menu");
  };



  const filterMenu = stockType.filter((stockType) => {
    if (searchName.length > 0) {
      return stockType.stockType_Name
        .toLowerCase()
        .includes(searchName?.toLowerCase());
    } else if (searchName.length > 2) {
      return stockType.stockType_Name
        .toLowerCase()
        .includes(searchName?.toLowerCase());
    } else {
      return stockType.stockType_Name
        .toLowerCase()
        .includes(searchName?.toLowerCase());
    }
  });

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row" style={{ textAlign: "center" }}>
          <div>
            {" "}
            <h3>เพิ่มวัตถุดิบในเมนู {menu_ID.menu_Name} </h3>
            <button
              className="btn btn-danger"
              onClick={() => back()}
              style={{ margin: "5px", padding: "5px" }}
            >
              กลับ
            </button>
          </div>

          <input
            type="search"
            placeholder="ค้นหา"
            aria-label="Search"
            style={{ margin: "5px", padding: "5px" ,boxSizing:"content-box"}}
            onChange={(e) => setsearchName(e.target.value)}
          />
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>รหัส</th>
                <th>ชื่อวัตถุดิบ</th>
                <th>จำนวนที่จะใช้ในเมนู</th>
                <th>หน่วย</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {filterMenu.map((stockType) => (
                <tr key={stockType.stockType_ID}>
                  <td>{stockType.stockType_ID}</td>
                  <td>{stockType.stockType_Name}</td>
                  <td>
                    <input
                      type="text"
                      placeholder="กรุณากรอกจำนวนที่จะใช้ในเมนู"
                      name="stockMenu_Qty"
                      className="form-control"
                      onChange={(e) => setStockQty(e.target.value)}
                    ></input>
                  </td>
                  <td>{stockType.stockType_Unit}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      style={{ marginLeft: "5px" }}
                      // disabled={stockMenu_Qty.length === 0}
                      disabled={isLoading &&stockMenu_Qty.length === 0}
                      onClick={(e) => saveStock_Menu(e, stockType.stockType_ID)}
                    >
                      {isLoading ? "Loading..." : "ยืนยัน"}
                    {isLoading && <Spinner animation="border" size="sm" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CreateStock_MenuComponent;
