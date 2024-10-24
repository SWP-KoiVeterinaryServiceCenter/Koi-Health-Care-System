import * as React from "react";
import { TextField, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { createTravelExpenseThunk } from "../../../../store/apiThunk/travelExpense";
// import Header from "../../../components/header/Header";
import { BackButton } from "../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import {
  ADDPACKAGESUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";
// import "./createStaffAccount.css"
export default function CreateTravelExpense() {
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
      baseRate: "",
      minimumTravelRate: "",
      maximumTravelRate: "",
   
    },
    onSubmit: async (values) => {
      setShowLoadingModal(true);
      try {
        await dispatch(createTravelExpenseThunk(values)).unwrap();
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
        title="Create Travel Expense"
        subtitle="Create Travel Expense to easily manage information of KOI fish"
      />
      <form onSubmit={formik.handleSubmit}>
        {/* baseRate */}
        <TextField
          id="baseRate"
          label={
            <span>
              Base Rate (đ)<span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.baseRate}
          onChange={formik.handleChange}
          fullWidth
        //   autoComplete="baseRate"
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
        {/* minimumTravelRate */}
        <TextField
          id="minimumTravelRate"
          label={
            <span>
              Minimum Travel Rate (đ) <span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.minimumTravelRate}
          onChange={formik.handleChange}
          fullWidth
          autoComplete="minimumTravelRate"
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
        {/* maximumTravelRate */}
        <TextField
          id="maximumTravelRate"
          label={
            <span>
              Maximum Travel Rate (đ) <span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.maximumTravelRate}
          onChange={formik.handleChange}
          fullWidth
          autoComplete="maximumTravelRate"
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
