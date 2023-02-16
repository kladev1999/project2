import React from "react";
import { useEffect, useState } from "react";
import DisPromotionService from "../../services/DisPromotionService";
import Modal from "react-bootstrap/Modal";
import { Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
function Promotion() {
  const [Discount, setDiscount] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(null);
  const handleCloseAdd = () => setShowAdd(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleOpenAdd = () => setShowAdd(true);
  const Update = (item) => setShowUpdate(item);

  const GetDiscount = () => {
    DisPromotionService.getDisPromotion().then((respone) => {
      setDiscount(respone.data);
      console.log(respone.data);
    });
  };

  useEffect(() => {
    GetDiscount();
  }, []);

  const DeleteDiscount = (discount_ID) => {
    if (window.confirm("Are you sure you want to delete")) {
      DisPromotionService.DeleteDiscount(discount_ID).then((respone) => {
        GetDiscount();
      });
    }
  };

  const AddDiscount = () => {
    const [discount_Name, setdiscount_Name] = useState();
    const [discount_Percent, setdiscount_Percent] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        discount_Name: Yup.string().required("กรุณากรอกชื่อโปรโมชั่น"),
        discount_Percent: Yup.number("กรุณากรอกเฉพาะตัวเลข").required("กรุณากรอกส่วนลด"),
      });
      const formOptions = { resolver: yupResolver(validationSchema) };
    
      // get functions to build form with useForm() hook
      const { register, handleSubmit, reset, formState } = useForm(formOptions);
      const { errors } = formState;
    
      const [user, setUser] = useState(null);
    
      useEffect(() => {
        // simulate async api call with set timeout
        setTimeout(
          () =>
            setUser({
                discount_Name: "",
                discount_Percent:"",
             
            }),
          300
        );
      }, []);
    

    const Discount = {
      discount_Name,
      discount_Percent,
    };

    const AddDis = () => {
      setIsLoading(true);

      setTimeout(() => {
        DisPromotionService.AddDiscount(Discount).then((respone) => {
          console.log(respone.data);
          GetDiscount();
          handleCloseAdd();
        });
      }, 250);
    };

    return (
      <>
        <Modal show={showAdd} onHide={handleCloseAdd}>
        <p></p>
        <p></p>
          <Modal.Header closeButton>
            <Modal.Title>เพิ่มโปรโมชัน </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <div className="card-body">
                <from>
                  <div className="form-group mb-2">
                    <label className="form-label"> ชื่อโปรโมชั่น :</label>
                    <input
                      type="text"
                      placeholder="ชื่อโปรโมชั่น"
                      name="Name"
                      {...register('discount_Name')}
                      className={`form-control ${
                        errors.discount_Name ? 'is-invalid' : ''
                      }`}
                      onChange={(e) => setdiscount_Name(e.target.value)}
                    ></input>
                     <div className="invalid-feedback">
                      {errors.discount_Name?.message}
                    </div>
                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label"> ส่วนลด :</label>
                    <input
                      type="text"
                      placeholder="ส่วนลด"
                      name="Percent"
                      {...register('discount_Percent')}
                      className={`form-control ${
                        errors.discount_Percent ? 'is-invalid' : ''
                      }`}
                      onChange={(e) => setdiscount_Percent(e.target.value)}
                    ></input>
                     <div className="invalid-feedback">
                      {errors.discount_Percent?.message}
                    </div>
                  </div>
                </from>
              </div>
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseAdd}>
              ยกเลิก
            </Button>
            <Button variant="success" onClick={handleSubmit(AddDis)}>
              {isLoading ? "Loading..." : "เพิ่ม"}
              {isLoading && <Spinner animation="border" size="sm" />}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const UpdateDiscount = ({ data }) => {
    const [discount_Name, setdiscount_Name] = useState(data?.discount_Name);
    const [discount_Percent, setdiscount_Percent] = useState(
      data?.discount_Percent
    );
    const [isLoading, setIsLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        discount_Name: Yup.string().required("กรุณากรอกชื่อโปรโมชั่น"),
        discount_Percent: Yup.number("กรุณากรอกเฉพาะตัวเลข").required("กรุณากรอกส่วนลด"),
      });
      const formOptions = { resolver: yupResolver(validationSchema) };
    
      // get functions to build form with useForm() hook
      const { register, handleSubmit, reset, formState } = useForm(formOptions);
      const { errors } = formState;
    
      const [user, setUser] = useState(null);
    
      useEffect(() => {
        // simulate async api call with set timeout
        setTimeout(
          () =>
            setUser({
                discount_Name: "",
                discount_Percent:"",
             
            }),
          300
        );
      }, []);

    const Discount = {
      discount_Name,
      discount_Percent,
    };

    const UpdateDis = () => {
      setIsLoading(true);
      setTimeout(() => {
        DisPromotionService.UpdateDiscount(data?.discount_ID, Discount).then(
          () => {
            handleCloseUpdate();
            GetDiscount();
          }
        );
      }, 400);
    };

    return (
      <>
        <Modal show={data ? true : false} onHide={handleCloseUpdate}>
        <p></p>
        <p></p>
          <Modal.Header closeButton>
            <Modal.Title> แก้ไขโปรโมชัน </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <div className="card-body">
                <from>
                  <div className="form-group mb-2">
                    <label className="form-label"> ชื่อโปรโมชั่น :</label>
                    <input
                      type="text"
                      placeholder="ชื่อโปรโมชั่น"
                      value={discount_Name}
                      {...register('discount_Name')}
                      className={`form-control ${
                        errors.discount_Name ? 'is-invalid' : ''
                      }`}
                      onChange={(e) => setdiscount_Name(e.target.value)}
                    ></input>
                     <div className="invalid-feedback">
                      {errors.discount_Name?.message}
                    </div>
                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label"> ส่วนลด :</label>
                    <input
                      type="text"
                      placeholder="ส่วนลด"
                      value={discount_Percent}
                      {...register('discount_Percent')}
                      className={`form-control ${
                        errors.discount_Percent ? 'is-invalid' : ''
                      }`}
                      onChange={(e) => setdiscount_Percent(e.target.value)}
                    ></input>
                     <div className="invalid-feedback">
                      {errors.discount_Percent?.message}
                    </div>
                  </div>
                </from>
              </div>
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseUpdate}>
              ยกเลิก
            </Button>
            <Button variant="success" onClick={handleSubmit(UpdateDis)}>
              {isLoading ? "กำลังอัปเดต..." : "อัปเดต"}
              {isLoading && <Spinner animation="border" size="sm" />}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <>
      <h1 className="text-center">โปรโมชั่น</h1>
      <button
        className="btn btn-outline-primary"
        style={{ margin: "18px" }}
        onClick={handleOpenAdd}
      >
        เพิ่มโปรโมชัน
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr className="text-center">
            <th>รหัสโปรโมชั่น</th>
            <th>ชื่อโปรโมชั่น</th>
            <th>ส่วนลด</th>
            <th>การจัดการ</th>
          </tr>
        </thead>

        {Discount?.map((Discount, index) => {
          return (
            <thead>
              <tr className="text-center">
                <th>{index + 1}</th>
                <td>{Discount.discount_Name}</td>
                <td>{Discount.discount_Percent}%</td>
                <td>
                  <button
                    className="btn btn-outline-warning"
                    style={{ margin: "5px" }}
                    onClick={() => setShowUpdate(Discount)}
                  >
                    แก้ไข
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    style={{ margin: "5px" }}
                    onClick={() => DeleteDiscount(Discount.discount_ID)}
                  >
                    ลบ{" "}
                  </button>
                </td>
              </tr>
            </thead>
          );
        })}
      </table>
      <AddDiscount />
      <UpdateDiscount data={showUpdate} />
    </>
  );
}

export default Promotion;