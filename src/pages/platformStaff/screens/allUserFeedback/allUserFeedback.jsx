import React, { useEffect, useState } from "react";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import "./allUserFeedback.css";
import { TextField, Box, Typography, Rating, Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  allappointmentSelector,
  getAllFeedbackSelector,
} from "../../../../store/sellectors";
import { getAllFeedbackThunk } from "../../../../store/apiThunk/feedbackThunk";

export default function AllUserFeedback() {
  const dispatch = useDispatch();
  const allAppointments = useSelector(allappointmentSelector);
  const currentFeedback = useSelector(getAllFeedbackSelector);

  const [page, setPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(getAllFeedbackThunk());
  }, [dispatch]);

  const getAppointmentDetails = (appointmentId) => {
    return (
      allAppointments.find((appointment) => appointment.id === appointmentId) ||
      {}
    );
  };

  const totalPages = Math.ceil(currentFeedback.length / itemsPerPage);
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedFeedback = currentFeedback.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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
      <div className="appointment-alluserfeedback">
        <Header title="All User Feedback" subtitle="" />
        {displayedFeedback && displayedFeedback.length > 0 ? (
          displayedFeedback.map((feedback) => {
            const appointmentDetails = getAppointmentDetails(
              feedback.appointmentId
            );
            return (
              <div className="alluserfeedback-card" key={feedback.id}>
                <div className="feedback-alluserfeedback-details">
                  <div className="alluserfeedback-names-row">
                    <TextField
                      sx={{
                        "& .MuiInputBase-input": {
                          color: "black",
                        },
                      }}
                      label="Service Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={appointmentDetails.customerName || ""}
                      InputProps={{ readOnly: true }}
                    />
                  </div>
                  <div className="alluserfeedback-names-row">
                    <TextField
                      sx={{
                        "& .MuiInputBase-input": {
                          color: "black",
                        },
                      }}
                      label="Service Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={appointmentDetails.serviceName || ""}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      sx={{
                        "& .MuiInputBase-input": {
                          color: "black",
                        },
                      }}
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

                  <div className="alluserfeedback-names-row">
                    <TextField
                      sx={{
                        "& .MuiInputBase-input": {
                          color: "black",
                        },
                      }}
                      label="Vet Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={appointmentDetails.vetName || ""}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      sx={{
                        "& .MuiInputBase-input": {
                          color: "black",
                        },
                      }}
                      label="Koi Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={appointmentDetails.koiName || ""}
                      InputProps={{ readOnly: true }}
                    />
                  </div>
                  <Typography variant="h6" gutterBottom style={{ color: 'black' }}>
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
                    sx={{
                      "& .MuiInputBase-input": {
                        color: "black",
                      },
                    }}
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
          <Typography
            variant="h6"
            style={{ textAlign: "center", color: "gray" }}
          >
            No feedback available.
          </Typography>
        )}
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            '& .MuiPaginationItem-root': {
              color: 'black', // Change text color of pagination items
            },
            '& .Mui-selected': {
              backgroundColor: '#1976d2 !important', // Background color for the selected page
              color: 'white !important', // Text color for the selected page
            },
            '& .MuiPaginationItem-previousNext': {
              color: 'black', // Color for previous and next buttons
            },
          }}
        />
      </div>
      <Box pt={6} px={1} mt={6} sx={{ color: "black", background: "#ebe2e1" }}>
        <Footer />
      </Box>
    </>
  );
}
