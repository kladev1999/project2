import React, { useState,useEffect } from "react";
import MenuService from "../../services/MenuService";
import {useNavigate} from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const CreateMenuTypeComponent = () => {
  const navigate = useNavigate();


    const typeMenuData  ={
        typeMenu_ID : "",
        typeMenu_Name :"",
    };

    const [typeMenu, setTypeMenu] = useState(typeMenuData);

    const handleInput = (event) =>{
        const {name ,value }= event.target;
        console.log(event.target.value);
        setTypeMenu({...typeMenu,[name]:value});
    };

    const saveTypeMenu = () => {
        var data = {
            typeMenu_Name : typeMenu.typeMenu_Name
        };
        MenuService.addMenuType(data)
        .then((response) => {
            setTypeMenu({
                typeMenu_ID : response.data.typeMenu_ID,
                typeMenu_Name : response.data.typeMenu_Name
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
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <div className="card-body">
            {user && (
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> TypeMenu Name</label>
                  <input
                    type="text"
                    placeholder="Enter StockType Name"
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
                  Submit{" "}
                </button>

                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "5px" }}
                  onClick={() => navigate("/ListMunuType")}
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

export default CreateMenuTypeComponent;
