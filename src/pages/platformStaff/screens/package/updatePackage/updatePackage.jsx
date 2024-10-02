// import * as React from "react";
// import "./updatePackage.css";
// import { Button, TextField } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import * as Yup from "yup";
// import Swal from "sweetalert2";
// import { useFormik } from "formik";
// import {
//   getPackagesThunk,
//   getPackageDetailThunk,
//   updatePackageThunk,
// } from "../../../../../store/apiThunk/packageThunk";
// import { packageDetailSelector } from "../../../../../store/sellectors";
// import { useEffect } from "react";
// import Header from "../../../components/header/Header";
// import { BackButton } from "../../../../../components/modal/backModal/backModal";
// import LoadingModal from "../../../../../components/modal/loadingModal/loadingModal";
// import { FormatCurrency } from "../../../../../components/format/formatAmount/formatAmount";
// import {
//   ERRORTEXT,
//   SUCCESSTEXT,
//   UPDATEPACKAGESUCCESS,
// } from "../../../../../components/text/notiText/notiText";

// export default function UpdatePackage() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const packageId = location.state?.packageId;
//   const packageDetail = useSelector(packageDetailSelector);
//   const [showLoadingModal, setShowLoadingModal] = useState(false);
//   const [showRender, setShowRender] = useState(false);

//   useEffect(() => {
//     setShowRender(true);
//     dispatch(getPackageDetailThunk(packageId)).then(() => setShowRender(false));
//   }, [packageId]);

//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       description: packageDetail.description,
//       expiryDay: packageDetail.expiryDay,
//       price: packageDetail.price,
//       subcriptionType: packageDetail.subcriptionType,
     
//     },
//     validationSchema: Yup.object({
//       description: Yup.string().required("Mô tả không thể trống"),
//       expiryDay: Yup.number().required("Tháng không thể trống"),
//     }),
//     onSubmit: async (values) => {
//       setShowLoadingModal(true);
//       dispatch(
//         updatePackageThunk({
//           id: packageId,
//           description: values.description,
//           expiryDay: values.expiryDay,
//           price: values.price,
//           subcriptionType: values.subcriptionType,
//         })
//       )
//         .unwrap()
//         .then(() => {
//           setShowLoadingModal(false);
//           Swal.fire({
//             title: SUCCESSTEXT,
//             text: UPDATEPACKAGESUCCESS,
//             icon: "success",
//             showCancelButton: false,
//             showConfirmButton: false,
//             background: "white",
//             timer: 1500,
//             timerProgressBar: true,
//             scrollbarPadding: false,
//           }).then(() => {
//             navigate(-1);
//           });
//         })
//         .catch((error) => {
//           setShowLoadingModal(false);
//           Swal.fire({
//             title: ERRORTEXT,
//             text: error.message,
//             icon: "error",
//             showConfirmButton: false,
//             background: "white",
//             timer: 2000,
//             timerProgressBar: true,
//             scrollbarPadding: false,
//           });
//         });
//     },
//   });

//   const handleInputChange = (event, formik) => {
//     let inputValue = event.target.value;

//     formik.setFieldValue("promotionAmount", rawValue);
//     // event.target.value = FormatCurrency(rawValue);
//   };

