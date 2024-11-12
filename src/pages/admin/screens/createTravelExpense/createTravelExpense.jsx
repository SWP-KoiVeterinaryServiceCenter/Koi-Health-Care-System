import * as React from "react";
import { TextField, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { createTravelExpenseThunk } from "../../../../store/apiThunk/travelExpense";
import { BackButton } from "../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import {
  ADDPACKAGESUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";

export default function CreateTravelExpense() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);

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

  const validationSchema = Yup.object({
    baseRate: Yup.number()
      .integer("Must be an integer")
      .min(0, "Must be a non-negative number")
      .required("Base Rate is required"),
    minimumTravelRate: Yup.number()
      .integer("Must be an integer")
      .min(0, "Must be a non-negative number")
      .max(100000000, "Must be less than or equal to 100,000,000")
      .required("Minimum Travel Rate is required"),
    maximumTravelRate: Yup.number()
      .integer("Must be an integer")
      .min(0, "Must be a non-negative number")
      .max(100000000, "Must be less than or equal to 100,000,000")
      .required("Maximum Travel Rate is required"),
  });

  const formik = useFormik({
    initialValues: {
      baseRate: "",
      minimumTravelRate: "",
      maximumTravelRate: "",
    },
    validationSchema: validationSchema,
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
        <TextField
          id="baseRate"
          name="baseRate"
          label={
            <span>
              Base Rate (đ)<span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.baseRate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.baseRate && Boolean(formik.errors.baseRate)}
          helperText={formik.touched.baseRate && formik.errors.baseRate}
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
        <TextField
          id="minimumTravelRate"
          name="minimumTravelRate"
          label={
            <span>
              Minimum Travel Rate (đ) <span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.minimumTravelRate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.minimumTravelRate && Boolean(formik.errors.minimumTravelRate)}
          helperText={formik.touched.minimumTravelRate && formik.errors.minimumTravelRate}
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
        <TextField
          id="maximumTravelRate"
          name="maximumTravelRate"
          label={
            <span>
              Maximum Travel Rate (đ) <span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.maximumTravelRate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.maximumTravelRate && Boolean(formik.errors.maximumTravelRate)}
          helperText={formik.touched.maximumTravelRate && formik.errors.maximumTravelRate}
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