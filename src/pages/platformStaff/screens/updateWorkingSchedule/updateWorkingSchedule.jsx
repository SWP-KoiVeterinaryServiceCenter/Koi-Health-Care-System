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
  UPDATESCHEDULEIMAGESUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";

import { vetDetailSelector } from "../../../../store/sellectors";
import { getAllVetAccountThunk } from "../../../../store/apiThunk/userThunk";

import {
  getAllWorkingScheduleByIdThunk,
  updateWorkingScheduleThunk,
} from "../../../../store/apiThunk/workingSchedule";

import { allWorkingScheduleByIdSelector } from "../../../../store/sellectors";

export default function UpdateWorkingSchedule() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  console.log("Location state:", location.state);
  const allWorkingSchedule = location.state?.allWorkingSchedule;
  console.log(allWorkingSchedule, allWorkingSchedule);

  const wrkScheduleById = useSelector(allWorkingScheduleByIdSelector);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showRender, setShowRender] = useState(false);
  const vetDetail = useSelector(vetDetailSelector);

  const Header = ({
    title,
    subtitle,
    titleColor = "gray",
    subtitleColor = "gray",
  }) => (
    <Box mb={2}>
      <Typography
        style={{
          fontFamily: "Source Sans Pro, sans-serif",
          fontSize: "32px",
          color: titleColor,
          fontWeight: "700",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          padding: "4px",
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

  useEffect(() => {
    setShowRender(true);
    dispatch(getAllWorkingScheduleByIdThunk(allWorkingSchedule)).then(() =>
      setShowRender(false)
    );
  }, [allWorkingSchedule, dispatch]);

  const validationSchema = Yup.object({
    veterinarianId: Yup.string().required("Vet Name cannot be empty"),
    workingDay: Yup.date()
      .required("Date cannot be empty")
      .min(
        new Date(new Date().setDate(new Date().getDate() + 1)),
        "Date must be at least one day from today"
      ),

    startTime: Yup.string()
      .required("Start time cannot be empty")
      .matches(
        /^(0[8-9]:[0-5][0-9]|1[0-6]:[0-5][0-9]|17:00)$/, // Allow 08:00 to 17:00 (including 09:00)
        "Start time must be between 08:00 and 17:00"
      ),

    endTime: Yup.string()
      .required("End time cannot be empty")
      .matches(
        /^(0[8-9]:[0-5][0-9]|1[0-6]:[0-5][0-9]|17:00)$/, // Allow 08:00 to 17:00 (including 09:00)
        "End time must be between 08:00 and 17:00"
      )
      .test(
        "is-greater",
        "End time must be after start time",
        function (value) {
          const { startTime } = this.parent;
          if (!value || !startTime) return true; // If either is missing, skip validation
          const start = startTime.split(":").map(Number);
          const end = value.split(":").map(Number);
          return (
            end[0] > start[0] || (end[0] === start[0] && end[1] > start[1])
          );
        }
      ),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      veterinarianId: wrkScheduleById.veterinarianId || "",
      workingDay: wrkScheduleById.workingDay || "",
      startTime: wrkScheduleById.startTime || "",
      endTime: wrkScheduleById.endTime || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setShowLoadingModal(true);
      dispatch(
        updateWorkingScheduleThunk({
          id: allWorkingSchedule,
          data: {
            veterinarianId: values.veterinarianId,
            workingDay: values.workingDay,
            startTime: values.startTime,
            endTime: values.endTime,
          },
        })
      )
        .unwrap()
        .then(() => {
          setShowLoadingModal(false);
          Swal.fire({
            title: SUCCESSTEXT,
            text: UPDATESCHEDULEIMAGESUCCESS,
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
              {/* Vet Name */}
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
                    }
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
                    <div className="update__working__schedule__validation__error">
                      {formik.errors.veterinarianId}
                    </div>
                  )}
              </div>

              {/* Start Time */}
              <div className="working-schedule-text-field-container">
                <TextField
                  id="startTime"
                  label={
                    <span>
                      Start Time <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.startTime}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="startTime"
                  margin="dense"
                  type="time"
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
                {formik.touched.startTime && formik.errors.startTime && (
                  <div className="update__working__schedule__validation__error">
                    {formik.errors.startTime}
                  </div>
                )}
              </div>
            </div>

            <div className="update-working-schedule-second-column">
              {/* Date */}
              <div className="working-schedule-text-field-container">
                <TextField
                  id="workingDay"
                  label={
                    <span>
                      Date <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.workingDay}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="workingDay"
                  margin="dense"
                  type="date"
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
                {formik.touched.workingDay && formik.errors.workingDay && (
                  <div className="update__working__schedule__validation__error">
                    {formik.errors.workingDay}
                  </div>
                )}
              </div>

              {/* End Time */}
              <div className="working-schedule-text-field-container">
                <TextField
                  id="endTime"
                  label={
                    <span>
                      End Time <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.endTime}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="endTime"
                  margin="dense"
                  type="time"
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
                {formik.touched.endTime && formik.errors.endTime && (
                  <div className="update__working__schedule__validation__error">
                    {formik.errors.endTime}
                  </div>
                )}
              </div>
              {!showLoadingModal ? (
                <div className="wrk-schedule-button-container">
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
