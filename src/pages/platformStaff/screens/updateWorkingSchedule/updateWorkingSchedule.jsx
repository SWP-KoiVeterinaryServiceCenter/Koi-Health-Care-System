import React, { useState, useEffect } from "react";
import "./updateWorkingSchedule.css";
import {
  Button,
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import {
  UPDATEKOIINFORMATIONSUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";
import { BackButton } from "../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";

import {
  getKoiByIdThunk,
  updateKoiByAccountIdThunk,
} from "../../../../store/apiThunk/koiThunk";

import { allKoiByIdSelector } from "../../../../store/sellectors";

export default function UpdateWorkingSchedule() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // console.log("Location state:", location.state);
  const koiId = location.state?.koiId;
  // console.log("Koi ID:", koiId);

  const allKoiById = useSelector(allKoiByIdSelector);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showRender, setShowRender] = useState(false);

  const [imagePreview, setImagePreview] = useState(allKoiById.koiImage); // Initialize with the existing image

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

  useEffect(() => {
    setShowRender(true);
    dispatch(getKoiByIdThunk(koiId)).then(() => setShowRender(false));
  }, [koiId, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      koiName: allKoiById.koiName || "",
      weight: allKoiById.weight || "",
      age: allKoiById.age || "",
      gender: allKoiById.gender || "",
      varieties: allKoiById.varieties || "",
    },
    validationSchema: Yup.object({
      koiName: Yup.string().required("Vet Name cannot be empty"),
      weight: Yup.number()
        .required("Start Time cannot be empty")
        .min(0, "Start Time cannot be negative")
        .integer("Start Time must be an integer")
        .max(50, "Start Time cannot exceed 50kg"),
      age: Yup.number()
        .required("Age cannot be empty")
        .min(0, "Age cannot be negative")
        .integer("Age must be an integer")
        .max(20, "Age cannot exceed 20 year"),
      gender: Yup.string().required("Date cannot be empty"),
      varieties: Yup.string().required("End Time cannot be empty"),
    }),
    onSubmit: async (values) => {
      setShowLoadingModal(true);
      dispatch(
        updateKoiByAccountIdThunk({
          id: koiId,
          data: {
            // Gói dữ liệu bên trong đối tượng 'data'
            koiName: values.koiName,
            weight: values.weight,
            age: values.age, // Lưu ý: Bạn đã sử dụng nhầm values.weight cho age, hãy sửa lại
            gender: values.gender,
            varieties: values.varieties,
            koiImage: values.koiImage,
          },
        })
      )
        .unwrap()
        .then(() => {
          setShowLoadingModal(false);
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
      <div className="update_working_schedule">
        <Header
          title="Update Working Schedule"
          subtitle="Provide Working Schedule Information"
        />
        {!showRender ? (
          <form
            onSubmit={formik.handleSubmit}
            className="update_working_schedule_form_container"
          >
            <div className="update-working-schedule-frist-column">
              <div className="working-schedule-text-field-container">
                {/* Vet Name*/}
                <TextField
                  id="koiName"
                  label={
                    <span>
                      Vet Name <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.koiName}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="koiName"
                  margin="dense"
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
                {formik.touched.koiName && formik.errors.koiName && (
                  <div className="koi__update__validation__error">
                    {formik.errors.koiName}
                  </div>
                )}
              </div>

              {/* Start Time */}
              <div className="working-schedule-text-field-container">
                <TextField
                  id="weight"
                  label={
                    <span>
                      Start Time <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="weight"
                  margin="dense"
                  type="number"
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
                {formik.touched.weight && formik.errors.weight && (
                  <div className="koi__update__validation__error">
                    {formik.errors.weight}
                  </div>
                )}
              </div>
            </div>

            <div className="update-working-schedule-second-column">
              {/* Date*/}            
              <div className="working-schedule-text-field-container">
                <TextField
                  id="gender"
                  label={
                    <span>
                      Date <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="gender"
                  margin="dense"
                  type="string"
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
                {formik.touched.gender && formik.errors.gender && (
                  <div className="koi__update__validation__error">
                    {formik.errors.gender}
                  </div>
                )}
              </div>

              {/* End Time*/}
              <div className="working-schedule-text-field-container">
                <TextField
                  id="varieties"
                  label={
                    <span>
                      End Time <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.varieties}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="varieties"
                  margin="dense"
                  type="string"
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
                {formik.touched.varieties && formik.errors.varieties && (
                  <div className="koi__update__validation__error">
                    {formik.errors.varieties}
                  </div>
                )}
              </div>
              {!showLoadingModal ? (
                <div className="wrk-schedule-button-container">
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
      </div>
      <Box pt={6} px={1} mt={6} sx={{ color: "black", background: "#ebe2e1" }}>
        <Footer />
      </Box>
    </>
  );
}
