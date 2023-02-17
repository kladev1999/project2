import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TotalOrderService from "../../services/TotalOrderService";
import OrderMenuService from "../../services/OrderMenuService";
import { Button, Spinner } from 'react-bootstrap';
import AuthService from "../../services/Auth-service";
import { useParams, Link } from "react-router-dom";
import MenuService from "../../services/MenuService";
import "./stly/User.css";
import { Container, Row, Col } from "reactstrap";


function OrderMenuAdmin() {

    let pic = "http://localhost:8080/menu/getimages/";
    const { totalOrder_ID, table_ID, compoSite } = useParams();
    const [menuList, setMenuList] = useState([]);
    const [search, searchInput] = useState("");
    const [searchName, setsearchName] = useState("");
    const navigate = useNavigate();
    const [typeMenu_ID, setTypeMenu_ID] = useState([]);
    const [M_tatol, setM_tatol] = useState([]);
    const [totalOrder, setTotalOrder] = useState([]);
    const [BaseSeller, setBaseSeller] = useState();
    const [searchmenu, setSearchMenu] = useState();
  
    const [isLoading, setIsLoading] = useState(false);
    const currentUser = AuthService.getCurrentUser();
    const [order, setOrder] = useState(M_tatol);
    const [ordercat, setOrdercat] = useState();
    const [typeMenu, setTypeMenu] = useState([]);
  
    console.log("search", search);
  
    const getMenuType = () => {
      MenuService.getMenuType()
        .then((response) => {
          setTypeMenu(response.data);
          setTypeMenu_ID(response.data[0].typeMenu_ID);
          console.log("type", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const getBaseseller = () => {
      OrderMenuService.bestseller()
        .then((respone) => {
          console.log("bestseller = ", respone.data);
          setBaseSeller(respone.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const getTotalOrder = (totalOrder_ID) => {
      TotalOrderService.getTotalOrderById(totalOrder_ID)
        .then((response) => {
          setTotalOrder(response.data);
          console.log("GetTotal Order = ", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const getAllMenu = () => {
      MenuService.getMenu()
        .then((response) => {
          setMenuList(response.data);
          console.log("menulist", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    useEffect(() => {
      getBaseseller();
      getAllMenu();
      getMenuType();
      getTotalOrder();
  
      console.log();
    }, []);
  
    const filterMenu = menuList.filter((menuList) => {
      if(search.length>0){
  
        return (
          menuList.typeMenu_ID.typeMenu_Name
          .toLowerCase()
          .includes(search.toLowerCase())
        );
      }else if(searchName.length>2){
        return (
          menuList.menu_Name
          .toLowerCase()
          .includes(searchName.toLowerCase())
        );
      }else{
        return (
          menuList.typeMenu_ID.typeMenu_Name
          .toLowerCase()
          .includes(search.toLowerCase())
        );
      }
    });
  
    const addToCart = (menu_ID, menu_Name, menu_Price, totalOrder_ID) => {
      let menu = [...M_tatol];
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
        setM_tatol(output);
      });
    };
    const popToCart = (menu_ID, menu_Name, menu_Price,menu_Qty, totalOrder_ID,index) => {
      console.log("menuQTY == ",menu_Qty)
      if(menu_Qty === 1){
        deleteMenu(index, menu_Qty);
    }else{
      let menu = [...M_tatol];
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
        setM_tatol(output);
      });
    };
  
    const title = () => {
      if (totalOrder) {
        return (
          <>
            <h3 className="text-center" style={{ margin: "5%" }}>
              โต๊ะที่ 
            </h3>
            <h4 className="text-center">เมนูขายดีและเมนูแนะนำ</h4>
          </>
        );
      } else {
        return <h3 className="text-center">รายการทั้งหมด</h3>;
      }
    }
    };
  
    useEffect(() => {
      text();
    }, [M_tatol]);
    const text = () => {
      let menuID = [];
      let menu_Qty = [];
      let menu_Price = [];
      let menu_Price_unit = [];
      M_tatol.forEach((element) => {
        menuID.push(element.menu_ID);
        menu_Qty.push(element.menu_Qty);
        menu_Price.push(element.menu_Price);
        menu_Price_unit.push(element.menu_Price_unit);
      });
      setmenu_Price(menu_Price);
      setOrderMenu_Qty(menu_Qty);
      setMenu_ID(menuID);
    }
    //const [OrderMenus, setOrderMenus] = useState([]);
    const [orderMenu_Qty, setOrderMenu_Qty] = useState([]);
    const [menu_ID, setMenu_ID] = useState([]);
    const [menu_Price, setmenu_Price] = useState([]);
  
    console.log(menu_ID)
  
    let TotalPrice = M_tatol?.reduce((prev, cur) => prev + cur.menu_Price, 0);
  
  
    console.log(order)
  
    const saveOrderMenu = (menu_ID, orderMenu_Qty, menu_Price) => {
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
        },
        cencel: ''
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
  
            saveOrderMenu(menu_ID[i], orderMenu_Qty[i], menu_Price[i]);
  
            console.log("order55555",order)
  
          }
  
          saveTotalPrice(TotalPrice, totalOrder_ID);
  
  
            navigate("/ListTotalOrderMenu/" + compoSite + "/" + totalOrder_ID+"/"+"0");
  
        }
        setIsLoading(false)
      }, 500)
  
    };
  
    const [count, setCount] = useState(0);
  
  
      
    const deleteMenu = (index, menu_Qty) => {
  
      if (menu_Qty[index] > 1) {
        console.log("Qty = ", order.menu_Qty)
      }
  
      M_tatol.splice(index, 1)
      menu_ID.splice(index, 1)
      setM_tatol([...M_tatol])
      console.log("order delete  = ", M_tatol)
      console.log("menu_ID delete = ", menu_ID)
    }
  
    const deleteMenuAll = () => {
  
      if (menu_ID.length === 0) {
        window.alert("ไม่มีการสั่งเมนู!!")
      } else {
  
        if (window.confirm("ลบเมนูทั้งหมดหรือไม่!!")) {
          M_tatol.splice(M_tatol[0], M_tatol.length)
          menu_ID.splice(0, menu_ID.length)
          setM_tatol([...M_tatol])
          console.log("order  = ", M_tatol)
          console.log("menu_ID  = ", menu_ID)
        }
  
      }
    }
    const title = () => {
      if (totalOrder) {
        return (
          <>
            <h3 className="text-center" style={{ margin: "5%" }}>
              โต๊ะที่ {table_ID}
            </h3>
            <h4 className="text-center">เมนูขายดีและเมนูแนะนำ</h4>
          </>
        );
      } else {
        return <h3 className="text-center">รายการทั้งหมด</h3>;
      }
    };
  
  
  console.log(count)
  
    
    const check = () => {
      if (!totalOrder_ID) {
        return <div>รายการเมนู</div>
      }
    }
  
    
  
    return (
     <>
       <section>
        <Container>
  
          <Row>
            <Col lg="12">
              <div className="row">
                <div className="col-9">
                  {
                    check()
                  }
                  {M_tatol.length === 0 ? (
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
                              {M_tatol?.map((i, index) => {
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
                                    addToCart(
                                        i.menu_ID,
                                        i.menu_Name,
                                        i.menu_Price_unit,
                                        totalOrder_ID
                                      )
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
                    disabled={M_tatol.length === 0}
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
                    disabled={M_tatol.length === 0}
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
      <section>
        {title()}
        <Container>
          <Row>
            <span class="border border-success">
              <div className="container">
                <div className="row">
                  {BaseSeller?.map((keyName, i) => {
                    return (
                      <>
                      <div className="col-2" style={{ margin: "10px" }}>
                      <p className="text-center">อันดับที่ {i+1}</p>
                        <h3
                          className="text-center"
                          width="180"
                          style={{ margin: "10px" }}
                        >
                          <img
                            src={pic + keyName[2]}
                            alt="img"
                            width="60"
                            height="60"
                            className="rounded-circle"
                          />
                        </h3>
                        <p className="text-center">{keyName[1]}</p>
                      </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </span>
            <Col lg="12">
              <div className="text-center col-12">
                <div className="col-12">
                  {menuList.length === 0 ? (
                    <div>
                      <br></br>
                      <h2 className="text-center" style={{ color: "red" }}>
                        ไม่มีการสั่งอาหาร
                      </h2>
                    </div>
                  ) : (
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <div className="form-group mb-2">
                          <h5
                            className="text-start"
                            style={{ marginLeft: "10px" }}
                          >
                            ค้นหาประเภทอาหาร
                          </h5>
                          <select
                            className="custom-select"
                            style={{ width: "150px", marginLeft: "10px" }}
                            id="typeMenu_ID"
                            name="typeMenu_ID"
                            onChange={(e) => searchInput(e.target.value)}
                          >
                            <option value="">ประเภทเมนู</option>
                            {typeMenu.map((typeMenu, index) => (
                              <option key={index} value={typeMenu.typeMenu_Name}>
                                {typeMenu.typeMenu_Name}
                              </option>
                            ))}
                          </select>
  
                          <input
                            style={{ marginLeft: "10px" }}
                            placeholder="ค้นหาอาหาร"
                            value={searchName}
                            onChange={(e) => setsearchName(e.target.value)}
                          ></input>
                        </div>
  
                        <Row lg="12" md="4" sm="2" xs="8">
                          {filterMenu.map((menus, index) => (
                            <div className="product__item">
                              <div className="product__img">
                                <img
                                   onClick={() =>
                                      addToCart(
                                        menus.menu_ID,
                                        menus.menu_Name,
                                        menus.menu_Price,
                                        totalOrder_ID
                                      )
                                    }
                                  src={pic + menus.menu_Pic}
                                  alt="product-img"
                                  width="150"
                                  height="135"
                                />
                              </div>
                              <div className="product__content">
                                <h5>
                                    {menus.menu_Name}
                                </h5>
                                <p>{menus.typeMenu_ID.typeMenu_Name}</p>
                                <div className=" d-flex align-items-center justify-content-between ">
                                  <span className="product__price">
                                    ราคา {menus.menu_Price} บาท
                                  </span>
                                  <button
                                    className="addTOCart__btn"
                                    onClick={() =>
                                      addToCart(
                                        menus.menu_ID,
                                        menus.menu_Name,
                                        menus.menu_Price,
                                        totalOrder_ID
                                      )
                                    }
                                  >
                                    Add
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Row>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
  
     </>
    );
  }

export default OrderMenuAdmin