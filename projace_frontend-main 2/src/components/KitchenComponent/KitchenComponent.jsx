import React from "react";
import { useEffect, useState, useCallback } from "react";
import OrderMenuService from "../../services/OrderMenuService";
import { Container } from "reactstrap";
import DatePicker from "react-datepicker";
import AuthService from "../../services/Auth-service";
const KitchenComponent = () => {
  const [orderKitchen, setOrderKitchen] = useState([]);
  const [search, searchInput] = useState("");
  const currentUser = AuthService.getCurrentUser();
  const WAIT_TIME = 3000;
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

  const OrderKitchen = useCallback(() => {
    OrderMenuService.kitchen(dateData).then((response) => {
      setOrderKitchen(response.data);
      console.log(response.data);
    });
  }, [dateData]);

  useEffect(() => {
    const id = setInterval(OrderKitchen, WAIT_TIME);
    return () => {
      clearInterval(id);
    };
  }, [OrderKitchen]);

  const updateState = (orderMenu_ID, status,name, menu_ID, qty) => () => {

    console.log("sssssss",status)


    if(status === 0){
      if(window.confirm(`${name} กำลังทำ!!`)){
        
        OrderMenuService.updateStatus(orderMenu_ID)
        .then((response) => {
          OrderKitchen();
        })
        .catch((e) => {
          console.log(e);
        });
        
        OrderMenuService.Cancel(orderMenu_ID, currentUser.name_Emp)
        .then((response) => {
          console.log("Update",orderMenu_ID)
        })
        .catch((e) => {
          console.log(e);
        });
      }
    }else if (status === 1){
      if(window.confirm(`${name} พร้อมเสริฟ!!`)){
        
        OrderMenuService.updateStatus(orderMenu_ID)
        .then((response) => {
          OrderKitchen();
        })
        .catch((e) => {
          console.log(e);
        });
        
        OrderMenuService.Cancel(orderMenu_ID, currentUser.name_Emp)
        .then((response) => {
          console.log("Update",orderMenu_ID)
        })
        .catch((e) => {
          console.log(e);
        });
      }
    }
    else if(status === 2){
      if(window.confirm(`${name} เสริฟแล้ว!!`)){
        
        OrderMenuService.updateStatus(orderMenu_ID)
        .then((response) => {
          OrderKitchen();
        })
        .catch((e) => {
          console.log(e);
        });
        
        OrderMenuService.Cancel(orderMenu_ID, currentUser.name_Emp)
        .then((response) => {
          console.log("Update",orderMenu_ID)
        })
        .catch((e) => {
          console.log(e);
        });
        cutStock(status, menu_ID, qty);
      }
    }
    };
    
  const cancel = (orderMenu_ID) => () => {
    if (window.confirm("คุณต้องการยกเลิกหรือไม่!!")) {
      OrderMenuService.cancelStatus(orderMenu_ID)
        .then((response) => {
          // window.location.reload();
          OrderKitchen();
        })
        .catch((e) => {
          console.log(e);
        });

      OrderMenuService.Cancel(orderMenu_ID, currentUser.name_Emp)
        .then((response) => {})
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const filterStock = orderKitchen.filter((ok) => {
    return ok.totalOrder_ID.table_ID.table_Zone
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  const getBackgroundColor = (value) => {
    let color;
    if (value.status_ID.status_ID === 3) {
      color = "#A7D489";
    } else if (value.status_ID.status_ID === 4) {
      color = "#FF6961";
    } else if (value.status_ID.status_ID === 2) {
      color = "#49dfff";
    }
    else if(value.status_ID.status_ID !== 4 && value.status_ID.status_ID !== 3 && value.status_ID.status_ID !== 0){
      color = "#ffc847";
    }
    return color;
  };

  const cutStock = (status, menu_ID, qty) => {
    console.log(qty);
    if (status?.status_ID?.status_ID === 1) {
      OrderMenuService.loopStockCut(menu_ID, qty)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

 const CancelEmp = (name_Emp, status) => {
    if (name_Emp === "") {
      return <>-</>;
    } else if (status === 4) {
      return <>ยกเลิกโดย {name_Emp}</>;
    } else if (status === 3) {
      return <>เสริฟโดย {name_Emp}</>;
    }
    else if (status === 1) {
      return <>{name_Emp} กำลังทำ</>;
    }
    else if (status === 2) {
      return <>{name_Emp} พร้อมเสริฟ</>;
    }
  };


  const timestamp = (data) => {
    let timestamp = data.split("T");
    let time = timestamp[1].split(".");
    let d = timestamp[0].split("-");
    let y = parseInt(d[0]) + 543;

    return <>เวลา {time[0]}</>;
  };

  useEffect(() => {
    OrderKitchen();
  }, [dateData]);

  


  const watingCook = (k, index) => {
    if (
      k.status_ID.status_ID !== 4 &&
      k.status_ID.status_ID !== 3 &&
      k.menu_ID.typeMenu_ID.menu_Type !== 1
    ) {
      return (
        <tr
          style={{ backgroundColor: getBackgroundColor(k), marginTop: "50px" }}
        >
          <th>{index + 1}</th>
          <td>{k.totalOrder_ID.table_ID.table_Zone}</td>
          <td>{k.menu_ID.menu_Name}</td>
          <td>{k.orderMenu_Qty}</td>
          <td>{timestamp(k.orderMenu_TimeStamp)}</td>
          <td>{k.status_ID.status}</td>
          <td>
            <div>
              <button
                type="button"
                class="btn btn-primary"
                // disabled={getBackgroundColor(k)}
                onClick={updateState(
                  k.orderMenu_ID,
                  k.status_ID.status_ID,
                  k.menu_ID.menu_Name,
                  k.menu_ID.menu_ID,
                  k.orderMenu_Qty
                )}
              >
                {k.status_ID.status}
              </button>
              <button
                type="button"
                style={{ marginLeft: "5px" }}
                class="btn btn-danger"
                // disabled={getBackgroundColor(k)}
                onClick={cancel(k.orderMenu_ID)}
              >
                ยกเลิก
              </button>
            </div>
          </td>
          <td>{CancelEmp(k.cencel,k.status_ID.status_ID)}</td>
        </tr>
      );
    }
  };

  const finishedCook = (k, index) => {
    if (
      (k.status_ID.status_ID === 4 &&  k.menu_ID.typeMenu_ID.menu_Type === 0) ||
      (k.status_ID.status_ID === 3 &&  k.menu_ID.typeMenu_ID.menu_Type === 0)
    ) {
      return (
        <tr
          style={{ backgroundColor: getBackgroundColor(k), marginTop: "50px" }}
        >
          <th>{index + 1}</th>
          <td>{k.totalOrder_ID.table_ID.table_Zone}</td>
          <td>{k.menu_ID.menu_Name}</td>
          <td>{k.orderMenu_Qty}</td>
          <td>{timestamp(k.orderMenu_TimeStamp)}</td>
          <td>{k.status_ID.status_ID}</td>
          <td>
            <div>
              <button
                type="button"
                class="btn btn-primary"
                disabled={getBackgroundColor(k)}
                onClick={updateState(k.orderMenu_ID,k.status_ID.status_ID)}
              >
                {k.status_ID.status}
              </button>
              <button
                type="button"
                style={{ marginLeft: "5px" }}
                class="btn btn-danger"
                disabled={getBackgroundColor(k)}
                onClick={cancel(k.orderMenu_ID)}
              >
                ยกเลิก
              </button>
            </div>
          </td>
          <td>{CancelEmp(k.cencel,k.status_ID.status_ID)}</td>
        </tr>
      );
    }
  };

  return (
    <Container style={{ textAlign: "Center" }}>
      <Container>
        <div style={{ width: "100%", height: "500px" }}>
          <h2
            className="bg-success text-white"
            style={{ padding: 5, margin: 5 }}
          >
            ครัว
          </h2>

          <h2 class="text-center"> ทำยังไม่เสร็จ </h2>
          <input
            style={{ marginTop: 10 }}
            type="search"
            placeholder="ค้นหาโต๊ะ..."
            aria-label="Search"
            onChange={(e) => searchInput(e.target.value)}
          />
          <p className="col-md-12"></p>
          <h3>
            {"วัน "} {day} {"ที่ "} {datetime[2]} {"เดือน "} {month} {"พ.ศ. "}{" "}
            {y + 543}
          </h3>
          <div
            className="card overflow-auto"
            style={{ width: "100%", height: "400px", marginTop: "10px" }}
          >
            <br></br>
            <div className="text-start">
              ค้นหาตามวันที่
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                showYearDropdown
              />
            </div>
            <div
              className="card overflow-auto"
              style={{ width: "100%", height: "400px", marginTop: "10px" }}
            >
              <br></br>
              <div
                className="card-header"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <table className="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th> ลำดับที่ </th>
                          <th> โต๊ะที่</th>
                          <th> รายการที่สั่ง</th>
                          <th> จำนวน</th>
                          <th> เวลา</th>
                          <th> สถานะ </th>
                          <th> Action </th>
                          <th> Action </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterStock?.map((k, index) => {
                          return watingCook(k, index);
                        })}
                      </tbody>
                    </table>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Container>
        <div>
          <h2 class="text-center" style={{ marginTop: "40px" }}>
            {" "}
            เสิร์ฟแล้ว{" "}
          </h2>
          <input
            style={{ marginTop: 10, width: "150px" }}
            type="search"
            class="form-control border-end-0 border rounded-pill"
            placeholder="ค้นหาโต๊ะ..."
            aria-label="Search"
            onChange={(e) => searchInput(e.target.value)}
          />
          <div
            className="card overflow-auto"
            style={{ width: "100%", height: "400px", marginTop: "10px" }}
          >
            <br></br>
            <div
              className="card-header"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th> ลำดับที่ </th>
                        <th> โต๊ะที่</th>
                        <th> รายการที่สั่ง</th>
                        <th> จำนวน</th>
                        <th> เวลา</th>
                        <th> สถานะ </th>
                        <th> Action </th>
                        <th> Action </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                    {filterStock?.map((k, index) => {
                      return finishedCook(k, index);
                    })}
                  </table>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
};

export default KitchenComponent;
