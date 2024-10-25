import React, { useState, useEffect, useRef } from "react";
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
  UPDATEPERSONALIMAGESUCCESS,
  DELETEKOISUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getUserDataThunk,
  uploadProfileImageThunk,
} from "../../../../store/apiThunk/userThunk";
import { Button } from "@mui/material";

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

  // console.log({ allKoiByAccountId });

  const [imagePreview, setImagePreview] = useState(userDetail.profileImage);
  // const [imageSelected, setImageSelected] = useState(false);

  // console.log(userDetail.profileImage);

  useEffect(() => {
    const fetchUserAndKoiData = async () => {
      const user = await dispatch(getUserDataThunk()).unwrap();
      // console.log("Fetched user data:", user); // Debugging line
      const accountId = user?.accountId;
      // console.log(accountId.id);
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
      confirmButtonColor: "#28a745", // Set to green
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      formFile: userDetail.profileImage || koifish,
    },
    validationSchema: Yup.object({
      formFile: Yup.mixed(),
    }),
    onSubmit: async (values) => {
      // setShowLoadingModal(true);
      dispatch(
        uploadProfileImageThunk({
          // accountId: accountId,
          formFile: values.formFile,
        })
      )
        .unwrap()
        .then(() => {
          // setShowLoadingModal(false);
          Swal.fire({
            title: SUCCESSTEXT,
            text: UPDATEPERSONALIMAGESUCCESS,
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
            background: "white",
            timer: 1500,
            timerProgressBar: true,
            scrollbarPadding: false,
          }).then(() => {
            window.location.reload(); // Refresh the page
          });
        })
        .catch((error) => {
          // setShowLoadingModal(false);
          Swal.fire({
            title: ERRORTEXT,
            text: error.message,
            icon: "error",
            showConfirmButton: false,
            background: "white",
            timer: 2000,
            timerProgressBar: true,
            scrollbarPadding: false,
          });
        });
    },
  });

  useEffect(() => {
    setImagePreview(userDetail.profileImage);
  }, [userDetail.profileImage]);

  return (
    <div>
      <div className="pi-giant-card">
        <div className="pi-container-1">
          <form onSubmit={formik.handleSubmit}>
            <div className="update-personal-image-container">
              <label htmlFor="formFile">
                <img
                  src={imagePreview} // Use imagePreview state here
                  alt="Koi"
                  className="image-preview-img"
                  // style={{ cursor: "pointer" }}
                />
              </label>
              {/* <input
                id="formFile"
                type="file"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  if (file) {
                    const fileUrl = URL.createObjectURL(file);
                    setImagePreview(fileUrl);
                    setImageSelected(true); // Set imageSelected to true
                    formik.setFieldValue("formFile", file); // Set the file in Formik
                  } else {
                    setImageSelected(false); // Reset if no file is selected
                  }
                }}
                accept="image/png, image/jpeg, image/jpg"
                style={{ display: "none" }} // Hide the input
              />
              {imageSelected && ( // Conditionally render the button
                <div className="update-personal-img-button-container">
                  <Button variant="contained" type="submit">
                    Update
                  </Button>
                </div>
              )} */}
            </div>
          </form>

          <div className="user-info">
            <p>
              Full Name: <span>{userDetail.fullname}</span>
            </p>
            <p>
              Name: <span>{userDetail.username}</span>
            </p>

            <p style={{ display: "flex" }}>
              Location: <span className="truncated">{userDetail.location}</span>
            </p>
            <p style={{ display: "flex" }}>
              Contact-Link:
              <span className="truncated">{userDetail.contactLink}</span>
            </p>
            <p>
              Phone Number: <span>{userDetail.phonenumber}</span>
            </p>
          </div>
          {/* <div className="edit-icon-container">
            <EditIcon
              sx={{ fontSize: 40, cursor: "pointer" }}
              onClick={() =>
                navigate(`/${direction}/updatePersonalInformation`, {
                  state: { userDetail: userDetail.accountId },
                })
              }
            />
          </div> */}
        </div>
        <Divider />

        <div className="pe-koi-button-container">
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

        <p className="koi_management_chart_title">Koi Management</p>

        <div className="Koi-Management-Chart">
          {allKoiByAccountId && allKoiByAccountId.length > 0 ? (
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
                      sx={{ color: green[500], fontSize: 30 }}
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
                      sx={{ color: red[500], fontSize: 30 }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-koi-message">
              <p>No Koi Fish Available</p>
            </div>
          )}
        </div>
      </div>
      <Divider />
    </div>
  );
}
