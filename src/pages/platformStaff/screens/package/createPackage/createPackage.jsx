import * as React from "react";
import "./createPackage.css";
import { TextField, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { createPackageThunk } from "../../../../../store/apiThunk/packageThunk";
import Header from "../../../components/header/Header";
import { BackButton } from "../../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../../components/modal/loadingModal/loadingModal";
import { ADDPACKAGESUCCESS, ERRORTEXT, SUCCESSTEXT } from "../../../../../components/text/notiText/notiText";

export default function CreatePackage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showLoadingModal, setShowLoadingModal] = useState(false);

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
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                padding: "4px",
                borderRadius: "4px"
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
            expiryDay: "",
            price: "",
            subcriptionType: "",
        },
        validationSchema: Yup.object({
            expiryDay: Yup.number().required("Date cannot be empty").max(31, "Day cannot exceed 31 Days"),
            price: Yup.number()
                .required("Price cannot be empty")
                .min(0, "Price cannot be negative")
                .integer("Price must be an integer")
                .max(1000000, "Price cannot exceed 1.000.000"),
            subcriptionType: Yup.string().required("Description cannot be empty"),
        }),
        onSubmit: async (values) => {
            setShowLoadingModal(true);
            dispatch(
                createPackageThunk({
                    expiryDay: values.expiryDay,
                    price: values.price,
                    subcriptionType: values.subcriptionType,
                })
            )
                .unwrap()
                .then(() => {
                    setShowLoadingModal(false);
                    Swal.fire({
                        title: SUCCESSTEXT,
                        text: ADDPACKAGESUCCESS,
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
        <div className="createPackage">
            <Header
                title="Create Subscription"
                subtitle="Provide subscription package information"
            />
            <form onSubmit={formik.handleSubmit}>
                {/* subcriptionType */}
                <TextField
                    id="subcriptionType"
                    label={
                        <span>
                            Subscription Name <span style={{ color: "red" }}>*</span>
                        </span>
                    }
                    variant="outlined"
                    value={formik.values.subcriptionType}
                    onChange={formik.handleChange}
                    fullWidth
                    autoComplete="subcriptionType"
                    margin="dense"
                    color="secondary"
                    InputLabelProps={{
                        style: { color: 'black' }
                    }}
                    InputProps={{
                        style: {
                            backgroundColor: '#f5f5f5',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            color: 'black'
                        }
                    }}
                />
                {formik.touched.subcriptionType &&
                    formik.errors.subcriptionType && (
                        <div className="login__validation__error">
                            <p>{formik.errors.subcriptionType}</p>
                        </div>
                    )}

                {/* expiryDay */}
                <TextField
                    id="expiryDay"
                    label={
                        <span>
                            Expiry Date (Date) <span style={{ color: "red" }}>*</span>
                        </span>
                    }
                    variant="outlined"
                    value={formik.values.expiryDay}
                    onChange={formik.handleChange}
                    fullWidth
                    autoComplete="expiryDay"
                    margin="dense"
                    type="number"
                    color="secondary"
                    InputLabelProps={{
                        style: { color: 'black' }
                    }}
                    InputProps={{
                        style: {
                            backgroundColor: '#f5f5f5',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            color: 'black'
                        }
                    }}
                />
                {formik.touched.expiryDay && formik.errors.expiryDay && (
                    <div className="login__validation__error">
                        <p>{formik.errors.expiryDay}</p>
                    </div>
                )}

                {/* price */}
                <TextField
                    id="price"
                    label={"Price"}
                    variant="outlined"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    fullWidth
                    autoComplete="price"
                    margin="dense"
                    type="number"
                    color="secondary"
                    InputLabelProps={{
                        style: { color: 'black' }
                    }}
                    InputProps={{
                        style: {
                            backgroundColor: '#f5f5f5',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            color: 'black'
                        }
                    }}
                />
                {formik.touched.price &&
                    formik.errors.price && (
                        <div className="login__validation__error">
                            <p>{formik.errors.price}</p>
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
                        <BackButton style={{ fontSize: '14px' }} />
                        <Button
                            className="login__btn"
                            style={{
                                backgroundColor: "#70d8bd",
                                fontSize: '14px',
                            }}
                            variant="contained"
                            type="submit"
                        >
                            Create
                        </Button>
                    </div>
                ) : (
                    <LoadingModal />
                )}
            </form>
        </div>
    );
}
