import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StockService from "../../services/StockService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Spinner } from "react-bootstrap";
const UpdateStockComponent = (props) => {
  const { stock_ID } = useParams();
  const [stockType, setStockType] = useState([]);
  const [stockType_ID, setStockType_ID] = useState([]);
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
    getStockID(stock_ID);
  }, [stock_ID]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStock({ ...stock, [name]: value });
  };
  const handleInputChangetype = (event) => {
    const { name, value } = event.target;
    setStock({ ...stock, [name]: { stockType_ID: value } });
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

  const validationSchema = Yup.object().shape({
    stockType_ID: Yup.string().required("Type is required"),
    stock_Qty: Yup.number("must be num").required("Qty is required"),
    stock_Cost: Yup.number("must be num").required("Cost is required"),
    stock_Min: Yup.number("must be num").required("Min is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const [user, setUser] = useState(null);

  useEffect(() => {
    // simulate async api call with set timeout
    setTimeout(
      () =>
        setUser({
          stock_Qty: stock.stock_Qty,
          stock_Cost: stock.stock_Cost,
          stock_Min: stock.stock_Min,
          stockType_ID: stock.stockType_ID.stockType_ID,
        }),
      300
    );
  }, []);

  return (
    <div>
      {stock ? (
        <div className="edit-form">
          <h2 style={{ textAlign: "center" }}>Stock Update</h2>
          {user && (
            <form>
              <div className="form-group">
                <h4 style={{ textAlign: "center" }}>
                  <div>
                    <label className="form-label"> StockType Name</label>
                    <select
                      style={{ width: "200px", marginLeft: "10px" }}
                      name="stockType_ID"
                      value={stock.stockType_ID.stockType_ID}
                      {...register("stockType_ID")}
                      className={`form-control ${
                        errors.stockType_ID ? "is-invalid" : ""
                      }`}
                      onChange={handleInputChangetype}
                    >
                      <option value="">--เลือกประเภทสต๊อก--</option>
                      {stockType.map((stockType, index) => (
                        <option key={index} value={stockType.stockType_ID}>
                          {stockType.stockType_Name}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      {errors.stockType_ID?.message}
                    </div>
                  </div>
                </h4>
              </div>
              <div className="form-group">
                <label htmlFor="description">Stock Qty</label>
                <input
                  type="text"
                  id="stock_Qty"
                  name="stock_Qty"
                  value={stock.stock_Qty}
                  {...register("stock_Qty")}
                  className={`form-control ${
                    errors.stock_Qty ? "is-invalid" : ""
                  }`}
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.stock_Qty?.message}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">Stock Cost</label>
                <input
                  type="text"
                  id="stock_Cost"
                  name="stock_Cost"
                  value={stock.stock_Cost}
                  {...register("stock_Cost")}
                  className={`form-control ${
                    errors.stock_Cost ? "is-invalid" : ""
                  }`}
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.stock_Cost?.message}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">Stock Min</label>
                <input
                  type="text"
                  id="stock_Min"
                  name="stock_Min"
                  value={stock.stock_Min}
                  {...register("stock_Min")}
                  className={`form-control ${
                    errors.stock_Min ? "is-invalid" : ""
                  }`}
                  onChange={handleInputChange}
                />
                <div className="invalid-feedback">
                  {errors.stock_Min?.message}
                </div>
              </div>
            </form>
          )}
          {!user && (
            <div className="text-center p-3">
              <span className="spinner-border spinner-border-lg align-center"></span>
            </div>
          )}
          <button className="btn btn-danger mr-2" onClick={cancel}>
            Cancel
          </button>
          <Button
            className="btn btn-success"
            onClick={handleSubmit(updateStock)}
          >
            Update
          </Button>
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
