import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import TotalOrderService from "../../../services/TotalOrderService";
import DisPromotionService from "../../../services/DisPromotionService";
import logo from "./img/tawin.jpeg";

function Checkbill() {
  const { compoSite, discount_ID } = useParams();
  const componentRef = useRef();
  const [Discount, setDiscount] = useState();
  const [discount, setdiscount_ID] = useState(null);
  const day = new Date()
  const days = day.toString().split(' ');
  let month = ''
  if(days[1] === "Jan"){
    month = 'มกราคม'
    
  }
  else if (days[1] === "Feb"){
    month = 'กุมภาพันธ์'
   
  }
  else if (days[1] === "Mar"){
    month = 'มีนาคม'
  
  }
  else if (days[1] === "Apr"){
    month = 'เมษายน'
    
  }
  else if (days[1] === "May"){
    month = 'พฤษภาคม'
   
  }
  else if (days[1] === "Jun"){
    month = 'มิถุนายน'

  }
  else if (days[1] === "Jul"){
    month = 'กรกฎาคม'
   
  }
  else if (days[1] === "Aug"){
    month = 'สิงหาคม'

  }
  else if (days[1] === "Sep"){
    month = 'กันยายน'

  }
  else if (days[1] === "Oct"){
    month = 'ตุลาคม'
  
  }
  else if (days[1] === "Nov"){
    month = 'พฤศจิกายน'

  }
  else if (days[1] === "Dec"){
    month = 'ธันวาคม'
  }

  const [list, setlist] = useState([]);
  let TotalPrice = parseInt(
    list?.reduce(
      (prev, cur) => prev + cur.menu_ID.menu_Price * cur.orderMenu_Qty,
      0
    )
  );
  var distotal = parseInt((TotalPrice * discount) / 100);
  var distotalPrice = parseInt(TotalPrice - (TotalPrice * discount) / 100);
  console.log("dis", discount);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    onafterprint: () => alert("Print seccess"),
  });

  const GetDiscount = () => {
    DisPromotionService.getDisPromotion().then((respone) => {
      setDiscount(respone.data);
      setdiscount_ID(respone.data[0].discount_Percent);
      console.log("getdis", respone.data);
    });
  };

  const getListOrderMenu = (compoSite) => {
    TotalOrderService.getTotalListOrderById(compoSite)
      .then((response) => {
        setlist(response.data);
        console.log("listBill = ", response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  const timestamp = (data) => {

    let timestamp = data.split("T")
    let time = timestamp[1].split(".")

    return (
      <>
        เวลา {time[0]}
      </>
    )
  }

  useEffect(() => {
    getListOrderMenu(compoSite);
    GetDiscount();
  }, [compoSite]);

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
          value={discount}
          onChange={(e) => setdiscount_ID(e.target.value)}
        >
          {Discount?.map((Discount, index) => (
            <option key={index} value={Discount?.discount_Percent}>
              {Discount?.discount_Name} {Discount?.discount_Percent}%
            </option>
          ))}
        </select>
      </div>
      <div className="text-center" style={{ margin: "10px" }}>
        <button className="btn btn-outline-dark" onClick={handlePrint}>
          Print this out!
        </button>
      </div>
      <div
        className="container"
        ref={componentRef}
        style={{ width: "80%", height: window.innerHeight }}
      >
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
                    <p class="text-muted">Due to: {days[2]}  {month}  {days[3]}</p>
                  </div>
                </div>

                <hr class="my-1" />

                <div class="row pb-8 p-3">
                  <div class="col-md-6">
                    <h4>ข้อมูลลูกค้า</h4>
                    <p class="mb-1">John Doe, Mrs Emma Downson</p>
                  </div>

                  <div class="col-md-6 text-right">
                    <h4>รายละเอียดการขาย</h4>

                    <p class="mb-1">
                      <span class="text-muted">Name: </span>{" "}
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
                        {list?.map((d, index) => (
                          <tr>
                            <th className="text-center">{index + 1}</th>
                            <td className="text-center">
                              {d.totalOrder_ID.table_ID.table_ID}
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
                    <div class="h2 font-weight-light">{distotalPrice} บาท</div>
                  </div>

                  <div class="py-3 px-5 text-right">
                    <div class="mb-2">Discount</div>
                    <div class="h2 font-weight-light">{discount}%</div>
                  </div>

                  <div class="py-3 px-5 text-right">
                    <div class="mb-2">จำนวนส่วนลด</div>
                    <div class="h2 font-weight-light">{distotal}</div>
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
