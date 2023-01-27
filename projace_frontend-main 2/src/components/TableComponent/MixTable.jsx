import React from 'react';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TableService from "../../services/TableService";
import OrderMenuService from '../../services/OrderMenuService';
const  MixTable =  () => {

    const { table_ID, totalOrder_ID,compoSite } = useParams();
    const [table, setTabel] = useState([]);
    const [pointTable, setPointTable] = useState([]);
    const navigate = useNavigate();

    const getMixTebles = (table_ID) => {
        TableService.MixTable(table_ID)
            .then(response => {
                setTabel(response.data);
                console.log("mix", response.data);

            }).catch(error => {
                console.log('Something went wrong', error);
            });
    }



    useEffect(() => {
        getMixTebles(table_ID);
    }, [table_ID]);

    

    console.log(pointTable);

    const mixTable = () => {

        if (pointTable.length <= 0) {
            window.alert("กรุณาเลือกโต๊ะที่ต้องการรวม!!")
        } else {

            OrderMenuService.mergeTable(totalOrder_ID, pointTable).then(() => {
                navigate("/TaotalOrder")

            })
        }

    }

    const Back = () => {
        navigate("/TaotalOrder")
    }

    const CancelTable = () => {

        OrderMenuService.mergeTable(totalOrder_ID, table_ID).then(() => {
            navigate("/TaotalOrder")

        })

    }

    const BTNCancelTable = () => {
        if(table_ID !== compoSite){

            return<button
             style={{ marginLeft: "5px" }}
                onClick={() => CancelTable()}
                className="btn btn-outline-danger"
            >
                ยกเลิกการรวมโต๊ะ
            </button>

        }else{
            return;
        }


    }




    return (
        <div>
            <h2 className='text-center'>การรวมโต๊ะ</h2>

            <p></p>
            <h2>โต๊ะที่ {table_ID} จะร่วมกับโต๊ะ</h2>

            {table?.map((t) => {
                return (
                    <fieldset>
                        <div>
                            <input type="radio" id="louie" name="drone" value={t.table_ID.table_ID} onClick={() => setPointTable(t.table_ID.table_ID)} />
                            <label>โต๊ะที่ {t.table_ID.table_ID}  Zone {t.table_ID.table_Zone}</label>
                        </div>
                    </fieldset>
                );
            })}
            <button
             style={{ marginLeft: "5px" }}
                onClick={() => mixTable()}
                className="btn btn-outline-success"
            >
                รวมโต๊ะ
            </button>
            <button
             style={{ marginLeft: "5px" }}
                onClick={() => Back()}
                className="btn btn-outline-primary"
            >
                กลับ
            </button>
            <p>
                {
                    BTNCancelTable()
                }
            </p>
        </div>
        
    )
}

export default MixTable