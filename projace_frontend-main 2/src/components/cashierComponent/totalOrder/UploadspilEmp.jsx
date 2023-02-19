import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import TotalOrderService from "../../../services/TotalOrderService";
import authHeader from "../../../services/Auth-HeaderService";

function UploadspilEmp() {
    const { totalOrder_ID } = useParams();
  const [previewURL, setPreViewURL] = useState([]);
  const [preview, setPreView] = useState([]);
  const [ImageUpload, SetImageUpload] = useState([]);
  const navigate = useNavigate();
  const url = "http://localhost:8080/file-upload-pay"

  useEffect(() => {
    if (preview.length < 1) return;
    const newPreviewURL = [];

    preview.forEach((pre) => newPreviewURL.push(URL.createObjectURL(pre)));
    setPreViewURL(newPreviewURL);
  }, [preview]);

  const handleChange = (e) => {
    console.log("name", e.target.files[0].name);
    console.log(e.target.files);

    setPreView([...e.target.files]);

    let img = [...ImageUpload];
    for (var i = 0; i < e.target.files.length; i++) {
      img.push(e.target.files[i]);
    }
    SetImageUpload(img);
  };

  const Back = () => {
    navigate("/TableOrderEmp")
  }

  console.log("Img",ImageUpload)
  
  

  function handleClick(e) {
    var formData = new FormData();
    formData.append("file", ImageUpload[ImageUpload.length - 1]);

    axios
    .post(url, formData, { headers: authHeader() })
      .then((res) => {
        console.log("res", res);
      })
      .catch((e) => {
        console.log("Error", e);
      });

      TotalOrderService.UpdateSlip(totalOrder_ID).then(() => {
        navigate("/TableOrderEmp")
    })

  }

  return (
    <>
      <div className="text-center">
        <h1>สลิปโอนเงิน</h1>

        <form>
          <div className="form-group mb-8">
            <label className="form-label"> รูปภาพ :</label>
            <input
              style={{marginLeft: "25px"}}
              type="file"
              multiple
              accept="image/*"
              placeholder="Picture"
              name="image"
              className="form-control"
              // value={image}
              onChange={handleChange}
              // onChange={(e) => handleChange(e)
            ></input>

            <div className="form-group mb-3">
              {previewURL.map((ingSrc) => (
                <img
                  src={ingSrc}
                  style={{ marginTop: "10px",marginLeft: "25px"}}
                  width="470"
                  height="470"
                  className="img-thumbnail"
                />
              ))}
            </div>
          </div>
        </form>
      </div>
      <div className="text-center">

      <button className="btn btn-success"
      style={{margin: "10px"}}
      onClick={(e) => handleClick(e)}
      disabled={ImageUpload.length === 0}
      >อัพโหลด</button>
      <button className="btn btn-danger"
        onClick={Back}
      >กลับ</button>
      </div>
    </>
  );
}

export default UploadspilEmp;
