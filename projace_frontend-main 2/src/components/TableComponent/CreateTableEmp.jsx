import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TableService from '../../services/TableService';
import TotalOrderService from '../../services/TotalOrderService';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function CreateTableEmp() {
    const [table_Zone, setTabel_Zone] = useState([]);
    const [tables, setTabel] = useState([]);
    const Navigate = useNavigate();
    const navigate = useNavigate();
  
    const table = {
      table_Zone
    }

    const validationSchema = Yup.object().shape({
        table_Zone: Yup.string().required("name is required"),
      });

      const formOptions = { resolver: yupResolver(validationSchema) };
    
      // get functions to build form with useForm() hook
      const { register, handleSubmit, reset, formState } = useForm(formOptions);
      const { errors } = formState;
  
    // get functions to build form with useForm() hook
  
    const [user, setUser] = useState(null);
    const [count, setCount] = useState(2);
  
    useEffect(() => {
      // simulate async api call with set timeout
      setTimeout(
        () =>
          setUser({
            table_Zone: "",
          }),
        300
      );
    }, []);
  
  
    function saveTable () {
      
        TableService.addTable(table).then((response) => {
        }).catch(error => {
          console.log(error)
        });
        
        Navigate("/TableEmp");
  
  };
  
  const getAllTebles = () => {
    TableService.getTable()
      .then((response) => {
        setTabel(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
    useEffect(() =>{
      getAllTebles();
    },[])
    return (
       <div>
        <br /><br />
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3>add Table</h3>
              <div className="card-body">
              {user && (
                <form>
                  <div className="form-group mb-2">
                    <label className="form-label"> Table Zone:</label>
                    <input
                      type="text"
                      placeholder="ชื่อโต๊ะ"
                      name="tableZone"
                      value={table_Zone}
                      {...register('table_Zone')}
                      className={`form-control ${
                        errors.table_Zone ? 'is-invalid' : ''
                      }`}
                      onChange={(e) => setTabel_Zone(e.target.value)}
                    >
                    </input>
                    <div className="invalid-feedback">
                      {errors.table_Zone?.message}
                    </div>
                  </div>
                  <button className="btn btn-success" onClick={handleSubmit(saveTable)} > Submit </button>
                  <Link to="/TableEmp" className="btn btn-danger"> Cancel </Link>
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
  

export default CreateTableEmp