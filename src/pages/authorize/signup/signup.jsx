import "./signup.css";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import backgroundVideo from "../../../assets/video/koi_signup.mp4";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signupThunk } from "../../../store/apiThunk/userThunk";
import Swal from "sweetalert2";
import Pet from "../../../assets/koi_bg.webp";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./../../../theme";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import NoAvatar from "../../../assets/noAvatar.png";
import NoBackground from "../../../assets/noBackground.png";
import LoadingModal from "../../../components/modal/loadingModal/loadingModal";
import {
  CREATEACCOUNTSUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../components/text/notiText/notiText";

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
        .email("Email sai định dạng"),
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
      console.log("Submitting form data:", values); // Kiểm tra xem dữ liệu form có đúng không

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
                <h3 variant="h3" className="login__title">
                  Đăng ký
                </h3>
                <form onSubmit={formik.handleSubmit}>
                  {/* Username */}
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
                    fullWidth
                    margin="dense"
                    color="secondary"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="login__validation__error">
                      {formik.errors.username}
                    </div>
                  )}

                  {/* Email */}
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
                    fullWidth
                    margin="dense"
                    color="secondary"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="login__validation__error">
                      {formik.errors.email}
                    </div>
                  )}

                  {/* Password */}
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
                    fullWidth
                    margin="dense"
                    color="secondary"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                      },
                    }}
                    InputLabelProps={{
                      style: { color: "black" }, // Màu đen cho label
                    }}
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
                      style: { color: "black" }, // Màu đen cho chữ trong input
                    }}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="login__validation__error">
                      {formik.errors.password}
                    </div>
                  )}

                  {/* Fullname */}
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
                    fullWidth
                    margin="dense"
                    color="secondary"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />
                  {formik.touched.fullname && formik.errors.fullname && (
                    <div className="login__validation__error">
                      {formik.errors.fullname}
                    </div>
                  )}

                  {/* Location */}
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
                    fullWidth
                    margin="dense"
                    color="secondary"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />
                  {formik.touched.location && formik.errors.location && (
                    <div className="login__validation__error">
                      {formik.errors.location}
                    </div>
                  )}

                  {/* Contact Link */}
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
                    fullWidth
                    margin="dense"
                    color="secondary"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />
                  {formik.touched.contactLink && formik.errors.contactLink && (
                    <div className="login__validation__error">
                      {formik.errors.contactLink}
                    </div>
                  )}

                  {/* Phone Number */}
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
                    fullWidth
                    margin="dense"
                    color="secondary"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                        "&:hover fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: " #419781", // Viền đen cho TextField
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />
                  {formik.touched.phonenumber && formik.errors.phonenumber && (
                    <div className="login__validation__error">
                      {formik.errors.phonenumber}
                    </div>
                  )}

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
