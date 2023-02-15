import React, { useState} from "react";
import StockService from "../../services/StockService";
import {  useNavigate} from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";



const CreateStockTypeComponent = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    stockType_Name: Yup.string().required("stockType_Name is required"),
    stockType_Unit: Yup.string().required("stockType_Unit is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;


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

    navigate("/MStockType");
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
                  <label className="form-label"> ชื่อวัตถุดิบ </label>
                  <input
                    type="text"
                    placeholder="กรุณากรอกชื่อวัตถุดิบ"
                    name="stockType_Name"
                    value={stockType.stockType_Name}
                    {...register('stockType_Name')}
                      className={`form-control ${
                        errors.stockType_Name ? 'is-invalid' : ''
                      }`}
                    onChange={handleInputChange}
                  ></input>
                   <div className="invalid-feedback">
                      {errors.stockType_Name?.message}
                    </div>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> หน่วยของวัตถุดิบ </label>
                  <input
                    type="text"
                    placeholder="กรุณากรอกหน่วยของวัตถุดิบ (กรัม, ขีด, กิโลกรัม, อื่น ๆ)"
                    name="stockType_Unit"
                    value={stockType.stockType_Unit}
                    {...register('stockType_Unit')}
                      className={`form-control ${
                        errors.stockType_Unit ? 'is-invalid' : ''
                      }`}
                    onChange={handleInputChange}
                  ></input>
                   <div className="invalid-feedback">
                      {errors.stockType_Unit?.message}
                    </div>
                </div>
                <button
                  className="btn btn-success"
                  style={{ marginLeft: "5px" }}
                  onClick={handleSubmit(saveStockType)}
                >
                  ยืนยัน{" "}
                </button>

                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "5px" }}
                  onClick={() => navigate("/MStockType")}
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

export default CreateStockTypeComponent;
