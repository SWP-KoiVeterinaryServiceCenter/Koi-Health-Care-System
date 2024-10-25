import React, { useState } from "react";
import "./allFeedback.css";
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

export default function AllFeedback() {
  const currentAppointments = useSelector(currentappointmentSelector);
  console.log("Current Appointments:", currentAppointments);

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
          display:'flex',
          justifyContent:'center',
        }}
      >
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

  return (
    <>
      <div className="appointment-allfeedback">
        <Header title="All Your Feedback" subtitle="" />
        {currentAppointments && currentAppointments.length > 0 ? (
          currentAppointments.map((appointment) => (
            <div className="allfeedback-card">
              <div
                className="appointment-allfeedback-details"
                key={appointment.id}
              >
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
                <div className="allfeedback-names-row">
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
            </div>
          ))
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
      <Divider />
    </>
  );
}
