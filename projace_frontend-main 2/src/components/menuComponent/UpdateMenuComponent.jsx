import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MenuService from "../../services/MenuService";
import axios from "axios";
import authHeader from "../../services/Auth-HeaderService";
import { Button, Spinner } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
const UpdateMenuComponent = (props) => {
  const { menu_ID } = useParams();
  const url = "http://localhost:8080/file-upload";
  let pic = "http://localhost:8080/menu/getimages/";
  const [menu_Pic, setmenu_Pic] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreView] = useState([]);
  const [previewURL, setPreViewURL] = useState([]);
  const [typeMenu, setTypeMenu] = useState([]);
  const [typeMenu_ID, setTypeMenu_ID] = useState([]);
  const [menu_Type, setMenu_Type] = useState();
  let navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    menu_Name: Yup.string().required("กรุณากรอกชื่อเมนู"),
    menu_Price: Yup.number("กรุณากรอกตัวเลข").required(
      "กรุณากรอกราคาเมนู"
    ),
    typeMenu_ID: Yup.string().required("กรุณาระบุประเภทเมนู"),
    menu_Type: Yup.string().required("กรุณาระบุชนิดเมนู"),
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
          menu_Name: menu.menu_Name,
          menu_Price: menu.menu_Price,
          menu_Type: menu.menu_Type,
          menu_Pic: menu.menu_Pic,
          typeMenu_ID: menu.typeMenu_ID.typeMenu_ID,
        }),
      300
    );
  }, []);

  function handleClick() {
    setIsLoading(true);

    setTimeout(() => {
      var formData = new FormData();
      formData.append("file", menu_Pic[menu_Pic.length - 1]);

      axios
        .post(url, formData, { headers: authHeader() })
        .then((res) => {
          console.log("res", res);
        })
        .catch((e) => {
          console.log("Error", e);
        });

      if (menu_Pic.length >= 1) {
        MenuService.updateMenu(menu.menu_ID, menu)
          .then((response) => {
            console.log("menu".menu);
            navigate("/menu");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        MenuService.updateMenu(menu.menu_ID, menu, menu.menu_Pic)
          .then((response) => {
            console.log("menu".menu);
            navigate("/menu");
          })
          .catch((err) => {
            console.log(err);
          });
      }

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

  const menuState = {
    menu_ID: "",
    typeMenu_ID: "",
    menu_Name: "",
    menu_Price: "",
    menu_Pic: "",
    menu_Type: "",
  };

  const [menu, setMenu] = useState(menuState);

  const getMenuID = (menu_ID) => {
    MenuService.getMenuById(menu_ID)
      .then((response) => {
        setMenu(response.data);
        console.log(response.data);
        setTypeMenu_ID(response.data.typeMenu_ID.typeMenu_ID);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  useEffect(() => {
    getMenuID(menu_ID);
    getMenuType();

    if (preview.length < 1) return;
    const newPreviewURL = [];

    preview.forEach((pre) => newPreviewURL.push(URL.createObjectURL(pre)));
    setPreViewURL(newPreviewURL);
  }, [menu_ID, preview, typeMenu_ID]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log([name], value);
    setMenu({ ...menu, [name]: value });
  };
  const handleInputChangeTypeMenu = (event) => {
    const { name, value } = event.target;
    console.log([name], value);
    setMenu({ ...menu, [name]: { typeMenu_ID: value } });
  };

  const handleChange = (e) => {
    setPreView([...e.target.files]);
    let img = [...menu_Pic];
    for (var i = 0; i < e.target.files.length; i++) {
      img.push(e.target.files[i]);
    }
    setmenu_Pic(img);
  };

  const cancel = () => {
    navigate("/menu");
  };

  return (
    <div>
      <div className="edit-form">
        <h2 style={{ textAlign: "center" }}>อัพเดทเมนู</h2>
        {user && (
          <form>
            <div>
              <label className="form-label"> ประเภทเมนู </label>
              <select
                style={{ width: "200px", marginLeft: "10px" }}
                name="typeMenu_ID"
                value={menu.typeMenu_ID.typeMenu_ID}
                {...register("typeMenu_ID")}
                className={`form-control ${
                  errors.typeMenu_ID ? "is-invalid" : ""
                }`}
                onChange={handleInputChangeTypeMenu}
              >
                <option value="">--เลือกประเภทเมนู--</option>
                {typeMenu.map((typeMenu, index) => (
                  <option key={index} value={typeMenu.typeMenu_ID}>
                    --{typeMenu.typeMenu_Name}--
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors.typeMenu_ID?.message}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">ชื่อเมนู</label>
              <input
                type="text"
                id="menu_Name"
                name="menu_Name"
                value={menu.menu_Name}
                {...register("menu_Name")}
                className={`form-control ${
                  errors.menu_Name ? "is-invalid" : ""
                }`}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">
                {errors.menu_Name?.message}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">ราคาเมนู</label>
              <input
                type="text"
                id="menu_Price"
                name="menu_Price"
                value={menu.menu_Price}
                {...register("menu_Price")}
                className={`form-control ${
                  errors.menu_Price ? "is-invalid" : ""
                }`}
                onChange={handleInputChange}
              />
              <div className="invalid-feedback">
                {errors.menu_Price?.message}
              </div>
            </div>
            <div className="form-group mb-2">
              <label className="form-label"> Original : </label>
              <img
                src={pic + menu.menu_Pic}
                width="170"
                height="170"
                className="img-thumbnail"
              />
            </div>
            <div className="form-group mb-2">
              <label className="form-label"> รูปภาพเมนู</label>
              <input
                type="file"
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
            <button className="btn btn-danger mr-2" onClick={cancel}>
              ยกเลิก
            </button>

            <Button
              disabled={isLoading}
              variant="btn btn-outline-success"
              onClick={handleSubmit(handleClick)}
            >
              {isLoading ? "Loading..." : "ยืนยัน"}
              {isLoading && <Spinner animation="border" size="sm" />}
            </Button>
          </form>
        )}
        {!user && (
          <div className="text-center p-3">
            <span className="spinner-border spinner-border-lg align-center"></span>
          </div>
        )}
      </div>
    </div>
  );
};
export default UpdateMenuComponent;
