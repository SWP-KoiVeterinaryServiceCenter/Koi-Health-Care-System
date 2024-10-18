import React from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import "./UploadPersonalImage.css";
import koifish from "../../../../assets/koi-fish-1.jpg";
import {
  UPDATEKOIINFORMATIONSUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";
import { BackButton } from "../../../../components/modal/backModal/backModal";
import {
  getUserDataThunk,
  uploadProfileImageThunk,
} from "../../../../store/apiThunk/userThunk";
import { userDataSelector } from "../../../../store/sellectors";

export default function UploadPersonalImage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // console.log("Navigating to uploadPersonalImage with accountId:", userDetail.accountId);

  const accountId = location.state?.accountId;

  // console.log(accountId);

  const [imagePreview, setImagePreview] = useState(koifish);

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
            // border: "1px solid rgba(255, 255, 255, 0.5)", // Light white border
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

  // const userDetail = useSelector(userDataSelector);

  // console.log("Received accountId:", accountId);

  useEffect(() => {
    dispatch(getUserDataThunk());
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      formFile: koifish || "",
    },
    validationSchema: Yup.object({
      formFile: Yup.mixed().required("Koi image is required"),
    }),
    onSubmit: async (values) => {
      // setShowLoadingModal(true);
      dispatch(
        uploadProfileImageThunk({
          accountId: accountId,
          data: {
            formFile: values.formFile,
          },
        })
      )
        .unwrap()
        .then(() => {
          // setShowLoadingModal(false);
          
          Swal.fire({
            title: SUCCESSTEXT,
            text: UPDATEKOIINFORMATIONSUCCESS,
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
  return (
    <>
      <div className="update_koi_fish">
        <Header
          title="Upload Personal Image"
          // subtitle="Provide Koi Information"
        />
        <div>
          <form onSubmit={formik.handleSubmit} className="form-container">
            <div className="update-koi-image-field">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Koi"
                  className="image-preview-img"
                />
              )}
              <input
                id="formFile"
                type="file"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  formik.setFieldValue("formFile", file);
                  if (file) {
                    const fileUrl = URL.createObjectURL(file);
                    setImagePreview(fileUrl);
                  }
                }}
                accept="image/png, image/jpeg, image/jpg"
              />
              {formik.touched.formFile && formik.errors.formFile && (
                <div className="koi__update__validation__error">
                  {formik.errors.formFile}
                </div>
              )}
            </div>
            <div className="up-koi-button-container">
              <BackButton style={{ fontSize: "14px" }} />
              <Button className="btn" variant="contained" type="submit">
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
