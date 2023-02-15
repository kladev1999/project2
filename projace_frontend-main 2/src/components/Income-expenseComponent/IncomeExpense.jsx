import React, { useState, useEffect, useRef } from "react";
import {Chart} from 'chart.js';
import TotalOrderService from "../../services/TotalOrderService";
import { Button, Spinner } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
function IncomeExpense() {
  const [selectedDate, setSelectedDate] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [days, setDays] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);

  let TotalPrice = totalOrder?.reduce((prev, cur) => prev + cur.totalPrice, 0);

  let dateDatalable = "";
  let dateData = "";
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
  console.log("income", TotalPrice);

  const getAllTotalOrder = (da) => {
    TotalOrderService.getDate(da)
      .then((response) => {
        setTotalOrder(response.data);
        console.log("data", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  
  const grap = (dataDate) => {
    
   

    
      let dateDatalable = "";
      let dateData = "";
      if (
        dataDate.day === "" &&
        dataDate.month === "" &&
        dataDate.year === ""
      ) {
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

      console.log(dataDate);
      console.log(totalOrder);
 
      getAllTotalOrder(dateData);
  

      const data = {
        labels: dateDatalable,
        datasets: [
          {
            label: "Income",
            data: [],
            borderColor: "green",
            fill: false,
          },
          {
            label: "Expense",
            data: [],
            borderColor: "red",
            fill: false,
          },
        ],
      };

      const ctx = chartRef.current.getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

  };

  useEffect(() => {
    let year = selectedDate.year;
    let month = selectedDate.month;
    let daysInMonth = new Date(year, month, 0).getDate();
    let daysArr = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setDays(daysArr);
  }, [selectedDate]);

  console.log(selectedDate);

  const chartRef = useRef(null);

  return (
    <>

      <div className="text-center" style={{ margin: "40px" }}>
        <select
          value={selectedDate.day}
          disabled={selectedDate.month === ""}
          onChange={(e) =>
            setSelectedDate({ ...selectedDate, day: e.target.value })
          }
        >
          <option value="">Day</option>
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
          <option value="">Month</option>
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
          <option value="">Year</option>
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
      <div className="text-center" style={{ margin: "40px" }}>
        <select
          value={selectedDate.day}
          disabled={selectedDate.month === ""}
          onChange={(e) =>
            setSelectedDate({ ...selectedDate, day: e.target.value })
          }
        >
          <option value="">Day</option>
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
          <option value="">Month</option>
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
          <option value="">Year</option>
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

      <div>
        <h2 style={{ color: "green" }}>
          Income = {Intl.NumberFormat().format(TotalPrice)} บาท.
        </h2>
        <h2 style={{ color: "red" }}>Expense = </h2>
        <canvas ref={chartRef} />
      </div>
    </>
  );
}

export default IncomeExpense;
