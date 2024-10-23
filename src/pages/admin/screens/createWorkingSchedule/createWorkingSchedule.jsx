import React, { useState } from "react";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import {
  TextField,
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addKoiByAccountIdThunk } from "../../../../store/apiThunk/koiThunk";
import {
  ADDPACKAGESUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";
import { BackButton } from "../../../../components/modal/backModal/backModal";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import Swal from "sweetalert2";
import "./createWorkingSchedule.css";

export default function CreateWorkingSchedule() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const Header = ({
    title,
    subtitle,
    titleColor = "gray",
    subtitleColor = "gray",
  }) => {
    return (
      <Box>
        <Typography
          style={{
            fontFamily: "Source Sans Pro, sans-serif",
            fontSize: "32px",
            color: titleColor,
            fontWeight: "700",
            textShadow:
              "1px 1px 2px rgba(0, 0, 0, 0.3), 0 0 25px rgba(0, 0, 0, 0.2)",
            padding: "10px",
            borderRadius: "4px",
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

  const formik = useFormik({
    initialValues: {
      koiName: "",
      weight: "",
      age: "",
      gender: "",
      varieties: "",
    },
    validationSchema: Yup.object({
      koiName: Yup.string().required("Vet Name cannot be empty"),
      weight: Yup.number()
        .required("Date cannot be empty")
        .min(0, "Date cannot be negative")
        .integer("Date must be an integer")
        .max(50, "Date cannot exceed 50kg"),
      age: Yup.number()
        .required("Age cannot be empty")
        .min(0, "Age cannot be negative")
        .integer("Age must be an integer")
        .max(20, "Age cannot exceed 20 year"),
      gender: Yup.string().required("Start time cannot be empty"),
      varieties: Yup.string().required("End Time cannot be empty"),
    }),

    onSubmit: async (values) => {
      setShowLoadingModal(true);
      dispatch(
        addKoiByAccountIdThunk({
          koiName: values.koiName,
          weight: values.weight,
          age: values.age,
          gender: values.gender,
          varieties: values.varieties,
        })
      )
        .unwrap()
        .then(() => {
          setShowLoadingModal(false);
          Swal.fire({
            title: SUCCESSTEXT,
            // text: ADDPACKAGESUCCESS,
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
          console.error("Error response:", error);
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
      <div className="working-schedule">
        <Header
          title="Create Working Schedule  "
          subtitle="Provide Working Schedule"
        />
        <form
          onSubmit={formik.handleSubmit}
          className="create-schedule-form-container"
        >
          {/* 1st Column: */}
          <div className="create-schedule-form-first-column">
            <div className="working-schedule-text-field-container">
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
                margin="dense"
                color="secondary"
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{
                  style: {
                    backgroundColor: "#f5f5f5",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    color: "black",
                  },
                }}
              />
              {formik.touched.koiName && formik.errors.koiName && (
                <div className="working__schedule__validation__error">
                  {formik.errors.koiName}
                </div>
              )}
            </div>

            <div className="working-schedule-text-field-container">
            <TextField
                id="gender"
                label={
                  <span>
                    Start Time<span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                value={formik.values.gender}
                onChange={formik.handleChange}
                fullWidth
                margin="dense"
                color="secondary"
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{
                  style: {
                    backgroundColor: "#f5f5f5",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    color: "black",
                  },
                }}
              />
              {formik.touched.gender && formik.errors.gender && (
                <div className="working__schedule__validation__error">
                  {formik.errors.gender}
                </div>
              )}
            </div>
          </div>

          {/* 2nd Column */}
          <div className="create-schedule-form-second-column">
            <div className="working-schedule-text-field-container">
              <TextField
                id="weight"
                label={
                  <span>
                    Date <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                value={formik.values.weight}
                onChange={formik.handleChange}
                fullWidth
                margin="dense"
                type="number"
                color="secondary"
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{
                  style: {
                    backgroundColor: "#f5f5f5",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    color: "black",
                  },
                }}
              />
              {formik.touched.weight && formik.errors.weight && (
                <div className="working__schedule__validation__error">
                  {formik.errors.weight}
                </div>
              )}
            </div>

            <div className="working-schedule-text-field-container">
              <TextField
                id="varieties"
                label={
                  <span>
                    End Time<span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                value={formik.values.varieties}
                onChange={formik.handleChange}
                fullWidth
                margin="dense"
                color="secondary"
                InputLabelProps={{ style: { color: "black" } }}
                InputProps={{
                  style: {
                    backgroundColor: "#f5f5f5",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    color: "black",
                  },
                }}
              />
              {formik.touched.varieties && formik.errors.varieties && (
                <div className="working__schedule__validation__error">
                  {formik.errors.varieties}
                </div>
              )}
            </div>
            {/* Button Container */}
            {!showLoadingModal ? (
              <div className="working-schedule-button-container">
                {/* <BackButton style={{ fontSize: "14px" }} /> */}
                <Button className="btn" variant="contained" type="submit">
                  Create
                </Button>
              </div>
            ) : (
              <LoadingModal />
            )}
          </div>

          {/* 3rd Column */}
          {/* <div className="create-schedule-form-third-column">
              <div className="working-schedule-text-field-container">
                <TextField
                  id="weight"
                  label={
                    <span>
                      Weight (kg) <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  fullWidth
                  margin="dense"
                  type="number"
                  color="secondary"
                  InputLabelProps={{ style: { color: "black" } }}
                  InputProps={{
                    style: {
                      backgroundColor: "#f5f5f5",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      color: "black",
                    },
                  }}
                />
                {formik.touched.weight && formik.errors.weight && (
                  <div className="working__schedule__validation__error">
                    {formik.errors.weight}
                  </div>
                )}
              </div>

              <div className="working-schedule-text-field-container">
                <TextField
                  id="varieties"
                  label={
                    <span>
                      Varieties <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.varieties}
                  onChange={formik.handleChange}
                  fullWidth
                  margin="dense"
                  color="secondary"
                  InputLabelProps={{ style: { color: "black" } }}
                  InputProps={{
                    style: {
                      backgroundColor: "#f5f5f5",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      color: "black",
                    },
                  }}
                />
                {formik.touched.varieties && formik.errors.varieties && (
                  <div className="working__schedule__validation__error">
                    {formik.errors.varieties}
                  </div>
                )}
              </div>

            
            </div> */}
        </form>
      </div>
      <Box pt={6} px={1} mt={6} sx={{ color: "black", background: "#ebe2e1" }}>
        <Footer />
      </Box>
    </>
  );
}
