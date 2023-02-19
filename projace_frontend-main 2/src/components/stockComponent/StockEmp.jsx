import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StockService from "../../services/StockService";

const ListStockComponent = () => {
  const [stock, setStock] = useState([]);
  const [search, searchInput] = useState("");
  const [sortStock,setSortStock] = useState([]);
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
    sortStocksByQty();
  }, []);

  const viewStock = (stock_ID) => {
    navigate("/viewStock/" + stock_ID);
  };

  const editStock = (stock_ID) => {
    navigate("/update-Stock/" + stock_ID);
  };

  const sortStocksByQty = () => {
    const sortedStocks = [...stock].sort((a, b) => a.stock_Qty - b.stock_Qty);
    console.log("Sorted Stock = ",sortedStocks);
    setSortStock(sortedStocks);
  };

  const filterStock = stock.filter((stock) => {
    if (search.length > 1) {
      return stock.stockType_ID.stockType_Name
        .toLowerCase()
        .includes(search.toLowerCase());
    } else {
      return stock;
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
    let timestamp = data.split("T");
    let time = timestamp[1].split(".");
    let d = timestamp[0].split("-");
    let y = parseInt(d[0]) + 543;
    let day = d[2] + "/" + d[1] + "/" + y;

    return <>{day}</>;
  };

  const BackupStock = () => {
    navigate("/BackupStock");
  };



  return (
    <div className="container">
      <h2 className="text-center">ข้อมูลสต๊อก</h2>
      <div class="form-outline">
        <input
          class="form-control"
          type="search"
          placeholder="ค้นหา"
          aria-label="Search"
          style={{width:"200px"}}
          onChange={(e) => searchInput(e.target.value)}
        />
      </div>

      <br></br>
      <div className="row" style={{ textAlign: "center" }}>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> รหัสวัตถุดิบ </th>
              <th> ชื่อวัตถุดิบ </th>
              <th> จำนวนคงเหลือ </th>
              <th> วัตถุดิบคงเหลือขั้นต่ำ </th>
              <th> วันที่เพิ่มวัตถุดิบ </th>
            </tr>
          </thead>
          <tbody>
            {filterStock.map((stocks, i) => (
              <tr
                key={stocks.stock_ID}
                style={{ backgroundColor: getBackgroundColor(stocks) }}
              >
                <td>{i + 1}</td>
                <td>{stocks.stockType_ID.stockType_Name}</td>
                <td>{stocks.stock_Qty}</td>
                <td>{stocks.stock_Min}</td>
                <td>{timestamp(stocks.stock_TimeStamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListStockComponent;
