import React from "react";
import "./UpdateKoiFishInformation.css";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import {
  UPDATEPACKAGESUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";
import { BackButton } from "../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import {
  getKoiByIdThunk,
  updateKoiByAccountIdThunk,
} from "../../../../store/apiThunk/koiThunk";

import { allKoiByIdSelector } from "../../../../store/sellectors";
import { Divider } from "antd";

export default function updateKoiFishInformation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const koiId = location.state?.koiId;
  const allKoiById = useSelector(allKoiByIdSelector);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showRender, setShowRender] = useState(false);
  const Header = ({
    title,
    subtitle,
    titleColor = "gray",
    subtitleColor = "gray",
  }) => {
    return (
      <Box mb={2}>
        <Typography
          style={{
            fontFamily: "Source Sans Pro, sans-serif",
            fontSize: "32px",
            color: titleColor,
            fontWeight: "700",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Shadow effect
            // border: "1px solid rgba(255, 255, 255, 0.5)", // Light white border
            padding: "4px", // Optional: padding to make the border more visible
            borderRadius: "4px", // Optional: rounded corners for the border
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

  useEffect(() => {
    setShowRender(true);
    dispatch(getKoiByIdThunk(koiId)).then(() => setShowRender(false));
  }, [koiId, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      koiName: allKoiById.koiName || "",
      weight: allKoiById.weight || "",
      age: allKoiById.age || "",
      gender: allKoiById.gender || "",
      varieties: allKoiById.varieties || "",
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
        updateKoiByAccountIdThunk({
          id: koiId,
          koiName: values.koiName,
          weight: values.weight,
          age: values.weight,
          gender: values.gender,
          varieties: values.varieties,
        })
      )
        .unwrap()
        .then(() => {
          setShowLoadingModal(false);
          Swal.fire({
            title: SUCCESSTEXT,
            text: UPDATEPACKAGESUCCESS,
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
      <div className="updatePackage">
        <Header
          title="Update Koi Information"
          subtitle="Provide Koi Information"
        />
        {!showRender ? (
          <form onSubmit={formik.handleSubmit}>
            {/* koiName */}
            <TextField
              id="koiName"
              label={
                <span>
                  Koi Name <span style={{ color: "red" }}>*</span>
                </span>
              }
              variant="outlined"
              value={formik.values.koiName}
              onChange={formik.handleChange}
              fullWidth
              autoComplete="koiName"
              margin="dense"
              color="secondary"
              InputLabelProps={{
                style: { color: "black" },
              }}
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
                <p>{formik.errors.koiName}</p>
              </div>
            )}

            {/* weight */}
            <TextField
              id="weight"
              label={
                <span>
                  Weight (Kg) <span style={{ color: "red" }}>*</span>
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
              InputLabelProps={{
                style: { color: "black" },
              }}
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
                <p>{formik.errors.weight}</p>
              </div>
            )}

            {/* age */}
            <TextField
              id="age"
              label={
                <span>
                  Age (Years Old) <span style={{ color: "red" }}>*</span>
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
              InputLabelProps={{
                style: { color: "black" },
              }}
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
                <p>{formik.errors.age}</p>
              </div>
            )}

            {/* gender */}
            <TextField
              id="gender"
              label="Price"
              variant="outlined"
              value={formik.values.gender}
              onChange={formik.handleChange}
              fullWidth
              autoComplete="gender"
              margin="dense"
              type="number"
              color="secondary"
              InputLabelProps={{
                style: { color: "black" },
              }}
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
            )}

            {/* varieties */}
            <TextField
              id="varieties"
              label="Price"
              variant="outlined"
              value={formik.values.varieties}
              onChange={formik.handleChange}
              fullWidth
              autoComplete="varieties"
              margin="dense"
              type="number"
              color="secondary"
              InputLabelProps={{
                style: { color: "black" },
              }}
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
                <p>{formik.errors.varieties}</p>
              </div>
            )}

            {!showLoadingModal ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "30px",
                  marginBottom: "50px",
                  marginTop: "30px",
                }}
              >
                <BackButton type="update" />
                <Button
                  className="login__btn"
                  style={{
                    backgroundColor: "#70d8bd",
                    fontSize: "14px",
                  }}
                  variant="contained"
                  type="submit"
                >
                  Update
                </Button>
              </div>
            ) : (
              <LoadingModal />
            )}
          </form>
        ) : (
          <LoadingModal />
        )}
      </div>
      <Divider />
    </>
  );
}
