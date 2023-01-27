import axios from "axios";
import authHeader from "./Auth-HeaderService";
const getMenu = (page) => {
  return axios.get("http://localhost:8080/menu/getMenu",{ headers: authHeader()});
};

const addMenu = (menu) => {
  console.log(menu);
  return axios.post("http://localhost:8080/menu/addMenu", menu,{ headers: authHeader()});
};

const getMenuById = (menu_ID) => {
  return axios.get("http://localhost:8080/menu/getMenu/" + menu_ID,{ headers: authHeader()});
};

const updateMenu = (menu_ID, menu,menu_Pic) => {

 

    menu.menu_Pic = menu_Pic;

  
  return axios.put("http://localhost:8080/menu/updateMenu/" + menu_ID, menu,{ headers: authHeader()});
};

const deleteMenu = (menu_ID) => {
  return axios.delete("http://localhost:8080/menu/deleteMenu/" + menu_ID,{ headers: authHeader()});
};

const getMenuType = () => {
    return axios.get("http://localhost:8080/TypeMenu/getTypeMenu",{ headers: authHeader()});
};

const addMenuType = (typeMenu) => {
    return axios.post("http://localhost:8080/TypeMenu/addTypeMenu",typeMenu,{ headers: authHeader()});
};


const addPic = (menu_Pic) => {
  return axios.post("http://localhost:8080/file-upload" + menu_Pic,{ headers: authHeader()});

}


const MenuService = {
  getMenu,
  addMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
  getMenuType,
  addMenuType,
  addPic
};

export default MenuService;
