import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js";
import TotalOrderService from "../../services/TotalOrderService";
import OrderMenuService from "../../services/OrderMenuService";
import { Button, Spinner } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
function IncomeExpense() {
  const [selectedDate, setSelectedDate] = useState({
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

  console.log(dateDatalable);



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
      console.log("Response data: ", response.data);
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


  const grap = (dataDate) => {
    let dateDatalable = "";
    let dateData = "";
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

    console.log(dateData);

    date = dateData;
  };



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
          <div className="text-center">
            <Button variant="success" onClick={() => grap(selectedDate)}>
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
              <th>จัดการ</th>
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
                <td>
                  <button
                    onClick={() => getIncomeByIDMenu(income.menu_ID,date)}
                    className="btn btn-warning"
                  >
                    ดูข้อมูล
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 style={{ color: "red" }}>
          รายได้ทั้งหมด = {Intl.NumberFormat().format(proFitAndCost[0])} บาท
        </h2>
        <h2 style={{ color: "green" }}>
          กำไรทั้งหมด = {Intl.NumberFormat().format(proFitAndCost[1])} บาท
        </h2>
      </div>
    </>
  );
}

export default IncomeExpense;
