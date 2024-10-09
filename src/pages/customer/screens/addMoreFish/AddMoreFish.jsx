import React, { useState, useEffect } from "react";
import "./AddMoreFish.css";
import {
  TextField,
  Box,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Divider } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addKoiByAccountIdThunk } from "../../../../store/apiThunk/koiThunk";
import {
  ADDPACKAGESUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";
import { BackButton } from "../../../../components/modal/backModal/backModal";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import Swal from "sweetalert2";

const AddMoreFish = () => {
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
      <Box>
        <Typography
          style={{
            fontFamily: "Source Sans Pro, sans-serif",
            fontSize: "32px",
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
      koiName: "",
      weight: "",
      age: "",
      gender: "",
      varieties: "",
    },
    validationSchema: Yup.object({
      koiName: Yup.string().required("Koi Name cannot be empty"),
      weight: Yup.number()
        .required("Weight cannot be empty")
        .min(0, "Weight cannot be negative")
        .integer("Weight must be an integer")
        .max(50, "Weight cannot exceed 50kg"),
      age: Yup.number()
        .required("Age cannot be empty")
        .min(0, "Age cannot be negative")
        .integer("Age must be an integer")
        .max(20, "Age cannot exceed 20 year"),
      gender: Yup.string().required("Gender cannot be empty"),
      varieties: Yup.string().required("Varieties cannot be empty"),
    }),

    onSubmit: async (values) => {
      setShowLoadingModal(true);
      dispatch(
        addKoiByAccountIdThunk({
          koiName: values.koiName,
          weight: values.weight,
          age: values.age,
          gender: values.gender,
          varieties: values.varieties,
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

  console.log(formik);

  return (
    <>
      <div className="add_more_fish">
        <Header
          title="Add More Fish "
          subtitle="Provide Koi Fish Information"
        />
        <form onSubmit={formik.handleSubmit} className="form-container">
          <div className="text-field-grid">
            <div className="text-field-container">
              <TextField
                id="koiName"
                label={
                  <span>
                    Koi Name: <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                value={formik.values.koiName}
                onChange={formik.handleChange}
                fullWidth
                autoComplete="koiName"
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
              {formik.touched.koiName && formik.errors.koiName && (
                <div className="login__validation__error">
                  {formik.errors.koiName}
                </div>
              )}
            </div>

            <div className="text-field-container">
              {/* weight */}
              <TextField
                id="weight"
                label={
                  <span>
                    Weight (kg) <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                value={formik.values.weight}
                onChange={formik.handleChange}
                fullWidth
                autoComplete="weight"
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
              {formik.touched.weight && formik.errors.weight && (
                <div className="login__validation__error">
                  {formik.errors.weight}
                </div>
              )}
            </div>

            {/* age */}
            <div className="text-field-container">
              <TextField
                id="age"
                label={
                  <span>
                    Age (years old) <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                value={formik.values.age}
                onChange={formik.handleChange}
                fullWidth
                autoComplete="age"
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
              {formik.touched.age && formik.errors.age && (
                <div className="login__validation__error">
                  {formik.errors.age}
                </div>
              )}
            </div>

            {/* <TextField
              id="gender"
              label={
                <span>
                  Gender <span style={{ color: "red" }}>*</span>
                </span>
              }
              variant="outlined"
              value={formik.values.gender}
              onChange={formik.handleChange}
              fullWidth
              autoComplete="gender"
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
            {formik.touched.gender && formik.errors.gender && (
              <div className="login__validation__error">
                <p>{formik.errors.gender}</p>
              </div>
            )} */}

            {/* gender */}
            <div className="text-field-container">
              <FormControl fullWidth margin="dense">
                <InputLabel id="gender-label">
                  <span>
                    Gender <span style={{ color: "red" }}>*</span>
                  </span>
                </InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender" // Ensure the name matches the formik field name
                  value={formik.values.gender}
                  onChange={(event) =>
                    formik.setFieldValue("gender", event.target.value)
                  } // Explicitly set the field value
                  fullWidth
                  color="secondary"
                  style={{
                    backgroundColor: "#f5f5f5",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    color: "black",
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
              {formik.touched.gender && formik.errors.gender && (
                <div className="login__validation__error">
                  {formik.errors.gender}
                </div>
              )}
            </div>

            {/* varieties */}
            <div className="text-field-container">
              <TextField
                id="varieties"
                label={
                  <span>
                    Varieties <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                value={formik.values.varieties}
                onChange={formik.handleChange}
                fullWidth
                autoComplete="varieties"
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
              {formik.touched.varieties && formik.errors.varieties && (
                <div className="login__validation__error">
                  {formik.errors.varieties}
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
                marginBottom: "10px",
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

export default AddMoreFish;
