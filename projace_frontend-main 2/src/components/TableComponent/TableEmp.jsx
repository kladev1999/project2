import React, { useState, useEffect } from "react";
import TableService from "../../services/TableService";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import TotalOrderService from "../../services/TotalOrderService";
import AuthService from "../../services/Auth-service";
import DatePicker from "react-datepicker";

function TableEmp() {
  const [table, setTabel] = useState([]);
  const [table_Zone, setTabel_Zone] = useState([]);
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
  const tableZone = {
    table_Zone
  }

  const [totalOrder_ID, setTotalOrder_ID] = useState();
  let value = 0;
  const [totalOrder_Status, setTotalOrder_Status] = useState(0);
  const [totalPrice, settotalPrice] = useState(0);

  const [totalOrder, setTotalOrder] = useState([]);
  const [totalTab, setTotalTab] = useState([]);

  


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
        console.log(response.data)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getAllTebles = () => {
    TableService.getTable()
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
    navigate("/CreateTableEmp");
  };

  useEffect(() => {
    getAllTebles();
    getTotalOrder();
    findTable();
  }, [table.length,table]);

  useEffect(() => {
    console.log("=======2 ", totalTab);
  }, [totalTab]);

  const updateTable = (table_ID) => {

    navigate("/UpdateTableEmp/"+table_ID)
    
  }
  

  const checkInTable = (e, table_Zone,table_ID) => {
    e.preventDefault();
    const totalOrderState = {
      totalPrice,
      totalOrder_Status,
      id: {
        id: currentUser.id,
      },
      compoSite: table_Zone,
      table_ID: {
        table_ID,
      },
    };

    TotalOrderService.addTotalOrder(totalOrderState)
      .then((response) => {
          console.log(response.data);
          navigate("/TableOrderEmp");
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

  const disableButton = (table_ID) => {

    let C
    // const check = totalOrder.find((item) => {
    //   return item.table_ID.table_ID === table_ID;
    // });

    // const checkStatus = totalOrder.find((item) => {
    //   return item.totalOrder_ID;
    // });

    totalOrder.map((t) => {

      if(t.totalOrder_Status === "1"){
        console.log("1",t.table_ID.table_ID)
      }else{
        console.log("0",t.table_ID.table_ID)

      }


      if(table_ID === t.table_ID.table_ID && t.totalOrder_Status !== "1") {
        C = true;
      }
    })




    // if (check && t.totalOrder_Status) {
    //   return true;
    // } else {
    //   return false;
    // }
    return C

  };

  const deleteTable = (params) => {
    if(window.confirm('Are you sure you want to delete')){
      TableService.deleteTable(params).then(() => {
        getAllTebles();
      })
    }
  }
  

  const disableButtonNotOpentable = (Tab) => {
    const check = totalOrder.find((item) => {
      return item.totalOrder_TimeStamp === Tab;
    });

    if (check) {
      return true;
    } else {
      return false;
    }
  };

  const saveTable = () => {
    TableService.addTable(table).then((response) => {
    }).catch(error => {
      console.log(error)
    });
  };

  return (
    <Container>
      <Row>
      <h3 className="text-center">โต๊ะ</h3>
        <Row lg="6" md="6" sm="6" xs="12">
          <div className="search__widget d-flex align-items-center justify-content-between ">
            <span>
              <i class="ri-search-line"></i>
            </span>
          </div>
        </Row>
        <p className="col-md-12"></p>
        <div className="text-center">
          <button
            className="btn btn-primary mr-2 "
            style={{ marginTop: 10 }}
            onClick={AddTable}
          >
            {" "}
            เพิ่มโต๊ะ
          </button>
        </div>


        {table?.sort((a, b) => a.table_Zone - b.table_Zone).map((t,index) => {
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
                    <h2>โต๊ะ {t.table_Zone}</h2>
                  </h5>
                  <div className="text-center">
                    <button
                      className="btn btn-primary"
                      disabled={disableButton(t.table_ID)}
                      onClick={(e) => checkInTable(e, t.table_Zone,t.table_ID)}
                    >
                      {" "}
                      เปิดโต๊ะ
                    </button>
                    {" "}
                    <button
                      className="btn btn-warning"
                      onClick={() => updateTable(t.table_ID)}
                    >
                      {" "}
                      แก้ไข
                    </button>
                    {" "}
                    <button
                      className="btn btn-danger"
                      disabled={disableButton(t.table_ID)}
                      onClick={(e) => deleteTable(t.table_ID)}
                    >
                      {" "}
                      ลบ
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

export default TableEmp;
