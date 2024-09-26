import React from "react";
import "./service.css";
import Ultrasound from "../../assets/Ultrasound.png";
import fishveterinarians from "../../assets/fishveterinarians.png";
import medicine from "../../assets/medicine.png";
import AppAppBar from "../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
import Footer from "../authorize/landingPage/LandingPageDetail/Footer/Footer";
import { Divider } from "@mui/material";

const Service = () => {
  return (
    <div>
      <AppAppBar />
      <div className="title">
        <p>Avaliable Sevice In Our System</p>
      </div>
      <div className="container">
        <div class="card">
          <img src={fishveterinarians} />
          <div class="card-details">
            <p class="text-title">Service</p>
            <p class="text-body">Dịch Vụ Trực Tuyến Với Bác Sĩ Thú Y</p>
          </div>
          <button class="card-button">More info</button>
        </div>

        <div class="card">
          <img src={Ultrasound} />
          <div class="card-details">
            <p class="text-title">Service</p>
            <p class="text-body">
              Dịch Vụ Hẹn Bác Sĩ Tận Nhà Đánh Giá Chất Lượng Cá Koi Và Tư Vấn
              Cải Thiện Hồ Cá
            </p>
          </div>
          <button class="card-button">More info</button>
        </div>

        <div class="card">
          <img src={medicine} />
          <div class="card-details">
            <p class="text-title">Service</p>
            <p class="text-body">
              Dịch Vụ Điếu Trị Bệnh Cho Cá Và Kê Đơn Thuốc{" "}
            </p>
          </div>
          <button class="card-button">More info</button>
        </div>
      </div>
      <Divider />
      <Footer />
    </div>
  );
};

export default Service;
