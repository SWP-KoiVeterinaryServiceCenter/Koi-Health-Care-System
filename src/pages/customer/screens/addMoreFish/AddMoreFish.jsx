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
import NoBackground from "../../../../assets/uploadImg.png";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const AddMoreFish = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const [koiImage, setKoiImage] = useState({});
  const [formData, setFormData] = useState(new FormData());

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
      koiImage: "",
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
      koiImage: Yup.mixed().required("Koi image is required"),
    }),

    onSubmit: async (values) => {
      const newFormData = new FormData();
      newFormData.append("koiName", values.koiName);
      newFormData.append("weight", values.weight);
      newFormData.append("age", values.age);
      newFormData.append("gender", values.gender);
      newFormData.append("varieties", values.varieties);
      newFormData.append("koiImage", koiImage);

      setShowLoadingModal(true);
      dispatch(addKoiByAccountIdThunk(newFormData))
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
          console.error("Error response:", error);
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

  const handleKoiImageSelect = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setKoiImage(file);
      formik.setFieldValue("koiImage", URL.createObjectURL(file));
    }
  };

  console.log(formik);

  return (
    <>
      <div className="add_more_fish">
        <Header
          title="Add More Fish "
          subtitle="Provide Koi Fish Information"
        />
        <form onSubmit={formik.handleSubmit} className="form-container">
          {/* 1st Column: Koi Image */}
          <div className="image-field">
            <input
              id="koiImage"
              name="koiImage"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              style={{ display: "none" }}
              onChange={handleKoiImageSelect}
            />
            
            <label htmlFor="koiImage">
              <div className="background_formik_box_1">
                <img
                  src={
                    formik.values?.koiImage === ""
                      ? NoBackground
                      : formik.values?.koiImage
                  }
                  alt="Koi Image"
                  
                />        
              </div>
            </label>
            {formik.touched.koiImage && formik.errors.koiImage && (
              <div className="addmorekoifish__validation__error">
                {formik.errors.koiImage}
              </div>
            )}
          </div>

          {/* 2nd Column: Koi Name, Gender, Age */}
          <div className="second-column">
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
              {formik.touched.koiName && formik.errors.koiName && (
                <div className="addmorekoifish__validation__error">
                  {formik.errors.koiName}
                </div>
              )}
            </div>

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
                  value={formik.values.gender}
                  onChange={(event) =>
                    formik.setFieldValue("gender", event.target.value)
                  }
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
                <div className="addmorekoifish__validation__error">
                  {formik.errors.gender}
                </div>
              )}
            </div>

            <div className="text-field-container">
              <TextField
                id="age"
                label={
                  <span>
                    Age (years) <span style={{ color: "red" }}>*</span>
                  </span>
                }
                variant="outlined"
                value={formik.values.age}
                onChange={formik.handleChange}
                fullWidth
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
                <div className="addmorekoifish__validation__error">
                  {formik.errors.age}
                </div>
              )}
            </div>
          </div>

          {/* 3rd Column: Weight, Varieties, and Buttons */}
          <div className="third-column">
            <div className="text-field-container">
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
                <div className="addmorekoifish__validation__error">
                  {formik.errors.weight}
                </div>
              )}
            </div>

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
              {formik.touched.varieties && formik.errors.varieties && (
                <div className="addmorekoifish__validation__error">
                  {formik.errors.varieties}
                </div>
              )}
            </div>

            {/* Button Container */}
            {!showLoadingModal ? (
              <div className="button-container">
                <BackButton style={{ fontSize: "14px" }} />
                <Button className="btn" variant="contained" type="submit">
                  Create
                </Button>
              </div>
            ) : (
              <LoadingModal />
            )}
          </div>
        </form>
      </div>
      <Divider />
    </>
  );
};

export default AddMoreFish;
