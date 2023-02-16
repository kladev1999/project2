import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StockService from "../../services/StockService";

function BackupStock() {

    const [stock, setStock] = useState([]);
    const [search, searchInput] = useState("");
    const navigate = useNavigate();
  
    const getAllStocks = () => {
      StockService.getBackUpStock()
        .then((response) => {
            setStock(response.data);
            console.log("ssssssssssss",response.data);

        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const deleteStock = (stock_ID) => {
      if (window.confirm("คุณต้องการที่จะลบหรือไม่")) {
        StockService.deleteStock(stock_ID)
          .then((response) => {
            getAllStocks();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
  
    useEffect(() => {
      getAllStocks();
    }, []);
  
    const filterStock = stock.filter((stock) => {
      if (search.length > 1) {
        return stock.stockType_ID.stockType_Name
          .toLowerCase()
          .includes(search.toLowerCase());
      }else{
        return stock
      }
    });
  
    const getBackgroundColor = (value) => {
      let color;
      if (value.stock_Qty <= value.stock_Min) {
        color = "#FF6961";
      }
      return color;
    };
    const timestamp = (data) => {
  
      let timestamp = data.split("T")
      let time = timestamp[1].split(".")
      let d = timestamp[0].split("-")
      let y = parseInt(d[0]) + 543
      let day = d[2]+"/"+d[1]+"/"+y
  
      return (
        <>
          วันที่ {day} เวลา {time[0]}
        </>
      )
    }

    const Back = () => {
      navigate("/stock")
    }
    
  
    return (
      <div className="container">
        <h2 className="text-center">ประวัติสต๊อก</h2>
        <div className="">
        <button
          className="btn btn-primary mr-2 "
          style={{ margin: 5 }}
          onClick={Back}
        >
          {" "}
         กลับ
        </button>
  
          <input
            type="search"
            placeholder="ค้นหา"
            aria-label="Search"
            onChange={(e) => searchInput(e.target.value)}
          />
        </div>
  
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> รหัสสต๊อก </th>
                <th> ชื่อสต๊อก </th>
                <th> จำนวน </th>
                <th> ต้นทุน </th>
                <th> จำนวนเหลือน้อยที่แจ้งเตือน </th>
                <th> เวลาที่เพิ่ม </th>
              </tr>
            </thead>
            <tbody>
              {filterStock.map((stocks,i) => (
                <tr
                  key={stocks.backupStock_ID}
                  style={{ backgroundColor: getBackgroundColor(stocks) }}
                >
                  <td>{i+1}</td>
                  <td>{stocks.stockType_ID.stockType_Name}</td>
                  <td>{stocks.backupStock_Qty}</td>
                  <td>{stocks.backupStock_Cost}</td>
                  <td>{stocks.backupStock_Min}</td>
                  <td>{timestamp(stocks.backupStock_TimeStamp) }</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default BackupStock