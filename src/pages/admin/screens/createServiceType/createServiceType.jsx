import * as React from "react";
import { TextField, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { createServicesTypeThunk } from "../../../../store/apiThunk/serviceKoiThunk";
// import Header from "../../../components/header/Header";
import { BackButton } from "../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import {
  ADDPACKAGESUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";
// import "./createStaffAccount.css"
export default function CreateServiceType() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const Header = ({
    title,
    subtitle,
    titleColor = "gray",
    subtitleColor = "gray",
  }) => {
    return (
      <Box mb={2} textAlign="center">
        {" "}
        {/* Thêm textAlign="center" */}
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
      typeName: "",
    },
    onSubmit: async (values) => {
      setShowLoadingModal(true);
      try {
        await dispatch(createServicesTypeThunk(values)).unwrap();
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
        const errorMessage =
          error.response?.data?.message || "Something went wrong";
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
        title="Create Service Type"
        subtitle="Create Service Type to easily manage information of KOI fish"
      />
      <form onSubmit={formik.handleSubmit}>
        {/* typeName */}
        <TextField
          id="typeName"
          label={
            <span>
              Servie Type Name<span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.typeName}
          onChange={formik.handleChange}
          fullWidth
          //   autoComplete="typeName"
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
