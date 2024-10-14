import { useState, useEffect, useRef } from "react";
import {
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { createServiceCenterThunk } from "../../../../store/apiThunk/serviceKoiThunk";
import { getAllTanksThunk } from "../../../../store/apiThunk/tankKoiThunk"; // Import thunk xóa

import {
    getAllServicesTypeThunk,

  } from "../../../../store/apiThunk/serviceKoiThunk";
  import { allServicesTypeSelector } from "../../../../store/sellectors";
import { allTanksSelector } from "../../../../store/sellectors";


import Swal from "sweetalert2";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./../../../../theme";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import NoBackground from "../../../../assets/uploadImg.png";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import {
  CREATEACCOUNTSUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const services = useSelector(allServicesTypeSelector);
  const tanks = useSelector(allTanksSelector);
  const [theme, colorMode] = useMode();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [serviceImage, setServiceImage] = useState({});
  const [formData, setFormData] = useState(new FormData());
  const mapRef = useRef(null);
console.log(services);
console.log(tanks);
  useEffect(() => {
    dispatch(getAllServicesTypeThunk());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllTanksThunk()); // Gọi API lấy tất cả tanks khi component mount
  }, [dispatch]);




  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      typeId: "",
      tankId: "",
      duration: "",
      serviceImage: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
      typeId: Yup.string().required("Required"),
      tankId: Yup.string().required("Required"),
      duration: Yup.number().required("Required"),
      serviceImage: Yup.mixed().required("Required"),
    }),
    onSubmit: async (values) => {
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("typeId", values.typeId);
      formData.append("tankId", values.tankId);
      formData.append("duration", values.duration);
      formData.append("serviceImage", serviceImage);

      setShowLoadingModal(true);
      dispatch(createServiceCenterThunk(formData))
        .unwrap()
        .then((res) => {
          setShowLoadingModal(false);
          Swal.fire({
            title: SUCCESSTEXT,
            text: CREATEACCOUNTSUCCESS,
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
            background: "white",
            timer: 1500,
            timerProgressBar: true,
            scrollbarPadding: false,
          }).then(() => navigate(""));
        })
        .catch((error) => {
          setShowLoadingModal(false);
          Swal.fire({
            title: ERRORTEXT,
            text: error.message,
            icon: "error",
            showConfirmButton: false,
            background: "white",
            timer: 1500,
            timerProgressBar: true,
            scrollbarPadding: false,
          });
        });
    },
  });

  const handleServiceImageSelect = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setServiceImage(file);
      formik.setFieldValue("serviceImage", URL.createObjectURL(file));
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="signup">
          <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={6} className="flex-center">
              <div className="signup__form">
                <h3 variant="h3" className="login__title">
                  Create Service Center
                </h3>
                <form onSubmit={formik.handleSubmit}>
                <input
                    id="serviceImage"
                    name="serviceImage"
                    type="file"
                    accept="image/png, image/jpeg"
                    style={{ display: "none" }}
                    onChange={handleServiceImageSelect}
                  />
                  <div style={{ position: "relative" }}>
                    <label htmlFor="serviceImage">
                      <div className="background_formik_box">
                        <img
                          src={
                            formik.values?.serviceImage === ""
                              ? NoBackground
                              : formik.values?.serviceImage
                          }
                          alt=""
                          className="background_formik"
                        />
                        <div className="background_formik_icon_box">
                          <PhotoCameraIcon className="background_formik_icon" />
                        </div>
                      </div>
                    </label>
                  </div>
                  {formik.touched.serviceImage &&
                    formik.errors.serviceImage && (
                      <div className="login__validation__error">
                        {formik.errors.serviceImage}
                      </div>
                    )}
                  <TextField
                    id="name"
                    label="Service Name"
                    variant="outlined"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    fullWidth
                    margin="dense"
                    color="secondary"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="login__validation__error">
                      {formik.errors.name}
                    </div>
                  )}
                  
                  <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    fullWidth
                    margin="dense"
                    color="secondary"
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="login__validation__error">
                      {formik.errors.description}
                    </div>
                  )}

                  <TextField
                    id="price"
                    label="Price"
                    variant="outlined"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    fullWidth
                    margin="dense"
                    color="secondary"
                  />
                  {formik.touched.price && formik.errors.price && (
                    <div className="login__validation__error">
                      {formik.errors.price}
                    </div>
                  )}

                  <TextField
                    id="typeId"
                    label="Type ID"
                    variant="outlined"
                    value={formik.values.typeId}
                    onChange={formik.handleChange}
                    fullWidth
                    margin="dense"
                    color="secondary"
                  />
                  {formik.touched.typeId && formik.errors.typeId && (
                    <div className="login__validation__error">
                      {formik.errors.typeId}
                    </div>
                  )}

                  <TextField
                    id="tankId"
                    label="Tank ID"
                    variant="outlined"
                    value={formik.values.tankId}
                    onChange={formik.handleChange}
                    fullWidth
                    margin="dense"
                    color="secondary"
                  />
                  {formik.touched.tankId && formik.errors.tankId && (
                    <div className="login__validation__error">
                      {formik.errors.tankId}
                    </div>
                  )}

                  <TextField
                    id="duration"
                    label="Duration (mins)"
                    variant="outlined"
                    type="number"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    fullWidth
                    margin="dense"
                    color="secondary"
                  />
                  {formik.touched.duration && formik.errors.duration && (
                    <div className="login__validation__error">
                      {formik.errors.duration}
                    </div>
                  )}

                  {/* <input
                    id="serviceImage"
                    name="serviceImage"
                    type="file"
                    accept="image/png, image/jpeg"
                    style={{ display: "none" }}
                    onChange={handleServiceImageSelect}
                  />
                  <div style={{ position: "relative" }}>
                    <label htmlFor="serviceImage">
                      <div className="background_formik_box">
                        <img
                          src={
                            formik.values?.serviceImage === ""
                              ? NoBackground
                              : formik.values?.serviceImage
                          }
                          alt=""
                          className="background_formik"
                        />
                        <div className="background_formik_icon_box">
                          <PhotoCameraIcon className="background_formik_icon" />
                        </div>
                      </div>
                    </label>
                  </div>
                  {formik.touched.serviceImage &&
                    formik.errors.serviceImage && (
                      <div className="login__validation__error">
                        {formik.errors.serviceImage}
                      </div>
                    )} */}

                  {!showLoadingModal ? (
                    <Button
                      className="login__btn"
                      variant="contained"
                      type="submit"
                      fullWidth
                    >
                      Create Service
                    </Button>
                  ) : (
                    <LoadingModal />
                  )}
                </form>
              </div>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
