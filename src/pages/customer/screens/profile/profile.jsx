import React, { useState, useEffect, useRef } from "react";
import koifish from "../../../../assets/koi-fish-1.jpg";
import "./profile.css";

import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userDataSelector } from "../../../../store/sellectors";
import { Divider, Button } from "@mui/material";

import {
  UPDATEPERSONALIMAGESUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";

import {getUserDataThunk ,uploadProfileImageThunk } from "../../../../store/apiThunk/userThunk";

export default function Profile(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const direction = props.direction;

  const userDetail = useSelector(userDataSelector);

  const [imagePreview, setImagePreview] = useState(userDetail.profileImage);
  const [imageSelected, setImageSelected] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      formFile: userDetail.profileImage || koifish,
    },
    validationSchema: Yup.object({
      formFile: Yup.mixed(),
    }),
    onSubmit: async (values) => {
      dispatch(
        uploadProfileImageThunk({
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

  
  useEffect(() => {
    dispatch(getUserDataThunk()).then(() => setShowLoadingModal(false));
  }, [dispatch]);

  return (
    <>
      <div className="profile-container-1">
        <form onSubmit={formik.handleSubmit}>
          <div className="update-personal-image-container">
            <label htmlFor="formFile">
              <img
                src={imagePreview} // Use imagePreview state here
                alt="Koi"
                className="image-preview-img"
                style={{ cursor: "pointer" }}
              />
            </label>
            <input
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
            )}
          </div>
        </form>

        <div className="user-info">
          <p>
            Full Name: <span>{userDetail.fullname}</span>
          </p>
          <p>
            Name: <span>{userDetail.username}</span>
          </p>

          <p>
            Location: <span>{userDetail.location}</span>
          </p>
          <p style={{ display: "flex" }}>
            Contact-Link:
            <span className="truncated">{userDetail.contactLink}</span>
          </p>
          <p>
            Phone Number: <span>{userDetail.phonenumber}</span>
          </p>
        </div>
        <div className="edit-icon-container">
          <EditIcon
            sx={{ fontSize: 40, cursor: "pointer" }}
            onClick={() =>
              navigate(`/${direction}/updatePersonalInformation`, {
                state: { userDetail: userDetail.accountId },
              })
            }
          />
        </div>
      </div>
      <Divider />
    </>
  );
}
