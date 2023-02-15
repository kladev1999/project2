import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuService from "../../services/MenuService";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import authHeader from "../../services/Auth-HeaderService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const CreateMenuComponent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [menu_Name, setmenu_Name] = useState([]);
  const [menu_Price, setmenu_Price] = useState([]);
  const [menu_Qty, setmenu_Qty] = useState([]);
  const [menu_Pic, setmenu_Pic] = useState([]);
  const [typeMenu_ID, setTypeMenu_ID] = useState([]);
  const [preview, setPreView] = useState([]);
  const [previewURL, setPreViewURL] = useState([]);
  const [menu_Type, setMenu_Type] = useState();

  const [typeMenu, setTypeMenu] = useState([]);
  const url = "http://localhost:8080/file-upload";

  const handleChange = (e) => {
    console.log("name", e.target.files[0].name);
    setPreView([...e.target.files]);
    let img = [...menu_Pic];
    for (var i = 0; i < e.target.files.length; i++) {
      img.push(e.target.files[i]);
    }
    setmenu_Pic(img);
  };

  const validationSchema = Yup.object().shape({
    menu_Name: Yup.string().required("Name is required"),
    menu_Price: Yup.number("Price number is use only number").required(
      "Price is required"
    ),
    menu_Qty: Yup.number("is use only number").required("is required"),
    typeMenu_ID: Yup.string().required("typeMenu_ID is required"),
    menu_Type: Yup.string().required("menu_Type is required"),
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
          menu_Name: "",
          menu_Type: "",
          menu_Price: "",
          menu_Qty: "",
          typeMenu_ID: "",
        }),
      300
    );
  }, []);
  function handleClick() {
    setIsLoading(true);

    setTimeout(() => {
      var formData = new FormData();
      formData.append("file", menu_Pic[menu_Pic.length - 1]);

      const menu = {
        menu_Name,
        menu_Price,
        menu_Type,
        menu_Qty,
        typeMenu_ID: {
          typeMenu_ID,
        },
      };

      axios
        .post(url, formData, { headers: authHeader() })
        .then((res) => {
          console.log("res", res);
        })
        .catch((e) => {
          console.log("Error", e);
        });
      MenuService.addMenu(menu)
        .then((response) => {
          navigate("/menu");
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
    }, 500);
  }

  const getMenuType = () => {
    MenuService.getMenuType()
      .then((response) => {
        setTypeMenu(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  useEffect(() => {
    if (preview.length < 1) return;
    const newPreviewURL = [];

    preview.forEach((pre) => newPreviewURL.push(URL.createObjectURL(pre)));
    setPreViewURL(newPreviewURL);
  }, [preview]);

  useEffect(() => {
    getMenuType();
  }, []);

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
              {user && (
                <form>
                  <div>
                    <label className="form-label"> ประเภทเมนู</label>
                    <select
                      style={{ width: "200px", marginLeft: "10px" }}
                      name="typeMenu_ID"
                      value={typeMenu_ID}
                      {...register("typeMenu_ID")}
                      className={`form-control ${
                        errors.typeMenu_ID ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setTypeMenu_ID(e.target.value)}
                    >
                      <option value="">--เลือกประเภทเมนู--</option>
                      {typeMenu.map((typeMenu, index) => (
                        <option key={index} value={typeMenu.typeMenu_ID}>
                          -- {typeMenu.typeMenu_Name} --
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      {errors.typeMenu_ID?.message}
                    </div>
                  </div>
                  <div className="form-group mb-2">
                    <select
                      style={{
                        width: "200px",
                        marginLeft: "10px",
                        marginBottom: "15px",
                        marginTop: "15px",
                      }}
                      name="typeMenu_ID"
                      value={menu_Type}
                      {...register("menu_Type")}
                      className={`form-control ${
                        errors.menu_Type ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setMenu_Type(e.target.value)}
                    >
                      <option value="">-- อาหารหรือเครืองดื่ม --</option>
                      <option value="0">-- อาหาร --</option>
                      <option value="1"> -- เครื่องดื่ม -- </option>
                    </select>
                    <div className="invalid-feedback">
                      {errors.menu_Type?.message}
                    </div>
                  </div>
                  <div className="form-group mb-2">
                    <label className="form-label">ชื่อเมนู</label>
                    <input
                      type="text"
                      placeholder="Enter Menu Name"
                      name="menu_Name"
                      value={menu_Name}
                      {...register("menu_Name")}
                      className={`form-control ${
                        errors.menu_Name ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setmenu_Name(e.target.value)}
                    ></input>
                    <div className="invalid-feedback">
                      {errors.menu_Name?.message}
                    </div>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label"> ราคา</label>
                    <input
                      type="text"
                      placeholder="Enter Menu Price"
                      name="menu_Price"
                      value={menu_Price}
                      {...register("menu_Price")}
                      className={`form-control ${
                        errors.menu_Price ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setmenu_Price(e.target.value)}
                    ></input>
                    <div className="invalid-feedback">
                      {errors.menu_Price?.message}
                    </div>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label">จำนวน</label>
                    <input
                      type="text"
                      placeholder="Enter Menu Qty"
                      name="menu_Qty"
                      value={menu_Qty}
                      {...register("menu_Qty")}
                      className={`form-control ${
                        errors.menu_Qty ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setmenu_Qty(e.target.value)}
                    ></input>
                    <div className="invalid-feedback">
                      {errors.menu_Qty?.message}
                    </div>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label"> รูป</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      placeholder="Enter Menu Picture"
                      name="menu_Pic"
                      onChange={handleChange}
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

                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "5px" }}
                    onClick={() => navigate("/menu")}
                  >
                    Cancel
                  </button>
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

export default CreateMenuComponent;
