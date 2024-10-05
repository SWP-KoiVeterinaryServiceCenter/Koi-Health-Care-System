import React, { useState, useEffect } from "react";
import "./PersonalInformation.css";

import koi from "../../../../assets/koi-fish-1.jpg";
import pen from "../../../../assets/pen.png";
import add from "../../../../assets/add.png";
import trash from "../../../../assets/bin.png";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getUserDataThunk } from "../../../../store/apiThunk/userThunk";
import { userDataSelector } from "../../../../store/sellectors";

const PersonalInformation = () => {
  const navigate = useNavigate();

  const handleAddMoreFishPageClick = () => {
    navigate("/addMoreFish");
    window.scrollTo(0, 0);
  };

  const userDetail = useSelector(userDataSelector);
  const dispatch = useDispatch();
console.log(userDetail);

  useEffect(() => {
    dispatch(getUserDataThunk());
  }, [dispatch]);

  return (
    <div>
      <div className="pi-giant-card">
        <div className="pi-container-1">
          <img src={koi} />
          <div className="divider"></div>
          <div className="user-info">
            <p>
              User-Name: <span>{userDetail.username}</span>
            </p>
            <p>
              Email: <span>{userDetail.email}</span>
            </p>
            <p>
              Location: <span>{userDetail.location}</span>
            </p>
            <p>
              Contact-Link: <span>{userDetail.contactLink}</span>
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
    </div>
  );
};

export default PersonalInformation;
