import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MenuService from "../../services/MenuService";
import axios from "axios";
import authHeader from "../../services/Auth-HeaderService";
import { Button, Spinner } from 'react-bootstrap';
const UpdateMenuComponent = (props) => {
  const { menu_ID } = useParams();
  const url = "http://localhost:8080/file-upload"
  let pic = "http://localhost:8080/menu/getimages/"
  const [menu_Pic, setmenu_Pic] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreView] = useState([]);
  const [previewURL, setPreViewURL] = useState([]);
  let navigate = useNavigate();



  function handleClick(e) {
    setIsLoading(true);

    setTimeout(() =>{
      e.preventDefault();

      var formData = new FormData();
      formData.append("file", menu_Pic[menu_Pic.length - 1]);
  
  
      axios.post(url, formData,{ headers: authHeader()}).then((res) => {
        console.log('res', res);
      }).catch(e => {
        console.log('Error', e);
      });
  
      if (menu_Pic.length >= 1) {
  
        MenuService.updateMenu(menu.menu_ID, menu)
          .then((response) => {
            navigate("/menu");
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
  
      } else {
  
        MenuService.updateMenu(menu.menu_ID, menu, menu.menu_Pic)
          .then((response) => {
            navigate("/menu");
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
  
      }
  
      setIsLoading(false)
    },500)


  }

  const menuState = {
    menu_ID: "",
    typeMenu_ID: "",
    menu_Name: "",
    menu_Price: "",
    menu_Qty: "",
    menu_Pic: "",
    menu_Cost: "",
    menu_Status: "",
  };

  const [menu, setMenu] = useState(menuState);

  const getMenuID = (menu_ID) => {
    MenuService.getMenuById(menu_ID)
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  useEffect(() => {
    getMenuID(menu_ID);

    if (preview.length < 1) return;
    const newPreviewURL = [];

    preview.forEach(pre => newPreviewURL.push(URL.createObjectURL(pre)))
    setPreViewURL(newPreviewURL);
  }, [menu_ID, preview]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMenu({ ...menu, [name]: value });
  };

  const handleChange = (e) => {

    setPreView([...e.target.files])
    let img = [...menu_Pic];
    for (var i = 0; i < e.target.files.length; i++) {
      img.push(e.target.files[i]);
    }
    setmenu_Pic(img);
  }



  const cancel = () => {
    navigate("/menu");
  };

  return (
    <div>
      {menu ? (
        <div className="edit-form">
          <h2 style={{ textAlign: "center" }}>Menu Update</h2>
          <form>
            <div className="form-group">
              <h4 style={{ textAlign: "center" }}>
                <label htmlFor="title">
                  คุณกำลังอัพเดทประเภทอาหาร
                  <p style={{ color: "green" }}>
                    {menu.typeMenu_ID.typeMenu_Name}
                  </p>
                </label>
              </h4>
            </div>
            <div className="form-group">
              <label htmlFor="description">Menu Name</label>
              <input
                type="text"
                className="form-control"
                id="menu_Name"
                name="menu_Name"
                value={menu.menu_Name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Menu Price</label>
              <input
                type="text"
                className="form-control"
                id="menu_Price"
                name="menu_Price"
                value={menu.menu_Price}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Menu Cost</label>
              <input
                type="text"
                className="form-control"
                id="menu_Cost"
                name="menu_Cost"
                value={menu.menu_Cost}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Menu Qty</label>
              <input
                type="text"
                className="form-control"
                id="menu_Qty"
                name="menu_Qty"
                value={menu.menu_Qty}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Menu Status</label>
              <input
                type="text"
                className="form-control"
                id="menu_Status"
                name="menu_Status"
                value={menu.menu_Status}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <label className="form-label"> Original : </label>
              <img src={pic + menu.menu_Pic} width="170" height="170" className="img-thumbnail" />
            </div>
            <div className="form-group mb-2">
              <label className="form-label"> Menu Picture</label>
              <input
                type="file"
                placeholder="Enter Menu Picture"
                name="menu_Pic"
                className="form-control"
                onChange={handleChange}

              ></input>
            </div>

            <div className="form-group mb-3">

              {
                previewURL.map((ingSrc) => (

                  <img src={ingSrc} width="170" height="170" className="img-thumbnail" />
                ))
              }
            </div>


          </form>
          <button className="btn btn-danger mr-2" onClick={cancel}>
            Cancel
          </button>

          <Button disabled={isLoading} variant="btn btn-outline-success" onClick={handleClick}>
                  {isLoading ? 'Loading...' : 'Update'}
                  {isLoading && <Spinner animation="border" size="sm" />}
                </Button>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Menu...</p>
        </div>
      )}
    </div>
  );
};
export default UpdateMenuComponent;
