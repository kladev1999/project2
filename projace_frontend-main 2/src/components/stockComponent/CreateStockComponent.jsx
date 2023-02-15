import React, { useState, useEffect } from "react";
import StockService from "../../services/StockService";
import { useNavigate } from "react-router-dom";

const CreateStockComponent = () => {
  const navigate = useNavigate();

  const [stock_Qty, setStock_Qty] = useState(0);
  const [stock_Cost, setStock_Cost] = useState(0);
  const [stock_Min, setStock_Min] = useState(0);
  const [stockType_ID, setStockType_ID] = useState([]);
  const [fromValid,setFromValid] = useState(false);

  const [stockType, setStockType] = useState([]);

  const saveStock = (e) => {
    e.preventDefault();
    const stock = {
      stock_Qty,
      stock_Cost,
      stock_Min,
      stockType_ID: {
        stockType_ID,
      },
    };
    console.log(stockType_ID);
    StockService.addStock(stock)
      .then((response) => {
        navigate("/stock");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStockType = () => {
    StockService.getStockType()
      .then((response) => {
        setStockType(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getStockType();
    const checkData = stock_Qty&&stock_Cost&&stock_Min !== 0 && stock_Qty&&stock_Cost&&stock_Min > 0  
    setFromValid(checkData) 
  }, [stock_Qty,stock_Cost,stock_Min]);

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
                  <label className="form-label"> ชื่อวัตถุดิบ </label>
                  <select
                    className="custom-select"
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
                  <label className="form-label"> จำนวนวัตถุดิบ </label>
                  <input
                    type="text"
                    placeholder="Enter Stock Qty"
                    name="stock_Qty"
                    className="form-control"
                    value={stock_Qty}
                    onChange={(e) => setStock_Qty(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> ต้นทุนวัตถุดิบ </label>
                  <input
                    type="text"
                    placeholder="Enter Stock Cost"
                    name="stock_Cost"
                    className="form-control"
                    value={stock_Cost}
                    onChange={(e) => setStock_Cost(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> จำนวนคงเหลือขั้นต่ำ </label>
                  <input
                    type="text"
                    placeholder="Enter Stock Min"
                    name="stock_Min"
                    className="form-control"
                    value={stock_Min}
                    onChange={(e) => setStock_Min(e.target.value)}
                  ></input>
                </div>

                <button
                  className="btn btn-success"
                  style={{ marginLeft: "5px" }}
                  onClick={(e) => saveStock(e)}
                  disabled={!fromValid}
                >
                  ยืนยัน{" "}
                </button>

                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "5px" }}
                  onClick={() => navigate("/stock")}
                >
                  ยกเลิก
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStockComponent;
