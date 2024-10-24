import * as React from "react";
import { TextField, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { createVetAccountThunk } from "../../../../../store/apiThunk/userThunk";
import Header from "../../../components/header/Header";
import { BackButton } from "../../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../../components/modal/loadingModal/loadingModal";
import {
  ADDPACKAGESUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../../components/text/notiText/notiText";
// import "./createStaffAccount.css"
export default function CreateVetAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const Header = ({ title, subtitle, titleColor = "gray", subtitleColor = "gray" }) => {
    return (
      <Box mb={2} textAlign="center"> {/* Thêm textAlign="center" */}
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
      username: "",
      fullname: "",
      email: "",
      password: "",
      location: "",
      contactLink: "",
      phonenumber: "",
    },
    onSubmit: async (values) => {
      setShowLoadingModal(true);
      try {
        await dispatch(createVetAccountThunk(values)).unwrap();
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
        const errorMessage = error.response?.data?.message || 'Something went wrong';
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
        title="Create Vet Account"
        subtitle="Create an account for Doctor to easily manage information"
      />
      <form onSubmit={formik.handleSubmit}>
        {/* username */}
        <TextField
          id="username"
          label={
            <span>
              User Name<span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.username}
          onChange={formik.handleChange}
          fullWidth
        //   autoComplete="username"
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
        {/* Fullname */}
        <TextField
          id="fullname"
          label={
            <span>
              Full Name <span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.fullname}
          onChange={formik.handleChange}
          fullWidth
          autoComplete="fullname"
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
        {/* email */}
        <TextField
          id="email"
          label={
            <span>
              Email <span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          fullWidth
          autoComplete="email"
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
        {/* password */}
        <TextField
          id="password"
          label={
            <span>
              Password <span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          fullWidth
          autoComplete="password"
          margin="dense"
        //   type="password"
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
        {/* location */}
        <TextField
          id="location"
          label={
            <span>
              Location <span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.location}
          onChange={formik.handleChange}
          fullWidth
          autoComplete="location"
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
        {/* contactLink */}
        <TextField
          id="contactLink"
          label={
            <span>
              Contact Link <span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.contactLink}
          onChange={formik.handleChange}
          fullWidth
          autoComplete="contactLink"
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
        {/* phonenumber */}
        <TextField
          id="phonenumber"
          label={"Phone Number"}
          variant="outlined"
          value={formik.values.phonenumber}
          onChange={formik.handleChange}
          fullWidth
          autoComplete="phonenumber"
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
