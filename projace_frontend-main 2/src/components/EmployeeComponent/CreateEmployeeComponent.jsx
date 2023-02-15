import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import RoleService from "../../services/RoleService";
import axios from "axios";
import EmployeeService from "../../services/EmployeeService";
import { Button, Spinner } from "react-bootstrap";
import authHeader from "../../services/Auth-HeaderService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
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
  const Navigate = useNavigate();
  const [preview, setPreView] = useState([]);
  const [previewURL, setPreViewURL] = useState([]);
  const { id } = useParams();
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [Role, setRole] = useState();
  const url = "http://localhost:8080/file-upload-imageEmployees";

  let pic = "http://localhost:8080/menu/getimagesEmp/";

  const roles_ids = [
    { id: "1", value: "1", label: "ROLE_ADMIN" },
    { id: "2", value: "2", label: "ROLE_USER" },
    { id: "3", value: "3", label: "ROLE_COOK" },
  ];
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

  function handleClick() {
    setIsLoading(true);
    // perform some action here, then set isLoading back to false
    setTimeout(() => {
      var formData = new FormData();
      formData.append("file", ImageUpload[ImageUpload.length - 1]);

      axios
        .post(url, formData, { headers: authHeader() })
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
          EmployeeService.updateEmployee(id, employee, Role)
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
            image
          };
          EmployeeService.updateEmployee(id, employee, Role)
            .then((response) => {
              console.log("emp", response.data);
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
              Role,
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(5).required("name is required"),
    username: Yup.string().min(5).required("Username is required"),
    password: Yup.string().min(8).required("password is required"),
    phone: Yup.number("Phone number is use only number").min(10).required("phone is required"),
    address: Yup.string().required("address is required"),
    line: Yup.string().required("password is required"),
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
          name: name_Emp,
          username: username,
          password: password,
          phone: phone,
          address: address,
          line: line,
        }),
      300
    );
  }, []);

  useEffect(() => {
    getEmployeeRoles();

    if (preview.length < 1) return;
    const newPreviewURL = [];

    preview.forEach((pre) => newPreviewURL.push(URL.createObjectURL(pre)));
    setPreViewURL(newPreviewURL);
  }, [preview]);

  useEffect(() => {
    getEmployeeRoles();
  }, []);

  const title = () => {
    if (id) {
      return (
        <div>
          <div>
            <h2 className="text-center">Update Employee</h2>
          </div>
          <div className="input-roles">
            <div className="form-group mb-2">
              <select
                className="custom-select"
                style={{ width: "300px", marginLeft: "10px" }}
                id="roles_ids"
                name="roles_ids"
                value={roles_ids.id}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>เลือกตำแหน่ง</option>
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
      return <h2 className="text-center">Add Employee</h2>;
    }
  };

  const Updateimg = () => {
    if (id) {
      return (
        <div className="form-group mb-2">
          <label className="form-label"> Original : </label>
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
      return <span>New </span>;
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
              {user && (
                <form onSubmit={handleSubmit(handleClick)}>
                  <div className="form-group mb-2">
                    <label className="form-label"> Name :</label>
                    <input
                      name="name_Emp"
                      type="text"
                      value={name_Emp}
                      {...register('name')}
                      className={`form-control ${
                        errors.name ? 'is-invalid' : ''
                      }`}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      {errors.name?.message}
                    </div>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label"> Username:</label>
                    <input
                      name="username"
                      type="text"
                      value={username}
                      {...register("username")}
                      className={`form-control ${
                        errors.username ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      {errors.username?.message}
                    </div>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label"> Password :</label>
                    <input
                      name="password"
                      type="password"
                      value={password}
                      {...register("password")}
                      className={`form-control ${
                        errors.password ? "is-invalid" : ''
                      }`}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      {errors.password?.message}
                    </div>
                    
                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label"> Phone :</label>
                    <input
                      name="phone"
                      type="text"
                      value={phone}
                      {...register("phone")}
                      className={`form-control ${
                        errors.phone ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      {errors.phone?.message}
                    </div>

                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label"> Address :</label>
                    <input
                      name="address"
                      type="text"
                      value={address}
                      {...register("address")}
                      className={`form-control ${
                        errors.address ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      {errors.address?.message}
                    </div>
                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label"> Line :</label>
                    <input
                      name="line"
                      type="text"
                      value={line}
                      {...register("line")}
                      className={`form-control ${
                        errors.line ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setLine(e.target.value)}
                    />
                    <div className="invalid-feedback">
                      {errors.line?.message}
                    </div>
                  </div>

                  {Updateimg()}

                  <div className="form-group mb-2">
                    <label className="form-label"> {Newimage()}Picture :</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      placeholder="Picture"
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
                    onClick={handleSubmit(handleClick)}
                  >
                    {isLoading ? "Loading..." : "Save"}
                    {isLoading && <Spinner animation="border" size="sm" />}
                  </Button>
                  <Link to="/employee" className="btn btn-outline-danger mx-2">
                    {" "}
                    Cancel{" "}
                  </Link>
                </form>
              )}
              {!user && (
                <div className="text-center p-3">
                  <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeComponent;
