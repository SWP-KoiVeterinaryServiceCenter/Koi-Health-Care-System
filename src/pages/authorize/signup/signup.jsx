import "./signup.css";
import { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signupThunk } from "../../../store/apiThunk/userThunk";
import Swal from "sweetalert2";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./../../../theme";
import LoadingModal from "../../../components/modal/loadingModal/loadingModal";
import {
  CREATEACCOUNTSUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../components/text/notiText/notiText";
import backgroundVideo from "../../../assets/video/koi_signup.mp4";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [theme, colorMode] = useMode();
  const [showPassword, setShowPassword] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
      location: "",
      contactLink: "",
      phonenumber: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Mật khẩu không thể trống")
        .min(8, "Mật khẩu phải có ít nhất 8 chữ số"),
      email: Yup.string()
      .required("Email không thể trống")
      .email("Email sai định dạng")
      .matches(/@gmail\.com$/, "Email phải là địa chỉ Gmail"),
      fullname: Yup.string().required("Họ tên không thể trống"),
      phonenumber: Yup.string()
        .matches(/^[0-9]+$/, "Số điện thoại chỉ có thể chứa số")
        .required("Số điện thoại không thể trống")
        .min(10, "Số điện thoại phải có 10 số")
        .max(10, "Số điện thoại phải có 10 số"),
      location: Yup.string().required("Xin hãy chọn địa chỉ"),
    }),
    onSubmit: async (values) => {
      setShowLoadingModal(true);
      console.log("Submitting form data:", values);

      dispatch(
        signupThunk({
          email: values.email,
          password: values.password,
          fullName: values.fullname,
          location: values.location,
          phonenumber: values.phonenumber,
          contactLink: values.contactLink,
          username: values.username,
        })
      )
        .unwrap()
        .then(() => {
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

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      "& .MuiInputBase-input": {
        color: "black",
      },
      "& fieldset": {
        borderColor: "#419781",
        borderWidth: "2px",
      },
      "&:hover fieldset": {
        borderColor: "#419781",
        borderWidth: "2px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#419781",
        borderWidth: "2px",
      },
    },
    marginBottom: "4px",
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="signup">
          <video autoPlay loop muted className="login__video_background">
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <Grid container spacing={2}>
            <Grid item xs={3}></Grid>
            <Grid item xs={6} className="flex-center">
              <div className="signup__form">
                <h3 className="login__title">Đăng ký</h3>
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-field">
                    <TextField
                      id="username"
                      label={
                        <span style={{ color: "black" }}>
                          Username <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      variant="outlined"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="dense"
                      color="secondary"
                      sx={inputStyle}
                      error={formik.touched.username && Boolean(formik.errors.username)}
                      helperText={formik.touched.username && formik.errors.username}
                    />
                  </div>

                  <div className="form-field">
                    <TextField
                      id="email"
                      label={
                        <span style={{ color: "black" }}>
                          Email <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      variant="outlined"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="dense"
                      color="secondary"
                      sx={inputStyle}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </div>

                  <div className="form-field">
                    <TextField
                      id="password"
                      label={
                        <span style={{ color: "black" }}>
                          Mật Khẩu <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      variant="outlined"
                      type={showPassword ? "text" : "password"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="dense"
                      color="secondary"
                      sx={inputStyle}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <VisibilityOffOutlined className="login__view__password__btn" />
                              ) : (
                                <VisibilityOutlined className="login__view__password__btn" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>

                  <div className="form-field">
                    <TextField
                      id="fullname"
                      label={
                        <span style={{ color: "black" }}>
                          Họ Tên <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      variant="outlined"
                      value={formik.values.fullname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="dense"
                      color="secondary"
                      sx={inputStyle}
                      error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                      helperText={formik.touched.fullname && formik.errors.fullname}
                    />
                  </div>

                  <div className="form-field">
                    <TextField
                      id="location"
                      label={
                        <span style={{ color: "black" }}>
                          Địa chỉ <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      variant="outlined"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="dense"
                      color="secondary"
                      sx={inputStyle}
                      error={formik.touched.location && Boolean(formik.errors.location)}
                      helperText={formik.touched.location && formik.errors.location}
                    />
                  </div>

                  <div className="form-field">
                    <TextField
                      id="contactLink"
                      label={
                        <span style={{ color: "black" }}>
                          Contact Link <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      variant="outlined"
                      value={formik.values.contactLink}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="dense"
                      color="secondary"
                      sx={inputStyle}
                      error={formik.touched.contactLink && Boolean(formik.errors.contactLink)}
                      helperText={formik.touched.contactLink && formik.errors.contactLink}
                    />
                  </div>

                  <div className="form-field">
                    <TextField
                      id="phonenumber"
                      label={
                        <span style={{ color: "black" }}>
                          Số Điện Thoại <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      variant="outlined"
                      value={formik.values.phonenumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      fullWidth
                      margin="dense"
                      color="secondary"
                      sx={inputStyle}
                      error={formik.touched.phonenumber && Boolean(formik.errors.phonenumber)}
                      helperText={formik.touched.phonenumber && formik.errors.phonenumber}
                    />
                  </div>

                  <p className="login__link">
                    Đã có tài khoản?{" "}
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "#70d8bd" }}
                    >
                      Đăng nhập ngay!
                    </Link>
                  </p>

                  {!showLoadingModal ? (
                    <Button
                      className="login__btn"
                      variant="contained"
                      type="submit"
                      fullWidth
                    >
                      Đăng ký
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