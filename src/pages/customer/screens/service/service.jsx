import React from "react";
import "./service.css";
import Ultrasound from "../../../../assets/Ultrasound.png";
import fishveterinarians from "../../../../assets/fishveterinarians.png";
import medicine from "../../../../assets/medicine.png";
// import AppAppBar from "../../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
// import Footer from "../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import { Divider } from "@mui/material";

import { useNavigate, Outlet } from "react-router-dom";

export default function Service(props) {
  const navigate = useNavigate();
  const direction = props.direction;
  const handleServiceInformationClick = () => {
    navigate(`/${direction}/serviceInformation`);
  };

  return (
    <div>
      {/* <AppAppBar /> */}
      <div className="title">
        <p>Available Services In Our System</p>
      </div>
      <div className="container">
        <div className="card" onClick={handleServiceInformationClick}>
          <img src={fishveterinarians} alt="Fish Veterinarians" />
          <div className="card-details">
            <p className="text-title">Service</p>
            <p className="text-body">Dịch Vụ Trực Tuyến Với Bác Sĩ Thú Y</p>
          </div>
          <button className="card-button">More info</button>
        </div>

        <div className="card">
          <img src={Ultrasound} alt="Ultrasound Service" />
          <div className="card-details">
            <p className="text-title">Service</p>
            <p className="text-body">
              Dịch Vụ Hẹn Bác Sĩ Tận Nhà Đánh Giá Chất Lượng Cá Koi Và Tư Vấn Cải Thiện Hồ Cá
            </p>
          </div>
          <button className="card-button">More info</button>
        </div>

        <div className="card">
          <img src={medicine} alt="Medicine Service" />
          <div className="card-details">
            <p className="text-title">Service</p>
            <p className="text-body">
              Dịch Vụ Điều Trị Bệnh Cho Cá Và Kê Đơn Thuốc
            </p>
          </div>
          <button className="card-button">More info</button>
        </div>
      </div>
      <Divider />

      {/* Placeholder for child routes */}
      <Outlet />

      {/* <Footer /> */}
    </div>
  );
};


