import "./forgotPassword.css";
import { Button, TextField, Grid } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import FISH from "../../../assets/koilanding_bg.png";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./../../../theme";
import LoadingModal from "../../../components/modal/loadingModal/loadingModal";
import { useDispatch } from "react-redux";  // Import useDispatch to dispatch thunks
import { checkEmailThunk } from "../../../store/apiThunk/userThunk";  // Import the thunk

export default function ForgotPassword() {
    const [theme, colorMode] = useMode();
    const navigate = useNavigate();
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const dispatch = useDispatch();  // Create dispatch instance to dispatch thunk

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Email không thể trống")
                .email("Email sai định dạng"),
        }),
        onSubmit: async (values) => {
            setShowLoadingModal(true);

            // Dispatch the thunk to send verification email
            dispatch(checkEmailThunk(values.email))
                .unwrap()  // Unwrap to handle fulfilled and rejected states
                .then((response) => {
                    // Handle success
                    setShowLoadingModal(false);
                    Swal.fire({
                        title: "Success",
                        text: "Verification code has been sent to your email!",
                        icon: "success",
                        confirmButtonText: "OK",
                        background: "white",
                        scrollbarPadding: false,
                    }).then(() => {
                        // Navigate to the verifyAccount page
                        navigate(`/verifyAccount`, {
                            state: {
                                email: values.email,
                                direction: "forgotPassword",
                            },
                        });
                    });
                })
                .catch((error) => {
                    // Handle error if email is not registered or other issues
                    setShowLoadingModal(false);
                    Swal.fire({
                        title: "Error",
                        text: error.message || "Failed to send verification code.",
                        icon: "error",
                        confirmButtonText: "OK",
                        background: "white",
                        scrollbarPadding: false,
                    });
                });
        },
    });

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="forgotPassword">
                    <Grid container spacing={2}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5} className="flex-center">
                            <img src={FISH} style={{ width: "100%" }} />
                        </Grid>
                        <Grid item xs={5} className="flex-center">
                            <div className="signup__form">
                                <h3 variant="h3" className="login__title">
                                    Quên mật khẩu
                                </h3>
                                <form onSubmit={formik.handleSubmit}>
                                    <div>
                                        <TextField
                                            id="email"
                                            label={
                                                <span>
                                                    Email{" "}
                                                    <span
                                                        style={{ color: "red" }}
                                                    >
                                                        *
                                                    </span>
                                                </span>
                                            }
                                            variant="outlined"
                                            type="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange(
                                                "email"
                                            )}
                                            fullWidth
                                            margin="dense"
                                            InputProps={{
                                                sx: {
                                                    color: 'black',  // Set input text color to black
                                                }
                                            }}
                                        />
                                        {formik.touched.email &&
                                            formik.errors.email && (
                                                <div className="login__validation__error">
                                                    {formik.errors.email}
                                                </div>
                                            )}
                                    </div>
                                    <p className="login__link">
                                        Nhớ mật khẩu?
                                        <Link
                                            to="/login"
                                            style={{
                                                textDecoration: "none",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: "#70d8bd",
                                                }}
                                            >
                                                {" "}
                                                Đăng nhập!
                                            </span>
                                        </Link>
                                    </p>
                                    {!showLoadingModal ? (
                                        <Button
                                            className="login__btn"
                                            variant="contained"
                                            type="submit"
                                            fullWidth
                                        >
                                            Gửi Mã
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
