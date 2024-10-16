import React, { useState, useEffect } from "react";
import "./PersonalInformation.css";
import koifish from "../../../../assets/koi-fish-1.jpg";
import { red, green } from "@mui/material/colors";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  DELETEKOISUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";
import Swal from "sweetalert2";
import { getUserDataThunk } from "../../../../store/apiThunk/userThunk";
import { userDataSelector } from "../../../../store/sellectors";

import { getKoiByAccountIdThunk } from "../../../../store/apiThunk/koiThunk";
import { allKoiByAccountIdSelector } from "../../../../store/sellectors";

import { deleteKoiByAccountIdThunk } from "../../../../store/apiThunk/koiThunk";

export default function PersonalInformation(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const direction = props.direction; // Destructure direction from props
  // const [showLoadingModal, setShowLoadingModal] = useState(false);

  // Get user details and koi details from Redux state
  const userDetail = useSelector(userDataSelector);
  const allKoiByAccountId = useSelector(allKoiByAccountIdSelector);

  console.log({ allKoiByAccountId });

  useEffect(() => {
    const fetchUserAndKoiData = async () => {
      const user = await dispatch(getUserDataThunk()).unwrap();
      const accountId = user?.accountId;
      console.log(accountId.id);
      if (accountId) {
        dispatch(getKoiByAccountIdThunk(accountId));
      } else {
        console.error("AccountId is undefined.");
      }
    };

    fetchUserAndKoiData();
  }, [dispatch]);

  const handleDeleteKoi = (id) => {
    // Show confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#28a745', // Set to green
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Deleting koi with ID: ${id}`);
        dispatch(deleteKoiByAccountIdThunk(id))
          .unwrap()
          .then(() => {
            Swal.fire({
              title: SUCCESSTEXT,
              text: DELETEKOISUCCESS,
              icon: "success",
              showCancelButton: false,
              showConfirmButton: false,
              background: "white",
              timer: 1500,
              timerProgressBar: true,
              scrollbarPadding: false,
            }).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            Swal.fire({
              title: ERRORTEXT,
              text: error.message,
              icon: "error",
              showConfirmButton: true,
              background: "white",
            });
          });
      }
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
              <div className="KoiName" key={koi.id}>
                <div className="koi_card">
                  <div className="koi_info">
                    <img
                      src={koi.koiImage}
                      alt="Koi Fish"
                      className="koi_image"
                    />
                    <div className="koi_details">
                      <p>Name: {koi.koiName}</p>
                      <p>Weight: {koi.weight} kg</p>
                      <p>Age: {koi.age} years</p>
                      <p>Gender: {koi.gender}</p>
                      <p>Varieties: {koi.varieties}</p>
                    </div>
                  </div>
                  <div className="icon_container">
                    <CreateOutlinedIcon
                      alt="Edit"
                      className="edit_icon"
                      sx={{ color: green[300], fontSize: 40 }}
                      onClick={() =>
                        navigate(`/${direction}/updateKoiFishInformation`, {
                          state: { koiId: koi.id },
                        })
                      }
                    />
                    <DeleteOutlineOutlinedIcon
                      alt="Delete"
                      onClick={() => handleDeleteKoi(koi.id)}
                      className="delete_icon"
                      sx={{ color: red[500], fontSize: 40 }}
                    />
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
