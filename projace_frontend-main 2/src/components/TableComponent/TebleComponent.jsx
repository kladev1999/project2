import React, { useState, useEffect } from "react";
import TableService from "../../services/TableService";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import TotalOrderService from "../../services/TotalOrderService";
import DatePicker from "react-datepicker";

function TebleComponent() {
  const [table, setTabel] = useState([]);
  const navigate = useNavigate();

  const [totalOrder_ID, setTotalOrder_ID] = useState();
  let value = 0;
  const [totalOrder_Status, setTotalOrder_Status] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);

  const [totalOrder, setTotalOrder] = useState([]);
  const [totalTab, setTotalTab] = useState([]);
  const [date, setDate] = useState(new Date());
  let s = date.toString();
  let datetime = s.split(" ");
  let y = parseInt(datetime[3]);

  let day = "";
  let month = "";
  let monthnum = "";

  if (datetime[0] === "Sun") {
    day = "อาทิตย์";
  } else if (datetime[0] === "Mon") {
    day = "จันทร์";
  } else if (datetime[0] === "Tue") {
    day = "อังคาร";
  } else if (datetime[0] === "Wed") {
    day = "พุธ";
  } else if (datetime[0] === "Thu") {
    day = "พฤหัสบดี";
  } else if (datetime[0] === "Fri") {
    day = "ศุกร์";
  } else if (datetime[0] === "Sat") {
    day = "เสาร์";
  }

  if (datetime[1] === "Jan") {
    month = "มกราคม";
    monthnum = "01";
  } else if (datetime[1] === "Feb") {
    month = "กุมภาพันธ์";
    monthnum = "02";
  } else if (datetime[1] === "Mar") {
    month = "มีนาคม";
    monthnum = "03";
  } else if (datetime[1] === "Apr") {
    month = "เมษายน";
    monthnum = "04";
  } else if (datetime[1] === "May") {
    month = "พฤษภาคม";
    monthnum = "05";
  } else if (datetime[1] === "Jun") {
    month = "มิถุนายน";
    monthnum = "06";
  } else if (datetime[1] === "Jul") {
    month = "กรกฎาคม";
    monthnum = "07";
  } else if (datetime[1] === "Aug") {
    month = "สิงหาคม";
    monthnum = "08";
  } else if (datetime[1] === "Sep") {
    month = "กันยายน";
    monthnum = "09";
  } else if (datetime[1] === "Oct") {
    month = "ตุลาคม";
    monthnum = "10";
  } else if (datetime[1] === "Nov") {
    month = "พฤศจิกายน";
    monthnum = "11";
  } else if (datetime[1] === "Dec") {
    month = "ธันวาคม";
    monthnum = "12";
  }

  let dateData = datetime[3] + "-" + monthnum + "-" + datetime[2];


  const getTotalOrder = () => {
    TotalOrderService.getTotalOrders()
      .then((response) => {
        setTotalOrder(response.data);
        console.log("total Order = ", response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getTotalOrder_ID = (table_ID) => {
    TableService.getTotalOrder_ID(table_ID)
      .then((response) => {
        setTotalOrder_ID(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAllTebles = () => {
    TableService.getTableDatetime(dateData)
      .then((response) => {
        setTabel(response.data);
        console.log("table = ", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const findTable = async () => {
    TableService.findTable()
      .then((response) => {
        console.log("======= ", totalTab);
        setTotalTab(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTabel = (table_ID) => {
    if (window.confirm("Are you sure you want to delete table")) {
      TableService.deleteTable(table_ID)
        .then(() => {
          getAllTebles();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const AddTable = () => {
    navigate("/CreateTableComponent");
  };

  useEffect(() => {
    getAllTebles();
    getTotalOrder();
    findTable();
  }, [dateData]);

  useEffect(() => {
    console.log("=======2 ", totalTab);
  }, [totalTab]);

  const checkInTable = (e, table_ID) => {
    e.preventDefault();
    const totalOrderState = {
      totalPrice,
      totalOrder_Status,
      compoSite: table_ID,
      table_ID: {
        table_ID,
      },
    };

    TotalOrderService.addTotalOrder(totalOrderState)
      .then((response) => {
        navigate("/TotalOrder");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(totalOrderState);
      });
  };

  const OrderMenu = (totalOrder, table_ID) => {
    TableService.getTotalOrder_ID(table_ID)
      .then((response) => {
        navigate(
          "/DashboardUser/" + response.data + "/" + table_ID + "/" + table_ID
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const mixTable = (table_ID) => {
    navigate("/MixTable/" + table_ID);
  };

  const disableButton = (Tab) => {
    const check = totalOrder.find((item) => {
      return item.table_ID.table_ID === Tab;
    });
    if (check) {
      return true;
    } else {
      return false;
    }
  };

  const disableButtonNotOpentable = (Tab) => {
    const check = totalOrder.find((item) => {
      return item.table_ID.table_ID === Tab;
    });
    if (check) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <Container>
      <Row>
        <Row lg="6" md="6" sm="6" xs="12">
          <div className="search__widget d-flex align-items-center justify-content-between ">
            <span>
              <i class="ri-search-line"></i>
            </span>
          </div>
        </Row>
        <p className="col-md-12"></p>
        <h3 className="text-center">
          {"วัน "} {day} {"ที่ "} {datetime[2]} {"เดือน "} {month} {"พ.ศ. "}{" "}
          {y + 543}
        </h3>
        <p className="col-md-12"></p>
        <div className="text-center">
          ค้นหาตามวันที่
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              dateFormat={`วันที่ ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear() + 543}`}
              maxDate={new Date()}
              showYearDropdown
            />
          </div>
        <div>
          <button
            className="btn btn-primary mr-2 "
            style={{ marginTop: 10 }}
            onClick={AddTable}
          >
            {" "}
           เพิ่มโต๊ะ
          </button>
        </div>


        {table?.map((t) => {
          return (
            <Col
              lg="3"
              md="12"
              sm="12"
              xs="12"
              key={t.table_ID}
              className="md-4"
            >
              <div className="product__item">
                <div className="product__content">
                  <h5>
                    <h2>โต๊ะ {t.table_ID}</h2>
                    <h4> โซน {t.table_Zone}</h4>
                  </h5>
                  <div className="text-center">
                    <button
                      className="btn btn-primary"
                      disabled={disableButton(t.table_ID)}
                      onClick={(e) => checkInTable(e, t.table_ID)}
                    >
                      {" "}
                      เปิดโต๊ะ
                    </button>

                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default TebleComponent;
