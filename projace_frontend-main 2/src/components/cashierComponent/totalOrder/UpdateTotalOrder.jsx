import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-grid-system";
import { useParams, useNavigate } from "react-router-dom";
import TotalOrderService from "../../../services/TotalOrderService";

const UpdateTotalOrder = (props) => {
  const { totalOrder_ID } = useParams();
  let navigate = useNavigate();

  const totalOrderState = {
    totalOrder_ID: "",
    totalPrice: "",
    disCount: "",
    totalOrder_Status: "",
    table_ID: {
      table_ID: "",
      table_Zone: "",
    },
  };

  const [totalOrder, setTotalOrder] = useState(totalOrderState);
  const [table, setTable_ID] = useState([]);
  const [selectTable, setSelectTable] = useState([]);
  const getTotalOrderID = (totalOrder_ID) => {
    TotalOrderService.getTotalOrderById(totalOrder_ID)
      .then((response) => {
        setTotalOrder(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  const getTable = () => {
    TotalOrderService.getTable((response) => {
      console.log(response.data);
      setTable_ID(response.data);
    }).catch((e) => {
      console.log(e);
    });
  };

  useEffect(() => {
    getTotalOrderID(totalOrder_ID);
    getTable();
  }, [totalOrder_ID]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTotalOrder({ ...totalOrder, [name]: value });
  };

  const updateTotalOrder = () => {
    TotalOrderService.updateTotalOrder(totalOrder.totalOrder_ID, totalOrder)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    navigate("/totalOrder");
  };

  const cancel = () => {
    navigate("/totalOrder");
  };

  return (
    <Container>
      {totalOrder ? (
        <div className="edit-form">
          <br />
          <h2 style={{ textAlign: "center" }}>TotalOrder Update</h2>
          <br />
          <form style={{ textAlign: "center" }}>
            <Col align="center" justify="center" direction="row">
              <Col md={4}>
                <div className="form-group">
                  <label htmlFor="description"> TotalPrice </label>
                  <input
                    style={{ textAlign: "center" }}
                    type="text"
                    className="form-control"
                    id="totalPrice"
                    name="totalPrice"
                    value={totalOrder.totalPrice}
                    onChange={handleInputChange}
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className="form-group">
                  <label htmlFor="description"> TotalStatus </label>
                  <input
                    style={{ textAlign: "center" }}
                    type="text"
                    className="form-control"
                    id="totalOrder_Status"
                    name="totalOrder_Status"
                    value={totalOrder.totalOrder_Status}
                    onChange={handleInputChange}
                  />
                </div>
              </Col>
              <Col md={4}>
                <div className="form-group">
                  <select
                    className="custom-select"
                    style={{ width: "200px", marginLeft: "10px" }}
                    id="table_ID"
                    name="table_ID"
                    onChange={handleInputChange}
                  >
                    {table.map((total, index) => (
                      <option key={index} value={total.table_ID}>
                        {total.table_Zone}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
            </Col>
          </form>

          <Col align="center" justify="center" direction="row">
            <button className="btn btn-danger mr-2" onClick={cancel}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={updateTotalOrder}
            >
              Update
            </button>
          </Col>
        </div>
      ) : (
        <div>
          <br />
          <p> Plese click menu </p>
        </div>
      )}
    </Container>
  );
};

export default UpdateTotalOrder;
