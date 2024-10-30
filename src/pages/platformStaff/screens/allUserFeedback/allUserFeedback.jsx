import React, { useEffect } from "react";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import "./allUserFeedback.css";
import { TextField, Box, Typography, Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Swal from "sweetalert2";
import {
  DELETEFEEDBACKSUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";
import {
  allappointmentSelector,
  getAllFeedbackSelector,
} from "../../../../store/sellectors";
import {
  getAllFeedbackThunk,
  deleteFeedbackThunk,
} from "../../../../store/apiThunk/feedbackThunk";

export default function AllUserFeedback() {
  const dispatch = useDispatch();
  const allAppointments = useSelector(allappointmentSelector);
  const currentFeedback = useSelector(getAllFeedbackSelector);

  useEffect(() => {
    dispatch(getAllFeedbackThunk());
  }, [dispatch]);

  const getAppointmentDetails = (appointmentId) => {
    return (
      allAppointments.find((appointment) => appointment.id === appointmentId) ||
      {}
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

  // const handleDeleteFeedback = (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#28a745",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       dispatch(deleteFeedbackThunk(id))
  //         .unwrap()
  //         .then(() => {
  //           Swal.fire({
  //             title: SUCCESSTEXT,
  //             text: DELETEFEEDBACKSUCCESS,
  //             icon: "success",
  //             showCancelButton: false,
  //             showConfirmButton: false,
  //             background: "white",
  //             timer: 1500,
  //             timerProgressBar: true,
  //             scrollbarPadding: false,
  //           }).then(() => {
  //             window.location.reload();
  //           });
  //         })
  //         .catch((error) => {
  //           Swal.fire({
  //             title: ERRORTEXT,
  //             text: error.message,
  //             icon: "error",
  //             showConfirmButton: true,
  //             background: "white",
  //           });
  //         });
  //     }
  //   });
  // };

  return (
    <>
      <div className="appointment-alluserfeedback">
        <Header title="All User Feedback" subtitle="" />
        {currentFeedback && currentFeedback.length > 0 ? (
          currentFeedback.map((feedback) => {
            const appointmentDetails = getAppointmentDetails(
              feedback.appointmentId
            );
            // console.log("Appointment ID:", feedback.appointmentId);
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
                  <Typography variant="h6" gutterBottom style={{color:'black'}}>
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
      </div>
      <Box pt={6} px={1} mt={6} sx={{ color: "black", background: "#ebe2e1" }}>
        <Footer />
      </Box>
    </>
  );
}
