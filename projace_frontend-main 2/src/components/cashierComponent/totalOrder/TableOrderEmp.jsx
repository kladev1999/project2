import React from "react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-grid-system";
import TotalOrderService from "../../../services/TotalOrderService";
import { Button, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import TableService from "../../../services/TableService";
import OrderMenuService from "../../../services/OrderMenuService";
import DisPromotionService from "../../../services/DisPromotionService";
import "react-datepicker/dist/react-datepicker.css";
import AuthService from "../../../services/Auth-service";
import DatePicker from "react-datepicker";
const TableOrderEmp = () => {
  const [totalOrder, setTotalOrder] = useState([]);
  const compo = [];
  let count = 0;
  const currentUser = AuthService.getCurrentUser();
  const [getMoveTable, SetGetMoveTable] = useState();
  const [search, searchInput] = useState("");
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [showMytable, setShowMytable] = useState("0");
  const [showpay, setShowpay] = useState(null);
  const [showpro, setShowpro] = useState(null);
  const [showMove, setShowMove] = useState(null);
  const [showMix, setShowMix] = useState(null);
  const [showEMix, setShowEditMix] = useState(null);
  const handleClose = () => setShow(false);
  const handleClosepro = () => setShowpro(false);
  const handleCloseEditMix = () => setShowEditMix(false);
  const handleClosepay = () => setShowpay(false);
  const handleCloseMove = () => setShowMove(false);
  const handleCloseMix = () => setShowMix(false);

  const handleShow = (item) => setShow(item);
  const handleShowModeTable = (item) => setShowMove(item);
  const handleShowMixTable = (item) => setShowMix(item);
  const handleShowEditMixTable = (item) => setShowEditMix(item);
  const handleShowpay = (item) => setShowpay(item);
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

  console.log(day);

  let pic = "http://localhost:8080/menu/getimagesPay/";

  console.log("mytable = ",showMytable)

  useEffect(() => {
    if(showMytable === "0"){
      getMytable();
    }else{
      getAllTotalOrder();
    }
    GetMoveTable();
  }, [date,showMytable]);

  const getMytable = () => {
    TotalOrderService.getMytable(currentUser.id,dateData).then((response) =>{
      setTotalOrder(response.data);
    })
  }

  const getAllTotalOrder = () => {
    TotalOrderService.getDate(dateData)
      .then((response) => {
        setTotalOrder(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  totalOrder?.forEach((e) => {
    if (e.totalOrder_Status == "0") {
      compo.push(e.compoSite);
    }
  });

  const GetMoveTable = () => {
    TableService.getMoveTable().then((respone) => {
      SetGetMoveTable(respone.data);
      console.log(respone.data);
    });
  };

  const deleteTotalOrder = (totalOrder_ID) => {
    TotalOrderService.deleteTotalOrder(totalOrder_ID)
      .then(() => {
        setShow(false);
        getAllTotalOrder();
        GetMoveTable();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Movetable = (pointTable, totalOrder_ID) => {
    if (pointTable == null) {
      window.alert("กรุณาเลือกโต๊ะที่ต้องการย้าย!!");
    } else {
      TableService.MoveTable(pointTable, totalOrder_ID).then(() => {});
      OrderMenuService.mergeTable(totalOrder_ID, pointTable).then(() => {
        setShowMove(false);
        getAllTotalOrder();
        GetMoveTable();
      });
    }
  };

  const viewTotalOrder = (compoSite, totalOrder_ID, statusTable) => {
    navigate(
      "/ListTotalOrderMenuEmp/" +
        compoSite +
        "/" +
        totalOrder_ID +
        "/" +
        statusTable
    );
  };

  const OrderMenu = (totalOrder_ID, table_ID, compoSite) => {
    // navigate("/DashboardUser/" + totalOrder_ID+ "/" + table_ID);
    navigate(
      "/OrderMenuEmp/" + totalOrder_ID + "/" + table_ID + "/" + compoSite
    );
  };

  const filterTotalOrder = totalOrder.filter((totalOrder) => {
    return totalOrder.table_ID.table_Zone
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  const color = (val) => {
    let color;
    if (val === "0") {
      return (color = "#FF6961");
    } else {
      return (color = "#A7D489");
    }
  };
  const statusTotalOrder = (value) => {
    if (value.totalOrder_image !== null && value.totalOrder_Status === "0") {
      return (
        <p className="text-center" style={{ backgroundColor: "#ffc847" }}>
          รออนุมัติ
        </p>
      );
    } else if (value.totalOrder_Status === "0") {
      return (
        <p
          className="text-center"
          style={{ backgroundColor: color(value.totalOrder_Status) }}
        >
          ยังไม่ชำระเงิน
        </p>
      );
    } else {
      return (
        <p
          className="text-center"
          style={{ backgroundColor: color(value.totalOrder_Status) }}
        >
          ชำระเงินแล้ว
        </p>
      );
    }
  };

  const editMixtable = (value) => {
    if (value.table_ID.table_Zone != value.compoSite) {
      return (
        <button
          style={{ marginLeft: "3px" }}
          onClick={() => handleShowEditMixTable(value)}
          disabled={value.totalOrder_Status === "1"}
          className="btn btn-warning"
        >
          แก้ไขรวมโต๊ะ
        </button>
      );
    } else {
      return (
        <button
          style={{ marginLeft: "3px" }}
          onClick={() => handleShowMixTable(value)}
          disabled={
            DisBTNmixTable(value.compoSite, value.totalOrder_Status) ||
            value.totalOrder_Status === "1" || value.discount_ID !== null
          }
          className="btn btn-info"
        >
          รวมโต๊ะ
        </button>
      );
    }
  };

  const DeleteTable = ({ data }) => {
    return (
      <>
        <Modal show={data ? true : false} onHide={handleClose} size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <p></p>
          <p></p>
          <Modal.Header closeButton>
            <Modal.Title>ต้องการลบหรือไม่!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ต้องการลบข้อมูลโต๊ะที่ {data?.table_ID?.table_ID} หรือไม่!
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              ไม่
            </Button>
            <Button
              variant="btn btn-danger"
              onClick={() => deleteTotalOrder(data.totalOrder_ID)}
            >
              ลบ
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  const Promotion = ({ data }) => {
    const [Discount, setDiscount] = useState();
    const [discount_ID, setdiscount_ID] = useState(null);

    const UpdateDiscount = (params) => {};

    const Checkbill = (discount_ID, compoSite, disCount) => {
      TotalOrderService.Update_Discount(discount_ID, compoSite).then(
        (response) => {}
      );

      navigate("/Checkbill/" + compoSite + "/" + disCount);
    };
    const GetDiscount = () => {
      DisPromotionService.getDisPromotion().then((respone) => {
        setDiscount(respone.data);
        console.log(respone.data);
      });
    };
    useEffect(() => {
      GetDiscount();
    }, []);

    return (
      <>
        <Modal show={data ? true : false} onHide={handleClosepro} size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>
          <p></p>
          <p></p>
          <Modal.Header closeButton>
            <Modal.Title>
              ส่วนลดของโต๊ที่ {data?.table_ID?.table_ID}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Discount?.map((D) => {
              return (
                <fieldset>
                  <div>
                    <input
                      type="radio"
                      id="louie"
                      name="discount"
                      value={D.discount_ID}
                      onClick={() => setdiscount_ID(D.discount_ID)}
                    />
                    <label>
                      {"  "}
                      <h6>
                        {D.discount_Name}
                        {D.discount_Percent}%
                      </h6>
                    </label>
                  </div>
                </fieldset>
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClosepro}>
              กลับ
            </Button>
            <Button
              variant="success"
              onClick={() =>
                Checkbill(
                  discount_ID,
                  data.compoSite,
                  data?.discount_ID?.discount_Percent
                )
              }
            >
              ตกลง
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const PayModal = ({ data }) => {
    const Uploadslip = () => {
      navigate("/UploadspilEmp/" + data?.totalOrder_ID);
    };

    const CheckSlip = () => {
      if (data?.totalOrder_image !== null) {
        return (
          <div className="text-center">
            <img
              src={pic + data?.totalOrder_image}
              alt="img"
              width="350"
              height="400"
            />
          </div>
        );
      } else {
        return (
          <h4 className="text-center" style={{ color: "red", margin: "60px" }}>
            ยังไม่มีการอัพโหลดสลิป!
          </h4>
        );
      }
    };

    return (
      <>
        <Modal show={data ? true : false} onHide={handleClosepay}size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered >
          <p></p>
          <p></p>
          <Modal.Header closeButton>
            <Modal.Title>สลิปการโอนชำระเงิน </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <h3>โต๊ะ {data?.table_ID?.table_Zone}</h3>
              <h3>
                จำนวนรวมทั้งหมด {Intl.NumberFormat().format(data?.totalPrice)}{" "}
                บาท
              </h3>
            </div>
            {CheckSlip()}
          </Modal.Body>
          <Modal.Footer>
            <button
              style={{ marginLeft: "5px" }}
              onClick={() => Uploadslip()}
              disabled={data?.totalOrder_image !== null}
              className="btn btn-outline-primary"
            >
              อัพโหลดสลิป
            </button>
            <Button variant="danger" onClick={handleClosepay}>
              กลับ
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const Move = ({ data }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [pointTable, setPointTable] = useState(null);

    const Movetable = (pointTable, totalOrder_ID) => {
      setIsLoading(true);

      setTimeout(() => {
        if (pointTable == null) {
          window.alert("กรุณาเลือกโต๊ะที่ต้องการย้าย!!");
        } else {
          TableService.MoveTable(pointTable?.table_ID, totalOrder_ID).then(() => {});
          OrderMenuService.mergeTable(totalOrder_ID, pointTable?.table_Zone).then(() => {
            setShowMove(false);
            getAllTotalOrder();
            GetMoveTable();
          });
        
        }
        setIsLoading(false);
      }, 500);
    };


    return (
      <>
        <Modal show={data ? true : false} onHide={handleCloseMove} ize="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
 
          <Modal.Header closeButton>
            <Modal.Title>ย้ายโต๊ะ</Modal.Title>
          </Modal.Header>
          <form onSubmit={() => Movetable(data?.totalOrder_ID)}>
            <Modal.Body>
              <div>
                <h2 className="text-center">
                  โต๊ะ {data?.table_ID?.table_Zone} จะย้ายโต๊ะไปที่
                </h2>

                {getMoveTable?.map((value, index) => {
                  return (
                    <fieldset>
                    <div className="text-center">
                        <input
                          type="radio"
                          id="louie"
                          name="drone"
                          value={null}
                          onChange={() => setPointTable(value)}
                        />
                        <label>
                          โต๊ะ {value.table_Zone}
                        </label>
                      </div>
                    </fieldset>
                  );
                })}
              </div>
            </Modal.Body>
          </form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseMove}>
              กลับ
            </Button>
            <Button
              variant="success"
              onClick={() => Movetable(pointTable, data?.totalOrder_ID)}
              disabled={pointTable == null}
            >
              {isLoading ? "Loading..." : "ย้ายโต๊ะ"}
              {isLoading && <Spinner animation="border" size="sm" />}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  const DisBTNmixTable = (compoSite, status) => {
    let count = 0;

    let F;
    console.log("compo.length", compo.length);

    for (let i = 0; i < compo.length; i++) {
      if (compoSite === compo[i]) {
        count = count + 1;
      }
    }

    if (count >= 2) {
      F = true;
      count = 0;
    } else {
      F = false;
      count = 0;
    }
    return F;
  };

  const MixTable = ({ data }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [table, setTabel] = useState([]);
    const [pointTable, setPointTable] = useState(null);

    const getMixTebles = () => {
      TableService.MixTable(data?.table_ID?.table_Zone,dateData)
        .then((response) => {
          setTabel(response.data);
          console.log("mix", response.data);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    };

    const mixTable = (totalOrder_ID) => {
      setIsLoading(true);

      setTimeout(() => {
        if (pointTable == null) {
          window.alert("กรุณาเลือกโต๊ะที่ต้องการรวม!!");
        } else {
          OrderMenuService.mergeTable(totalOrder_ID, pointTable).then(() => {
            setShowMix(false);
            UpdateTotalPrice();
            getAllTotalOrder();
            GetMoveTable();
          });
        }
        setIsLoading(false);
      }, 500);
    };

    const UpdateTotalPrice = () => {
      TotalOrderService.updateTotalprice(0, data?.totalOrder_ID).then(
        (response) => {
          getAllTotalOrder();
            GetMoveTable();
        }
      );
    };

    useEffect(() => {
      getMixTebles();
    }, []);

    return (
      <>
        <Modal show={data ? true : false} onHide={handleCloseMix} ize="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>

          <Modal.Header closeButton>
            <Modal.Title>รวมโต๊ะ</Modal.Title>
          </Modal.Header>
          <form onSubmit={() => Movetable(data?.totalOrder_ID)}>
            <Modal.Body>
              <div className="text-center">
                <h2 className="text-center">
                  โต๊ะที่ {data?.table_ID?.table_Zone} จะรวมโต๊ะไปที่
                </h2>
                {table?.map((t) => {
                  return (
                    <fieldset>
                    <div className="text-center">
                        <input
                          type="radio"
                          id="louie"
                          name="drone"
                          value={t.table_ID.table_Zone}
                          onClick={() => setPointTable(t.table_ID.table_Zone)}
                        />
                        <label>
                          โต๊ะ {t.table_ID.table_Zone}
                        </label>
                      </div>
                    </fieldset>
                  );
                })}
              </div>
            </Modal.Body>
          </form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseMix}>
              กลับ
            </Button>
            <Button
              variant="success"
              onClick={() => mixTable(data?.totalOrder_ID,data?.totalOrder_TimeStamp)}
            >
              {isLoading ? "Loading..." : "รวมโต๊ะ"}
              {isLoading && <Spinner animation="border" size="sm" />}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const EditMixTable = ({ data }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingCan, setIsLoadingCan] = useState(false);
    const [table, setTabel] = useState([]);
    const [pointTable, setPointTable] = useState(null);
  
      const getMixTebles = () => {
        TableService.MixTable(data?.compoSite,dateData)
          .then((response) => {
            setTabel(response.data);
            console.log("mix", response.data);
          })
          .catch((error) => {
            console.log("Something went wrong", error);
          });
      };
  
      const mixTable = (totalOrder_ID) => {
        setIsLoading(true);
  
        setTimeout(() => {
          if (pointTable == null) {
            window.alert("กรุณาเลือกโต๊ะที่ต้องการรวม!!");
          } else {
            OrderMenuService.mergeTable(totalOrder_ID, pointTable).then(() => {
              setShowEditMix(false);
              getAllTotalOrder();
              GetMoveTable();
            });
          }
          setIsLoading(false);
        }, 500);
      };
  
      const CancelTable = () => {
        setIsLoadingCan(true);
  
        setTimeout(() => {
          OrderMenuService.mergeTable(
            data?.totalOrder_ID,
            data?.table_ID?.table_Zone
          ).then(() => {
            setShowEditMix(false);
            getAllTotalOrder();
            GetMoveTable();
          });
          setIsLoadingCan(false);
        }, 500);
      };
  
      
  
      useEffect(() => {
        
        getMixTebles();
   
      }, []);
  
      return (
        <>
          <Modal show={data ? true : false} onHide={handleCloseEditMix} ize="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
            <Modal.Header closeButton>
              <Modal.Title>รวมโต๊ะ</Modal.Title>
            </Modal.Header>
            <form onSubmit={() => Movetable(data?.totalOrder_ID)}>
              <Modal.Body>
                <div>
                  <h2 className="text-center">
                    โต๊ {data?.table_ID?.table_ID} จะรวมโต๊ะไปที่
                 
                  </h2>
                  {table?.map((t) => {
                    return (
                      <fieldset>
                        <div>
                          <input
                            type="radio"
                            id="louie"
                            name="drone"
                            value={t.table_ID.table_ID}
                            onClick={() => setPointTable(t.table_ID.table_ID)}
                          />
                          <label>
                            โต๊ะที่ {t.table_ID.table_Zone}
                          </label>
                        </div>
                      </fieldset>
                    );
                  })}
                </div>
              </Modal.Body>
            </form>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditMix}>
                กลับ
              </Button>
              <Button
                variant="success"
                onClick={() => mixTable(data?.totalOrder_ID)}
                disabled={pointTable === null}
              >
                {isLoading ? "Loading..." : "รวมโต๊ะ"}
                {isLoading && <Spinner animation="border" size="sm" />}
              </Button>
              <Button
                variant="danger"
                onClick={() => CancelTable(data?.totalOrder_ID)}
              >
                {isLoadingCan ? "Loading..." : "ยกเลิกการรวมโต๊ะ"}
                {isLoadingCan && <Spinner animation="border" size="sm" />}
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    };
  

  const Checkbill = (compoSite) => {
    navigate("/Checkbill/" + compoSite);
  };

  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
  };

  const movetable = (totalOrder_ID, table_ID) => {
    navigate("/MoveTable/" + totalOrder_ID + "/" + table_ID);
  };

  const statusMixTable = (value) => {
    if (value.table_ID.table_Zone == value.compoSite) {
      return <p className="text-center"></p>;
    } else {
      return (
        <h4 style={{ color: "green" }}>รวมกับโต๊ะที่ {value.compoSite}</h4>
      );
    }
  };

  const statusMixtable = (value) => {
    if (value.table_ID.table_ID === value.compoSite) {
      return;
    } else {
      return <p className="text-center">รวมกับโต๊ะที่ {value.compoSite}</p>;
    }
  };

  function MyComponent() {
    let date = new Date();
    let hour = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");

    const [time, setTime] = useState(date);

    useEffect(() => {
      const timer = setInterval(() => {
        setTime(new Date());
      }, 60000);
      return () => clearInterval(timer);
    }, []);

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

    return (
      <Container>
        <Col>
          <div className="text-center">
            <h4>
              เวลา {hour}:{minutes} น.
            </h4>
            <div className="text-center">
            <select
              style={{ width: "200px", marginLeft: "50px" ,marginBottom: "15px"}}
              name="typeMenu_ID"
              className="form-control"
              value={showMytable}
              onChange={(e) => setShowMytable(e.target.value)}
            >
              <option value="0" className="text-center" >-- โต๊ะของฉัน --</option>
              <option value="1" className="text-center"> -- โต๊ะทั้งหมด -- </option>
            </select>
    
          </div>
          </div>
         

          {totalOrder.length === 0 ? (
            <h2 className="text-center" style={{ color: "red" }}>
              ยังไม่มีการเปิดโต๊ะ
            </h2>
          ) : (
            filterTotalOrder.map((totalOrder, index) => {
              return (
                <Col lg="3" md="12" sm="12" xs="12" key="" className="md-4">
                  <div className="product__item">
                    <div className="product__content">
                      <h5>
                        <h2>โต๊ะ {totalOrder.table_ID.table_Zone} </h2>
                        {statusMixTable(totalOrder)}
                        {statusTotalOrder(totalOrder)}
                      </h5>
                      <div className=" d-flex align-items-center justify-content-between ">
                        <button
                          className="btn btn-warning"
                          onClick={() =>
                            OrderMenu(
                              totalOrder.totalOrder_ID,
                              totalOrder.table_ID.table_Zone,
                              totalOrder.compoSite
                            )
                          }
                          disabled={
                            totalOrder.compoSite !=
                              totalOrder.table_ID.table_Zone ||
                            totalOrder.totalOrder_Status === "1" || totalOrder.discount_ID !== null
                          }
                        >
                          สั่งอาหาร
                        </button>
                        <button
                          style={{ marginLeft: "3px" }}
                          onClick={() =>
                            viewTotalOrder(
                              totalOrder.compoSite,
                              totalOrder.totalOrder_ID,
                              totalOrder.totalOrder_Status
                            )
                          }
                          disabled={
                            totalOrder.compoSite !=
                            totalOrder.table_ID.table_Zone
                          }
                          className="btn btn-secondary"
                        >
                          รายการอาหารที่สั่ง
                        </button>
                        {editMixtable(totalOrder)}
                      </div>
                      <p className="col-md-12"></p>
                      <div className="product__content">
                        <div className=" d-flex align-items-center justify-content-between ">
                          <button
                            style={{ marginLeft: "3px" }}
                            disabled={
                              totalOrder.compoSite !=
                                totalOrder.table_ID.table_Zone ||
                              totalOrder.totalOrder_Status === "1" || 
                              DisBTNmixTable(totalOrder.compoSite)
                              || totalOrder.discount_ID !== null 
                            }
                            onClick={
                              (e) => handleShowModeTable(totalOrder)
                              // movetable(totalOrder.totalOrder_ID, totalOrder.table_ID.table_ID)
                            }
                            className="btn btn-success"
                          >
                            ย้ายโต๊ะ
                          </button>
                          <Button
                            style={{ marginLeft: "3px" }}
                            variant="btn btn-outline-dark"
                            disabled={
                              totalOrder.compoSite !=
                              totalOrder.table_ID.table_Zone
                            }
                            onClick={() => handleShowpay(totalOrder)}
                          >
                            สลิปโอนเงิน
                          </Button>
                          <Button
                            style={{ marginLeft: "3px" }}
                            variant="danger"
                            disabled={
                              totalOrder.compoSite !=
                                totalOrder.table_ID.table_Zone ||
                              DisBTNmixTable(totalOrder.compoSite)
                              || totalOrder.discount_ID !== null
                            }
                            onClick={() => handleShow(totalOrder)}
                          >
                            ลบ
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })
          )}
        </Col>
      </Container>
    );
  }

  return (
    <>
      <h2 className="text-center">พนักงาน</h2>
      <div className="text-center">
        <h3 style={{ marginLeft: "30px" }}>
          {day} {"ที่ "} {datetime[2]} {"เดือน "} {month} {"พ.ศ. "} {y + 543}
        </h3>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd / MM / yyyy"
          maxDate={new Date()}
          showYearDropdown
        />
      </div>
      {MyComponent()}

      <PayModal data={showpay} />
      <Promotion data={showpro} />
      <DeleteTable data={show} />
      <Move data={showMove} />
      <MixTable data={showMix} />
      <EditMixTable data={showEMix} />
    </>
  );
};

export default TableOrderEmp;

