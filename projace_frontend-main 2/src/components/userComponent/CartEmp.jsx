import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import TotalOrderService from "../../services/TotalOrderService";
import OrderMenuService from "../../services/OrderMenuService";
import { useEffect, useState } from "react";
import { Button, Spinner } from 'react-bootstrap';
import AuthService from "../../services/Auth-service";
const CartEmp = ({ M_tatol }) => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = AuthService.getCurrentUser();
  const [order, setOrder] = useState(M_tatol);
  const [ordercat, setOrdercat] = useState();
  console.log(currentUser)

  useEffect(() => {
    text();
  }, [M_tatol]);
  
  let t = 0;

  const text = () => {
    let menuID = [];
    let totalOrderID = [];
    let compoSite = [];
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
      compoSite.push(element.compoSite)
    });
    setmenu_Price(menu_Price);
    setOrderMenu_Qty(menu_Qty);
    setMenu_ID(menuID);
    setTotalOrder_ID(totalOrderID);
    setcompoSite(compoSite)
  }
  


  //const [OrderMenus, setOrderMenus] = useState([]);
  const [orderMenu_Qty, setOrderMenu_Qty] = useState([]);
  const [menu_ID, setMenu_ID] = useState([]);
  const [menu_Price, setmenu_Price] = useState([]);
  const [compoSite, setcompoSite] = useState([]);
  const [totalOrder_ID, setTotalOrder_ID] = useState([]);

  let TotalPrice = order?.reduce((prev, cur) => prev + cur.menu_Price, 0);


  console.log(order)

  const saveOrderMenu = (menu_ID, orderMenu_Qty, menu_Price, totalOrder_ID) => {
    const OrderMenu = {
      orderMenu_Qty: orderMenu_Qty ,
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

          console.log("order",order)

        }

        saveTotalPrice(TotalPrice, totalOrder_ID[0]);


          navigate("/ListTotalOrderMenuEmp/" + M_tatol[0].compoSite + "/" + totalOrder_ID[0]+"/"+"0");

      }
      setIsLoading(false)
    }, 500)

  };

  const [count, setCount] = useState(0);

    const addToCart = (menu_ID, menu_Name, menu_Price) => {
        let menu = [...order];
        menu.push({
          menu_ID: menu_ID,
          menu_Name: menu_Name,
          menu_Price: menu_Price,
          menu_Price_unit: menu_Price,
          menu_Qty: 1,
          totalOrder_ID: totalOrder_ID,
          compoSite: compoSite,
        });
    
        function groupBy(arr, property) {
          return arr.reduce(function (memo, x) {
            if (!memo[x[property]]) {
              memo[x[property]] = [];
            }
            memo[x[property]].push(x);
            return memo;
          }, {});
        }
        const grouped = groupBy(menu, "menu_ID");
        const keys = Object.keys(grouped);
        var output = [];

    
        keys.forEach((key) => {
          //merge using reduce
          const out = grouped[key].reduce((acc, current) => {
            return {
              menu_ID: menu_ID,
              menu_Name: menu_Name,
              menu_Price: acc.menu_Price + current.menu_Price,
              menu_Price_unit: menu_Price,
              menu_Qty: acc.menu_Qty + current.menu_Qty,
              totalOrder_ID: totalOrder_ID,
              compoSite: compoSite,
            };
          });
          output.push(out);
          setOrder(output)

        });
      };
    const popToCart = (menu_ID, menu_Name, menu_Price,menu_Qty,index) => {
        console.log("menu_Qty",menu_Qty)
        if(menu_Qty === 1){
            deleteMenu(index, menu_Qty);
        }else{
        let menu = [...order];
        menu.push({
          menu_ID: menu_ID,
          menu_Name: menu_Name,
          menu_Price: menu_Price,
          menu_Price_unit: menu_Price,
          menu_Qty: 1,
          totalOrder_ID: totalOrder_ID,
          compoSite: compoSite,
        });
    
        function groupBy(arr, property) {
          return arr.reduce(function (memo, x) {
            if (!memo[x[property]]) {
              memo[x[property]] = [];
            }
            memo[x[property]].push(x);
            return memo;
          }, {});
        }
        const grouped = groupBy(menu, "menu_ID");
        const keys = Object.keys(grouped);
        var output = [];

    
        keys.forEach((key) => {
          //merge using reduce
          const out = grouped[key].reduce((acc, current) => {
            return {
                menu_ID: menu_ID,
                menu_Name: menu_Name,
                menu_Price: acc.menu_Price - current.menu_Price,
                menu_Price_unit: menu_Price,
                menu_Qty: acc.menu_Qty - current.menu_Qty,
                totalOrder_ID: totalOrder_ID,
                compoSite: compoSite,
            };
          });
          output.push(out);
          setOrder(output);

        });
    }
      };
    

  const deleteMenu = (index, menu_Qty) => {

    if (menu_Qty[index] > 1) {
      console.log("Qty = ", order.menu_Qty)
    }

    order.splice(index, 1)
    menu_ID.splice(index, 1)
    setOrder([...order])
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



console.log(count)

  
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
                                  >
                                  <button className="btn btn-success" style={{marginRight: "5px"}} onClick={() => {
                                   setCount(count + 1)
                                    }}>+</button>
                                  {i.menu_Qty}
                                  <button className="btn btn-danger" style={{marginLeft: "5px"}}onClick={() => {
                                    popToCart(i.menu_ID,i.menu_Name,i.menu_Price_unit,i.menu_Qty,index)
                                    }}>-</button>
                                  </td>
                                  <td className="text-center">
                                    {Intl.NumberFormat().format(i.menu_Price)}
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

            <div className="text-center" style={{marginTop: "10px"}}>
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
                  {isLoading ? 'Loading...' : 'สั่งเมนู'}
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
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default CartEmp;
