import React,{useState,useEffect} from 'react'
import { useParams, Link ,useNavigate} from "react-router-dom";
import MenuService from "../../services/MenuService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

function UpdateMenutype() {
  const { Menutype_ID } = useParams();
  const [Menutype, setMenutype] = useState();
  const [user, setUser] = useState(null);
  const [menu_Type, setMenuType] = useState();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    Menutype: Yup.string().required("กรุณากรอกชนิดเมนู"),
    
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;


  useEffect(() => {
    setTimeout(
      () =>
        setUser({
          Menutype: "",
        }),
      300
    );

    getTableByID();
  }, []);

  function MenuType() {
    var data = {
      typeMenu_Name: Menutype,
      menu_Type:menu_Type
    };

    MenuService.updateMenuType(Menutype_ID, data)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });

    navigate("/ListMunuType");
  }

  const getTableByID = () => {
    MenuService.getMenuTypeByID(Menutype_ID).then((res) => {
      setMenutype(res.data.typeMenu_Name,res.data.menu_Type);
      console.log(res.data);
    });
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3>อัพเดทชนิดเมนู</h3>
            <div className="card-body">
              {user && (
                <form>
                  <div className="form-group mb-2">
                  <label className="form-label"> ประเภทเมนู </label>
                <select
                      style={{
                        width: "200px",
                        marginLeft: "10px",
                        marginBottom: "15px",
                        marginTop: "15px",
                      }}
                      name="typeMenu_ID"
                      value={menu_Type}
                      {...register("menu_Type")}
                      className={`form-control ${
                        errors.menu_Type ? "is-invalid" : ""
                      }`}
                      onChange={(e) => setMenuType(e.target.value)}
                    >
                      <option value="">
                        -- เลือกส่วนที่แสดง --
                      </option>
                      <option value="0">-- อาหาร --</option>
                      <option value="1"> -- บาร์เครื่องดื่ม -- </option>
                    </select>

                    <label className="form-label"> ชนิดเมนู :</label>
                    <input
                      type="text"
                      placeholder="ชนิดเมนู"
                      name="MenuType"
                      value={Menutype}
                      {...register('Menutype')}
                      className={`form-control ${
                        errors.Menutype ? 'is-invalid' : ''
                      }`}
                      onChange={(e) => setMenutype(e.target.value)}
                    ></input>
                     <div className="invalid-feedback">
                      {errors.Menutype?.message}
                    </div>
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={handleSubmit(MenuType)}
                  >
                    {" "}
                    ยืนยัน{" "}
                  </button>{" "}
                  <Link to="/ListMunuType" className="btn btn-danger">
                    {" "}
                    ยกเลิก{" "}
                  </Link>
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
}

export default UpdateMenutype;
