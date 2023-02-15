import React, { useState } from "react";
import MenuService from "../../services/MenuService";
import {useNavigate} from "react-router-dom";


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
        navigate("/menu");
    };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <h2 className="text-center">เพิ่มชนิดเมนู</h2>
          <div className="card col-md-6 offset-md-3 offset-md-3">
            
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> ชื่อชนิดเมนู</label>
                  <input
                    type="text"
                    placeholder="กรุณากรอกชื่อชนิดเมนู"
                    name="typeMenu_Name"
                    className="form-control"
                    value={typeMenu.typeMenu_Name}
                    onChange={handleInput}
                  ></input>
                </div>

                <button
                  className="btn btn-success"
                  style={{ marginLeft: "5px" }}
                  onClick={saveTypeMenu}
                >
                  ยืนยัน{" "}
                </button>

                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "5px" }}
                  onClick={() => navigate("/menu")}
                >
                  ยกเลิก
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMenuTypeComponent;
