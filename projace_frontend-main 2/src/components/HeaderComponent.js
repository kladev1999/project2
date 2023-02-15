import React, { useState, useEffect } from "react";
import AuthService from "../services/Auth-service";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [showCook, setShowCook] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    console.log("sssss", user);

    if (user) {
      setCurrentUser(user);
      setShowUser(user.roles.includes("ROLE_USER"));
      setShowCook(user.roles.includes("ROLE_COOK"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = (e) => {
    e.preventDefault();
    if(window.confirm("Are you sure you want to log out")){
      AuthService.logout();
      setShowUser(false);
      setShowCook(false);
      navigate("/Login");
      setCurrentUser(undefined);
    }
    

    // window.location.reload();
  };
  let pic = "http://localhost:8080/menu/getimagesEmp/";

  const Breand = () => {
    if (showAdminBoard) {
      return (
        <>
          <img
            src={pic + currentUser?.image}
            className="rounded-circle"
            style={{ margin: "5px" }}
            alt="img"
            width="60"
            height="60"
           href="/profile"
          />
          <Navbar.Brand href="/TotalOrder">ผู้ดูแล</Navbar.Brand>;
        </>
      );
    } else if (showUser) {
      return (
        <>
          <img
            src={pic + currentUser?.image}
            className="rounded-circle"
            style={{ margin: "5px" }}
            alt="img"
            width="60"
            height="60"
          />
          <Navbar.Brand href="/TableOrderEmp">พนักงานรับรายการอาหาร</Navbar.Brand>;
        </>
      );
    } else {
      return (
        <>
          <img
            src={pic + currentUser?.image}
            className="rounded-circle"
            style={{ margin: "5px" }}
            alt="img"
            width="60"
            height="60"
          />
          <Navbar.Brand href="/Kitchen">พนักงานครัว</Navbar.Brand>;
        </>
      );
    }
  };

  const checkLogin = () => {
    if (user && user.accessToken) {
      return (
        <div className="text-center">
          <Navbar bg="dark" variant={"dark"} expand="lg">
            {Breand()}
            <Navbar.Toggle aria-controls="navbarScroll" />
            {showAdminBoard && (
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="mr-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link href="/stock" className="navbar-brand">
                    สต๊อกวัตถุดิบ
                  </Nav.Link>
                  {/* <Nav.Link href="/monthCost" className="navbar-brand">
                    monthCost
                  </Nav.Link> */}
                  <Nav.Link href="/menu" className="navbar-brand">
                    เมนูอาหาร
                  </Nav.Link>
                  <Nav.Link href="/stockMenu" className="navbar-brand">
                    วัตถุดิบในเมนู
                  </Nav.Link>
                  <Nav.Link href="/TableOrderEmp" className="navbar-brand">
                    สั่งอาหาร
                  </Nav.Link>
                  <Nav.Link href="/table" className="navbar-brand">
                    โต๊ะ
                  </Nav.Link>
                  <Nav.Link href="/employee" className="navbar-brand">
                    จัดการพนักงาน
                  </Nav.Link>
                  <Nav.Link href="/Kitchen" className="navbar-brand">
                    ครัว
                  </Nav.Link>
                  <Nav.Link href="/promotion" className="navbar-brand">
                    โปรโมชั่น
                  </Nav.Link>
                  <Nav.Link href="/IncomeExpense" className="navbar-brand">
                    รายงาน
                  </Nav.Link>
                  <Nav.Link href="/profile" className="navbar-brand">
                    โปรไฟล์
                  </Nav.Link>
                  <Nav.Link
                    href="/login"
                    className="navbar-brand"
                    onClick={logOut}
                  >
                    ออกจากระบบ
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            )}

            {showUser && (
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="mr-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link href="/TableOrderEmp" className="navbar-brand">
                    สั่งอาหาร
                  </Nav.Link>
                  <Nav.Link href="/stock" className="navbar-brand">
                    สต๊อกวัตถุดิบ
                  </Nav.Link>
                  <Nav.Link href="/table" className="navbar-brand">
                    โต๊ะ
                  </Nav.Link>
                  <Nav.Link href="/promotion" className="navbar-brand">
                    โปรโมชั่น
                  </Nav.Link>
                  <Nav.Link href="/profile" className="navbar-brand">
                    โปรไฟล์
                  </Nav.Link>
                  <Nav.Link
                    href="/login"
                    className="navbar-brand"
                    onClick={logOut}
                  >
                    ออกจากระบบ
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            )}

            {showCook && (
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="mr-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link href="/Kitchen" className="navbar-brand">
                    ครัว
                  </Nav.Link>
                  <Nav.Link href="/profile" className="navbar-brand">
                    โปรไฟล์
                  </Nav.Link>
                  <Nav.Link
                    href="/login"
                    className="navbar-brand"
                    onClick={logOut}
                  >
                    ออกจากระบบ
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            )}
          </Navbar>
        </div>
      );
    }
  };

  return <>{checkLogin()}</>;
};

export default HeaderComponent;
