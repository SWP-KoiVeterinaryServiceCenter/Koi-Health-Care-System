import React, { useEffect } from "react";
import "./allFeedback.css";
import { TextField, Box, Typography, Divider, Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useNavigate } from "react-router-dom";
import {
  currentappointmentSelector,
  getAllFeedbackByCurrentUserIdSelector,
} from "../../../../store/sellectors";
import { getAllFeedbackByCurrentUserIdThunk } from "../../../../store/apiThunk/feedbackThunk";

export default function AllFeedback(props) {
  const navigate = useNavigate();
  const direction = props.direction; 
  const dispatch = useDispatch();
  const currentAppointments = useSelector(currentappointmentSelector);
  const currentFeedback = useSelector(getAllFeedbackByCurrentUserIdSelector);

  useEffect(() => {
    dispatch(getAllFeedbackByCurrentUserIdThunk());
  }, [dispatch]);

  const getAppointmentDetails = (appointmentId) => {
    return (
      currentAppointments.find(
        (appointment) => appointment.id === appointmentId
      ) || {}
    );
  };

  const Header = ({ title, subtitle }) => (
    <Box>
      <Typography
        style={{
          fontFamily: "Source Sans Pro, sans-serif",
          fontSize: "32px",
          color: "gray",
          fontWeight: "700",
          textShadow:
            "1px 1px 2px rgba(0, 0, 0, 0.3), 0 0 25px rgba(0, 0, 0, 0.2)",
          padding: "0px 10px ",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {title}
      </Typography>
      <Typography variant="subtitle1" style={{ color: "gray" }}>
        {subtitle}
      </Typography>
    </Box>
  );

  return (
    <>
      <div className="appointment-allfeedback">
        <Header title="All Your Feedback" subtitle="" />
        {currentFeedback && currentFeedback.length > 0 ? (
          currentFeedback.map((feedback) => {
            const appointmentDetails = getAppointmentDetails(
              feedback.appointmentId
            );

            return (
              <div className="allfeedback-card" key={feedback.id}>
                <div className="feedback-allfeedback-details">
                  {/* <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ flex: 1 }} />{" "}
                    <CreateOutlinedIcon
                      alt="Edit"
                      className="delete_icon"
                      style={{ color: "black", fontSize: "30px" }}
                      onClick={() =>{
                        console.log("feedback:", feedback.id  );                        
                        navigate(`/${direction}/updateFeedback`, {
                          state: { feedbackId: feedback.id },
                      })
                      }}
                    />
                  </div> */}
                  <div className="allfeedback-names-row">
                    <TextField
                      label="Service Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={appointmentDetails.serviceName || ""}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      label="Creation Date"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={
                        feedback.creationDate
                          ? feedback.creationDate.substring(0, 10)
                          : ""
                      }
                      InputProps={{ readOnly: true }}
                    />
                  </div>

                  <div className="allfeedback-names-row">
                    <TextField
                      label="Vet Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={appointmentDetails.vetName || ""}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      label="Koi Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={appointmentDetails.koiName || ""}
                      InputProps={{ readOnly: true }}
                    />
                  </div>
                  <Typography variant="h6" gutterBottom>
                    Rating
                  </Typography>
                  <Rating
                    label="Rating Point"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={feedback.ratingPoint}
                    InputProps={{ readOnly: true }}
                    readOnly
                  />
                  <TextField
                    label="Rating Content"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={feedback.ratingContent}
                    InputProps={{ readOnly: true }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p>No feedback found.</p>
        )}
      </div>
      <Divider />
    </>
  );
}
