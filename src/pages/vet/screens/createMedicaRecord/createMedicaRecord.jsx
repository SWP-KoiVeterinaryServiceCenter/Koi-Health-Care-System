import * as React from "react";
import { TextField, Box, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { createTanksThunk } from "../../../../store/apiThunk/tankKoiThunk";
import { BackButton } from "../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import {
  ADDPACKAGESUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";

export default function CreateMedicalRecord() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Use location to get the state
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  // Log the id from the passed state
  useEffect(() => {
    if (location.state?.id) {
      console.log("Received Medical Record ID:", location.state.id); // Log the passed id
    }
  }, [location.state?.id]);

  const Header = ({ title, subtitle, titleColor = "gray", subtitleColor = "gray" }) => {
    return (
      <Box mb={2} textAlign="center">
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

  const formik = useFormik({
    initialValues: {
      tankName: "",
      capacity: "",
      status: "",
    },
    onSubmit: async (values) => {
      setShowLoadingModal(true);
      try {
        await dispatch(createTanksThunk(values)).unwrap();
        Swal.fire({
          title: SUCCESSTEXT,
          text: ADDPACKAGESUCCESS,
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
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Something went wrong";
        Swal.fire({
          title: ERRORTEXT,
          text: errorMessage,
          icon: "error",
          showConfirmButton: false,
          background: "white",
          timer: 2000,
          timerProgressBar: true,
          scrollbarPadding: false,
        });
      } finally {
        setShowLoadingModal(false);
      }
    },
  });

  return (
    <div className="createPackage">
      <Header
        title="Create Tank"
        subtitle="Create Tank to easily manage information of KOI fish"
      />
      <form onSubmit={formik.handleSubmit}>
        {/* tankName */}
        <TextField
          id="tankName"
          label={
            <span>
              Tank Name<span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.tankName}
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
        {/* capacity */}
        <TextField
          id="capacity"
          label={
            <span>
              Capacity <span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.capacity}
          onChange={formik.handleChange}
          fullWidth
          autoComplete="capacity"
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
        {/* status */}
        <TextField
          id="status"
          label={
            <span>
              Status <span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.status}
          onChange={formik.handleChange}
          fullWidth
          autoComplete="status"
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

        {!showLoadingModal ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="30px"
            marginBottom="50px"
            marginTop="30px"
          >
            <BackButton style={{ fontSize: "14px" }} />
            <Button
              className="login__btn"
              style={{ backgroundColor: "#70d8bd", fontSize: "14px" }}
              variant="contained"
              type="submit"
            >
              Create
            </Button>
          </Box>
        ) : (
          <LoadingModal />
        )}
      </form>
    </div>
  );
}
