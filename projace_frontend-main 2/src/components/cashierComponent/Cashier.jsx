import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { Container, Row, Col } from "react-grid-system";

const Cashier = () => {
  return (
    <div className="container">
      <h2 className="text-center">Cashier</h2>
      <Container>
        <Row>
          <Col md={8}>
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th> Total ID </th>
                  <th> Table ID </th>
                  <th> Table Zone </th>
                  <th> ราคารวม </th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody>
                <td> 1 </td>
                <td> 2 </td>
                <td> C </td>
                <td> 1000 </td>
                <td>
                  <div className="row">
                    <Dropdown style={{ marginLeft: "5px" }}>
                      <Dropdown.Toggle variant="success" id="dropdown-basic" >
                        ข้อมูลโต๊ะ
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          รายการอาหารที่สั่งทั้งหมด
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          ยอดรวมราคาอาหาร
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          ยกเลิกรายการอาหาร
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    
                    <Dropdown style={{ marginLeft: "5px" }}>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        เช็คบิล
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          เช็คบิล
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          เช็คเอ้าท์
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </td>
              </tbody>
            </table>
          </Col>
          <br />
          <Col md={4}>
            {/* Discount  */}
            <Container fluid>
              <Row>
                <Col>
                  <h4> การรวมโต๊ะ </h4>
                  <input
                    type="text"
                    value={"โต๊ะปัจจุบัน "}
                    className="form-control"
                  />
                  <br />
                  <input
                    type="text"
                    value={"โต๊ะที่จะรวม"}
                    className="form-control"
                  />
                  <br />

                  <button
                    className="btn btn-info"
                    style={{ marginLeft: "5px" }}
                    onClick={() => {}}
                  >
                    Submit{" "}
                  </button>
                </Col>

                <Col>
                  <h4> การย้ายโต๊ะ </h4>
                  <input
                    type="text"
                    value={"โต๊ะปัจจุบัน "}
                    className="form-control"
                  />
                  <br />
                  <input
                    type="text"
                    value={"โต๊ะที่จะย้ายไป"}
                    className="form-control"
                  />
                  <br />
                  <button
                    className="btn btn-info"
                    style={{ marginLeft: "5px" }}
                    onClick={() => {}}
                  >
                    Submit{" "}
                  </button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cashier;
