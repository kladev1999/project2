import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TotalOrderService from "../../../services/TotalOrderService";
import { Container, Row, Col } from "react-grid-system";
import OrderMenuService from "../../../services/OrderMenuService";
import AuthService from "../../../services/Auth-service";
function ListTotalOrdermenuEmp() {
  const { compoSite, table_ID, totalOrder_ID, statusTable } = useParams();
  const navigate = useNavigate();
  const [totalOrder, setTotalOrder] = useState([]);
  const [list, setlist] = useState([]);
  const currentUser = AuthService.getCurrentUser();

  const [checkPay, setCheckPay] = useState([]);

  let TotalPrice = 0;

  if (list[0]?.totalOrder_ID.discount_ID === null) {
    TotalPrice = list?.reduce(
      (prev, cur) =>
        cur.status_ID.status_ID !== 4
          ? prev + cur.menu_ID.menu_Price * cur.orderMenu_Qty
          : prev + 0,
      0
    );
  } else {
    TotalPrice = list[0]?.totalOrder_ID.totalPrice;
  }

  const getListOrderMenu = useCallback(() => {
    TotalOrderService.getTotalListOrderById(compoSite, statusTable)
      .then((response) => {
        setlist(response.data);
        console.log("list = ", response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  }, []);

  const UpdateTotalPrice = (Price) => {
    TotalOrderService.updateTotalprice(Price, totalOrder_ID).then(
      (response) => {
        console.log("updateTotalPrice");
        console.log("totalprice = ", Price);
      }
    );
  }

  const getTotalOrder = () => {
    TotalOrderService.getTotalOrderById(compoSite)
      .then((respone) => {
        setTotalOrder(respone.data);
        console.log("Total Order = ", totalOrder);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const Back = () => {
    navigate("/TableOrderEmp");
  };

  useEffect(() => {
    getListOrderMenu();
    UpdateTotalPrice();
    getTotalOrder(compoSite);
  }, [compoSite, list.length]);

  useEffect(() => {
    const id = setInterval(getListOrderMenu, 1000);
    return () => {
      clearInterval(id);
    };
  }, [getListOrderMenu]);

  const checkStatus = () => {
    TotalOrderService.checkPay()
      .then((response) => {
        setCheckPay(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const status = (value) => {
    if (value.status_ID.status_ID === 3) {
      return (
        <td className="text-center" style={{ backgroundColor: "#A7D489" }}>
          {value.status_ID.status}
        </td>
      );
    } else if (value.status_ID.status_ID === 4) {
      return (
        <td className="text-center" style={{ backgroundColor: "#FF6961" }}>
          {value.status_ID.status}
        </td>
      );
    } 
    else if (value.status_ID.status_ID === 2) {
      return (
        <td className="text-center" style={{ backgroundColor: "#49dfff" }}>
          {value.status_ID.status}
        </td>
      );
    } 
    else if (value.status_ID.status_ID === 5) {
      return (
        <td className="text-center" style={{ backgroundColor: "#262f36",color: "white" }}>
          {value.status_ID.status}
        </td>
      );
    } 
    else {
      return (
        <td className="text-center" style={{ backgroundColor: "#ffc847" }}>
          {value.status_ID.status}
        </td>
      );
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const title = () => {
    if ((compoSite, table_ID)) {
      return (
        <h2 className="text-center"> รายการที่สั่งของโต๊ะที่ {table_ID} </h2>
      );
    } else {
      return (
        <div>
          <h2 className="text-center">รายการที่สั่งของโต๊ะที่ {table_ID}</h2>
        </div>
      );
    }
  };

  const ChechBNT = () => {
    if (list.length > 0) {
      return (
        <div>
          <button
            style={{ marginLeft: "5px" }}
            onClick={() => Back()}
            className="btn btn-outline-primary"
          >
            กลับ
          </button>
        </div>
      );
    } else {
      return;
    }
  };

  const timestamp = (data) => {
    let timestamp = data.split("T");
    let time = timestamp[1].split(".");
    let d = timestamp[0].split("-");
    let y = parseInt(d[0]) + 543;
    let day = d[2] + "/" + d[1] + "/" + y;

    return (
      <>
        วันที่ {day} เวลา {time[0]}
      </>
    );
  };
  let nameEmp = currentUser?.name_Emp
  let Action = nameEmp

  const waste = (orderMenu_ID,name) => {
    if (window.confirm(`${name} เป็นของเสีย!!`)) {
    OrderMenuService.Waste(orderMenu_ID).then(() => {

    });

    OrderMenuService.Cancel(orderMenu_ID, nameEmp)
    .then((response) => {})
    .catch((e) => {
      console.log(e);
    });
    
  }
}
  

  const cancel = (orderMenu_ID) => () => {
    if (window.confirm("คุณต้องการยกเลิกหรือไม่!!")) {
      OrderMenuService.cancelStatus(orderMenu_ID)
        .then((response) => {})
        .catch((e) => {
          console.log(e);
        });

      OrderMenuService.Cancel(orderMenu_ID, nameEmp)
        .then((response) => {})
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const finishedlStatus = (orderMenu_ID, name) => {
    console.log(name);
    if (window.confirm(`${name} เสร็จแล้ว!!`)) {
      OrderMenuService.finishedlStatus(orderMenu_ID)
        .then((response) => {})
        .catch((e) => {
          console.log(e);
        });

      OrderMenuService.Cancel(orderMenu_ID, nameEmp)
        .then((response) => {})
        .catch((e) => {
          console.log(e);
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
    } else if (status === 1) {
      return <>{name_Emp} กำลังทำ</>;
    } else if (status === 2) {
      return <>{name_Emp} พร้อมเสริฟ</>;
    } else if (status === 5) {
      return <>ของเสีย ({name_Emp})</>;
    }
  };

  const discount = () => {


    if(list.length == 0){
      return <>ราคารวม 0</>
    }
    if (list[list.length-1]?.totalOrder_ID.discount_ID === null) {
     return <>ราคารวม {Intl.NumberFormat().format(TotalPrice)}</>
    } else {
      return <>ราคารวม {Intl.NumberFormat().format(TotalPrice)} (ลด {list[0]?.totalOrder_ID?.discount_ID?.discount_Percent}% )</>
    }
  }
  
  return (
    <Container>
      {title()}

      <Container>
        <Row>
          <Col>
            {list.length === 0 ? (
              <div>
                <br></br>
                <h2 className="text-center" style={{ color: "red" }}>
                  ไม่มีการสั่งอาหาร
                </h2>
                <br></br>
              </div>
            ) : (
              <table className="table table-sm table-hover">
                <thead>
                  <tr>
                    <th className="text-center"> ลำดับที่ </th>
                    <th className="text-center"> โต๊ะที่สั่ง </th>
                    <th className="text-center"> สถานะ </th>
                    <th className="text-center"> เวลาที่สั่ง </th>
                    <th className="text-center"> เมนูที่สั่ง </th>
                    <th className="text-center"> จำนวน </th>
                    <th className="text-center"> ราคา </th>
                    <th className="text-center"> พนักงานที่รับ </th>
                    <th className="text-center"> จัดการ </th>
                    <th className="text-center"> Action </th>
                  </tr>
                </thead>

                <tbody>
                  {list?.map((d, index) => {
                    return (
                      <tr>
                        <th className="text-center">{index + 1}</th>
                        <td className="text-center">
                          {d.totalOrder_ID.table_ID.table_Zone}
                        </td>
                        {/* <td className="text-center">{d.status_ID.status}</td> */}
                        {status(d)}

                        <td className="text-center">
                          {timestamp(d.orderMenu_TimeStamp)}
                        </td>
                        <td className="text-center">{d.menu_ID.menu_Name}</td>
                        <td className="text-center">{d.orderMenu_Qty}</td>
                        <td className="text-center">
                          {d.menu_ID.menu_Price * d.orderMenu_Qty}
                        </td>
                        <td className="text-center">{d.id.name_Emp}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-success"
                            disabled={
                              d.status_ID.status_ID === 4 ||
                              d.status_ID.status_ID === 3 ||
                              d.status_ID.status_ID === 5
                            }
                            onClick={() =>
                              finishedlStatus(
                                d.orderMenu_ID,
                                d.menu_ID.menu_Name
                              )
                            }
                          >
                            {" "}
                            เสริฟแล้ว
                          </button>
                          <button
                            type="button"
                            style={{ marginLeft: "5px" }}
                            class="btn btn-dark"
                            disabled={
                              d.status_ID.status_ID === 4 ||
                              d.status_ID.status_ID === 3 ||
                              d.status_ID.status_ID === 5
                            }
                            onClick={() => waste(d.orderMenu_ID,d.menu_ID.menu_Name)}
                            // onClick={waste(d.orderMenu_ID,d.menu_ID.menu_Name)}
                          >
                            {" "}
                            ของเสีย{" "}
                          </button>
                          <button
                            type="button"
                            style={{ marginLeft: "5px" }}
                            class="btn btn-danger"
                            disabled={
                              d.status_ID.status_ID === 4 ||
                              d.status_ID.status_ID === 3 ||
                              d.status_ID.status_ID === 5
                            }
                            onClick={cancel(d.orderMenu_ID)}
                          >
                            {" "}
                            ยกเลิก{" "}
                          </button>
                        </td>
                        <td>{CancelEmp(d.cencel, d.status_ID.status_ID)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            <h2 className="text-end">
              {UpdateTotalPrice(TotalPrice)}
              {discount()}
            </h2>
            {ChechBNT()}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ListTotalOrdermenuEmp;
