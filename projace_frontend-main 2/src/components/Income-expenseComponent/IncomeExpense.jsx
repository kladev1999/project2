import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js";
import TotalOrderService from "../../services/TotalOrderService";
import OrderMenuService from "../../services/OrderMenuService";
import { Button, Spinner } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { Container, Row, Col } from "react-grid-system";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

function IncomeExpense() {
  const [searchName, setsearchName] = useState("");
  const navigate = useNavigate();
  const  [StartDate,setStartdate] = useState(null);
  const  [EndDate,setEnddStart] = useState(null);

const [date, setDate] = useState(null);

const start = (date) => {
  
  let s = date.toString();
  let datetime =  s.split(' ')
  let y = parseInt(datetime[3])

  setDate(date)

  let monthnum =''
  
  if(datetime[1] === "Jan"){

    monthnum ='01'
  }
  else if (datetime[1] === "Feb"){
  
    monthnum ='02'
  }
  else if (datetime[1] === "Mar"){

    monthnum ='03'
  }
  else if (datetime[1] === "Apr"){
   
    monthnum ='04'
  }
  else if (datetime[1] === "May"){
 
    monthnum ='05'
  }
  else if (datetime[1] === "Jun"){
   
    monthnum ='06'
  }
  else if (datetime[1] === "Jul"){
    
    monthnum ='07'
  }
  else if (datetime[1] === "Aug"){
 
    monthnum ='08'
  }
  else if (datetime[1] === "Sep"){
  
    monthnum ='09'
  }
  else if (datetime[1] === "Oct"){
   
    monthnum ='10'
  }
  else if (datetime[1] === "Nov"){

    monthnum ='11'
  }
  else if (datetime[1] === "Dec"){

    monthnum ='12'
  }
  
  let dateData = datetime[3]+'-'+monthnum+'-'+datetime[2]

  setStartdate(dateData)

}
const [dateEnd, setDateEnd] = useState(null);

const end = (dateEnd) => {

  let sE = dateEnd?.toString();
  let datetimeE =  sE?.split(' ')
  let yE = parseInt(datetimeE[3])

  setDateEnd(dateEnd)
  
  let day = ''
  let month = ''
  let monthnum =''

if(datetimeE[1] === "Jan"){

  monthnum ='01'
}
else if (datetimeE[1] === "Feb"){

  monthnum ='02'
}
else if (datetimeE[1] === "Mar"){

  monthnum ='03'
}
else if (datetimeE[1] === "Apr"){
 
  monthnum ='04'
}
else if (datetimeE[1] === "May"){

  monthnum ='05'
}
else if (datetimeE[1] === "Jun"){

  monthnum ='06'
}
else if (datetimeE[1] === "Jul"){

  monthnum ='07'
}
else if (datetimeE[1] === "Aug"){

  monthnum ='08'
}
else if (datetimeE[1] === "Sep"){

  monthnum ='09'
}
else if (datetimeE[1] === "Oct"){

  monthnum ='10'
}
else if (datetimeE[1] === "Nov"){
 
  monthnum ='11'
}
else if (datetimeE[1] === "Dec"){

  monthnum ='12'
}

let dateDataE = datetimeE[3]+'-'+monthnum+'-'+datetimeE[2]

setEnddStart(dateDataE);
  
}




const [days, setDays] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);

  const [incomeAll, setIncomeAll] = useState([]);
  const [incomeMenu, setIncomeMenu] = useState([""]);
  const [proFitAndCost, setProFitAndCost] = useState([""]);

  let TotalPrice = totalOrder?.reduce((prev, cur) => prev + cur.totalPrice, 0);

  

  const getIncomeAllMenu = async () => {
    try {
      const response = await Promise.resolve(OrderMenuService.incomeAllMenu());
      console.log("Response data: ", response.data);
      setIncomeAll(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getIncomeAllMenuTotal = async () => {
    try {
      const response = await Promise.resolve(
        OrderMenuService.incomeAllMenuTotal()
      );
      console.log("Response data profit cost: ", response.data);
      setProFitAndCost(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getIncomeByIDMenu = async (menu_ID, date) => {
    try {
      const response = await Promise.resolve(
        OrderMenuService.incomeByMenuID(menu_ID, date)
      );
      console.log("Response data: ", response.data);
      setIncomeAll(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getIncomeAllByDate = async (date) => {
    try {
      const response = await Promise.resolve(
        OrderMenuService.incomeAllByDate(date)
      );
      const response2 = await Promise.resolve(
        OrderMenuService.incomeAllDate(date)
      );
      setIncomeAll(null);
      setIncomeAll(response.data);

      console.log(response2.data);
      // setProFitAndCost(null);
      setProFitAndCost(response2.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getIncomeBetweenDate = async (startDate, endDate) => {
    try {
      const response = await Promise.resolve(
        OrderMenuService.incomeAllBetweenByDate(startDate, endDate)
      );
      const response2 = await Promise.resolve(
        OrderMenuService.incomeBetweenAllMenu(startDate, endDate)
      );

      setIncomeAll(null);
      setIncomeAll(response.data);

      setProFitAndCost(response2.data);
    } catch (error) {
      console.log(error);
    }
  };

  const grap = () => {

    console.log("Start",StartDate)
    console.log("End",EndDate)

    if (EndDate === null) {
      getIncomeAllByDate(StartDate);
    } else {
      getIncomeBetweenDate(StartDate, EndDate);
    }
    
  };



  useEffect(() => {
    getIncomeAllMenu();
    getIncomeAllMenuTotal();
    console.log(incomeAll);
  }, []);

  const filterMenu = incomeAll?.filter((incomeAll) => {
    if (searchName.length > 0) {
      return incomeAll.menu_Name
        .toLowerCase()
        .includes(searchName?.toLowerCase());
    } else if (searchName.length > 2) {
      return incomeAll.menu_Name
        .toLowerCase()
        .includes(searchName?.toLowerCase());
    } else {
      return incomeAll.menu_Name
        .toLowerCase()
        .includes(searchName?.toLowerCase());
    }
  });
  const back = () => {
    navigate("/menu");
  };

  return (
    <>
      <div className="row">
        <div className="text-center">
          <h3> รายงานรายรับ - รายจ่าย </h3>
        </div>
      
      <div className="text-center">
            เริ่มต้น:
        <p>

        <DatePicker
          selected={date}
          onChange={(date) => start(date)}
          dateFormat="dd / MM / yyyy"
          maxDate={new Date()}
          showYearDropdown
        />

        <p style={{marginTop: "5px"}}></p>

            สิ้นสุด:
        <DatePicker
          selected={dateEnd}
          onChange={(date) => end(date)}
          dateFormat="dd / MM / yyyy"
          maxDate={new Date()}
          showYearDropdown
        />
   

        </p>
      </div>




   
         
        <p className="text-center">

          <div className="text-center">
            <Button
              variant="success"
              onClick={() => grap()}
            >
              {"ตกลง"}
            </Button>
          </div>
        </p>
        <Container>
          <Row>
            <h4 style={{ color: "#F4656D", margin: "5px", padding: "5px" }}>
              รายได้ทั้งหมด = {Intl.NumberFormat()?.format(proFitAndCost[0])}{" "}
              บาท
            </h4>
            <h4 style={{ color: "#656868", margin: "5px", padding: "5px" }}>
              ต้นทุนทั้งหมด = {Intl.NumberFormat()?.format(proFitAndCost[4])}{" "}
              บาท
            </h4>
            <h4 style={{ color: "black", margin: "5px", padding: "5px" }}>
              ส่วนลดทั้งหมด = {Intl.NumberFormat()?.format(proFitAndCost[2])}{" "}
              บาท
            </h4>
            <h4 style={{ color: "green", margin: "5px", padding: "5px" }}>
              กำไรทั้งหมด = {Intl.NumberFormat()?.format(proFitAndCost[3])} บาท
            </h4>
          </Row>
        </Container>
      </div>
      <div className="row" style={{ textAlign: "center" }}>
        <div className="col">
        
          <input
            type="search"
            placeholder="ค้นหา"
            aria-label="Search"
            style={{ margin: "5px", padding: "5px", boxSizing: "content-box" }}
            onChange={(e) => setsearchName(e.target.value)}
          />
          <button
              className="btn btn-danger"
              onClick={() => back()}
              style={{ margin: "5px", padding: "5px" }}
            >
              กลับ
            </button>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>รหัสเมนู</th>
              <th>ชื่อเมนู</th>
              <th>จำนวนที่ขายได้ (จาน )</th>
              <th>ราคาต้นทุน (บาท)</th>
              <th>ราคาขาย (บาท)</th>
              <th>ต้นทุนเมนูรวม (บาท)</th>
              <th>ขายได้รวม (บาท)</th>
              <th>กำไรทั้งหมด (บาท)</th>
            </tr>
          </thead>
          <tbody>
            {filterMenu?.map((income) => (
              <tr key={income.menu_ID}>
                <td>{income?.menu_ID}</td>
                <td>{income?.menu_Name}</td>
                <td>{income?.qtyByMenu}</td>
                <td>{income?.cost}</td>
                <td>{income?.menuPrice}</td>
                <td>{income?.totalCost}</td>
                <td>{income?.totalSell}</td>
                <td>{income?.proFit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default IncomeExpense;
