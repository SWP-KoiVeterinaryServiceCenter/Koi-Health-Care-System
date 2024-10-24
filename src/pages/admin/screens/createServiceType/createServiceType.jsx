import * as React from "react";
import { useEffect, useState } from "react";
import { TextField, Box, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { createServicesTypeThunk } from "../../../../store/apiThunk/serviceKoiThunk";
import { getAllTravelExpenseThunk } from "../../../../store/apiThunk/travelExpense";
import { getAllTravelExpenseSelector } from "../../../../store/sellectors";
import { BackButton } from "../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import {
  ADDPACKAGESUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";

export default function CreateServiceType() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const travels = useSelector(getAllTravelExpenseSelector);
  
  useEffect(() => {
    dispatch(getAllTravelExpenseThunk());
  }, [dispatch]);

  const Header = ({ title, subtitle, titleColor = "gray", subtitleColor = "gray" }) => (
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

  const formik = useFormik({
    initialValues: {
      travelExpenseId: "",
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
              Service Type Name<span style={{ color: "red" }}>*</span>
            </span>
          }
          variant="outlined"
          value={formik.values.typeName}
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

        {/* travelExpenseId as Select */}
        <FormControl fullWidth margin="dense" color="secondary">
          <InputLabel id="travelExpenseId-label" style={{ color: "black" }}>
            Select Base Rate
          </InputLabel>
          <Select
            id="travelExpenseId"
            labelId="travelExpenseId-label"
            value={formik.values.travelExpenseId}
            onChange={formik.handleChange}
            name="travelExpenseId"
            variant="outlined"
            style={{ backgroundColor: "#f5f5f5", color: "black" }}
          >
            {travels?.map((travel) => (
              <MenuItem key={travel.id} value={travel.id}>
                Base Rate: {travel.baseRate}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
