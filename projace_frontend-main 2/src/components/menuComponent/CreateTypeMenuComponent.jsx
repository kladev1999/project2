import React, { useState,useEffect } from "react";
import MenuService from "../../services/MenuService";
import {useNavigate} from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const CreateMenuTypeComponent = () => {
  //const [menu_Type, setMenu_Type] = useState();
  const navigate = useNavigate();


    const typeMenuData  ={
        typeMenu_ID : "",
        typeMenu_Name :"",
        menu_Type: "",
    };

    const [typeMenu, setTypeMenu] = useState(typeMenuData);

    const handleInput = (event) =>{
        const {name ,value }= event.target;
        console.log(event.target.value);
        setTypeMenu({...typeMenu,[name]:value});
    };

    const saveTypeMenu = () => {
        var data = {
            typeMenu_Name : typeMenu.typeMenu_Name,
            menu_Type : typeMenu.menu_Type
        };
        MenuService.addMenuType(data)
        .then((response) => {
            setTypeMenu({
                typeMenu_ID : response.data.typeMenu_ID,
                typeMenu_Name : response.data.typeMenu_Name,
                menu_Type : response.data.menu_Type
            });
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
        navigate("/ListMunuType");
    };

    const validationSchema = Yup.object().shape({
      typeMenu_Name: Yup.string().required("typeMenu_Name is required"),
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
            typeMenu_Name :"",
            menu_Type: "",
          }),
        300
      );
    }, []);

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <h2 className="text-center">เพิ่มชนิดเมนู</h2>
          <div className="card col-md-6 offset-md-3 offset-md-3">
            
            <div className="card-body">
            {user && (
              <form>
                <div className="form-group mb-2">
                <label className="form-label"> ประเภทเมนู </label>
                <select
                      style={{
                        width: "200px",
                        marginLeft: "10px",
                        marginBottom: "15px",
                        marginTop: "15px",
                      }}
                      name="typeMenu_ID"
                      value={typeMenu.menu_Type}
                      {...register("menu_Type")}
                      className={`form-control ${
                        errors.menu_Type ? "is-invalid" : ""
                      }`}
                      onChange={handleInput}
                    >
                      <option value="">
                        -- เลือกส่วนที่แสดง --
                      </option>
                      <option value="0">-- อาหาร --</option>
                      <option value="1"> -- บาร์เครื่องดื่ม -- </option>
                    </select>

                  <label className="form-label"> ชื่อชนิดเมนู</label>
                  <input
                    type="text"
                    placeholder="กรุณากรอกชื่อชนิดเมนู"
                    name="typeMenu_Name"
                    value={typeMenu.typeMenu_Name}
                    {...register('typeMenu_Name')}
                      className={`form-control ${
                        errors.typeMenu_Name ? 'is-invalid' : ''
                      }`}
                    onChange={handleInput}
                  ></input>
                  <div className="invalid-feedback">
                      {errors.typeMenu_Name?.message}
                    </div>
                </div>

                <button
                  className="btn btn-success"
                  style={{ marginLeft: "5px" }}
                  onClick={handleSubmit(saveTypeMenu)}
                >
                  ยืนยัน{" "}
                </button>

                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "5px" }}
                  onClick={() => navigate("/ListMunuType")}
                >
                  ยกเลิก
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

export default CreateMenuTypeComponent;
