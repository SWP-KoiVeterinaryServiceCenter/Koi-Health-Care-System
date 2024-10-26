import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import { currentappointmentSelector } from "../../../../store/sellectors";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const location = useLocation();
  const appointmentId = location.state?.appointment;

  const currentAppointments = useSelector(currentappointmentSelector);

  const maxWords = 100;

  const handleFeedbackChange = (e) => {
    const value = e.target.value;
    const wordCount = value.split(/\s+/).filter((word) => word).length;
    if (wordCount <= maxWords) {
      setFeedback(value);
    }
  };

  const Header = ({ title, subtitle }) => (
    <Box>
      <Typography style={{
        fontFamily: "Source Sans Pro, sans-serif",
        fontSize: "32px",
        color: "gray",
        fontWeight: "700",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3), 0 0 25px rgba(0, 0, 0, 0.2)",
        padding: "10px",
        borderRadius: "4px",
      }}>
        {title}
      </Typography>
      <Typography variant="subtitle1" style={{ color: "gray" }}>
        {subtitle}
      </Typography>
    </Box>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ appointmentId, rating, feedback });
  };

  // Find the specific appointment using the ID
  const appointment = currentAppointments.find(app => app.id === appointmentId);

  return (
    <>
      <div className="appointment-feedback">
        <Header title="Please Give Us Your Feedback" subtitle="" />

        {appointment ? (
          <div className="appointment-details">
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

        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Rating
          </Typography>
          <Rating
            name="simple-controlled"
            size="large"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />

          <TextField
            label="Feedback Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={feedback}
            onChange={handleFeedbackChange}
          />

          <div className="feedback-button">
            <Button type="submit" variant="contained" color="success">
              Submit Feedback
            </Button>
          </div>
        </form>
      </div>
      <Divider />
    </>
  );
}
