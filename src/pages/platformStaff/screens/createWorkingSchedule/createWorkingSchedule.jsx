import React, { useState, useEffect } from "react";
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
import { createWorkingScheduleThunk } from "../../../../store/apiThunk/workingSchedule";
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

import { vetDetailSelector } from "../../../../store/sellectors";
import { getAllVetAccountThunk } from "../../../../store/apiThunk/userThunk";

export default function CreateWorkingSchedule() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const vetDetail = useSelector(vetDetailSelector);

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
      veterinarianId: "",
      workingDay: "",
      age: "",
      startTime: "",
      endTime: "",
    },
    validationSchema: Yup.object({
      veterinarianId: Yup.string().required("Vet Name cannot be empty"),
      workingDay: Yup.number().required("Date cannot be empty"),
      startTime: Yup.string().required("Start time cannot be empty"),
      endTime: Yup.string().required("End Time cannot be empty"),
    }),

    onSubmit: async (values) => {
      setShowLoadingModal(true);
      dispatch(
        createWorkingScheduleThunk({
          veterinarianId: values.veterinarianId,
          workingDay: values.workingDay.toString(), 
          startTime: values.startTime,
          endTime: values.endTime,
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

  useEffect(() => {
    dispatch(getAllVetAccountThunk()).then(() => setShowLoadingModal(false));
  }, [dispatch]);

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
              <FormControl fullWidth margin="dense">
                <InputLabel id="veterinarianId">
                  Veterinarian Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  labelId="veterinarianId"
                  id="veterinarianId"
                  value={formik.values.veterinarianId}
                  label="Doctor Name"
                  color="secondary"
                  style={{ backgroundColor: "#f5f5f5", color: "black" }}
                  onChange={(event) =>
                    formik.setFieldValue("veterinarianId", event.target.value)
                  } // Explicitly set the field value
                >
                  {vetDetail && vetDetail.length > 0 ? (
                    vetDetail.map((vet) => (
                      <MenuItem key={vet.accountId} value={vet.accountId}>
                        {vet.username}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Veterinarian available</MenuItem>
                  )}
                </Select>
              </FormControl>
              {formik.touched.veterinarianId &&
                formik.errors.veterinarianId && (
                  <div className="login__validation__error">
                    {formik.errors.veterinarianId}
                  </div>
                )}
            </div>

            <div className="working-schedule-text-field-container">
              <TextField
                id="startTime"
                label={
                  <span>
                    Start Time<span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                value={formik.values.startTime}
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
              {formik.touched.startTime && formik.errors.startTime && (
                <div className="working__schedule__validation__error">
                  {formik.errors.startTime}
                </div>
              )}
            </div>
          </div>

          {/* 2nd Column */}
          <div className="create-schedule-form-second-column">
            <div className="working-schedule-text-field-container">
              <TextField
                id="workingDay"
                label={
                  <span>
                    Appointment Date <span style={{ color: "red" }}>*</span>
                  </span>
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                variant="outlined"
                value={formik.values.workingDay}
                onChange={formik.handleChange}
                fullWidth
                autoComplete="workingDay"
                margin="dense"
                type="number"
                color="secondary"
                InputLabelProps={{ style: { color: "black" }, shrink: true }}
                InputProps={{
                  style: {
                    backgroundColor: "#f5f5f5",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    color: "black",
                  },
                }}
              />
              {formik.touched.workingDay && formik.errors.workingDay && (
                <div className="login__validation__error">
                  {formik.errors.workingDay}
                </div>
              )}
            </div>

            <div className="working-schedule-text-field-container">
              <TextField
                id="endTime"
                label={
                  <span>
                    End Time<span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                value={formik.values.endTime}
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
              {formik.touched.endTime && formik.errors.endTime && (
                <div className="working__schedule__validation__error">
                  {formik.errors.endTime}
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
        </form>
      </div>
      <Box pt={6} px={1} mt={6} sx={{ color: "black", background: "#ebe2e1" }}>
        <Footer />
      </Box>
    </>
  );
}