//   return (
//     <div className="updatePackage">
//       <Header
//         title="Cập Nhật Gói Đăng Ký"
//         subtitle="Cung cấp thông tin gói đăng ký"
//       />
//       {!showRender ? (
//         <form onSubmit={formik.handleSubmit}>
//           {/* subcriptionType */}
//           <>
//             <TextField
//               id="subcriptionType"
//               label={
//                 <span>
//                   Loại Gói <span style={{ color: "red" }}>*</span>
//                 </span>
//               }
//               variant="outlined"
//               value={formik.values.subcriptionType}
//               onChange={formik.handleChange}
//               fullWidth
//               autoComplete="subcriptionType"
//               margin="dense"
//               color="secondary"
//               InputLabelProps={{
//                 style: { color: "black" }, // Đặt màu sắc của nhãn thành màu đen
//               }}
//               InputProps={{
//                 style: {
//                   backgroundColor: "#f5f5f5", // Nền của input màu xám nhạt
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Hiệu ứng bóng nhẹ
//                   color: "black", // Màu chữ bên trong ô input
//                 },
//               }}
//             />
//             {formik.touched.subcriptionType &&
//               formik.errors.subcriptionType && (
//                 <div className="login__validation__error">
//                   <p>{formik.errors.subcriptionType}</p>
//                 </div>
//               )}
//           </>
//           {/* expiryDay */}
//           <>
//             <TextField
//               id="expiryDay"
//               label={
//                 <span>
//                   Thời Hạn (tháng) <span style={{ color: "red" }}>*</span>
//                 </span>
//               }
//               variant="outlined"
//               value={formik.values.expiryDay}
//               onChange={formik.handleChange}
//               fullWidth
//               autoComplete="expiryDay"
//               margin="dense"
//               type="number"
//               color="secondary"
//               InputLabelProps={{
//                 style: { color: "black" }, // Đặt màu sắc của nhãn thành màu đen
//               }}
//               InputProps={{
//                 style: {
//                   backgroundColor: "#f5f5f5", // Nền của input màu xám nhạt
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Hiệu ứng bóng nhẹ
//                   color: "black", // Màu chữ bên trong ô input
//                 },
//               }}
//             />
//             {formik.touched.expiryDay && formik.errors.expiryDay && (
//               <div className="login__validation__error">
//                 <p>{formik.errors.expiryDay}</p>
//               </div>
//             )}
//           </>
//           {/* description */}
//           <>
//             <TextField
//               id="description"
//               label={
//                 <span>
//                   Mô tả <span style={{ color: "red" }}>*</span>
//                 </span>
//               }
//               variant="outlined"
//               value={formik.values.description}
//               onChange={formik.handleChange}
//               fullWidth
//               autoComplete="description"
//               margin="dense"
//               color="secondary"
//               InputLabelProps={{
//                 style: { color: "black" }, // Đặt màu sắc của nhãn thành màu đen
//               }}
//               InputProps={{
//                 style: {
//                   backgroundColor: "#f5f5f5", // Nền của input màu xám nhạt
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Hiệu ứng bóng nhẹ
//                   color: "black", // Màu chữ bên trong ô input
//                 },
//               }}
//             />
//             {formik.touched.description && formik.errors.description && (
//               <div className="login__validation__error">
//                 <p>{formik.errors.description}</p>
//               </div>
//             )}
//           </>
//           {/* price */}
//           <>
//             <TextField
//               id="price"
//               label={"Gía tiền"}
//               variant="outlined"
//               value={formik.values.price}
//               onChange={formik.handleChange}
//               fullWidth
//               autoComplete="price"
//               margin="dense"
//               type="number"
//               color="secondary"
//               InputLabelProps={{
//                 style: { color: "black" }, // Đặt màu sắc của nhãn thành màu đen
//               }}
//               InputProps={{
//                 style: {
//                   backgroundColor: "#f5f5f5", // Nền của input màu xám nhạt
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Hiệu ứng bóng nhẹ
//                   color: "black", // Màu chữ bên trong ô input
//                 },
//               }}
//             />
//             {formik.touched.price && formik.errors.price && (
//               <div className="login__validation__error">
//                 <p>{formik.errors.price}</p>
//               </div>
//             )}
//           </>

