import { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import AuthService from "../services/Auth-service";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      await AuthService.login(userName,passWord)
      .then(() =>{
        navigate("/Profile");
        window.location.reload();
      })
    }catch(err){
      console.log(err);
    }
  }

  const employee = () => {
    navigate("/employee");
  };

  return (
    <form onSubmit={handleLogin}>
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
              className="inputLogin"
              type="text"
              name="username"
              id="username"
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password : </label>
            <input
              className="inputLogin"
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ margin: "5px" }}>
            <input
              type="submit"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
export default LoginForm;
