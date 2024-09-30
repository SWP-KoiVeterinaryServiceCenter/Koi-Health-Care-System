import React from "react";
import "./PersonalInformation.css";

import koi from "../../../../assets/koi-fish-1.jpg";
import pen from "../../../../assets/pen.png";
import add from "../../../../assets/add.png";
// import trash from "../../../assets/bin.png";
// import AppAppBar from "../../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
// import Footer from "../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PersonalInformation = () => {
  const navigate = useNavigate();

  const handleAddMoreFishPageClick = () => {
    navigate("/addMoreFish");
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {/* <AppAppBar /> */}
      <div className="pi-giant-card">
        <div className="pi-container-1">
          <img src={koi} />
          <div className="divider"></div>
          <div className="user-info">
            <p>
              User-Name: <span>Van A</span>
            </p>
            <p>
              Full-Name: <span>Nguyen Van A</span>
            </p>
            <p>
              Email: <span>nguyenvana@gmail.com</span>
            </p>
            <p>
              Phone: <span>0908765779</span>
            </p>
            <p>
              Address: <span>145/66/4 Phuong 4 Quan 9 Ho Chi Minh</span>
            </p>
          </div>
        </div>

        <div className="horizontal-divider"></div>

        <div className="Koi-Management-Chart">
          <p>Koi Management</p>

          <div className="KoiName">
            <p>Koi Name 1 </p>
            <img src={pen} />
            <img src={trash} />
          </div>
          <div className="KoiName">
            <p>Koi Name 2 </p>
            <img src={pen} />
            <img src={trash} />
          </div>
          <div className="KoiName">
            <p>Koi Name 3 </p>
            <img src={pen} />
            <img src={trash} />
          </div>
          <div className="KoiName">
            <p>Koi Name 4 </p>
            <img src={pen} />
            <img src={trash} />
          </div>
        </div>

        <div className="pi-add-button" onClick={handleAddMoreFishPageClick}>
          <p>Add More Fish</p>
          <img src={add} />
        </div>
      </div>
      <Divider />
      {/* <Footer /> */}
    </div>
  );
};

export default PersonalInformation;
