import React, { useState, useEffect } from "react";
import "./createKoiFishAppointment.css";
import {
  TextField,
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Divider,
} from "@mui/material";
import {
  ADDPACKAGESUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";
import { BackButton } from "../../../../components/modal/backModal/backModal";

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import Swal from "sweetalert2";

import { useLocation } from "react-router-dom";

import { createAppointmentByAccountIdThunk } from "../../../../store/apiThunk/appointment";
import { allServicesSelector } from "../../../../store/sellectors";

import { getUserDataThunk } from "../../../../store/apiThunk/userThunk";
import { getKoiByAccountIdThunk } from "../../../../store/apiThunk/koiThunk";
import { allKoiByAccountIdSelector } from "../../../../store/sellectors";

import { vetDetailSelector } from "../../../../store/sellectors";
import { getAllVetAccountThunk } from "../../../../store/apiThunk/userThunk";

const CreateKoiFishAppointment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  // Get serviceId from the location state
  const location = useLocation();
  const { serviceId } = location.state || {};
  console.log(serviceId);

  // Selectors for fetching data
  const allServices = useSelector(allServicesSelector);
  const allKoiByAccountId = useSelector(allKoiByAccountIdSelector);
  const selectedService = allServices.find(
    (service) => service.id === serviceId
  );
  const vetDetail = useSelector(vetDetailSelector);

  // Fetch user data and Koi fish list
  useEffect(() => {
    const fetchUserAndKoiData = async () => {
      const user = await dispatch(getUserDataThunk()).unwrap();
      const accountId = user?.accountId;
      if (accountId) {
        dispatch(getKoiByAccountIdThunk(accountId));
      } else {
        console.error("AccountId is undefined.");
      }
    };

    fetchUserAndKoiData();
  }, [dispatch]);

  // Fetch all veterinarians
  useEffect(() => {
    dispatch(getAllVetAccountThunk()).then(() => setShowLoadingModal(false));
  }, [dispatch]);

  const Header = ({
    title,
    subtitle,
    titleColor = "gray",
    subtitleColor = "gray",
  }) => {
    return (
      <Box>
        <Typography
          style={{
            fontFamily: "Source Sans Pro, sans-serif",
            fontSize: "30px",
            color: titleColor,
            fontWeight: "700",
            textShadow:
              "1px 1px 2px rgba(0, 0, 0, 0.3), 0 0 25px rgba(0, 0, 0, 0.2)",
            padding: "10px",
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
      centerServiceId: selectedService ? selectedService.id : "",
      koiId: "",
      veterinarianId: "",
      appointmentDate: "",
      appointmentTime: "",
      description: "",
    },
    validationSchema: Yup.object({
      // centerServiceId: Yup.string().required("Service Name cannot be empty"),
      koiId: Yup.string().required("Koi Name cannot be empty"),
      veterinarianId: Yup.string().required("Doctor Name cannot be empty"),
      appointmentTime: Yup.number()
        .required("Time cannot be empty")
        .integer("Time must be an integer")
        .min(7, "Must be at 8 AM or More")
        .max(17, "Cannot exceed 17 PM"),
      description: Yup.string()
        .required("Description cannot be empty")
        .min(5, "Description must be at least 5 characters")
        .max(40, "No more than 40 character"),
      appointmentDate: Yup.date()
        .required("Date cannot be empty")
        .min(
          new Date(new Date().setDate(new Date().getDate() + 2)),
          "Must be at least 2 days from today"
        )
        .nullable(),
    }),

    onSubmit: async (values) => {
      console.log("Form values before submitting:", values); // For debugging

      setShowLoadingModal(true);
      dispatch(
        createAppointmentByAccountIdThunk({
          koiId: values.koiId,
          centerServiceId: values.centerServiceId,
          veterinarianId: values.veterinarianId,
          appointmentDate: values.appointmentDate,
          appointmentTime: values.appointmentTime,
          description: values.description,
        })
      )
        .unwrap()
        .then(() => {
          setShowLoadingModal(false);
          Swal.fire({
            title: SUCCESSTEXT,
            icon: "success",
            timer: 1500,
          }).then(() => {
            navigate(-1);
          });
        })
        .catch((error) => {
          setShowLoadingModal(false);
          console.error("Error creating appointment:", error);
          Swal.fire({
            title: ERRORTEXT,
            text: error.response?.data?.message || error.message,
            icon: "error",
            timer: 2000,
          });
        });
    },
  });

  return (
    <>
      <div className="create_koi_fish_appointment">
        <Header
          title="Create Koi Fish Appointment"
          // subtitle="Please Provide Appointment Information"
        />
        <form onSubmit={formik.handleSubmit} className="form-container">
          <div className="text-field-grid">
            {/* Center Service */}
            <div className="text-field-container">
              <TextField
                id="centerServiceId"
                label={
                  <span>
                    Center Service <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                value={selectedService ? selectedService.name : ""} // Display service name instead of ID
                InputProps={{
                  readOnly: true,
                  style: {
                    backgroundColor: "#f5f5f5",
                    color: "black",
                  },
                }}
                fullWidth
                margin="dense"
              />
            </div>

            {/* Koi Name */}
            <div className="text-field-container">
              <FormControl fullWidth margin="dense">
                <InputLabel id="koiId">
                  Koi Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  labelId="koiId"
                  id="koiId"
                  value={formik.values.koiId}
                  label="Koi Name"
                  color="secondary"
                  style={{ backgroundColor: "#f5f5f5", color: "black" }}
                  onChange={(event) =>
                    formik.setFieldValue("koiId", event.target.value)
                  }
                >
                  {allKoiByAccountId && allKoiByAccountId.length > 0 ? (
                    allKoiByAccountId.map((koi) => (
                      <MenuItem key={koi.id} value={koi.id}>
                        {koi.koiName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Koi available</MenuItem>
                  )}
                </Select>
              </FormControl>
              {formik.touched.koiId && formik.errors.koiId && (
                <div className="login__validation__error">
                  {formik.errors.koiId}
                </div>
              )}
            </div>

            {/* Doctor Name */}
            <div className="text-field-container">
              <FormControl fullWidth margin="dense">
                <InputLabel id="veterinarianId">
                  Veterinarian Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  labelId="veterinarianId"
                  id="veterinarianId"
                  value={formik.values.veterinarianId}
                  label="Doctor Name"
                  color="secondary"
                  style={{ backgroundColor: "#f5f5f5", color: "black" }}
                  onChange={(event) =>
                    formik.setFieldValue("veterinarianId", event.target.value)
                  } // Explicitly set the field value
                >
                  {vetDetail && vetDetail.length > 0 ? (
                    vetDetail.map((vet) => (
                      <MenuItem key={vet.accountId} value={vet.accountId}>
                        {vet.username}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Veterinarian available</MenuItem>
                  )}
                </Select>
              </FormControl>
              {formik.touched.veterinarianId &&
                formik.errors.veterinarianId && (
                  <div className="login__validation__error">
                    {formik.errors.veterinarianId}
                  </div>
                )}
            </div>

            {/* Description */}
            <div className="text-field-container">
              <TextField
                id="description"
                label={
                  <span>
                    Description <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                value={formik.values.description}
                onChange={formik.handleChange}
                fullWidth
                autoComplete="description"
                margin="dense"
                type="string"
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
              {formik.touched.description && formik.errors.description && (
                <div className="login__validation__error">
                  {formik.errors.description}
                </div>
              )}
            </div>

            {/* Appointment Date */}
            <div className="text-field-container">
              <TextField
                id="appointmentDate"
                label={
                  <span>
                    Appointment Date <span style={{ color: "red" }}>*</span>
                  </span>
                }
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                variant="outlined"
                value={formik.values.appointmentDate}
                onChange={formik.handleChange}
                fullWidth
                autoComplete="appointmentDate"
                margin="dense"
                type="date"
                color="secondary"
                InputLabelProps={{ style: { color: "black" }, shrink: true }}
                InputProps={{
                  style: {
                    backgroundColor: "#f5f5f5",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    color: "black",
                  },
                }}
              />
              {formik.touched.appointmentDate &&
                formik.errors.appointmentDate && (
                  <div className="login__validation__error">
                    {formik.errors.appointmentDate}
                  </div>
                )}
            </div>

            {/* Appointment Time*/}
            <div className="text-field-container">
              <TextField
                id="appointmentTime"
                label={
                  <span>
                    Appointment Time <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                value={formik.values.appointmentTime}
                onChange={formik.handleChange}
                fullWidth
                autoComplete="appointmentTime"
                margin="dense"
                type="number"
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
              {formik.touched.appointmentTime &&
                formik.errors.appointmentTime && (
                  <div className="login__validation__error">
                    {formik.errors.appointmentTime}
                  </div>
                )}
            </div>
          </div>

          {!showLoadingModal ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "30px",
                margin: "25px 0px",
              }}
            >
              <BackButton style={{ fontSize: "14px" }} />
              <Button className="btn" variant="contained" type="submit">
                Create
              </Button>
            </div>
          ) : (
            <LoadingModal />
          )}
        </form>
      </div>
      <Divider />
    </>
  );
};

export default CreateKoiFishAppointment;
