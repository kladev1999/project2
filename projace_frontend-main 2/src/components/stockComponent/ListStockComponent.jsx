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
    navigate("/MStockType");
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

  const sortByStockQty = () => {
    const sortedStocks = [...stock].sort((a, b) => a.stock_Qty - b.stock_Qty);
    setStock(sortedStocks);
  };

  const sortByStockCost = () => {
    const sortedStocks = [...stock].sort((a, b) => a.stock_Cost - b.stock_Cost);
    setStock(sortedStocks);
  };

  const sortByStockPricePerUnit = () => {
    const sortedStocks = [...stock].sort(
      (a, b) => a.pricePerUnit - b.pricePerUnit
    );
    setStock(sortedStocks);
  };

  const sortByStockName = () => {
    const sortedStocks = [...stock].sort((a, b) =>
      a.stockType_ID.stockType_Name.localeCompare(b.stockType_ID.stockType_Name)
    );
    setStock(sortedStocks);
  };

  const sortByStockTimeStamp = () => {
    const sortedStocks = [...stock].sort(
      (a, b) => new Date(a.stock_TimeStamp) - new Date(b.stock_TimeStamp)
    );
    setStock(sortedStocks);
  };

  const sortByStockID = () => {
    const sortedStocks = [...stock].sort((a, b) => a.stock_ID - b.stock_ID);
    setStock(sortedStocks);
  };

  const handleSortChange = (event) => {
    const sortFunction =
      event.target.value === "stock_qty"
        ? sortByStockQty
        : event.target.value === "stock_cost"
        ? sortByStockCost
        : event.target.value === "stock_name"
        ? sortByStockName
        : event.target.value === "pricePerUnit"
        ? sortByStockPricePerUnit
        : event.target.value === "stock_timestamp"
        ? sortByStockTimeStamp
        : sortByStockID;

    sortFunction();
  };

  return (
    <div className="container">
      <h2 className="text-center">ข้อมูลสต๊อก</h2>
      <div className="" style={{ textAlign: "center" }}>
        <button
          className="btn btn-primary mr-2 "
          style={{ margin: 5 }}
          onClick={addStock}
        >
          {" "}
          เพิ่มสต๊อก
        </button>

        <button
          className="btn btn-secondary "
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
        <button
          className="btn btn-info "
          style={{ marginLeft: "5px" }}
          onClick={BackupStock}
        >
          {" "}
          ประวัติสต๊อก
        </button>
        <select
          class="form-select"
          onChange={handleSortChange}
          style={{
            margin: "5px",
            width: "270px",
            textAlign: "center",
            width: "auto",
            marginBottom: "-15px",
          }}
        >
          <option value="">--เลือกรูปแบบการจัดเรียง--</option>
          <option value="stock_id">จัดเรียงโดยรหัสวัตถุดิบ</option>
          <option value="stock_name">จัดเรียงโดยชื่อวัตถุดิบ</option>
          <option value="stock_qty">จัดเรียงโดยจำนวนคงเหลือ</option>
          <option value="stock_cost">จัดเรียงโดยต้นทุนวัตถุดิบ</option>
          <option value="pricePerUnit">จัดเรียงโดยราคาต่อหน่วย</option>
          <option value="stock_timestamp">
            จัดเรียงโดยวันที่เพิ่มวัตถุดิบ
          </option>
        </select>
      </div>

      <br></br>
      <div className="row" style={{ textAlign: "center" }}>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> รหัสวัตถุดิบ </th>
              <th> ชื่อวัตถุดิบ </th>
              <th> จำนวนคงเหลือ </th>
              <th> ต้นทุนวัตถุดิบ </th>
              <th> วัตถุดิบคงเหลือขั้นต่ำ </th>
              <th> ราคาต่อหน่วย </th>
              <th> วันที่เพิ่มวัตถุดิบ </th>
              <th> จัดการวัตถุดิบ </th>
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
                <td>{stocks.stock_Cost}</td>
                <td>{stocks.stock_Min}</td>
                <td>{stocks.pricePerUnit}</td>
                <td>{timestamp(stocks.stock_TimeStamp)}</td>
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
