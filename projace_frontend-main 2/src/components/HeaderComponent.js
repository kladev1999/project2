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
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import BadgeIcon from "@mui/icons-material/Badge";
import BalconyIcon from "@mui/icons-material/Balcony";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import TimelineIcon from "@mui/icons-material/Timeline";
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
const drawerWidth = 200;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [anchorElUser, setAnchorElUser] = useState(null);
  let iconAdmin = [
    <HomeIcon />,
    <FastfoodIcon />,
    <LocalGroceryStoreIcon />,
    <AssignmentIcon />,
    <TableRestaurantIcon />,
    <BadgeIcon />,
    <CheckCircleIcon />,
    <MapsHomeWorkIcon />,
    <HolidayVillageIcon />,
    <TimelineIcon />,
  ];
  let iconUser = [<HomeIcon />, <TableRestaurantIcon />, <MapsHomeWorkIcon />, <LocalGroceryStoreIcon />];
  let iconCook = [<BalconyIcon />];

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

  const goPageAdmin = (i) => {
    if (i === 0) {
      return "/TotalOrder";
    } else if (i === 1) {
      return "/menu";
    } else if (i === 2) {
      return "/stock";
    } else if (i === 3) {
      return "/stockMenu";
    } else if (i === 4) {
      return "/table";
    } else if (i === 5) {
      return "/employee";
    } else if (i === 7) {
      return "/Kitchen";
    } else if (i === 6) {
      return "/promotion";
    } else if (i === 8) {
      return "/CashierComponent";
    } else if (i === 9) {
      return "/IncomeExpense";
    }
  };
  const goPageUser = (i) => {
    if (i === 0) {
      return "/TableOrderEmp";
    } else if (i === 1) {
      return "/TableEmp";
    } else if (i === 2) {
      return "/promotion";
    }
    else if (i === 3){
      return "/stockEmp";
    }
  };
  const goPageCook = (i) => {
    if (i === 0) {
      return "/Kitchen";
    }
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

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

  const proFile = (params) => {
    navigate("/profile");
  };

  let pic = "http://localhost:8080/menu/getimagesEmp/";

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const checkLogin = () => {
    if (user && user.accessToken) {
      return (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                ถวิล แปลว่า คิดถึง
              </Typography>

              <Box
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              ></Box>

              <Typography variant="h6" noWrap component="div">
              <div style={{marginRight: "10px"}}>

                {currentUser?.name_Emp+"  "}
              </div>
              </Typography>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={currentUser?.name_Emp}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={pic + currentUser?.image} />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Typography onClick={proFile} textAlign="center">
                      บัญชีผู้ใช้
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography onClick={logOut} textAlign="center">
                      ออกจากระบบ
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            {showAdminBoard && (
              <List>
                {[
                  "หน้าหลัก",
                  "เมนูอาหาร",
                  "วัตถุดิบ",
                  "วัตถุดิบในเมนู",
                  "โต๊ะ",
                  "พนักงาน",
                  "โปรโมชั่น",
                  "ครัว",
                  "บาร์น้ำ",
                  "รายรับ - รายจ่าย",
                ].map((text, index) => (
                  <ListItem key={text} disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      href={goPageAdmin(index)}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {iconAdmin[index]}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
                <Divider />
              </List>
            )}
            {showUser && (
              <List>
                {["Home", "Table", "Promotion","Stock"].map((text, index) => (
  
                  <ListItem key={text} disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      href={goPageUser(index)}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                 
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {iconUser[index]}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
                <Divider />
              </List>
            )}
            {showCook && (
              <List>
                {["Home"].map((text, index) => (
                  <ListItem key={text} disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      href={goPageCook(index)}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {iconCook[index]}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
                <Divider />
              </List>
            )}
          </Drawer>
          <DrawerHeader />
        </Box>
      );
    }
  };

  return <>{checkLogin()}</>;
};

export default HeaderComponent;
