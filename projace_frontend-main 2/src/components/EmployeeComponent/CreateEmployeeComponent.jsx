import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import RoleService from "../../services/RoleService";
import axios from "axios";
import EmployeeService from "../../services/EmployeeService";
import { Button, Spinner } from "react-bootstrap";
import authHeader from "../../services/Auth-HeaderService";
const CreateEmployeeComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, SetImage] = useState([]);
  const [ImageUpload, SetImageUpload] = useState([]);
  const [name_Emp, setName] = useState([]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [phone, setPhone] = useState([]);
  const [address, setAddress] = useState([]);
  const [line, setLine] = useState([]);
  const [role_id, setRole_id] = useState([]);
  const [idRole, setRole] = useState([]);
  const Navigate = useNavigate();
  const [preview, setPreView] = useState([]);
  const [previewURL, setPreViewURL] = useState([]);
  const { id } = useParams();
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  let name;
  let roles;
  const url = "http://localhost:8080/file-upload-imageEmployees"

  let pic = "http://localhost:8080/menu/getimagesEmp/"

    const roles_ids = [
      {id:"1",value:"1",label:"ROLE_ADMIN"},
      {id:"2",value:"2",label:"ROLE_USER"},
      {id:"3",value:"3",label:"ROLE_COOK"}
    ]

  const handleChange = (e) => {
    console.log("name", e.target.files[0].name);
    console.log(e.target.files);

    setPreView([...e.target.files]);

    let img = [...ImageUpload];
    for (var i = 0; i < e.target.files.length; i++) {
      img.push(e.target.files[i]);
    }
    SetImageUpload(img);
  };

  function handleClick(e) {
    setIsLoading(true);
    // perform some action here, then set isLoading back to false
    setTimeout(() => {
      e.preventDefault();

      var formData = new FormData();
      formData.append("file", ImageUpload[ImageUpload.length - 1]);

      axios
        .post(url, formData,{ headers: authHeader()})
        .then((res) => {
          console.log("res", res);
        })
        .catch((e) => {
          console.log("Error", e);
        });

      if (id) {
        if (ImageUpload.length >= 1) {
          const employee = {
            name_Emp,
            username,
            password,
            phone,
            address,
            line,
          };
          EmployeeService.updateEmployee(id, employee,name)
            .then((response) => {
              console.log(response.data);
              Navigate("/employee");
            })
            .catch((error) => {
              console.log(employee);

              console.log(error);
            });
        } else {
          const employee = {
            name_Emp,
            username,
            password,
            phone,
            address,
            line,
            
          };
          EmployeeService.updateEmployee(id, employee,name)
            .then((response) => {
              console.log(response.data);
              Navigate("/employee");
            })
            .catch((error) => {
              console.log(employee);
              // console.log(employee.idRole)
              console.log(error);
            });
        }
      } else {
        const employee = {
          name_Emp,
          username,
          password,
          phone,
          address,
          line,
          roles: [
            {
              name,
            },
          ],
        };
        EmployeeService.createEmployee(employee)
          .then((response) => {
            
            Navigate("/employee");
          })
          .catch((error) => {
            console.log(employee);
            // console.log(employee.idRole)
            console.log(error);
          });
      }
      // Navigate("/employee");
      // perform some action here
      setIsLoading(false);
    }, 500);
  }

  const getEmployeeRoles = () => {
    EmployeeService.getEmployeeById(id)
      .then((response) => {
        console.log("Role = ", response.data);
        setName(response.data.name_Emp);
        setUsername(response.data.username);
        setPassword(response.data.password);
        setPhone(response.data.phone);
        setAddress(response.data.address);
        setLine(response.data.line);
        SetImage(response.data.image);
        // setRole(response.data.roles.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRole = (event) => {
    name = event.target.value;
    console.log(name);
  };

  useEffect(() => {
    console.log(formErrors);
    getEmployeeRoles();

    if (preview.length < 1) return;
    const newPreviewURL = [];

    preview.forEach((pre) => newPreviewURL.push(URL.createObjectURL(pre)));
    setPreViewURL(newPreviewURL);
  }, [preview]);

  const title = () => {
    if (id) {
      return (
        <div>
          <div>
            <h2 className="text-center">แก้ไขข้อมูลพนักงาน</h2>
          </div>
          <div className="input-roles">
            <div className="form-group mb-2">
                  <select
                    className="custom-select"
                    style={{ width: "300px", marginLeft: "10px" }}
                    id="roles_ids"
                    name="roles_ids"
                    value={roles_ids.id}
                    onChange={handleRole}
                  >
                    {roles_ids.map((role_id, index) => (
                      <option key={index} value={role_id.id}>
                        {role_id.label}
                      </option>
                    ))}
                  </select>
                </div>
          </div>
        </div>
      );
    } else {
      return <h2 className="text-center">เพิ่มพนักงาน</h2>;
    }
  };

  const Updateimg = () => {
    if (id) {
      return (
        <div className="form-group mb-2">
          <label className="form-label"> ภาพเดิม : </label>
          <img
            src={pic + image}
            width="170"
            height="170"
            className="img-thumbnail"
          />
        </div>
      );
    }
  };

  const Newimage = () => {
    if (id) {
      return <span> </span>;
    }
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {title()}
            <div className="card-body">
              <form onSubmit={handleClick}>

                <div className="form-group mb-2">
                  <label className="form-label"> ชื่อ :</label>
                  <input
                    type="text"
                    placeholder="ชื่อ"
                    name="Name"
                    className="form-control"
                    value={name_Emp}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> ชื่อผู้ใช้งาน:</label>
                  <input
                    type="text"
                    placeholder="ชื่อผู้ใช้งาน"
                    name="Username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> รหัสผ่าน :</label>
                  <input
                    type="password"
                    placeholder="รหัสผ่าน"
                    name="Password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> เบอร์โทรศัพท์มือถือ :</label>
                  <input
                    placeholder="เบอร์โทรศัพท์มือถือ"
                    name="Phone"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> ที่อยู่ :</label>
                  <input
                    placeholder="ที่อยู่"
                    name="Address"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label"> ไลน์ไอดี :</label>
                  <input
                    placeholder="ไลน์ไอดี"
                    name="Line"
                    className="form-control"
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
                  ></input>
                </div>

                {Updateimg()}

                <div className="form-group mb-2">
                  <label className="form-label"> {Newimage()}ภาพใหม่ :</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    placeholder="รูปภาพ"
                    name="image"
                    className="form-control"
                    // value={image}
                    onChange={handleChange}
                    // onChange={(e) => handleChange(e)
                  ></input>
                </div>

                <div className="form-group mb-3">
                  {previewURL.map((ingSrc) => (
                    <img
                      src={ingSrc}
                      width="170"
                      height="170"
                      className="img-thumbnail"
                    />
                  ))}
                </div>

                <Button
                  disabled={isLoading}
                  variant="btn btn-outline-success"
                  onClick={handleClick}
                >
                  {isLoading ? "Loading..." : "ยืนยัน"}
                  {isLoading && <Spinner animation="border" size="sm" />}
                </Button>
                <Link to="/employee" className="btn btn-outline-danger mx-2">
                  {" "}
                  ยกเลิก{" "}
                </Link>
               
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeComponent;
