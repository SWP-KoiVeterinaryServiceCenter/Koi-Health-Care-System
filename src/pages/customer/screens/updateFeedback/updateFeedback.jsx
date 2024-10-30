import React, { useEffect, useState } from "react";
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
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import {
  UPDATEFEEDBACKSUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";
import { BackButton } from "../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";

import {
  getFeedbackByIdThunk,
  updateFeedbackThunk,
} from "../../../../store/apiThunk/feedbackThunk";

import {
  currentappointmentSelector,
  getAllFeedbackByCurrentUserIdSelector,
  getFeedbackByIdSelector,
  userDataSelector,
} from "../../../../store/sellectors";

export default function UpdateFeedback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const feedbackId = location.state?.feedbackId;
  const feedback = useSelector(getFeedbackByIdSelector);
  const appointmentId = location.state?.appointment;

  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showRender, setShowRender] = useState(false);

  const currentAppointments = useSelector(currentappointmentSelector);
  const currentFeedback = useSelector(getAllFeedbackByCurrentUserIdSelector);
  const currentAccounts = useSelector(userDataSelector);

  const Header = ({ title, subtitle, titleColor = "gray", subtitleColor = "gray" }) => {
    return (
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
  };

  useEffect(() => {
    setShowRender(true);
    dispatch(getFeedbackByIdThunk(feedbackId)).then(() => {
      setShowRender(false);
    });
  }, [feedbackId, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ratingPoint: feedback.ratingPoint || 0,
      ratingContent: feedback.ratingContent || "",
      appointmentId: feedback.appointmentId || "",
      accountId: currentAccounts.accountId || "",
    },
    validationSchema: Yup.object({
      ratingPoint: Yup.number().required("Please Choose To Rate Your Service"),
      ratingContent: Yup.string().required("Your Feedback Description Cannot Be Empty"),
    }),
    onSubmit: async (values) => {
      setShowLoadingModal(true);
      dispatch(
        updateFeedbackThunk({
          id: feedbackId,
          data: {
            ratingPoint: values.ratingPoint,
            ratingContent: values.ratingContent,
            appointmentId: values.appointmentId,
            accountId: values.accountId,
          },
        })
      )
        .unwrap()
        .then(() => {
          setShowLoadingModal(false);
          Swal.fire({
            title: SUCCESSTEXT,
            text: UPDATEFEEDBACKSUCCESS,
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
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
            timer: 2000,
            timerProgressBar: true,
          });
        });
    },
  });

  const getAppointmentDetails = (appointmentId) => {
    return (
      currentAppointments.find(appointment => appointment.id === appointmentId) || {}
    );
  };

  // Filter feedback based on the current feedback ID
  const filteredFeedback = currentFeedback.filter(feedback => feedback.id === feedbackId);

  return (
    <>
      <div className="update_feedback" key={feedback.id}>
        <Header title="Update Feedback" />
        {filteredFeedback.length > 0 ? (
          filteredFeedback.map(feedback => {
            const appointmentDetails = getAppointmentDetails(feedback.appointmentId);
            return (
              <div key={feedback.id}>
                <div className="allfeedback-names-row">
                  <TextField
                    label="Service Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={appointmentDetails.serviceName}
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
          <form onSubmit={formik.handleSubmit} className="update_feedback-form-container">
            <div className="update-feedback-first-column">
              <div className="text-field-container">
                <Typography variant="h6" gutterBottom>
                  Rating
                </Typography>
                <Rating
                  id="ratingPoint"
                  value={formik.values.ratingPoint}
                  onChange={(event, newValue) => {
                    formik.setFieldValue("ratingPoint", newValue);
                  }}
                  fullWidth
                  margin="dense"
                  color="secondary"
                />
                {formik.touched.ratingPoint && formik.errors.ratingPoint && (
                  <div className="update__feedback__validation__error">
                    {formik.errors.ratingPoint}
                  </div>
                )}
              </div>
              <div className="text-field-container">
                <TextField
                  id="ratingContent"
                  label={<span>Feedback Description<span style={{ color: "red" }}>*</span></span>}
                  variant="outlined"
                  value={formik.values.ratingContent}
                  onChange={formik.handleChange}
                  fullWidth
                  autoComplete="ratingContent"
                  margin="dense"
                  InputLabelProps={{ style: { color: "black" } }}
                  InputProps={{
                    style: {
                      backgroundColor: "#f5f5f5",
                      color: "black",
                    },
                  }}
                />
                {formik.touched.ratingContent && formik.errors.ratingContent && (
                  <div className="update__feedback__validation__error">
                    {formik.errors.ratingContent}
                  </div>
                )}
              </div>
            </div>
            {!showLoadingModal ? (
              <div className="up-feedback-button-container">
                <BackButton style={{ fontSize: "14px" }} />
                <Button className="feedback__btn" variant="contained" type="submit" color="primary">
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
