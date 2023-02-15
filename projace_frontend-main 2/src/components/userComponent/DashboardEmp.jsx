import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MenuService from "../../services/MenuService";
import "./stly/User.css";
import { Container, Row, Col } from "reactstrap";
import CartEmp from "./CartEmp";
import OrderMenuService from "../../services/OrderMenuService";
import TotalOrderService from "../../services/TotalOrderService";

const DashboardEmp = (props) => {
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

  //const [orderMenu, setOrderMenu] = useState([]);

  const [typeMenu, setTypeMenu] = useState([]);

  // const [orderMenuQty, setOrderMenuQty] = useState([]);
  // const [employee_ID, setEmployee] = useState(1);

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
    getTotalOrder(totalOrder_ID);

    console.log();
  }, [totalOrder_ID]);

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

  return (
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
                                <Link to={`/viewMenu/` + menus.menu_ID}>
                                  {menus.menu_Name}
                                </Link>
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
  );
};

export default DashboardEmp;
