import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TableService from '../../services/TableService';
import TotalOrderService from '../../services/TotalOrderService';
function CreateTableComponent() {

  const [table_Zone, setTabel_Zone] = useState([]);
  const [tables, setTabel] = useState([]);
  const Navigate = useNavigate();
  const navigate = useNavigate();

  const [totalOrder_Status, setTotalOrder_Status] = useState(0)
  const [disCount, setDisCount] = useState(0)
  const [totalPrice, settotalPrice] = useState(0)
  const [compoSite, setCompoSite] = useState()

  const table = {
    table_Zone
  }

  const saveTable = (e,table_ID) => {
    e.preventDefault();
  TableService.addTable(table).then((response) => {
    
    Navigate('/table');

  }).catch(error => {
    console.log(error)
  });

  checkInTable(e);
};

const getAllTebles = () => {
  TableService.getTable()
    .then((response) => {
      setTabel("table",response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
const checkInTable = (e,table_ID) => {

  e.preventDefault();
  

    const totalOrderState = {
      totalPrice,
      disCount,
      totalOrder_Status,
      compoSite,
      table_ID: {
        table_ID,
      },
    };
    
    TotalOrderService.addTotalOrder(totalOrderState)
    .then((response) => {
      navigate("/TaotalOrder");
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
      console.log(totalOrderState);
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
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Table Zone:</label>
                  <input
                    type="text"
                    placeholder="tableZone"
                    name="tableZone"
                    className="form-control"
                    value={table_Zone}
                    onChange={(e) => setTabel_Zone(e.target.value)}
                  >
                  </input>
                </div>
                <button className="btn btn-success" onClick={(e) => saveTable(e)} > Submit </button>
                <Link to="/table" className="btn btn-danger"> Cancel </Link>
              </form>

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default CreateTableComponent