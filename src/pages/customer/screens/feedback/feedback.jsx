import React, { useState, useEffect } from "react";
import "./feedback.css";
import {
  TextField,
  Box,
  Button,
  Typography,
  Rating,
  Divider,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { currentappointmentSelector } from "../../../../store/sellectors";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import Swal from "sweetalert2";
import { createFeedbackThunk } from "../../../../store/apiThunk/feedbackThunk";
import { userDataSelector } from "../../../../store/sellectors";
import { getUserDataThunk } from "../../../../store/apiThunk/userThunk";

export default function Feedback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const location = useLocation();
  const appointmentId = location.state?.appointment;
  console.log(appointmentId);

  const currentAppointments = useSelector(currentappointmentSelector);
  const currentAccounts = useSelector(userDataSelector);

  const appointment = currentAppointments.find(
    (app) => app.id === appointmentId
  );

  const Header = ({ title, subtitle }) => (
    <Box>
      <Typography
        style={{
          fontFamily: "Source Sans Pro, sans-serif",
          fontSize: "35px",
          color: "gray",
          fontWeight: "700",
          textShadow:
            "1px 1px 2px rgba(0, 0, 0, 0.3), 0 0 25px rgba(0, 0, 0, 0.2)",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        {title}
      </Typography>
      <Typography variant="subtitle1" style={{ color: "gray" }}>
        {subtitle}
      </Typography>
    </Box>
  );

  const formik = useFormik({
    initialValues: {
      ratingPoint: "",
      ratingContent: "",
      appointmentId: appointmentId || "",
      accountId: currentAccounts.accountId || "",
    },
    validationSchema: Yup.object({
      ratingPoint: Yup.number().required("Please Choose To Rate Your Service"),
      ratingContent: Yup.string().required(
        "Your Feedback Description Cannot Be Empty"
      ),
    }),

    onSubmit: async (values) => {
      // Create a payload that includes all required fields
      const feedbackData = {
        ratingPoint: values.ratingPoint,
        ratingContent: values.ratingContent,
        appointmentId: values.appointmentId, // Include appointmentId
        accountId: values.accountId, // Include accountId
      };

      console.log("Form values before submitting:", feedbackData); // For debugging

      // setShowLoadingModal(true);
      dispatch(createFeedbackThunk(feedbackData))
        .unwrap()
        .then(() => {
          // setShowLoadingModal(false);
          Swal.fire({
            title: "Feedback submitted successfully!",
            icon: "success",
            timer: 1500,
          }).then(() => {
            navigate(-1);
          });
        })
        .catch((error) => {
          // setShowLoadingModal(false);
          console.error("Error creating feedback:", error);
          Swal.fire({
            title: "Error submitting feedback",
            text: error.response?.data?.message || error.message,
            icon: "error",
            timer: 2000,
          });
        });
    },
  });

  useEffect(() => {
    dispatch(getUserDataThunk());
  }, [dispatch]);

  return (
    <>
      <div className="appointment-feedback">
        <Header title="Please Give Us Your Feedback" subtitle="" />

        {appointment ? (
          <div className="appointment-details">
            <div className="service-name">
              <TextField
                label="Service Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={appointment.serviceName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>

            <div className="names-row">
              <TextField
                label="Vet Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={appointment.vetName}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Koi Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={appointment.koiName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
          </div>
        ) : (
          <p>No appointment found.</p>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="feedback-text-field-container">
            <Typography variant="h6" gutterBottom>
              Rating
            </Typography>
            <Rating
              id="ratingPoint"
              type="number"
              size="large"
              value={formik.values.ratingPoint}
              onChange={(event, newValue) => {
                formik.setFieldValue("ratingPoint", newValue);
              }}
            />
            {formik.touched.ratingPoint && formik.errors.ratingPoint && (
              <div className="feedback__validation__error">
                {formik.errors.ratingPoint}
              </div>
            )}
          </div>

          <div className="feedback-text-field-container">
            <TextField
              id="ratingContent"
              label="Feedback Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              type="string"
              margin="normal"
              value={formik.values.ratingContent}
              onChange={formik.handleChange}
            />
            {formik.touched.ratingContent && formik.errors.ratingContent && (
              <div className="feedback__validation__error">
                {formik.errors.ratingContent}
              </div>
            )}
          </div>
          {!showLoadingModal ? (
            <div className="feedback-button">
              <Button type="submit" variant="contained" color="success">
                Feedback
              </Button>
            </div>
          ) : (
            <LoadingModal />
          )}
        </form>
      </div>
      <Divider />
    </>
  );
}
