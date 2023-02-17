import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js";
import TotalOrderService from "../../services/TotalOrderService";
import OrderMenuService from "../../services/OrderMenuService";
import { Button, Spinner } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { Container, Row, Col } from "react-grid-system";
function IncomeExpense() {
  const [selectedDate, setSelectedDate] = useState({
    day: "",
    month: "",
    year: "",
  });

  const [selectedDateEnd, setSelectedDateEnd] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [days, setDays] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);

  const [incomeAll, setIncomeAll] = useState([""]);
  const [incomeMenu,setIncomeMenu] = useState([""]);
  const [proFitAndCost, setProFitAndCost] = useState([""]);
  
  let TotalPrice = totalOrder?.reduce((prev, cur) => prev + cur.totalPrice, 0);

  let dateDatalable = "";
  let dateData = "";

  let date = "";
  if (
    selectedDate.day === "" &&
    selectedDate.month === "" &&
    selectedDate.year === ""
  ) {
    dateDatalable = [];
  } else if (selectedDate.month === "") {
    dateData = selectedDate.year;
    dateDatalable = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
  } else if (selectedDate.day === "") {
    dateData = selectedDate.year + "-" + selectedDate.month;
  }

  let dateDatalableEnd = "";
  let dateDataEnd = "";

  let dateEnd = "";
  if (
    selectedDateEnd.day === "" &&
    selectedDateEnd.month === "" &&
    selectedDateEnd.year === ""
  ) {
    dateDatalableEnd = [];
  } else if (selectedDateEnd.month === "") {
    dateDataEnd = selectedDateEnd.year;
    dateDatalableEnd = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
  } else if (selectedDateEnd.day === "") {
    dateDataEnd = selectedDateEnd.year + "-" + selectedDateEnd.month;
  }

  console.log(dateDatalableEnd);



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

  const getIncomeByIDMenu = async (menu_ID,date) =>{
    try{
      const response = await Promise.resolve(OrderMenuService.incomeByMenuID(menu_ID,date));
      console.log("Response data: ", response.data);
      setIncomeAll(response.data);
    }catch(error){
      console.log(error);
    }
  };

  const getIncomeAllByDate = async (date) =>{
    try{
      const response = await Promise.resolve(OrderMenuService.incomeAllByDate(date));
      const response2 = await Promise.resolve(OrderMenuService.incomeAllDate(date));
      setIncomeAll(null);
      setIncomeAll(response.data);


      console.log(response2.data);
      // setProFitAndCost(null);
      setProFitAndCost(response2.data);
    }catch(error){
      console.log(error);
    }
  }

  const getIncomeBetweenDate = async (startDate,endDate) =>{
    try{
        const response = await Promise.resolve(OrderMenuService.incomeAllBetweenByDate(startDate,endDate));
        const response2 = await Promise.resolve(OrderMenuService.incomeBetweenAllMenu(startDate,endDate));

        setIncomeAll(null);
        setIncomeAll(response.data);

        setProFitAndCost(response2.data);
    }catch(error){
      console.log(error);
    }
  }


  const grap = (dataDateStart) => {
    let dateDatalableStart = "";
    let dateDataStart = "";
    if (dataDateStart.day === "" && dataDateStart.month === "" && dataDateStart.year === "") {
      dateDatalableStart = [];
    } else if (
      dataDateStart.day !== "" &&
      dataDateStart.month !== "" &&
      dataDateStart.year !== ""
    ) {
      dateDataStart = dataDateStart.year + "-" + dataDateStart.month + "-" + dataDateStart.day;
      dateDatalableStart = dataDateStart.day;
    } else if (dataDateStart.month === "") {
      dateDataStart = dataDateStart.year;
      dateDatalableStart = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
    } else if (dataDateStart.day === "") {
      dateDataStart = dataDateStart.year + "-" + dataDateStart.month;
      dateDatalableStart = days;
    }

    console.log(dateDataStart);

    date = dateData;
  };

  const grapEnd = (dataDate,dataDateStart) => {
    let dateDatalable = "";
    let dateData = "";
    let dateDatalableStart = "";
    let dateDataStart = "";
    if (dataDateStart.day === "" && dataDateStart.month === "" && dataDateStart.year === "") {
      dateDatalableStart = [];
    } else if (
      dataDateStart.day !== "" &&
      dataDateStart.month !== "" &&
      dataDateStart.year !== ""
    ) {
      dateDataStart = dataDateStart.year + "-" + dataDateStart.month + "-" + dataDateStart.day;
      dateDatalableStart = dataDateStart.day;
    } else if (dataDateStart.month === "") {
      dateDataStart = dataDateStart.year;
      dateDatalableStart = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
    } else if (dataDateStart.day === "") {
      dateDataStart = dataDateStart.year + "-" + dataDateStart.month;
      dateDatalableStart = days;
    }


    if (dataDate.day === "" && dataDate.month === "" && dataDate.year === "") {
      dateDatalable = [];
    } else if (
      dataDate.day !== "" &&
      dataDate.month !== "" &&
      dataDate.year !== ""
    ) {
      dateData = dataDate.year + "-" + dataDate.month + "-" + dataDate.day;
      dateDatalable = dataDate.day;
    } else if (dataDate.month === "") {
      dateData = dataDate.year;
      dateDatalable = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
    } else if (dataDate.day === "") {
      dateData = dataDate.year + "-" + dataDate.month;
      dateDatalable = days;
    }

    console.log("Start",dateDataStart);
    console.log("End",dateData);

    date = dateData;
    // getIncomeAllByDate(dateDataStart);
    if(dateData.length === 0){
      getIncomeAllByDate(dateDataStart);
    }else if(dateData.length > 0){
      getIncomeBetweenDate(dateDataStart,dateData);
    }
  };



  useEffect(() => {
    let year = selectedDate.year;
    let month = selectedDate.month;
    let daysInMonth = new Date(year, month, 0).getDate();
    let daysArr = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setDays(daysArr);
  }, [selectedDate]);
  
  useEffect(() => {
    let year = selectedDate.year;
    let month = selectedDate.month;
    let daysInMonth = new Date(year, month, 0).getDate();
    let daysArr = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setDays(daysArr);
  }, [selectedDate]);

  useEffect(() => {
    getIncomeAllMenu();
    getIncomeAllMenuTotal();
    console.log(incomeAll);
  }, []);

  console.log("pppdppp = ",selectedDate);

  return (
    <>
      <div className="row">
        <div className="text-center" style={{ margin: "40px" }}>
          <div>
            เริ่มต้น:
          <select
            value={selectedDate.day}
            disabled={selectedDate.month === ""}
            onChange={(e) =>
              setSelectedDate({ ...selectedDate, day: e.target.value })
            }
          >
            <option value="">วันที่</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <select
            style={{ margin: "10px" }}
            value={selectedDate.month}
            disabled={selectedDate.year === ""}
            onChange={(e) =>
              setSelectedDate({ ...selectedDate, month: e.target.value })
            }
          >
            <option value="">เดือน</option>
            {Array.from({ length: 12 }, (_, i) =>
              new Date(null, i).toLocaleString("default", { month: "2-digit" })
            ).map((month, index) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={selectedDate.year}
            onChange={(e) =>
              setSelectedDate({ ...selectedDate, year: e.target.value })
            }
          >
            <option value="">ปี</option>
            {Array.from(
              { length: 10 },
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          </div>

          <div>
            สิ้นสุด: 
          <select
            value={selectedDateEnd.day}
            disabled={selectedDateEnd.month === ""}
            onChange={(e) =>
              setSelectedDateEnd({ ...selectedDateEnd, day: e.target.value })
            }
          >
            <option value="">วันที่</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <select
            style={{ margin: "10px" }}
            value={selectedDateEnd.month}
            disabled={selectedDateEnd.year === ""}
            onChange={(e) =>
              setSelectedDateEnd({ ...selectedDateEnd, month: e.target.value })
            }
          >
            <option value="">เดือน</option>
            {Array.from({ length: 12 }, (_, i) =>
              new Date(null, i).toLocaleString("default", { month: "2-digit" })
            ).map((month, index) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={selectedDateEnd.year}
            onChange={(e) =>
              setSelectedDateEnd({ ...selectedDateEnd, year: e.target.value })
            }
          >
            <option value="">ปี</option>
            {Array.from(
              { length: 10 },
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          </div>
          
          <div className="text-center">
            <Button variant="success" onClick={() => grapEnd(selectedDateEnd,selectedDate)}>
              {"ตกลง"}
            </Button>
          </div>
        </div>
      </div>
      <div className="row" style={{ textAlign: "center" }}>
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
            {incomeAll?.map((income) => (
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
     <Container>
        <Row>
        <h4 style={{ color: "#F4656D" ,margin:"5px",padding:"5px"}}>
          รายได้ทั้งหมด = {Intl.NumberFormat()?.format(proFitAndCost[0])} บาท
        </h4>
        <h4 style={{ color: "#656868" ,margin:"5px",padding:"5px"}}>
          ต้นทุนทั้งหมด = {Intl.NumberFormat()?.format(proFitAndCost[4])} บาท
        </h4>
        <h4 style={{ color: "black",margin:"5px",padding:"5px" }}>
          ส่วนลดทั้งหมด = {Intl.NumberFormat()?.format(proFitAndCost[2])} บาท
        </h4>
        <h4 style={{ color: "#659AD2",margin:"5px",padding:"5px" }}>
          กำไรทั้งหมด = {Intl.NumberFormat()?.format(proFitAndCost[1])} บาท
        </h4>
        <h4 style={{ color: "#729897",margin:"5px",padding:"5px" }}>
          กำไรทั้งหมดหลังจากหักส่วนลด = {Intl.NumberFormat()?.format(proFitAndCost[3])} บาท
        </h4>
        </Row>
        </Container>
    </>
  );
}

export default IncomeExpense;
