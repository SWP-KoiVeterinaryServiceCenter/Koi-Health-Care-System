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
import Pet from "../../../../assets/cutecatdog.png";
import { ColorModeContext, useMode } from "./../../../../theme";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import { useDispatch } from "react-redux";
import { changePasswordForForgotPasswordThunk } from "../../../../store/apiThunk/userThunk";  // Import the thunk

export default function VerifyAccount() {
    const navigate = useNavigate();
    const location = useLocation();
    const [theme, colorMode] = useMode();
    const dispatch = useDispatch();  // To dispatch the thunk

    const email = location?.state?.email;  // Assuming email is passed via state

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
            setShowLoadingModal(true);
    
            dispatch(
                changePasswordForForgotPasswordThunk({
                    code: values.code,  // Verification code
                    password: values.password,  // New password
                    confirmPassword: values.confirmPassword,  // Confirm password
                })
            )
            .unwrap()
            .then(() => {
                // Always show success and navigate to login without checking errors
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
                    navigate("/login");  // Navigate to login
                });
            })
            .finally(() => {
                setSubmitting(false);
            });
        },
    });

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="verifyAccount">
                    <Grid container spacing={2}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5} className="flex-center">
                            <img src={Pet} style={{ width: "100%" }} />
                        </Grid>
                        <Grid item xs={5} className="flex-center">
                            <div className="signup__form">
                                <h3 variant="h3" className="login__title">
                                    Xác thực tài khoản
                                </h3>
                                {/* Ensure form submission works properly */}
                                <form
                                    onSubmit={formik.handleSubmit} // Formik will handle the submission
                                >
                                    {/* Input for Code */}
                                    <div>
                                        <TextField
                                            className="login__input"
                                            id="code"
                                            label="Mã Xác Thực"
                                            variant="outlined"
                                            type={showCode ? "text" : "password"}
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            fullWidth
                                            margin="dense"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() =>
                                                                setShowCode(!showCode)
                                                            }
                                                        >
                                                            {showCode ? (
                                                                <VisibilityOffOutlined className="login__view__password__btn" />
                                                            ) : (
                                                                <VisibilityOutlined className="login__view__password__btn" />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        {formik.touched.code && formik.errors.code ? (
                                            <div className="login__validation__error">
                                                {formik.errors.code}
                                            </div>
                                        ) : null}
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
                                                        <IconButton
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
                                            }}
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div className="login__validation__error">
                                                {formik.errors.password}
                                            </div>
                                        ) : null}
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
                                                        <IconButton
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
                                            }}
                                        />
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                            <div className="login__validation__error">
                                                {formik.errors.confirmPassword}
                                            </div>
                                        ) : null}
                                    </div>

                                    {/* Submit button */}
                                    <Button
                                        className="login__btn"
                                        variant="contained"
                                        type="submit"
                                        fullWidth
                                    >
                                        Xác thực và Đổi mật khẩu
                                    </Button>

                                    {/* Display Loading Modal if API call is in progress */}
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
