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
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    Menutype: Yup.string().required("Menutype is required"),
    
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
      setMenutype(res.data.typeMenu_Name);
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
            <h3>Update StockType</h3>
            <div className="card-body">
              {user && (
                <form>
                  <div className="form-group mb-2">
                    <label className="form-label"> StockType :</label>
                    <input
                      type="text"
                      placeholder="StockType"
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
                    Update{" "}
                  </button>{" "}
                  <Link to="/ListMunuType" className="btn btn-danger">
                    {" "}
                    Cancel{" "}
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
