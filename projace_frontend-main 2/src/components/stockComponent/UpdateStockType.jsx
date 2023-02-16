import React,{useState,useEffect} from 'react'
import { useParams, Link ,useNavigate} from "react-router-dom";
import StockService from "../../services/StockService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

function UpdateStockType() {

    const {StockType_ID  } = useParams();
    const [stockType,setstockType] = useState();
    const [stockType_Unit,setstockType_Unit] = useState();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        stockType_Name: Yup.string().required("กรุณากรอกชื่อวัตถุดิบ"),
        stockType_Unit: Yup.string().required("กรุณากรอกหน่วย"),
      });
      const formOptions = { resolver: yupResolver(validationSchema) };
    
      // get functions to build form with useForm() hook
      const { register, handleSubmit, reset, formState } = useForm(formOptions);
      const { errors } = formState;
    

    

      useEffect(() => {

        setTimeout(
            () =>
              setUser({
                stockType_Name: "",
              }),
            300
          );

        getTableByID();

    },[])

    function StockType () {

        var data = {
            stockType_Name: stockType,
            stockType_Unit: stockType_Unit
           
          };
      
        StockService.updateStockType(StockType_ID,data).then((response) => {
        }).catch(error => {
            console.log(error)
        });
        
        navigate("/MStockType");
  
  };

  const getTableByID = () => {

    StockService.getStockTypeById(StockType_ID).then((res) => {
        setstockType(res.data.stockType_Name)
        setstockType_Unit(res.data.stockType_Unit)
        console.log(res.data)
    })
}




return (
    <div>
    <br /><br />
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
        <h3>อัพเดทชื่อวัตถุดิบ</h3>
          <div className="card-body">
          {user && (
            <form>
              <div className="form-group mb-2">
                <label className="form-label"> ชื่อวัตถุดิบ :</label>
                <input
                  type="text"
                  placeholder="กรุณากรอกชื่อวัตถุดิบ"
                  name="StockType"
                  value={stockType}
                  {...register('stockType_Name')}
                      className={`form-control ${
                        errors.stockType_Name ? 'is-invalid' : ''
                      }`}
                  onChange={(e) => setstockType(e.target.value)}
                >
                </input>
                <div className="invalid-feedback">
                      {errors.stockType_Name?.message}
                    </div>
              </div>
              <div className="form-group mb-2">
                <label className="form-label"> หน่วย :</label>
                <input
                  type="text"
                  placeholder="กรุณากรอกหน่วย"
                  name="StockType"
                  value={stockType_Unit}
                  {...register('stockType_Unit')}
                      className={`form-control ${
                        errors.stockType_Unit ? 'is-invalid' : ''
                      }`}
                  onChange={(e) => setstockType_Unit(e.target.value)}
                >
                </input>
                <div className="invalid-feedback">
                      {errors.stockType_Unit?.message}
                    </div>
              </div>
              <button className="btn btn-success" onClick={handleSubmit(StockType)} > ยืนยัน </button>
              {" "}
              <Link to="/MStockType" className="btn btn-danger"> ยกเลิก </Link>
            </form>
)}
            {!user && (
              <div className="text-center p-3">
                <span className="spinner-border spinner-border-lg align-center"></span>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>

  </div>
)
}


export default UpdateStockType