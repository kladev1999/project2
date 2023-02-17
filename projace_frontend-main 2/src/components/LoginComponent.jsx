import { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import AuthService from "../services/Auth-service";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("userName is required"),
    passWord: Yup.string().required("passWord is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  // const login = (e) => {
  //   e.preventDefault();
  //   const login = {
  //     userName,
  //     passWord
  //   }
  //   AuthService.login(login)
  //     .then((response) => {
  //       console.log(response.data);
  //       if (response.data) {
  //         // employee();
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleLogin = async () => {
    try {
      await AuthService.login(userName, passWord).then(() => {
        navigate("/Profile");
        window.location.reload();
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="App">
        <div className="form-inner">
          <div>
            <h2>Login</h2>
          </div>
          <div>
            <h5>Tawinmanagement System</h5>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username : </label>
            <input
              type="text"
              name="username"
              id="username"
              {...register("userName")}
              className={`inputLogin ${
                errors.userName ? "is-invalid" : ""
              }`}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="invalid-feedback">
              {errors.userName?.message}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              name="password"
              id="password"
              {...register("passWord")}
              className={`inputLogin ${
                errors.passWord ? "is-invalid" : ""
              }`}
              onChange={(e) => setPassword(e.target.value)}
            />
             <div className="invalid-feedback">
              {errors.passWord?.message}
            </div>
          </div>
          <div style={{ margin: "5px" }}>
            <input type="submit" />
          </div>
        </div>
      </div>
    </form>
  );
};
export default LoginForm;
