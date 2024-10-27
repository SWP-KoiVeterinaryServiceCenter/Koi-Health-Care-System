import * as React from "react";
import { TextField, Box, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { createmedicalRecordsThunk } from "../../../../store/apiThunk/medicalRecord"; // Import the medical record thunk
import { BackButton } from "../../../../components/modal/backModal/backModal";
import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";
import {
  ADDPACKAGESUCCESS,
  ERRORTEXT,
  SUCCESSTEXT,
} from "../../../../components/text/notiText/notiText";

export default function CreateMedicalRecord() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Use location to get the state
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  // Log the id from the passed state
  useEffect(() => {
    if (location.state?.id) {
      console.log("Received Medical Record ID:", location.state.id); // Log the passed id
    }
  }, [location.state?.id]);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      symptoms: "",
      diagnosis: "",
      treatmentGiven: "",
      testResults: "",
      notes: "",
      createPrescriptionModel: [
        {
          medicalName: "",
          dosage: "",
          frequency: "",
          duration: "",
          instructions: "",
        },
      ],
    },
    onSubmit: async (values) => {
      console.log("Data being sent:", values); // Log the values to check if they are correct

      setShowLoadingModal(true);
      try {
        // Dispatch the createmedicalRecordsThunk with the appointmentId and form data
        await dispatch(
          createmedicalRecordsThunk({
            appointmentId: location.state?.id, // Use the id from location state
            data: values, // Send formik values
          })
        ).unwrap();

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
      } catch (error) {
        console.error("Error occurred:", error);
        const errorMessage = error.response?.data?.message || "Something went wrong";
        Swal.fire({
          title: ERRORTEXT,
          text: errorMessage,
          icon: "error",
          showConfirmButton: false,
          background: "white",
          timer: 2000,
          timerProgressBar: true,
          scrollbarPadding: false,
        });
      } finally {
        setShowLoadingModal(false);
      }
    },
  });

  return (
    <div className="createPackage">
      <Header
        title="Medical Record"
        subtitle="Medical Record to easily manage information of KOI fish"
      />
      <form onSubmit={formik.handleSubmit}>
        {/* symptoms */}
        <TextField
          id="symptoms"
          label={<span>Symptoms (Triệu chứng)<span style={{ color: "red" }}>*</span></span>}
          variant="outlined"
          value={formik.values.symptoms} // Get value from formik
          onChange={formik.handleChange} // Update formik values on change
          fullWidth
          margin="dense"
          color="secondary"
        />

        {/* diagnosis */}
        <TextField
          id="diagnosis"
          label={<span>Diagnosis (Chẩn đoán)<span style={{ color: "red" }}>*</span></span>}
          variant="outlined"
          value={formik.values.diagnosis}
          onChange={formik.handleChange}
          fullWidth
          margin="dense"
          color="secondary"
        />

        {/* treatmentGiven */}
        <TextField
          id="treatmentGiven"
          label={<span>Treatment Given (Đề xuất)<span style={{ color: "red" }}>*</span></span>}
          variant="outlined"
          value={formik.values.treatmentGiven}
          onChange={formik.handleChange}
          fullWidth
          margin="dense"
          color="secondary"
        />

        {/* testResults */}
        <TextField
          id="testResults"
          label={<span>Test Results (Kết quả kiểm tra)<span style={{ color: "red" }}>*</span></span>}
          variant="outlined"
          value={formik.values.testResults}
          onChange={formik.handleChange}
          fullWidth
          margin="dense"
          color="secondary"
        />

        {/* notes */}
        <TextField
          id="notes"
          label={<span>Notes<span style={{ color: "red" }}>*</span></span>}
          variant="outlined"
          value={formik.values.notes}
          onChange={formik.handleChange}
          fullWidth
          margin="dense"
          color="secondary"
        />

        {/* Prescription Details */}
        <Header
          title="Prescription"
          subtitle="Prescription to easily manage information of KOI fish"
        />

        <TextField
          id="createPrescriptionModel[0].medicalName"
          name="createPrescriptionModel[0].medicalName"
          label={<span>Medical Name (Tên thuốc) <span style={{ color: "red" }}>*</span></span>}
          variant="outlined"
          value={formik.values.createPrescriptionModel[0].medicalName}
          onChange={formik.handleChange}
          fullWidth
          margin="dense"
          color="secondary"
        />

        <TextField
          id="createPrescriptionModel[0].dosage"
          name="createPrescriptionModel[0].dosage"
          label={<span>Dosage (Liều lượng) <span style={{ color: "red" }}>*</span></span>}
          variant="outlined"
          value={formik.values.createPrescriptionModel[0].dosage}
          onChange={formik.handleChange}
          fullWidth
          margin="dense"
          color="secondary"
        />

        <TextField
          id="createPrescriptionModel[0].frequency"
          name="createPrescriptionModel[0].frequency"
          label={<span>Frequency (Tần suất) <span style={{ color: "red" }}>*</span></span>}
          variant="outlined"
          value={formik.values.createPrescriptionModel[0].frequency}
          onChange={formik.handleChange}
          fullWidth
          margin="dense"
          color="secondary"
        />

        <TextField
          id="createPrescriptionModel[0].duration"
          name="createPrescriptionModel[0].duration"
          label={<span>Duration (Thời gian) <span style={{ color: "red" }}>*</span></span>}
          variant="outlined"
          value={formik.values.createPrescriptionModel[0].duration}
          onChange={formik.handleChange}
          fullWidth
          margin="dense"
          color="secondary"
        />

        <TextField
          id="createPrescriptionModel[0].instructions"
          name="createPrescriptionModel[0].instructions"
          label={<span>Instructions (Hướng dẫn sử dụng) <span style={{ color: "red" }}>*</span></span>}
          variant="outlined"
          value={formik.values.createPrescriptionModel[0].instructions}
          onChange={formik.handleChange}
          fullWidth
          margin="dense"
          color="secondary"
        />

        {!showLoadingModal ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="30px"
            marginBottom="50px"
            marginTop="30px"
          >
            <BackButton style={{ fontSize: "14px" }} />
            <Button
              className="login__btn"
              style={{ backgroundColor: "#70d8bd", fontSize: "14px" }}
              variant="contained"
              type="submit"
            >
              Create
            </Button>
          </Box>
        ) : (
          <LoadingModal />
        )}
      </form>
    </div>
  );
}

const Header = ({ title, subtitle, titleColor = "gray", subtitleColor = "gray" }) => {
  return (
    <Box mb={2} textAlign="center">
      <Typography
        style={{
          fontFamily: "Source Sans Pro, sans-serif",
          fontSize: "32px",
          color: titleColor,
          fontWeight: "700",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          padding: "4px",
          borderRadius: "4px",
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
