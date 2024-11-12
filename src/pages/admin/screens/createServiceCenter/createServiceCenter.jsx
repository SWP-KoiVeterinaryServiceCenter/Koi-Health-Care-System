import { useState, useEffect } from "react";
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

export default function CreateServiceCenter() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const services = useSelector(allServicesTypeSelector);
  const tanks = useSelector(allTanksSelector);
  const [theme, colorMode] = useMode();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [serviceImage, setServiceImage] = useState(null);

  useEffect(() => {
    dispatch(getAllServicesTypeThunk());
    dispatch(getAllTanksThunk());
  }, [dispatch]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Tên dịch vụ không thể trống"),
    description: Yup.string().required("Mô tả không thể trống"),
    price: Yup.number()
      .required("Giá không thể trống")
      .min(10000, "Giá thấp nhất là 10,000")
      .integer("Gía phải là số nguyên")
      .max(100000000, "Giá cao nhất là 100,000,000"),
    typeId: Yup.string().required("Loại dịch vụ không thể trống"),
    tankId: Yup.string().required("Bể cá không thể trống"),
    duration: Yup.number()
      .required("Thời gian không thể trống")
      .integer("Thời gian phải là số nguyên")
      .min(15, "Thời gian tối thiểu là 15 phút")
      .max(1380, "Thời gian tối đa là 1380 phút"),
    serviceLocationType: Yup.string().required("Vị trí dịch vụ không thể trống"),
    customLocation: Yup.string().when("serviceLocationType", {
      is: "Choose Location",
      then: Yup.string().required("Vị trí tùy chỉnh không thể trống"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      typeId: "",
      tankId: "",
      duration: "",
      serviceLocationType: "",
      customLocation: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!serviceImage) {
        Swal.fire({
          title: "Lỗi!",
          text: "Vui lòng tải lên hình ảnh dịch vụ",
          icon: "error",
          confirmButtonText: "OK",
          background: "white",
        });
        return;
      }

      const newFormData = new FormData();
      newFormData.append("name", values.name);
      newFormData.append("description", values.description);
      newFormData.append("price", values.price);
      newFormData.append("typeId", values.typeId);
      newFormData.append("tankId", values.tankId);
      newFormData.append("duration", values.duration);
      newFormData.append("serviceImage", serviceImage);
      newFormData.append("serviceLocation", 
        values.serviceLocationType === "Choose Location" 
          ? values.customLocation 
          : values.serviceLocationType
      );

      setShowLoadingModal(true);
      try {
        await dispatch(createServiceCenterThunk(newFormData)).unwrap();
        setShowLoadingModal(false);
        Swal.fire({
          title: "Thành Công!",
          text: "Dịch vụ đã được tạo thành công.",
          icon: "success",
          confirmButtonText: "OK",
          background: "white",
          confirmButtonColor: "#3085d6",
        }).then(() => navigate(""));
      } catch (error) {
        setShowLoadingModal(false);
        Swal.fire({
          title: "Lỗi!",
          text: error.message || "Đã xảy ra lỗi khi tạo dịch vụ.",
          icon: "error",
          showConfirmButton: false,
          background: "white",
          timer: 1500,
          timerProgressBar: true,
          scrollbarPadding: false,
        });
      }
    },
  });

  const handleServiceImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
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
            <Grid item xs={2}></Grid>
            <Grid item xs={8} className="flex-center" style={{marginTop:30, padding:10}}>
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
                          src={formik.values.serviceImage || NoBackground}
                          alt=""
                          className="background_formik"
                        />
                        <div className="background_formik_icon_box">
                          <PhotoCameraIcon className="background_formik_icon" />
                        </div>
                      </div>
                    </label>
                  </div>
                  {!serviceImage && <div className="login__validation__error">Hình ảnh dịch vụ không thể trống</div>}

                  <TextField
                    id="name"
                    name="name"
                    label="Service Name"
                    variant="outlined"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    margin="dense"
                    color="secondary"
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />

                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    variant="outlined"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    margin="dense"
                    color="secondary"
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />

                  <TextField
                    id="price"
                    name="price"
                    label="Price"
                    variant="outlined"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    margin="dense"
                    color="secondary"
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />

                  <FormControl fullWidth margin="dense" error={formik.touched.tankId && Boolean(formik.errors.tankId)}>
                    <InputLabel id="tankId-label">Choose Aquarium</InputLabel>
                    <Select
                      labelId="tankId-label"
                      id="tankId"
                      name="tankId"
                      value={formik.values.tankId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      label="Choose Aquarium"
                    >
                      {tanks.map((tank) => (
                        <MenuItem key={tank.tankId} value={tank.tankId}>
                          {tank.tankName}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.tankId && formik.errors.tankId && (
                      <div className="login__validation__error">{formik.errors.tankId}</div>
                    )}
                  </FormControl>

                  <FormControl fullWidth margin="dense" error={formik.touched.typeId && Boolean(formik.errors.typeId)}>
                    <InputLabel id="typeId-label">Select Service Type</InputLabel>
                    <Select
                      labelId="typeId-label"
                      id="typeId"
                      name="typeId"
                      value={formik.values.typeId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      label="Select Service Type"
                    >
                      {services.map((service) => (
                        <MenuItem key={service.typeId} value={service.typeId}>
                          {service.typeName}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.typeId && formik.errors.typeId && (
                      <div className="login__validation__error">{formik.errors.typeId}</div>
                    )}
                  </FormControl>

                  <TextField
                    id="duration"
                    name="duration"
                    label="Duration (mins)"
                    variant="outlined"
                    type="number"
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    fullWidth
                    margin="dense"
                    color="secondary"
                    error={formik.touched.duration && Boolean(formik.errors.duration)}
                    helperText={formik.touched.duration && formik.errors.duration}
                  />

                  <FormControl fullWidth margin="dense" error={formik.touched.serviceLocationType && Boolean(formik.errors.serviceLocationType)}>
                    <InputLabel id="serviceLocationType-label">Location</InputLabel>
                    <Select
                      labelId="serviceLocationType-label"
                      id="serviceLocationType"
                      name="serviceLocationType"
                      value={formik.values.serviceLocationType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      label="Location"
                    >
                      <MenuItem value="Online">Online</MenuItem>
                      <MenuItem value="Center">Center</MenuItem>
                      <MenuItem value="Choose Location">Choose Location</MenuItem>
                    </Select>
                    {formik.touched.serviceLocationType && formik.errors.serviceLocationType && (
                      <div className="login__validation__error">{formik.errors.serviceLocationType}</div>
                    )}
                  </FormControl>

                  {formik.values.serviceLocationType === "Choose Location" && (
                    <TextField
                      id="customLocation"
                      name="customLocation"
                      label="Custom Location"
                      variant="outlined"
                      value={formik.values.customLocation}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="dense"
                      color="secondary"
                      error={formik.touched.customLocation && Boolean(formik.errors.customLocation)}
                      helperText={formik.touched.customLocation && formik.errors.customLocation}
                    />
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
            <Grid item xs={2}></Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}