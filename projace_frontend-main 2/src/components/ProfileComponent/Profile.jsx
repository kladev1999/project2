import React from "react";
import AuthService from "../../services/Auth-service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  console.log("yoo",currentUser.image)
  let pic = "http://localhost:8080/menu/getimagesEmp/"

  return (
    <div className="container">
    <div className="text-center">
      <header className="jumbotron">
        <h3>
          <p>
          <img src={pic+currentUser.image} className="rounded-circle" style={{margin: "20px"}} alt="img" width="200" height="200" />
          </p>
          <p>สวัสดีคุณ {currentUser.name_Emp}</p>
        </h3>
      </header>
      {/* <button className="btn btn-info" style={{margin: "20px"}}>แก้ไขข้อมูลส่วนตัว</button> */}
      <p>
        <strong>รหัสพนักงาน:</strong> {currentUser.id}
      </p>
      <strong>สถานะ:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
    </div>
    </div>
  );
};

export default Profile;
