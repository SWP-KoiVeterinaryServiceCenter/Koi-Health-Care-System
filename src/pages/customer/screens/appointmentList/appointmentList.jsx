import React, { useState, useEffect } from "react";
import "./appointmentList.css";
import {
  Divider,
  CircularProgress,
  TablePagination,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
  Button,
  TableRow
} from "@mui/material";

import { styled } from "@mui/material/styles";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import { useDispatch, useSelector } from "react-redux";
import { currentUserAppointmentsSelector } from "../../../../store/sellectors";
import { getAllCurrentUserAppointmentsThunk } from "../../../../store/apiThunk/appointment";

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
  "&:hover": {
    backgroundColor: theme.palette.action.selected, // Change this to the color you want on hover
  },
}));

export default function AppointmentList() {
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Change this number to adjust items per page

  const appointmentList = useSelector(currentUserAppointmentsSelector);

  useEffect(() => {
    setShowLoadingModal(true);
    dispatch(getAllCurrentUserAppointmentsThunk()).then(() =>
      setShowLoadingModal(false)
    );
  }, [dispatch]);

  const handleCancel = (appointmentId) => {
    // Dispatch an action to cancel the appointment
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };


  return (
    <>
      <div className="appointment_list_main">
        <p>Bảng Về Lịch Đặt Dịch Vụ Của Bạn</p>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Vet Name</StyledTableCell>
                <StyledTableCell align="left">Koi Name</StyledTableCell>
                <StyledTableCell align="left">Service</StyledTableCell>
                <StyledTableCell align="left">Price</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {showLoadingModal ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={6} align="center">
                    <CircularProgress />
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                appointmentList.map((appointment) => (
                  <StyledTableRow key={appointment.id}>
                    <StyledTableCell align="left">
                      {appointment.vetName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {appointment.koiName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {appointment.serviceName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {appointment.price}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {appointment.status}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {appointment.status === "Cancelled" ? (
                        <Button variant="contained" color="secondary" disabled>
                          Cancelled Appointment
                        </Button>
                      ) : appointment.status === "Confirmed" ? (
                        <Button variant="contained" color="success" disabled>
                          Confirmed Appointment
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleCancel(appointment.id)}
                        >
                          Cancel Appointment
                        </Button>
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Divider />
    </>
  );
}
