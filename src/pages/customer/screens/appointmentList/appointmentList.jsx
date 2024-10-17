import React, { useState, useEffect } from "react";
import "./appointmentList.css";
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

import LoadingModal from "../../../../components/modal/loadingModal/loadingModal";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
}));

export default function AppointmentList() {
  // const navigate = useNavigate();
  // const direction = props.direction;
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const appointmentList = useSelector(currentUserAppointmentsSelector);

  useEffect(() => {
    setShowLoadingModal(true);
    dispatch(getAllCurrentUserAppointmentsThunk()).then(() =>
      setShowLoadingModal(false)
    );
  }, [dispatch]);

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
            {!showLoadingModal ? (
              <TableBody>
                {appointmentList.map((appointment) => (
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
                      {appointment.status === "Confirmed" ? (
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
            ) : (
              <LoadingModal />
            )}
          </Table>
        </TableContainer>
      </div>
      <Divider />
    </>
  );
}
