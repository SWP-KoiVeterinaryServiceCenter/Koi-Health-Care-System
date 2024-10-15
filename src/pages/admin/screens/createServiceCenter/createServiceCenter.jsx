import { useState, useEffect, useRef } from "react";
import { Button, TextField, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { createServiceCenterThunk } from "../../../../store/apiThunk/serviceKoiThunk";
import { getAllTanksThunk } from "../../../../store/apiThunk/tankKoiThunk";
import { getAllServicesTypeThunk } from "../../../../store/apiThunk/serviceKoiThunk";
import { allServicesTypeSelector, allTanksSelector } from "../../../../store/sellectors";
import Swal from "sweetalert2";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ColorModeContext, useMode } from "./../../../../theme";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import NoBackground from "../../../../assets/uploadImg.png";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";

// Tạo custom theme với màu chữ đen
const customTheme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-input': {
            color: 'black',
          },
          '& .MuiSelect-select': {
            color: 'black',
          },
          '& fieldset': {
            borderColor: 'black',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
  },
});

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const services = useSelector(allServicesTypeSelector);
  const tanks = useSelector(allTanksSelector);
  const [theme, colorMode] = useMode();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [serviceImage, setServiceImage] = useState({});
  const [formData, setFormData] = useState(new FormData());

  useEffect(() => {
    dispatch(getAllServicesTypeThunk());
    dispatch(getAllTanksThunk());
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
      const newFormData = new FormData();  // Tạo FormData mới trong onSubmit
      newFormData.append("name", values.name);
      newFormData.append("description", values.description);
      newFormData.append("price", values.price);
      newFormData.append("typeId", values.typeId);
      newFormData.append("tankId", values.tankId);
      newFormData.append("duration", values.duration);
      newFormData.append("serviceImage", serviceImage);

      setShowLoadingModal(true);
      dispatch(createServiceCenterThunk(newFormData))
        .unwrap()
        .then((res) => {
          setShowLoadingModal(false);
          // Hiển thị modal thông báo thành công bằng SweetAlert2
          Swal.fire({
            title: "Thành Công!",
            text: "Dịch vụ đã được tạo thành công.",
            icon: "success",
            confirmButtonText: "OK",
            background: "white",
            confirmButtonColor: "#3085d6",
          }).then(() => navigate(""));  // Điều hướng về trang khác sau khi đóng modal
        })
        .catch((error) => {
          setShowLoadingModal(false);
          Swal.fire({
            title: "Lỗi!",
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
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <div className="signup">
          <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={6} className="flex-center">
              <div className="signup__form">
                <h3 variant="h3" className="login__title">Create Service Center</h3>
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
                          src={formik.values?.serviceImage === "" ? NoBackground : formik.values?.serviceImage}
                          alt=""
                          className="background_formik"
                        />
                        <div className="background_formik_icon_box">
                          <PhotoCameraIcon className="background_formik_icon" />
                        </div>
                      </div>
                    </label>
                  </div>
                  {formik.touched.serviceImage && formik.errors.serviceImage && (
                    <div className="login__validation__error">{formik.errors.serviceImage}</div>
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
                    <div className="login__validation__error">{formik.errors.name}</div>
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
                    <div className="login__validation__error">{formik.errors.description}</div>
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
                    <div className="login__validation__error">{formik.errors.price}</div>
                  )}

                  {/* Select Tank */}
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="tankId-label">Chọn Bể Cá</InputLabel>
                    <Select
                      labelId="tankId-label"
                      id="tankId"
                      name="tankId"
                      value={formik.values.tankId}
                      onChange={formik.handleChange}
                      label="Chọn Bể Cá"
                    >
                      {tanks.map((tank) => (
                        <MenuItem key={tank.tankId} value={tank.tankId}>
                          {tank.tankName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formik.touched.tankId && formik.errors.tankId && (
                    <div className="login__validation__error">{formik.errors.tankId}</div>
                  )}

                  {/* Select Service Type */}
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="typeId-label">Chọn Loại Dịch Vụ</InputLabel>
                    <Select
                      labelId="typeId-label"
                      id="typeId"
                      name="typeId"
                      value={formik.values.typeId}
                      onChange={formik.handleChange}
                      label="Chọn Loại Dịch Vụ"
                    >
                      {services.map((service) => (
                        <MenuItem key={service.typeId} value={service.typeId}>
                          {service.typeName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formik.touched.typeId && formik.errors.typeId && (
                    <div className="login__validation__error">{formik.errors.typeId}</div>
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
                    <div className="login__validation__error">{formik.errors.duration}</div>
                  )}

                  {!showLoadingModal ? (
                    <Button className="login__btn" variant="contained" type="submit" fullWidth>
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
