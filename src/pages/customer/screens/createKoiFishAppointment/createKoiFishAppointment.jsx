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

import { createAppointmentByAccountIdThunk } from "../../../../store/apiThunk/serviceKoiThunk";
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

  // Find Current Service OnClick
  const location = useLocation();
  const { serviceId } = location.state || {}; // Get serviceId from the location state
  const allServices = useSelector(allServicesSelector);
  const selectedService = allServices.find(
    (service) => service.id === serviceId
  );

  // Find All The Koi User Currently Have
  const allKoiByAccountId = useSelector(allKoiByAccountIdSelector);

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

  //

  const vetDetail = useSelector(vetDetailSelector);

  useEffect(() => {
    dispatch(getAllVetAccountThunk()).then(() => setShowLoadingModal(false));
  }, [dispatch]);

  // const allServices = useSelector(allServicesSelector);

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
      serviceName: selectedService ? selectedService.name : "", // Automatically set serviceName
      koiName: "",
      doctorName: "",
      appointmentDate: "",
      appointmentTime: "",
      description: "",
    },
    validationSchema: Yup.object({
      // serviceName: Yup.string().required("Service Name cannot be empty"),
      koiName: Yup.string().required("Koi Name cannot be empty"),
      doctorName: Yup.string().required("Doctor Name cannot be empty"),
      appointmentDate: Yup.string().required("Date cannot be empty"),
      appointmentTime: Yup.string().required("Time cannot be empty"),
      description: Yup.string().required("Description cannot be empty"),
    }),

    onSubmit: async (values) => {
      setShowLoadingModal(true);
      dispatch(
        createAppointmentByAccountIdThunk({
          koiName: values.koiName,
          serviceName: values.serviceName,
          doctorName: values.doctorName,
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
            // text: ADDPACKAGESUCCESS,
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
        })
        .catch((error) => {
          setShowLoadingModal(false);
          Swal.fire({
            title: ERRORTEXT,
            text: error.message,
            icon: "error",
            showConfirmButton: false,
            background: "white",
            timer: 2000,
            timerProgressBar: true,
            scrollbarPadding: false,
          });
        });
    },
  });

  return (
    <>
      <div className="add_more_fish">
        <Header
          title="Create Koi Fish Appointment"
          // subtitle="Please Provide Appointment Information"
        />
        <form onSubmit={formik.handleSubmit} className="form-container">
          <div className="text-field-grid">
            {/* Center Service */}
            <div className="text-field-container">
              <TextField
                id="serviceName"
                label={
                  <span>
                    Center Service <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                value={formik.values.serviceName}
                InputProps={{
                  readOnly: true, // Make the field read-only
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
                <InputLabel id="koiName">
                  Koi Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  labelId="koiName"
                  id="koiName"
                  value={formik.values.koiName}
                  // onChange={formik.handleChange}
                  label="Koi Name"
                  color="secondary"
                  style={{ backgroundColor: "#f5f5f5", color: "black" }}
                  onChange={(event) =>
                    formik.setFieldValue("koiName", event.target.value)
                  } // Explicitly set the field value
                >
                  {allKoiByAccountId && allKoiByAccountId.length > 0 ? (
                    allKoiByAccountId.map((koi) => (
                      <MenuItem key={koi.id} value={koi.koiName}>
                        {koi.koiName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Koi available</MenuItem>
                  )}
                </Select>
              </FormControl>
              {formik.touched.koiName && formik.errors.koiName && (
                <div className="login__validation__error">
                  {formik.errors.koiName}
                </div>
              )}
            </div>

            {/* Doctor Name */}
            <div className="text-field-container">             
              <FormControl fullWidth margin="dense">
                <InputLabel id="doctorName">
                  Veterinarian Name <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <Select
                  labelId="doctorName"
                  id="doctorName"
                  value={formik.values.doctorName}
                  label="Doctor Name"
                  color="secondary"
                  style={{ backgroundColor: "#f5f5f5", color: "black" }}
                  onChange={(event) =>
                    formik.setFieldValue("doctorName", event.target.value)
                  } // Explicitly set the field value
                >
                  {vetDetail && vetDetail.length > 0 ? (
                    vetDetail.map((vet) => (
                      <MenuItem key={vet.accountId} value={vet.username}>
                        {vet.username}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Veterinarian available</MenuItem>
                  )}
                </Select>
              </FormControl>
              {formik.touched.doctorName && formik.errors.doctorName && (
                <div className="login__validation__error">
                  {formik.errors.doctorName}
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
                variant="outlined"
                value={formik.values.appointmentDate}
                onChange={formik.handleChange}
                fullWidth
                autoComplete="appointmentDate"
                margin="dense"
                type="date"
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
