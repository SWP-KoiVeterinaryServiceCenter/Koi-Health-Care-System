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

import { getKoiByAccountIdThunk } from "../../../../store/apiThunk/koiThunk";
import { allKoiByAccountIdSelector } from "../../../../store/sellectors";

import { deleteKoiByAccountIdThunk } from "../../../../store/apiThunk/koiThunk";

export default function PersonalInformation(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const direction = props.direction; // Destructure direction from props

  // Get user details and koi details from Redux state
  const userDetail = useSelector(userDataSelector);
  const allKoiByAccountId = useSelector(allKoiByAccountIdSelector);

  useEffect(() => {
    const fetchUserAndKoiData = async () => {
      const user = await dispatch(getUserDataThunk()).unwrap();
      const accountId = user?.accountId;

      if (accountId) {
        dispatch(getKoiByAccountIdThunk(accountId));
      } else {
        console.error("AccountId is undefined.");
      }
    };

    fetchUserAndKoiData();
  }, [dispatch]);

  const handleDeleteKoi = (koiId) => {
    dispatch(deleteKoiByAccountIdThunk(koiId))
      .unwrap()
      .then(() => {
        console.log(`Koi with ID ${koiId} deleted.`);
      })
      .catch((error) => {
        console.error("Error deleting koi:", error);
      });
  };

  return (
    <div>
      <div className="pi-giant-card">
        <div className="pi-container-1">
          <img src={koi} alt="Koi Fish" />
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
          {allKoiByAccountId &&
            allKoiByAccountId.map((koi) => (
              <div className="KoiName" key={koi.id}>
                <p>Koi Name: {koi.koiName}</p>
                <p>Weight: {koi.weight} kg</p>
                <p>Age: {koi.age} years</p>
                <p>Gender: {koi.gender}</p>
                <p>Varieties: {koi.varieties}</p>
                <img src={pen} alt="Edit" />
                <img
                  src={trash}
                  alt="Delete"
                  onClick={() => handleDeleteKoi(koi.id)} // Deleting koi by ID
                  style={{ cursor: "pointer" }} // Make the icon clickable
                />
              </div>
            ))}
        </div>

        <div
          className="pi-add-button"
          onClick={() => {
            if (direction) {
              navigate(`/${direction}/addMoreFish`);
            } else {
              console.error("Direction is undefined.");
            }
          }}
        >
          <p>Add More Fish</p>
          <img src={add} alt="Add" />
        </div>
      </div>
      <Divider />
    </div>
  );
}
