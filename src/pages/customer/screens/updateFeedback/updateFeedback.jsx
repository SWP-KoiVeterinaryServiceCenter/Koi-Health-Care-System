import React from "react";
import "./updateFeedback.css";
import {
  Button,
  TextField,
  Box,
  Typography,
  Divider,
  Rating,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
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
// import {
//   getKoiByIdThunk,
//   updateKoiByAccountIdThunk,
// } from "../../../../store/apiThunk/koiThunk";

import {
  getFeedbackByIdThunk,
  updateFeedbackThunk,
} from "../../../../store/apiThunk/feedbackThunk";

// import { allKoiByIdSelector } from "../../../../store/sellectors";

import {
  currentappointmentSelector,
  getAllFeedbackByCurrentUserIdSelector,
} from "../../../../store/sellectors";

import { getFeedbackByIdSelector } from "../../../../store/sellectors";

import { userDataSelector } from "../../../../store/sellectors";

export default function UpdateFeedback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // console.log("Location state:", location.state);
  // const koiId = location.state?.koiId;
  // console.log("Koi ID:", koiId);
  const feedbackId = location.state?.feedbackId;

  // const allKoiById = useSelector(allKoiByIdSelector);
  const feedback = useSelector(getFeedbackByIdSelector);

  const appointmentId = location.state?.appointment;

  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showRender, setShowRender] = useState(false);

  const currentAppointments = useSelector(currentappointmentSelector);
  const currentFeedback = useSelector(getAllFeedbackByCurrentUserIdSelector);

  const currentAccounts = useSelector(userDataSelector);

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

  // useEffect(() => {
  //   setShowRender(true);
  //   dispatch(getKoiByIdThunk(koiId)).then(() => setShowRender(false));
  // }, [koiId, dispatch]);

  useEffect(() => {
    setShowRender(true);
    dispatch(getFeedbackByIdThunk(feedbackId)).then(() => setShowRender(false));
  }, [feedbackId, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // koiName: allKoiById.koiName || "",
      // weight: allKoiById.weight || "",

      ratingPoint: feedback.ratingPoint || "",
      ratingContent: feedback.ratingContent || "",
      appointmentId: appointmentId || "",
      accountId: currentAccounts.accountId || "",
    },
    validationSchema: Yup.object({
      // koiName: Yup.string().required("Koi Name cannot be empty"),
      // weight: Yup.number()
      //   .required("Weight cannot be empty")
      //   .min(0, "Weight cannot be negative")
      //   .integer("Weight must be an integer")
      //   .max(50, "Weight cannot exceed 50kg"),
      ratingPoint: Yup.number().required("Please Choose To Rate Your Service"),
      ratingContent: Yup.string().required(
        "Your Feedback Description Cannot Be Empty"
      ),
    }),
    onSubmit: async (values) => {
      setShowLoadingModal(true);
      dispatch(
        updateFeedbackThunk({
          id: feedbackId,
          // koiName: values.koiName,
          // weight: values.weight,
          ratingPoint: values.ratingPoint,
          ratingContent: values.ratingContent,
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

  const getAppointmentDetails = (appointmentId) => {
    return (
      currentAppointments.find(
        (appointment) => appointment.id === appointmentId
      ) || {}
    );
  };

  return (
    <>
      <div className="update_feedback">
        <Header
          title="Update Feedback"
          subtitle="Provide Feedback Information"
        />
        {currentFeedback && currentFeedback.length > 0 ? (
          currentFeedback.map((feedback) => {
            const appointmentDetails = getAppointmentDetails(
              feedback.appointmentId
            );
            return (
              <div>
                <div className="allfeedback-names-row">
                  <TextField
                    label="Service Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={appointmentDetails.serviceName}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Creation Date"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={""}
                    InputProps={{ readOnly: true }}
                  />
                </div>

                <div className="allfeedback-names-row">
                  <TextField
                    label="Vet Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={appointmentDetails.vetName}
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    label="Koi Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={appointmentDetails.koiName}
                    InputProps={{ readOnly: true }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p>No feedback found.</p>
        )}
        {!showRender ? (
          <form
            onSubmit={formik.handleSubmit}
            className="update_feedback-form-container"
          >
            <div className="update-feedback-first-column">
              <div className="text-field-container">
                {/* ratingPoint */}
                <Typography variant="h6" gutterBottom>
                  Rating
                </Typography>
                <Rating
                  id="ratingPoint"
                  type="number"
                  label={
                    <span>
                      Rating <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.ratingPoint}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="ratingPoint"
                  margin="dense"
                  color="secondary"
                  // InputLabelProps={{
                  //   style: { color: "black" },
                  // }}
                  // InputProps={{
                  //   style: {
                  //     backgroundColor: "#f5f5f5",
                  //     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  //     color: "black",
                  //   },
                  // }}
                />
                {formik.touched.ratingPoint && formik.errors.ratingPoint && (
                  <div className="update__feedback__validation__error">
                    {formik.errors.ratingPoint}
                  </div>
                )}
              </div>

              <div className="text-field-container">
                {/* ratingContent */}
                <TextField
                  id="ratingContent"
                  label={
                    <span>
                      Feedback Description
                      <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={formik.values.ratingContent}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="ratingContent"
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
                {formik.touched.ratingContent &&
                  formik.errors.ratingContent && (
                    <div className="update__feedback__validation__error">
                      {formik.errors.ratingContent}
                    </div>
                  )}
              </div>
            </div>

            {!showLoadingModal ? (
              <div className="up-feedback-button-container">
                <BackButton style={{ fontSize: "14px" }} />
                <Button
                  className="feedback__btn"
                  variant="contained"
                  type="submit"
                  color="primary"
                >
                  Update
                </Button>
              </div>
            ) : (
              <LoadingModal />
            )}
          </form>
        ) : (
          <LoadingModal />
        )}
      </div>
      <Divider />
    </>
  );
}
