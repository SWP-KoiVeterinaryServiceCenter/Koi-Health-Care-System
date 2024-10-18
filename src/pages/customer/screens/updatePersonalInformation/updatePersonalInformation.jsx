import { Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import {
  UPDATEPERSONALINFORMATIONSUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";
import { BackButton } from "../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import './updatePersonalInformation.css'

import {
  getUserDataThunk,
  updatePersonalInformationThunk,
} from "../../../../store/apiThunk/userThunk";
import { userDataSelector } from "../../../../store/sellectors";

export default function UpdatePersonalInformation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  //   console.log("Location state:", location.state);

  const accountId = location.state?.accountId;

  const userDetail = useSelector(userDataSelector);

  //   console.log(userDetail);

  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showRender, setShowRender] = useState(false);

  //   const [imagePreview, setImagePreview] = useState(allKoiById.koiImage); // Initialize with the existing image

  const Header = ({
    title,
    subtitle,
    titleColor = "gray",
    subtitleColor = "gray",
  }) => {
    return (
      <Box mb={2}>
        <Typography
          style={{
            fontFamily: "Source Sans Pro, sans-serif",
            fontSize: "32px",
            color: titleColor,
            fontWeight: "700",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Shadow effect
            padding: "4px", // Optional: padding to make the border more visible
            borderRadius: "4px", // Optional: rounded corners for the border
          }}
        >
          {title}
        </Typography>
        <Typography variant="subtitle1" style={{ color: subtitleColor }}>
          {subtitle}
        </Typography>
      </Box>
    );
  };

  useEffect(() => {
    setShowRender(true);
    dispatch(getUserDataThunk(accountId)).then(() => setShowRender(false));
  }, [accountId, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: userDetail.username || "",
      fullname: userDetail.fullname || "",
      location: userDetail.location || "",
      contactLink: userDetail.contactLink || "",
      phonenumber: userDetail.phonenumber || "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username cannot be empty")
        .min(4, "Username must be at least 4 characters")
        .max(15, "Username must be at most 15 characters"),

      fullname: Yup.string()
        .required("Full name cannot be empty")
        .min(4, "Full name must be at least 4 characters")
        .max(20, "Full name must be at most 20 characters"),

      location: Yup.string().required("Location cannot be empty"),
      contactLink: Yup.string(),

      phonenumber: Yup.string()
        .required("Phone number cannot be empty")
        .min(9, "Phone number must be at least 9 digits")
        .max(13, "Phone number must be at most 13 digits"),
    }),
    onSubmit: async (values) => {
      setShowLoadingModal(true);
      dispatch(
        updatePersonalInformationThunk({
          id: accountId,
          username: values.username,
          fullname: values.fullname,
          location: values.location,
          contactLink: values.contactLink,
          phonenumber: values.phonenumber,
        })
      )
        .unwrap()
        .then(() => {
          setShowLoadingModal(false);
          Swal.fire({
            title: SUCCESSTEXT,
            text: UPDATEPERSONALINFORMATIONSUCCESS,
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
            background: "white",
            timer: 1500,
            timerProgressBar: true,
            scrollbarPadding: false,
          }).then(() => {
            navigate(-1);
          });
        })
        .catch((error) => {
          setShowLoadingModal(false);
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

  return (
    <>
      <div className="update_personal_information">
        <Header
          title="Update Personal Information"
          subtitle="Provide Personcal Information"
        />
        {!showRender ? (
          <form onSubmit={formik.handleSubmit} className="update_personal_information_form-container">
            {/* <div className="update-koi-image-field">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Koi"
                  className="image-preview-img"
                />
              )}
              <input
                id="koiImage"
                type="file"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  formik.setFieldValue("koiImage", file);
                  if (file) {
                    const fileUrl = URL.createObjectURL(file);
                    setImagePreview(fileUrl);
                  }
                }}
                accept="image/png, image/jpeg, image/jpg"
              />
              {formik.touched.koiImage && formik.errors.koiImage && (
                <div className="koi__update__validation__error">
                  {formik.errors.koiImage}
                </div>
              )}
            </div> */}
            {/* ///////////////////////////////////// */}
            <div className="update-personal-information-second-column">
              <div className="upi-text-field-container">
                {/* User Name */}
                <TextField
                  id="username"
                  label={
                    <span>
                      User Name <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="username"
                  margin="dense"
                  color="secondary"
                  type="text"
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  InputProps={{
                    style: {
                      backgroundColor: "#f5f5f5",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      color: "black",
                    },
                  }}
                />
                {formik.touched.username && formik.errors.username && (
                  <div className="koi__update__validation__error">
                    {formik.errors.username}
                  </div>
                )}
              </div>

              <div className="upi-text-field-container">
                {/* Full Name */}
                <TextField
                  id="fullname"
                  label={
                    <span>
                      Full Name <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="fullname"
                  margin="dense"
                  type="text"
                  color="secondary"
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  InputProps={{
                    style: {
                      backgroundColor: "#f5f5f5",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      color: "black",
                    },
                  }}
                />
                {formik.touched.fullname && formik.errors.fullname && (
                  <div className="koi__update__validation__error">
                    {formik.errors.fullname}
                  </div>
                )}
              </div>

              <div className="upi-text-field-container">
                {/* Location */}
                <TextField
                  id="location"
                  label={
                    <span>
                      Location <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="location"
                  margin="dense"
                  type="text"
                  color="secondary"
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  InputProps={{
                    style: {
                      backgroundColor: "#f5f5f5",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      color: "black",
                    },
                  }}
                />
                {formik.touched.location && formik.errors.location && (
                  <div className="koi__update__validation__error">
                    {formik.errors.location}
                  </div>
                )}
              </div>
            </div>

            <div className="update-personal-information-third-column">
              {/* Contact Link */}
              <div className="upi-text-field-container">
                <TextField
                  id="contactLink"
                  label={
                    <span>
                      Contact Link <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.contactLink}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="contactLink"
                  margin="dense"
                  type="text" // Change to text
                  color="secondary"
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  InputProps={{
                    style: {
                      backgroundColor: "#f5f5f5",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      color: "black",
                    },
                  }}
                />
                {formik.touched.contactLink && formik.errors.contactLink && (
                  <div className="koi__update__validation__error">
                    {formik.errors.contactLink}
                  </div>
                )}
              </div>

              {/* Phone Number */}
              <div className="upi-text-field-container">
                <TextField
                  id="phonenumber"
                  label={
                    <span>
                      Phone number <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.phonenumber}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="phonenumber"
                  margin="dense"
                  type="tel"
                  color="secondary"
                  InputLabelProps={{
                    style: { color: "black" },
                  }}
                  InputProps={{
                    style: {
                      backgroundColor: "#f5f5f5",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      color: "black",
                    },
                  }}
                />
                {formik.touched.phonenumber && formik.errors.phonenumber && (
                  <div className="koi__update__validation__error">
                    {formik.errors.phonenumber}
                  </div>
                )}
              </div>

              {!showLoadingModal ? (
                <div className="up-pi-koi-button-container">
                  <BackButton style={{ fontSize: "14px" }} />
                  <Button className="btn" variant="contained" type="submit">
                    Update
                  </Button>
                </div>
              ) : (
                <LoadingModal />
              )}
            </div>
          </form>
        ) : (
          <LoadingModal />
        )}
      </div>{" "}
      <Divider />
    </>
  );
}
