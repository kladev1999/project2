import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import TotalOrderService from "../../services/TotalOrderService";
import OrderMenuService from "../../services/OrderMenuService";
import { useEffect, useState } from "react";
import { Button, Spinner } from 'react-bootstrap';
import AuthService from "../../services/Auth-service";
const Cart = ({ M_tatol }) => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = AuthService.getCurrentUser();
  const [order, setOrder] = useState(M_tatol);

  console.log(currentUser)

  useEffect(() => {
    let menuID = [];
    let totalOrderID = [];
    let menu_Qty = [];
    let menu_Price = [];
    let menu_Price_unit = [];
    setOrder(M_tatol)
    M_tatol.forEach((element) => {
      menuID.push(element.menu_ID);
      totalOrderID.push(element.totalOrder_ID);
      menu_Qty.push(element.menu_Qty);
      menu_Price.push(element.menu_Price);
      menu_Price_unit.push(element.menu_Price_unit);
    });
    setmenu_Price(menu_Price);
    setOrderMenu_Qty(menu_Qty);
    setMenu_ID(menuID);
    setTotalOrder_ID(totalOrderID);
  }, [M_tatol]);

  //const [OrderMenus, setOrderMenus] = useState([]);
  const [orderMenu_Qty, setOrderMenu_Qty] = useState([]);
  //const [orderMenu_Status, setOrderMenu_Status] = useState("Tokyo Drift");
  //   const [id, setid] = useState(1);
  const [menu_ID, setMenu_ID] = useState([]);
  const [menu_Price, setmenu_Price] = useState([]);
  const [totalOrder_ID, setTotalOrder_ID] = useState([]);

  let TotalPrice = order?.reduce((prev, cur) => prev + cur.menu_Price, 0);


  const saveOrderMenu = (menu_ID, orderMenu_Qty, menu_Price, totalOrder_ID) => {
    const OrderMenu = {
      orderMenu_Qty: orderMenu_Qty,
      menu_ID: {
        menu_ID,
        menu_Price,
      },
      id: {
        id: currentUser.id,
      },
      totalOrder_ID: {
        totalOrder_ID,
      },
      status_ID: {
        status_ID: 0,
      }
    };
    console.log("Or = ", OrderMenu);
    OrderMenuService.addOrderMenu(OrderMenu)
      .then((response) => {
        console.log("Response = ", response.data);
      })
      .catch((e) => {
        console.log("e = ", e);
      });
  };

  const saveTotalPrice = (totalPrice, totalOrder_ID) => {
    TotalOrderService.totalPrice(totalPrice, totalOrder_ID)
      .then((respone) => {
        console.log(respone.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addOrderMenu = (e) => {

    setIsLoading(true)

    setTimeout(() => {


      e.preventDefault();

      if (menu_ID.length === 0) {
        window.alert("ไม่มีการสั่งเมนู!!")
      } else {
        for (let i = 0; i < menu_ID.length; i++) {
          saveOrderMenu(menu_ID[i], orderMenu_Qty[i], menu_Price[i], totalOrder_ID[i]);
        }

        console.log("TT", totalOrder_ID);
        console.log(menu_ID);

        saveTotalPrice(TotalPrice, totalOrder_ID[0]);


          navigate("/ListTotalOrderMenu/" + M_tatol[0].compoSite + "/" + totalOrder_ID[0]+"/"+"0");

      }
      setIsLoading(false)
    }, 500)

  };


  const deleteMenu = (index, menu_Qty) => {


    if (menu_Qty[index] > 1) {
      console.log("Qty = ", order.menu_Qty)
    }

    M_tatol.splice(index, 1)
    menu_ID.splice(index, 1)
    setOrder([...M_tatol])
    console.log("order delete  = ", order)
    console.log("menu_ID delete = ", menu_ID)

  }

  const deleteMenuAll = () => {

    if (menu_ID.length === 0) {
      window.alert("ไม่มีการสั่งเมนู!!")
    } else {

      if (window.confirm("ลบเมนูทั้งหมดหรือไม่!!")) {
        order.splice(order[0], order.length)
        menu_ID.splice(0, menu_ID.length)
        setOrder([...order])
        console.log("order  = ", order)
        console.log("menu_ID  = ", menu_ID)
      }

    }

  }

  const check = () => {
    if (!totalOrder_ID) {
      return <div>รายการเมนู</div>
    }
  }

  return (
    <section>
      <Container>

        <Row>
          <Col lg="12">
            <div className="row">
              <div className="col-9">
                {
                  check()
                }
                {order.length === 0 ? (
                  <div>
                    <br></br>
                    <h2 className="text-center" style={{ color: "red" }}>ไม่มีการสั่งอาหาร</h2>
                  </div>
                ) : (
                  <div
                    className="card overflow-auto"
                    style={{ width: "140%", height: "250px" }}
                  >
                    <div
                      className="card-header"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <h5 className="text-center">รายการสั่งอาหาร</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr>
                              <th>ลำดับที่</th>
                              <th>ชื่อ</th>
                              <th>ราคา</th>
                              <th>จำนวน</th>
                              <th>ราคารวม</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order?.map((i, index) => {
                              return (
                                <tr>
                                  <td
                                    scope="row"
                                    key={index}
                                    className="text-center"
                                  >
                                    {index + 1}
                                  </td>
                                  <td className="text-center">{i.menu_Name}</td>
                                  <td className="text-center">{i.menu_Price_unit}</td>
                                  <td className="text-center"
                                  >{i.menu_Qty}
                                  </td>
                                  <td className="text-center">
                                    {Intl.NumberFormat().format(i.menu_Price)}
                                  </td>
                                  <td className="text-center cart__item-del">
                                    <button className="btn btn-danger" onClick={() => {
                                      deleteMenu(index, i.menu_Qty);
                                    }}>ลบ</button>
                                  </td>

                                </tr>

                              );
                            })}
                          </tbody>
                        </table>
                      </li>
                    </ul>
                  </div>
                )}
              </div>


            </div>

            <div className="mt-4">
              <h3>
                รวม:
                <span className="cart__subtotal"> {Intl.NumberFormat().format(TotalPrice)} บาท.</span>
              </h3>
              <div className="cart__page-btn">
                <button
                  className="btn btn-outline-success"
                  disabled={order.length === 0}
                  onClick={(e) => {
                    addOrderMenu(e);
                  }}
                >
                  {isLoading ? 'Loading...' : 'Confirm'}
                  {isLoading && <Spinner animation="border" size="sm" />}
                </button>
                <span>&nbsp;&nbsp;</span>
                <button
                  className="btn btn-outline-danger"
                  disabled={order.length === 0}
                  onClick={() => {
                    deleteMenuAll();
                  }}
                >
                  {/* <Link to="/checkout">confirm</Link> */}
                  ลบทั้งหมด
                </button>
                {

                }

              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Cart;
