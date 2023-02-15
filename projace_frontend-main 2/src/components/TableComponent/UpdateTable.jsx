import React,{useState,useEffect} from 'react'
import { useParams, Link ,useNavigate} from "react-router-dom";
import TableService from '../../services/TableService'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function UpdateTable() {


    const {table_ID  } = useParams();
    const [table,setTable] = useState();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        table: Yup.string().required("name is required"),
      });

      const formOptions = { resolver: yupResolver(validationSchema) };
    
      // get functions to build form with useForm() hook
      const { register, handleSubmit, reset, formState } = useForm(formOptions);
      const { errors } = formState;



 const tableUpdate = {
      table_Zone:table
    }
    

    useEffect(() => {

        setTimeout(
            () =>
              setUser({
                table: "",
              }),
            300
          );

        getTableByID();

    },[])

    function saveTable () {
      
        TableService.updateTable(table_ID,tableUpdate).then((response) => {
        }).catch(error => {
          console.log(error)
        });
        
        navigate("/table");
  
  };


    const getTableByID = () => {

        TableService.getTableById(table_ID).then((res) => {
            setTable(res.data.table_Zone)
            console.log(res.data)
        })
    }


  return (
    <div>
    <br /><br />
    <div className="container">
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
        <h3>Update Table</h3>
          <div className="card-body">
          {user && (
            <form>
              <div className="form-group mb-2">
                <label className="form-label"> Table :</label>
                <input
                  type="text"
                  placeholder="ชื่อโต๊ะ"
                  name="table"
                  value={table}
                  {...register('table')}
                      className={`form-control ${
                        errors.table ? 'is-invalid' : ''
                      }`}
                  onChange={(e) => setTable(e.target.value)}
                >
                </input>
                <div className="invalid-feedback">
                      {errors.table?.message}
                    </div>
              </div>
              <button className="btn btn-success" onClick={handleSubmit(saveTable)} > Update </button>
              {" "}
              <Link to="/table" className="btn btn-danger"> Cancel </Link>
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

export default UpdateTable