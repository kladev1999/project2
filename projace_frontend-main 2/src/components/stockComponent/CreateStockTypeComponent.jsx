import React, { useState} from "react";
import StockService from "../../services/StockService";
import {  useNavigate} from "react-router-dom";

const CreateStockTypeComponent = () => {
  const navigate = useNavigate();

  const stockTypeData = {
    stockType_ID: null,
    stockType_Name: null,
    stockType_Unit:null
  };

  const [stockType, setStockType] = useState(stockTypeData);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event.target.value);
    setStockType({ ...stockType, [name]: value });
  };

  const saveStockType = () => {
    var data = {
      stockType_Name: stockType.stockType_Name,
      stockType_Unit: stockType.stockType_Unit
     
    };
    StockService.addStockType(data)
      .then((response) => {
        setStockType({
          stockType_ID: response.data.stockType_ID,
          stockType_Name: response.data.stockType_Name,
          stockType_Unit: response.data.stockType_Unit
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });

    navigate("/stock");
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> StockType Name</label>
                  <input
                    type="text"
                    placeholder="Enter StockType Name"
                    name="stockType_Name"
                    className="form-control"
                    value={stockType.stockType_Name}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> StockType Unit</label>
                  <input
                    type="text"
                    placeholder="Enter StockType Unit"
                    name="stockType_Unit"
                    className="form-control"
                    value={stockType.stockType_Unit}
                    onChange={handleInputChange}
                  ></input>
                </div>

                <button
                  className="btn btn-success"
                  style={{ marginLeft: "5px" }}
                  onClick={saveStockType}
                >
                  Submit{" "}
                </button>

                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "5px" }}
                  onClick={() => navigate("/stock")}
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
};

export default CreateStockTypeComponent;
