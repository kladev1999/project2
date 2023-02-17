import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import TotalOrderService from "../../../services/TotalOrderService";
import DisPromotionService from "../../../services/DisPromotionService";
import logo from "./img/tawin.jpeg";
import AuthService from "../../../services/Auth-service";

function Checkbill() {
  const { compoSite, status, totalOrder_ID } = useParams();
  const currentUser = AuthService.getCurrentUser();
  const componentRef = useRef();
  const [Discount, setDiscount] = useState();
  const [discount, setdiscount_ID] = useState(null);
  const day = new Date();
  const days = day.toString().split(" ");
  const years = parseInt(days[3]);
  let month = "";
  if (days[1] === "Jan") {
    month = "มกราคม";
  } else if (days[1] === "Feb") {
    month = "กุมภาพันธ์";
  } else if (days[1] === "Mar") {
    month = "มีนาคม";
  } else if (days[1] === "Apr") {
    month = "เมษายน";
  } else if (days[1] === "May") {
    month = "พฤษภาคม";
  } else if (days[1] === "Jun") {
    month = "มิถุนายน";
  } else if (days[1] === "Jul") {
    month = "กรกฎาคม";
  } else if (days[1] === "Aug") {
    month = "สิงหาคม";
  } else if (days[1] === "Sep") {
    month = "กันยายน";
  } else if (days[1] === "Oct") {
    month = "ตุลาคม";
  } else if (days[1] === "Nov") {
    month = "พฤศจิกายน";
  } else if (days[1] === "Dec") {
    month = "ธันวาคม";
  }

  const [list, setlist] = useState([]);

  const filteredList = list.filter(
    (item) => item && item.status_ID && item.status_ID.status_ID === 3
  );

  let TotalPrice = parseInt(
    filteredList?.reduce(
      (prev, cur) => prev + cur.menu_ID.menu_Price * cur.orderMenu_Qty,
      0
    )
  );


  var distotal = 0;
  var distotalPrice = TotalPrice;
  var discountS = 0;
  
  if (discount) {
    distotal = parseInt((TotalPrice * discount?.discount_Percent) / 100);
    distotalPrice =
    TotalPrice - (TotalPrice * discount?.discount_Percent) / 100;
    discountS = discount?.discount_Percent;
  }else{
    distotal = 0;
  distotalPrice = TotalPrice;
  discountS = 0;
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    onafterprint: () => alert("Print seccess"),
  });

  const GetDiscount = () => {
    DisPromotionService.getDisPromotion().then((respone) => {
      setDiscount(respone.data);
      console.log("getdis", respone.data);
    });
  };

  const getListOrderMenu = () => {
    TotalOrderService.getTotalListOrderById(compoSite, status)
      .then((response) => {
        setlist(response.data);
        console.log("listBill = ", response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  const timestamp = (data) => {
    let timestamp = data.split("T");
    let time = timestamp[1].split(".");

    return <>เวลา {time[0]}</>;
  };

  const updateDiscount = () => {
    if(window.confirm("คุณต้องการเพิ่มโปรโมชัน")){
      TotalOrderService.UpdateDiscount(discount?.discount_ID,totalOrder_ID).then(() => {
    
      });

      TotalOrderService.updateTotalprice(Math.ceil(distotalPrice),totalOrder_ID).then(() => {
        alert("Discount updated")
        }
      );
    }
  };

  const Ontime = (data) => {
    let timestamp = data?.split("T");
    let time = timestamp[1]?.split(".");

    return <>{time[0]}</>;
  };

  useEffect(() => {
    getListOrderMenu(compoSite);
    GetDiscount();
  }, [compoSite]);

  // var distotal = parseInt((TotalPrice * discount?.discount_Percent) / 100);

  // var distotalPrice =
  //   TotalPrice - (TotalPrice * discount?.discount_Percent) / 100;

  



  return (
    <div className="container">
      <div
        className="form-group mb-2"
        style={{ marginLeft: "200px", marginTop: "50px" }}
      >
        เลือกส่วนลด
        <select
          className="custom-select"
          style={{ width: "200px", marginLeft: "10px" }}
          id="Promotion"
          name="Promotion"
          onChange={(e) => {
            const selectedDiscount = Discount.find(
              (discount) => discount.discount_ID === parseInt(e.target.value)
            );
            setdiscount_ID(selectedDiscount);
          }}
        >
          <option value="">ส่วนลด</option>
          {Discount?.map((Discount, index) => (
            <option key={index} value={Discount.discount_ID}>
              {Discount?.discount_Name} {Discount?.discount_Percent}%
            </option>
          ))}
        </select>
        <button
          className="btn btn-outline-dark"
          style={{ marginLeft: "10px" }}
          disabled={distotal == 0}
          onClick={() => updateDiscount()}
        >
          ตกลง
        </button>
      </div>

      <div
        className="container"
        ref={componentRef}
        style={{ width: "80%", height: window.innerHeight }}
      >
        <div className="text-end" style={{ margin: "10px" }}>
          <button className="btn btn-outline-dark" onClick={handlePrint}>
            Print this out!
          </button>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body p-0">
                <div className="row p-2">
                  <div className="col-md-6">
                    <img src={logo} width="100" height="100" />

                    <div className="p-0">
                      <h5>ร้าน ถวิล แปลว่า คิดถึง</h5>
                    </div>
                  </div>

                  <div class="col-md-6 text-right">
                    <h2>ใบเสร็จชำระเงิน</h2>
                    <p class="text-muted">
                      Due to: {days[2]} {month} {years + 543}
                    </p>
                  </div>
                </div>

                <hr class="my-1" />

                <div class="row pb-8 p-3">
                  <div class="col-md-6">
                    <h4>ข้อมูลลูกค้า</h4>
                    <p class="text-muted">
                      โต๊ะที่: {list[0]?.totalOrder_ID?.table_ID?.table_Zone}
                    </p>
                    {/* <p class="text-muted">เปิดโต๊ะเวลา: {Ontime(list[0]?.totalOrder_ID?.totalOrder_TimeStamp)}</p> */}
                  </div>

                  <div class="col-md-6 text-right">
                    <h4>ออกใบเสร็จโดย</h4>

                    <p class="mb-1">
                      <span class="text-muted">
                        Name: {currentUser.name_Emp}
                      </span>{" "}
                    </p>
                  </div>
                </div>

                <div class="row p-6">
                  <div class="col-md-12">
                    <table class="table">
                      <thead>
                        <tr>
                          <th className="text-center border-1 text-uppercase small font-weight-bold">
                            ลำดับที่
                          </th>
                          <th className="text-center border-1 text-uppercase small font-weight-bold">
                            โต๊ะที่สั่ง
                          </th>
                          <th className="text-center border-1 text-uppercase small font-weight-bold">
                            เวลาที่สั่ง
                          </th>
                          <th className="text-center border-1 text-uppercase small font-weight-bold">
                            เมนูที่สั่ง
                          </th>
                          <th className="text-center border-1 text-uppercase small font-weight-bold">
                            จำนวน
                          </th>
                          <th className="text-center border-1 text-uppercase small font-weight-bold">
                            ราคา
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredList?.map((d, index) => (
                          <tr>
                            <th className="text-center">{index + 1}</th>
                            <td className="text-center">
                              {d.totalOrder_ID.table_ID.table_Zone}
                            </td>
                            {/* <td className="text-center">{d.status_ID.status}</td> */}
                            <td className="text-center">
                              {timestamp(d.orderMenu_TimeStamp)}
                            </td>
                            <td className="text-center">
                              {d.menu_ID.menu_Name}
                            </td>
                            <td className="text-center">{d.orderMenu_Qty}</td>
                            <td className="text-center">
                              {d.menu_ID.menu_Price * d.orderMenu_Qty}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="d-flex flex-row-reverse bg-dark text-white p-0">
                  <div class="py-3 px-5 text-right">
                    <div class="mb-2">รวม</div>
                    <div class="h2 font-weight-light">
                      {Math.ceil(distotalPrice)} บาท
                    </div>
                  </div>

                  <div class="py-3 px-5 text-right">
                    <div class="mb-2">Discount</div>
                    <div class="h2 font-weight-light">{discountS}%</div>
                  </div>

                  <div class="py-3 px-5 text-right">
                    <div class="mb-2">จำนวนส่วนลด</div>
                    <div class="h2 font-weight-light">{distotal} บาท</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Checkbill;
