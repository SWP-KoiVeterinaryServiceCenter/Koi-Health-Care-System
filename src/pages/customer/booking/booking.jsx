import React from "react";
import AppAppBar from "../../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
import Footer from "../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import "./booking.css";
import { Divider } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

// Styling for table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

// Styling for table rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// Create data for the table
function createData(doctorName, koiName, service, date, status, action) {
  return { doctorName, koiName, service, date, status, action };
}

// Sample data for the rows
const rows = [
  createData(
    "Dr. John Doe",
    "Koi Fish 1",
    "Consultation",
    "2024-09-28",
    "Confirmed",
    null
  ),
  createData(
    "Dr. Jane Smith",
    "Koi Fish 2",
    "Surgery",
    "2024-10-05",
    "Pending",
    null
  ),
  createData(
    "Dr. Alex Johnson",
    "Koi Fish 3",
    "Follow-up",
    "2024-10-12",
    "Confirmed",
    null
  ),
];

const Booking = () => {
  return (
    <>
      <AppAppBar />
      <div className="booking_main">
        <p>Bảng Về Lịch Đặt Dịch Vụ Của Bạn</p>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Doctor Name</StyledTableCell>
                <StyledTableCell align="left">Koi Name</StyledTableCell>
                <StyledTableCell align="left">Service</StyledTableCell>
                <StyledTableCell align="left">Date</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.doctorName}>
                  <StyledTableCell align="left">
                    {row.doctorName}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.koiName}</StyledTableCell>
                  <StyledTableCell align="left">{row.service}</StyledTableCell>
                  <StyledTableCell align="left">{row.date}</StyledTableCell>
                  <StyledTableCell align="left">{row.status}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.status === "Confirmed" ? (
                      <Button variant="contained" color="secondary" disabled>
                        Cancel Appointment
                      </Button>
                    ) : (
                      <Button variant="contained" color="primary">
                        Cancel Appointment
                      </Button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Divider />
      <Footer />
    </>
  );
};

export default Booking;
