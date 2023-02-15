import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StockService from "../../services/StockService";


const ListStockComponent = () => {
  const [stock, setStock] = useState([]);
  const [search, searchInput] = useState("");
  const navigate = useNavigate();

  const getAllStocks = () => {
    StockService.getStock()
      .then((response) => {
        console.log(response);
        if (response.data != null) {
          setStock(response.data);
          console.log(response.data);
        } else {
          getAllStocks();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteStock = (stock_ID) => {
    if (window.confirm("Are you sure you want to delete")) {
      StockService.deleteStock(stock_ID)
        .then((response) => {
          getAllStocks();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getAllStocks();
  }, []);

  const viewStock = (stock_ID) => {
    navigate("/viewStock/" + stock_ID);
  };

  const editStock = (stock_ID) => {
    navigate("/update-Stock/" + stock_ID);
  };

  const addStock = () => {
    navigate("/addStock");
  };

  const addStockType = () => {
    navigate("/addStockType");
  };

  const filterStock = stock.filter((stock) => {
    if (search.length > 2) {
      return stock.stockType_ID.stockType_Name
        .toLowerCase()
        .includes(search.toLowerCase());
    } else if (search.length === 0) {
      return stock.stockType_ID.stockType_Name
        .toLowerCase()
        .includes(search.toLowerCase());
    }
  });

  const getBackgroundColor = (value) => {
    let color;
    if (value.stock_Qty <= value.stock_Min) {
      color = "#FF6961";
    }
    return color;
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
      <h2 className="text-center">ข้อมูลสต๊อก</h2>
      <div className="">
        <button
          className="btn btn-primary mr-2 "
          style={{ margin: 5 }}
          onClick={addStock}
        >
          {" "}
          เพิ่มสต๊อก
        </button>

        <button
          className="btn btn-primary mr-2 "
          style={{ margin: 5 }}
          onClick={addStockType}
        >
          {" "}
          เพิ่มชื่อวัตถุดิบ
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
        <table className="table table-striped table-bordered" >
          <thead>
            <tr>
              <th> รหัสวัตถุดิบ </th>
              <th> ชื่อวัตถุดิบ </th>
              <th> จำนวนคงเหลือ </th>
              <th> ต้นทุนวัตถุดิบ </th>
              <th> วัตถุดิบตงเหลือขั้นต่ำ </th>
              <th> ต้นทุนวัตถุดิบ </th>
              <th> วันที่เพิ่มวัตถุดิบ </th>
              <th> จัดการวัตถุดิบ </th>
            </tr>
          </thead>
          <tbody>
            {filterStock.map((stocks) => (
              <tr
                key={stocks.stock_ID}
                style={{ backgroundColor: getBackgroundColor(stocks) }}
              >
                <td>{stocks.stock_ID}</td>
                <td>{stocks.stockType_ID.stockType_Name}</td>
                <td>{stocks.stock_Qty}</td>
                <td>{stocks.stock_Cost}</td>
                <td>{stocks.stock_Min}</td>
                <td>{stocks.pricePerUnit}</td>
                <td>{timestamp(stocks.stock_TimeStamp) }</td>
                <td>
                  <button
                    onClick={() => editStock(stocks.stock_ID)}
                    className="btn btn-warning"
                  >
                    แก้ไข{" "}
                  </button>
                  
                  {/* <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => viewStock(stocks.stock_ID)}
                    className="btn btn-info"
                  >
                    View{" "}
                  </button> */}
                  <button
                    style={{ marginLeft: "5px" }}
                    onClick={() => deleteStock(stocks.stock_ID)}
                    className="btn btn-danger"
                  >
                    ลบ{" "}
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

export default ListStockComponent;
