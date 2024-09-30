import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Divider, Rating } from "@mui/material";
import "./feedback.css";
import AppAppBar from "../../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
import Footer from "../../authorize/landingPage/LandingPageDetail/Footer/Footer";

const Feedback = () => {
  const columns = [
    { field: "doctor", headerName: "Doctor", width: 150 },
    { field: "service", headerName: "Service", width: 150 },
    { field: "koiName", headerName: "Koi Name", width: 150 },
    {
      field: "rating",
      headerName: "Rating",
      width: 120,
      renderCell: (params) => <Rating value={params.value} readOnly />,
    },
    { field: "note", headerName: "Note", width: 250 },
  ];

  const rows = [
    {
      id: 1,
      doctor: "Dr. John Doe",
      service: "Grooming",
      koiName: "Koi 1",
      rating: 4,
      note: "Great service!",
    },
    {
      id: 2,
      doctor: "Dr. Jane Smith",
      service: "Health Checkup",
      koiName: "Koi 2",
      rating: 5,
      note: "Very thorough and professional.",
    },
    {
      id: 3,
      doctor: "Dr. Emily Clarke",
      service: "Spa Treatment",
      koiName: "Koi 3",
      rating: 3,
      note: "Satisfactory, but could be better.",
    },
    {
      id: 4,
      doctor: "Dr. John Doe",
      service: "Parasite Treatment",
      koiName: "Koi 4",
      rating: 2,
      note: "Not happy with the results.",
    },
    {
      id: 5,
      doctor: "Dr. Jane Smith",
      service: "Water Quality Testing",
      koiName: "Koi 5",
      rating: 5,
      note: "Excellent service, highly recommended!",
    },
  ];

  return (
    <div className="feedback_container">
      <AppAppBar />
      <div className="feedback-table" style={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
      <Divider />
      <Footer />
    </div>
  );
};

export default Feedback;
