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
import { Divider, Button, TextField } from "@mui/material";

import {
  UPDATEPERSONALIMAGESUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";

import {
  getUserDataThunk,
  uploadProfileImageThunk,
  resetPasswordThunk,
} from "../../../../store/apiThunk/userThunk";

export default function Profile(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const direction = props.direction;

  const userDetail = useSelector(userDataSelector);

  const [imagePreview, setImagePreview] = useState(userDetail.profileImage);
  const [imageSelected, setImageSelected] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false); // State for toggling password form visibility

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

  const passwordFormik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Old password is required"),
      newPassword: Yup.string()
        .required("New password is required")
        .min(4, "New password must be at least 4 characters long"),
    }),
    validateOnBlur: true, // Enable validation on blur
    validateOnChange: true, // Enable validation on change
    onSubmit: async (values) => {
      try {
        await dispatch(resetPasswordThunk(values)).unwrap();
        Swal.fire({
          title: "Success!",
          text: "Your password has been reset successfully.",
          icon: "success",
        });
        setShowPasswordForm(false); // Hide form after successful submission
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      }
    },
  });

  useEffect(() => {
    setImagePreview(userDetail.profileImage);
  }, [userDetail.profileImage]);

  useEffect(() => {
    dispatch(getUserDataThunk());
  }, [dispatch]);

  return (
    <>
      <div className="profile-container-1">
        <form onSubmit={formik.handleSubmit}>
          <div className="update-profile-image-container">
            <label htmlFor="formFile" className="image-label">
              <img
                src={imagePreview}
                alt="Koi"
                className="image-preview-img"
                style={{ cursor: "pointer" }}
              />
              {imageSelected && ( // Conditionally render the button inside the label
                <div className="update-profile-img-button-container">
                  <Button variant="contained" type="submit">
                    Update
                  </Button>
                </div>
              )}
            </label>
            <input
              id="formFile"
              type="file"
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                if (file) {
                  const fileUrl = URL.createObjectURL(file);
                  setImagePreview(fileUrl);
                  setImageSelected(true);
                  formik.setFieldValue("formFile", file);
                } else {
                  setImageSelected(false);
                }
              }}
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: "none" }}
            />
          </div>
        </form>

        <div className="profile-user-info">
          <div className="user-info-content">
            <p>
              Full Name: <span>{userDetail.fullname}</span>
            </p>
            <p>
              Name: <span>{userDetail.username}</span>
            </p>
            <p style={{ display: "flex" }}>
              Location:{" "}
              <span className="profile-truncated">{userDetail.location}</span>
            </p>
            <p style={{ display: "flex" }}>
              Contact-Link:{" "}
              <span className="profile-truncated">
                {userDetail.contactLink}
              </span>
            </p>
            <p>
              Phone Number: <span>{userDetail.phonenumber}</span>
            </p>
          </div>
          <div className="edit-profile-icon-container">
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

        {/* Button to toggle Password Reset Form */}
        <Button
          variant="outlined"
          onClick={() => setShowPasswordForm((prev) => !prev)}
          style={{ marginTop: "20px" }}
        >
          {showPasswordForm ? "Hide Reset Password" : "Reset Password"}
        </Button>

        {/* Password Reset Form */}
        {showPasswordForm && (
          <form
            onSubmit={passwordFormik.handleSubmit}
            style={{ marginTop: "20px" }}
          >
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Old Password"
              type="password"
              {...passwordFormik.getFieldProps("oldPassword")}
              error={
                passwordFormik.touched.oldPassword &&
                Boolean(passwordFormik.errors.oldPassword)
              }
              helperText={
                passwordFormik.touched.oldPassword &&
                passwordFormik.errors.oldPassword
              }
            />
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="New Password"
              type="password"
              {...passwordFormik.getFieldProps("newPassword")}
              error={
                passwordFormik.touched.newPassword &&
                Boolean(passwordFormik.errors.newPassword)
              }
              helperText={
                passwordFormik.touched.newPassword &&
                passwordFormik.errors.newPassword
              }
            />
            <Button type="submit" variant="contained" color="primary">
              Reset Password
            </Button>
          </form>
        )}
      </div>

      <Divider />
    </>
  );
}