//           {!showLoadingModal ? (
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "30px",
//                 marginBottom: "50px",
//                 marginTop: "30px",
//               }}
//             >
//               <BackButton type="update" />
//               <Button
//                 className="login__btn"
//                 style={{
//                   backgroundColor: "#70d8bd",
//                 }}
//                 variant="contained"
//                 type="submit"
//               >
//                 Cập Nhật
//               </Button>
//             </div>
//           ) : (
//             <LoadingModal />
//           )}
//         </form>
//       ) : (
//         <LoadingModal />
//       )}
//     </div>
//   );
// }
import * as React from "react";
import "./updatePackage.css";
import { Button, TextField,Box,Typography   } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import {
  getPackageDetailThunk,
  updatePackageThunk,
} from "../../../../../store/apiThunk/packageThunk";
import { packageDetailSelector } from "../../../../../store/sellectors";
import Header from "../../../components/header/Header";
import { BackButton } from "../../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../../components/modal/loadingModal/loadingModal";
import {
  ERRORTEXT,
  SUCCESSTEXT,
  UPDATEPACKAGESUCCESS,
} from "../../../../../components/text/notiText/notiText";

export default function UpdatePackage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const packageId = location.state?.packageId;
  const packageDetail = useSelector(packageDetailSelector);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showRender, setShowRender] = useState(false);
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
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Shadow effect
            // border: "1px solid rgba(255, 255, 255, 0.5)", // Light white border
            padding: "4px", // Optional: padding to make the border more visible
            borderRadius: "4px" // Optional: rounded corners for the border
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

  useEffect(() => {
    setShowRender(true);
    dispatch(getPackageDetailThunk(packageId)).then(() => setShowRender(false));
  }, [packageId, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // description: packageDetail.description || '',
      expiryDay: packageDetail.expiryDay || '',
      price: packageDetail.price || '',
      subcriptionType: packageDetail.subcriptionType || '',
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
        updatePackageThunk({
          id: packageId,
          // description: values.description,
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
            text: UPDATEPACKAGESUCCESS,
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
    <div className="updatePackage">
      <Header
        title="Update Subscription"
        subtitle="Provide subscription package information"
      />
      {!showRender ? (
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
              style: { color: "black" },
            }}
            InputProps={{
              style: {
                backgroundColor: "#f5f5f5",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                color: "black",
              },
            }}
          />
          {formik.touched.subcriptionType && formik.errors.subcriptionType && (
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
              style: { color: "black" },
            }}
            InputProps={{
              style: {
                backgroundColor: "#f5f5f5",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                color: "black",
              },
            }}
          />
          {formik.touched.expiryDay && formik.errors.expiryDay && (
            <div className="login__validation__error">
              <p>{formik.errors.expiryDay}</p>
            </div>
          )}
          {/* description */}
            {/* <TextField
              id="description"
              label={
                <span>
                  Mô tả <span style={{ color: "red" }}>*</span>
                </span>
              }
              variant="outlined"
              value={formik.values.description}
              onChange={formik.handleChange}
              fullWidth
              autoComplete="description"
              margin="dense"
              color="secondary"
              InputLabelProps={{
                style: { color: "black" },
              }}
              InputProps={{
                style: {
                  backgroundColor: "#f5f5f5",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  color: "black",
                },
              }}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="login__validation__error">
                <p>{formik.errors.description}</p>
              </div>
            )} */}
          {/* price */}
          <TextField
            id="price"
            label="Price"
            variant="outlined"
            value={formik.values.price}
            onChange={formik.handleChange}
            fullWidth
            autoComplete="price"
            margin="dense"
            type="number"
            color="secondary"
            InputLabelProps={{
              style: { color: "black" },
            }}
            InputProps={{
              style: {
                backgroundColor: "#f5f5f5",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                color: "black",
              },
            }}
          />
          {formik.touched.price && formik.errors.price && (
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
              <BackButton type="update" />
              <Button
                className="login__btn"
                style={{
                    backgroundColor: "#70d8bd",
                    fontSize: '14px', // Thay đổi kích cỡ chữ của nút Tạo
                }}
                variant="contained"
                type="submit"
              >
                Update
              </Button>
            </div>
          ) : (
            <LoadingModal />
          )}
        </form>
      ) : (
        <LoadingModal />
      )}
    </div>
  );
}
