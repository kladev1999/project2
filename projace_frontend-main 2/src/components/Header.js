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
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const Header = () => {
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
    AuthService.logout();
    setShowUser(false);
    setShowCook(false);
    navigate("/Login");
    setCurrentUser(undefined);

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
          <Navbar.Brand href="/TotalOrder">หน้าแรก</Navbar.Brand>;
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
          <Navbar.Brand href="/TableOrderEmp">หน้าแรก</Navbar.Brand>;
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
          <Navbar.Brand href="/Kitchen">หน้าแรก</Navbar.Brand>;
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
                    stock
                  </Nav.Link>
                  {/* <Nav.Link href="/monthCost" className="navbar-brand">
                    monthCost
                  </Nav.Link> */}
                  <Nav.Link href="/menu" className="navbar-brand">
                    Menu
                  </Nav.Link>
                  <Nav.Link href="/stockMenu" className="navbar-brand">
                    StockMenu
                  </Nav.Link>
                  <Nav.Link href="/table" className="navbar-brand">
                    table
                  </Nav.Link>
                  <Nav.Link href="/employee" className="navbar-brand">
                    employee
                  </Nav.Link>
                  <Nav.Link href="/Kitchen" className="navbar-brand">
                    Kitchen
                  </Nav.Link>
                  <Nav.Link href="/promotion" className="navbar-brand">
                    promotion
                  </Nav.Link>
                  <Nav.Link href="/IncomeExpense" className="navbar-brand">
                    IncomeExpense
                  </Nav.Link>
                  <Nav.Link href="/profile" className="navbar-brand">
                    profile
                  </Nav.Link>
                  <Nav.Link
                    href="/login"
                    className="navbar-brand"
                    onClick={logOut}
                  >
                    LogOut
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
                    stock
                  </Nav.Link>
                  <Nav.Link href="/table" className="navbar-brand">
                    table
                  </Nav.Link>
                  <Nav.Link href="/promotion" className="navbar-brand">
                    promotion
                  </Nav.Link>
                  <Nav.Link href="/profile" className="navbar-brand">
                    profile
                  </Nav.Link>
                  <Nav.Link
                    href="/login"
                    className="navbar-brand"
                    onClick={logOut}
                  >
                    LogOut
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
                    Kitchen
                  </Nav.Link>
                  <Nav.Link href="/profile" className="navbar-brand">
                    profile
                  </Nav.Link>
                  <Nav.Link
                    href="/login"
                    className="navbar-brand"
                    onClick={logOut}
                  >
                    LogOut
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

export default Header;
