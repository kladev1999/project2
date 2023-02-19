import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuService from "../../services/MenuService";
import "bootstrap/dist/css/bootstrap.min.css";
import { BootstrapTable, Pagination } from "react-bootstrap-table-next";
const ListMenuComponent = () => {
  const [menuList, setMenuList] = useState([]);
  const [search, searchInput] = useState("");
  const [typeMenu, setTypeMenu] = useState([]);
  const [typeMenu_ID, setTypeMenu_ID] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  let countpage = 0;
  const [searchName, setsearchName] = useState("");

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = menuList.slice(indexOfFirstRow, indexOfLastRow);



  let pic = "http://localhost:8080/menu/getimages/";

  const getAllMenu = () => {
    MenuService.getMenu()
      .then((response) => {
        setMenuList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getMenuType = () => {
    MenuService.getMenuType()
      .then((response) => {
        setTypeMenu(response.data);
        setTypeMenu_ID(response.data[0].typeMenu_ID);
        console.log("type", response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteMenu = (menu_ID) => {
    if (window.confirm("Are you sure you want to delete")) {
      MenuService.deleteMenu(menu_ID)
        .then((response) => {
          getAllMenu();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    getAllMenu();
    getMenuType();
  }, []);

  const viewMenu = (menu_ID) => {
    navigate("/viewMenu/" + menu_ID);
  };

  const editMenu = (menu_ID) => {
    navigate("/update-Menu/" + menu_ID);
  };

  const addMenu = () => {
    navigate("/addMenu");
  };

  const addMenuType = () => {
    navigate("/ListMunuType");
  };

  const editStockMenu = (menu_ID) => {
    navigate("/addStockMenu/" + menu_ID);
  };

  
  const filterMenu = menuList.filter((menuList) => {
    if(search.length>0){

      return (
        menuList.typeMenu_ID.typeMenu_Name
        .toLowerCase()
        .includes(search.toLowerCase())
      );
    }else if(searchName.length>2){
      return (
        menuList.menu_Name
        .toLowerCase()
        .includes(searchName.toLowerCase())
      );
    }else{
      return (
        menuList.typeMenu_ID.typeMenu_Name
        .toLowerCase()
        .includes(search.toLowerCase())
      );
    }
  });

  const timestamp = (data) => {
    let timestamp = data.split("T");
    let time = timestamp[1].split(".");
    let d = timestamp[0].split("-");
    let y = parseInt(d[0]) + 543;
    let day = d[2] + "/" + d[1] + "/" + y;

    return <>{day}</>;
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center">เมนูอาหาร</h2>
        <div className="">
          <button
            className="btn btn-primary mr-2 "
            style={{ margin: 5 }}
            onClick={addMenu}
          >
            {" "}
            เพิ่มเมนู
          </button>
          <button
            className="btn btn-primary mr-2 "
            style={{ margin: 5 }}
            onClick={addMenuType}
          >
            {" "}
            ประเภทเมนู
          </button>
        <input
          type="search"
          placeholder="ค้นหา"
          aria-label="Search"
          onChange={(e) => setsearchName(e.target.value)}
        />
        <select
          className="custom-select"
          style={{ width: "150px", marginLeft: "10px" }}
          id="typeMenu_ID"
          name="typeMenu_ID"
          onChange={(e) => searchInput(e.target.value)}
        >
            <option value="">ประเภทเมนู</option>
          {typeMenu.map((typeMenu, index) => (
            <option key={index} value={typeMenu.typeMenu_Name}>
              {typeMenu.typeMenu_Name}
            </option>
          ))}
        </select>
      </div>

        <br></br>
        <br></br>
        <div className="row" style={{ textAlign: "center" }}>
          <table className="table table-striped table-bordered ">
            <thead>
              <tr>
                <th> รหัสเมนู </th>
                <th> รูปเมนู </th>
                <th> ชื่อเมนู </th>
                <th> ราคาเมนู </th>
                <th> ชนิดเมนู </th>
                <th> เวลาที่เพิ่มเมนู </th>
                <th> จัดการเมนู </th>
              </tr>
            </thead>
            <tbody>
              {filterMenu.map((menus, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td width="100">
                    <img
                      src={pic + menus.menu_Pic}
                      alt="img"
                      width="80"
                      height="70"
                    />
                  </td>
                  <td>{menus.menu_Name}</td>
                  <td>{menus.menu_Price}</td>
                  <td>{menus.typeMenu_ID.typeMenu_Name}</td>
                  <td>{timestamp(menus.menu_TimeStamp)}</td>
                  <td>
                    <button
                      onClick={() => editMenu(menus.menu_ID)}
                      className="btn btn-primary"
                    >
                      แก้ไข{" "}
                    </button>

                    <button
                      style={{ marginLeft: "5px" }}
                      onClick={() => viewMenu(menus.menu_ID)}
                      className="btn btn-info"
                    >
                      ดูข้อมูล{" "}
                    </button>

                    <button
                      style={{ marginLeft: "5px" }}
                      onClick={() => editStockMenu(menus.menu_ID)}
                      className="btn btn-warning"
                    >
                      เพิ่มวัตถุดิบ{" "}
                    </button>
                    <button
                      style={{ marginLeft: "5px" }}
                      onClick={() => deleteMenu(menus.menu_ID)}
                      className="btn btn-danger"
                    >
                      ลบ{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListMenuComponent;
