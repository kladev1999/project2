import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TableService from "../../services/TableService";
import OrderMenuService from '../../services/OrderMenuService';

function MoveTable() { 

    const { table_ID, totalOrder_ID } = useParams();
    const [getMoveTable ,SetGetMoveTable] = useState();
    const [pointTable, setPointTable] = useState([]);
    const navigate = useNavigate();

    const GetMoveTable = () => {
        TableService.getMoveTable().then((respone) => {
            SetGetMoveTable(respone.data)
            console.log(respone.data)
        })
    }

   useEffect(() => {
    GetMoveTable();
   },[])

   const Back = () => {
    navigate("/TaotalOrder")
}

 const Movetable = () => {

    TableService.MoveTable(pointTable,totalOrder_ID).then(()=> {
       
    })
    OrderMenuService.mergeTable(totalOrder_ID, pointTable).then(() => {
        navigate("/TaotalOrder")

    })

 }

  return (
    <div>
    <h2 className='text-center'>การย้ายโต๊ะ</h2>

    <p></p>
    <h2>โต๊ะที่ {table_ID} จะย้ายโต๊ะไปที่</h2>

    {getMoveTable?.map((t) => {
        return (
            <fieldset>
                <div>
                    <input type="radio" id="louie" name="drone" value={t.table_ID} onClick={() => setPointTable(t.table_ID)} />
                    <label>โต๊ะที่ {t.table_ID}  Zone {t.table_Zone}</label>
                </div>
            </fieldset>
        );
    })}
    <button
     style={{ marginLeft: "5px" }}
        onClick={() => Movetable()}
        className="btn btn-outline-success"
    >
        ย้ายโต๊ะ
    </button>
    <button
     style={{ marginLeft: "5px" }}
        onClick={() => Back()}
        className="btn btn-outline-primary"
    >
        กลับ
    </button>
</div>
  )
}

export default MoveTable