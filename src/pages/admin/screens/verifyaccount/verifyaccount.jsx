import "./verifyAccount.css";
import { useState } from "react";
import {
    Button,
    TextField,
    Grid,
    InputAdornment,
    IconButton,
    CssBaseline,
    ThemeProvider,
} from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import FISH from "../../../../assets/koilanding_bg.png";
import { ColorModeContext, useMode } from "./../../../../theme";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import { useDispatch } from "react-redux";
import { changePasswordForForgotPasswordThunk } from "../../../../store/apiThunk/userThunk";

export default function VerifyAccount() {
    const navigate = useNavigate();
    const location = useLocation();
    const [theme, colorMode] = useMode();
    const dispatch = useDispatch();

    const email = location?.state?.email;

    const [showCode, setShowCode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);

    const formik = useFormik({
        initialValues: {
            code: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            code: Yup.string().required("Mã xác thực không thể trống"),
            password: Yup.string()
                .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
                .required("Mật khẩu không thể trống"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
                .required("Vui lòng xác nhận mật khẩu"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            // Check if password and confirmPassword match before dispatching the API call
            if (values.password !== values.confirmPassword) {
                setShowLoadingModal(false);
                Swal.fire({
                    title: "Lỗi",
                    text: "Mật khẩu và xác nhận mật khẩu không khớp!",
                    icon: "error",
                    confirmButtonText: "OK",
                    background: "white",
                    scrollbarPadding: false,
                });
                setSubmitting(false);
                return;
            }

            setShowLoadingModal(true);
    
            dispatch(
                changePasswordForForgotPasswordThunk({
                    code: values.code,
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                })
            )
            .unwrap()
            .then(() => {
                setShowLoadingModal(false);
                Swal.fire({
                    title: "Thành Công",
                    text: "Mật khẩu đã được đổi thành công!",
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    background: "white",
                    timer: 1500,
                    timerProgressBar: true,
                    scrollbarPadding: false,
                }).then(() => {
                    navigate("/login");
                });
            })
            .finally(() => {
                setSubmitting(false);
            });
        },
    });

    // Display validation errors in a modal when validation fails
    const showValidationErrorModal = (fieldName, errorMessage) => {
        Swal.fire({
            title: `Lỗi tại ${fieldName}`,
            text: errorMessage,
            icon: "error",
            confirmButtonText: "OK",
            background: "white",
            scrollbarPadding: false,
        });
    };

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="verifyAccount">
                    <Grid container spacing={2}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5} className="flex-center">
                            <img src={FISH} style={{ width: "100%" }} />
                        </Grid>
                        <Grid item xs={5} className="flex-center" style={{paddingTop:40}}>
                            <div className="signup__form">
                                <h3 variant="h3" className="login__title">
                                    Xác thực tài khoản
                                </h3>
                                <form onSubmit={formik.handleSubmit}>
                                    <div>
                                        <TextField
                                            className="login__input"
                                            id="code"
                                            label="Mã Xác Thực"
                                            variant="outlined"
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            margin="dense"
                                            color="secondary"
                                            InputProps={{
                                                sx: {
                                                    color: 'black',
                                                }
                                            }}
                                            onBlur={() => {
                                                if (formik.touched.code && formik.errors.code) {
                                                    showValidationErrorModal('Mã Xác Thực', formik.errors.code);
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Input for Password */}
                                    <div>
                                        <TextField
                                            className="login__input"
                                            id="password"
                                            label="Mật khẩu"
                                            variant="outlined"
                                            type={showPassword ? "text" : "password"}
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            margin="dense"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton style={{color: "black"}}
                                                            onClick={() =>
                                                                setShowPassword(!showPassword)
                                                            }
                                                        >
                                                            {showPassword ? (
                                                                <VisibilityOffOutlined className="login__view__password__btn" />
                                                            ) : (
                                                                <VisibilityOutlined className="login__view__password__btn" />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                                sx: {
                                                    color: 'black',
                                                }
                                            }}
                                            onBlur={() => {
                                                if (formik.touched.password && formik.errors.password) {
                                                    showValidationErrorModal('Mật khẩu', formik.errors.password);
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Input for Confirm Password */}
                                    <div>
                                        <TextField
                                            className="login__input"
                                            id="confirmPassword"
                                            label="Xác nhận mật khẩu"
                                            variant="outlined"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            margin="dense"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton style={{color: "black"}}
                                                            onClick={() =>
                                                                setShowConfirmPassword(!showConfirmPassword)
                                                            }
                                                        >
                                                            {showConfirmPassword ? (
                                                                <VisibilityOffOutlined className="login__view__password__btn" />
                                                            ) : (
                                                                <VisibilityOutlined className="login__view__password__btn" />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                                sx: {
                                                    color: 'black',
                                                }
                                            }}
                                            onBlur={() => {
                                                if (formik.touched.confirmPassword && formik.errors.confirmPassword) {
                                                    showValidationErrorModal('Xác nhận mật khẩu', formik.errors.confirmPassword);
                                                }
                                            }}
                                        />
                                    </div>

                                    <Button
                                        className="login__btn"
                                        variant="contained"
                                        type="submit"
                                        fullWidth
                                    >
                                        Xác thực và Đổi mật khẩu
                                    </Button>

                                    {showLoadingModal && <LoadingModal />}
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
