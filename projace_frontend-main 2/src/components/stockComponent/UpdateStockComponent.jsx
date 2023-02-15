import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StockService from "../../services/StockService";
const UpdateStockComponent = (props) => {
  const { stock_ID } = useParams();
  let navigate = useNavigate();
  const stockState = {
    stock_ID: "",
    stockType_ID: "",
    stock_Qty: "",
    stock_Cost: "",
    stock_Min: "",
  };

  const [stock, setStock] = useState(stockState);

  const getStockID = (stock_ID) => {
    StockService.getStockById(stock_ID)
      .then((response) => {
        setStock(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  useEffect(() => {
    getStockID(stock_ID);
  }, [stock_ID]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStock({ ...stock, [name]: value });
  };

  const updateStock = () => {
    StockService.updateStock(stock.stock_ID, stock)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    navigate("/stock");
  };
  const cancel = () => {
    navigate("/stock");
  };

  return (
    <div>
      {stock ? (
        <div className="edit-form">
          <h2 style={{ textAlign: "center" }}>อัพเดทวัตถุดิบ</h2>
          <form>
            <div className="form-group">
              <h4 style={{ textAlign: "center" }}>
                <label htmlFor="title">
                  คุณกำลังอัพเดท
                  <p style={{ color: "green" }}>
                    {stock.stockType_ID.stockType_Name}
                  </p>
                </label>
              </h4>
            </div>
            <div className="form-group">
              <label htmlFor="description">จำนวนวัตถุดิบตงเหลือ</label>
              <input
                type="text"
                className="form-control"
                id="stock_Qty"
                name="stock_Qty"
                value={stock.stock_Qty}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">ต้นทุนวัตถุดิบ</label>
              <input
                type="text"
                className="form-control"
                id="stock_Cost"
                name="stock_Cost"
                value={stock.stock_Cost}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">วัตถุดิบเหลือน้อยขั้นต่ำ</label>
              <input
                type="text"
                className="form-control"
                id="stock_Min"
                name="stock_Min"
                value={stock.stock_Min}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button className="btn btn-danger mr-2" onClick={cancel}>
            ยกเลิก
          </button>
          <button
            type="submit"
            className="btn btn-success"
            onClick={updateStock}
          >
            ยืนยัน
          </button>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Stock...</p>
        </div>
      )}
    </div>
  );
};
export default UpdateStockComponent;
