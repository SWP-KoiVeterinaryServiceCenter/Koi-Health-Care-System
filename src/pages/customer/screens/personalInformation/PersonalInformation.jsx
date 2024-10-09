import React, { useState, useEffect } from "react";
import "./PersonalInformation.css";
import koifish from "../../../../assets/koi-fish-1.jpg";
import pen from "../../../../assets/pen.png";
import trash from "../../../../assets/bin.png";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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

  console.log({ allKoiByAccountId });

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

  // const handleDeleteKoi = (id) => {
  //   dispatch(deleteKoiByAccountIdThunk(id))
  //     .unwrap()
  //     .then(() => {
  //       console.log(`Koi with ID ${id} deleted.`);
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting koi:", error);
  //     });
  // };

  const handleDeleteKoi = (id) => {
    console.log(`Deleting koi with ID: ${id}`);
    dispatch(deleteKoiByAccountIdThunk(id))
      .unwrap()
      .then(() => {
        console.log(`Koi with ID ${id} deleted.`);
      })
      .catch((error) => {
        // console.error("Error deleting koi:", error);
      });
  };

  return (
    <div>
      <div className="pi-giant-card">
        <div className="pi-container-1">
          <img src={koifish} alt="Koi Fish" />
          <div className="user-info">
            <p>
              Name: <span>{userDetail.username}</span>
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
        <Divider />

        <div className="button-container">
          <div
            className="pi-add-button"
            onClick={() => {
              if (direction) {
                window.scrollTo(0, 0);
                navigate(`/${direction}/addMoreFish`);
              } else {
                console.error("Direction is undefined.");
              }
            }}
          >
            <div style={{ display: "flex", gap: "5px" }}>
              Add More Fish
              <AddCircleOutlineIcon />
            </div>
          </div>
        </div>

        {/* <p className="koi_management_chart_title">Koi Management</p> */}

        <div className="Koi-Management-Chart">
          {allKoiByAccountId &&
            allKoiByAccountId.map((koi) => (
              <div className="KoiName">
                <div className="koi_card">
                  <div className="koi_info">
                    <img src={koifish} alt="Koi Fish" className="koi_image" />
                    <div className="koi_details">
                      <p>Name: {koi.koiName}</p>
                      <p>Weight: {koi.weight} kg</p>
                      <p>Age: {koi.age} years</p>
                      <p>Gender: {koi.gender}</p>
                      <p>Varieties: {koi.varieties}</p>
                      <div className="icon_container">
                        <img
                          src={pen}
                          alt="Edit"
                          className="edit_icon"
                          onClick={() => {
                            if (direction) {
                              window.scrollTo(0, 0); // Scroll to the top of the page
                              navigate(
                                `/${direction}/updateKoiFishInformation`
                              );
                            } else {
                              console.error("Direction is undefined.");
                            }
                          }}
                        />
                        <img
                          src={trash}
                          alt="Delete"
                          onClick={() => handleDeleteKoi(koi.id)} // Deleting koi by ID
                          className="delete_icon"
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Divider />
    </div>
  );
}
