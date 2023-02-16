import React from "react";
import StockMenuService from "../../services/StockMenuService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListStockMenuComponent = () => {
  const [stockMenu, setStockMenu] = useState([]);
  const [search, searchInput] = useState("");
  const navigate = useNavigate();

  const getAllStockMenu = () => {
    StockMenuService.getStockMenu()
      .then((response) => {
        setStockMenu(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteStockMenu = (stockMenu_ID) => {
    if (window.confirm("Are you sure you want to delete")) {
      StockMenuService.deleteStockMenu(stockMenu_ID)
        .then((response) => {
          getAllStockMenu();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getAllStockMenu();
  }, []);

  const filterStockMenu = stockMenu.filter((stockMenu) => {
    if (search.length > 2) {
      return stockMenu.menu_ID.menu_Name
        .toLowerCase()
        .includes(search.toLowerCase());
    } else if (search.length === 0) {
      return stockMenu.menu_ID.menu_Name
        .toLowerCase()
        .includes(search.toLowerCase());
    }
  });

  const viewStockMenu = () => {
    navigate("/viewStockMenu");
  };
  const updateStockMenu = () => {
    navigate("/updateStockMenu");
  };

  const backToMenu = () => {
    navigate("/menu");
  };

  const timestamp = (data) => {

    let timestamp = data.split("T")
    let time = timestamp[1].split(".")
    let d = timestamp[0].split("-")
    let y = parseInt(d[0]) + 543
    let day = d[2]+"/"+d[1]+"/"+y

    return (
      <>
        {day}
      </>
    )
  }

  return (
    <div className="container">
      <h2 className="text-center"> รายการข้อมูลวัตถุดิบในเมนู </h2>
      <div>
        <button
          className="btn btn-primary mr-2 "
          style={{ marginRight: 5 }}
          onClick={backToMenu}
        >
          เมนูอาหาร
        </button>
        <input
          type="search"
          placeholder="ค้นหา"
          aria-label="Search"
          onChange={(e) => searchInput(e.target.value)}
        />
      </div>

      <br></br>
      <div className="row" style={{textAlign:"center"}}>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> StockMenu ID </th>
              <th> จำนวนที่ใช้ในเมนู (กรัม) </th>
              <th> เวลาที่เพิ่ม </th>
              <th> ชื่อเมนู </th>
              <th> ชื่อวัตถุดิบ </th>
              <th> จัดการรายการ </th>
            </tr>
          </thead>

          <tbody>
            {filterStockMenu.map((stockMenu) => (
              <tr key={stockMenu.stockMenu_ID}>
                <td>{stockMenu.stockMenu_ID}</td>
                <td>{stockMenu.stockMenu_Qty}</td>
                
                <td>{timestamp(stockMenu.stockMenu_TimeStamp)}</td>
                <td>{stockMenu.menu_ID.menu_Name}</td>
                <td>{stockMenu.stockType_ID.stockType_Name}</td>
                <td>
                  {/* <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => updateStockMenu(stockMenu.stockMenu_ID)}
                    className="btn btn-warning"
                  >
                    แก้ไข
                  </button> */}
                  
                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => deleteStockMenu(stockMenu.stockMenu_ID)}
                    className="btn btn-danger"
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListStockMenuComponent;
