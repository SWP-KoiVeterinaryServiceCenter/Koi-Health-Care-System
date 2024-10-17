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
  TableRow,
} from "@mui/material";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { currentUserAppointmentsSelector } from "../../../../store/sellectors";
import {
  getAllCurrentUserAppointmentsThunk,
  cancelCurrentUserAppointmentsThunk,
} from "../../../../store/apiThunk/appointment";
import { Flex } from "antd";

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
    backgroundColor: theme.palette.action.selected,
  },
}));

export default function AppointmentList() {
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const appointmentList = useSelector(currentUserAppointmentsSelector);

  useEffect(() => {
    setShowLoadingModal(true);
    dispatch(getAllCurrentUserAppointmentsThunk()).then(() =>
      setShowLoadingModal(false)
    );
  }, [dispatch]);

  ////////// Table Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Slice the appointment list for pagination
  const paginatedAppointments = appointmentList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  ////////////////////// handle cancel
const handleCancel = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this appointment!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, cancel it!',
  });

  if (result.isConfirmed) {
    try {
      setShowLoadingModal(true); // Show loading while canceling
      Swal.fire('Cancelled!', 'Your appointment has been cancelled.', 'success');
      await dispatch(cancelCurrentUserAppointmentsThunk(id));

      // Refetch the appointments
      await dispatch(getAllCurrentUserAppointmentsThunk());
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      Swal.fire('Error!', 'There was a problem cancelling your appointment.', 'error');
    } finally {
      setShowLoadingModal(false); // Hide loading
    }
  }
};


  return (
    <>
      <div className="appointment_list_main">
        <p className="appointment_list_main_title">
          Bảng Về Lịch Đặt Dịch Vụ Của Bạn
        </p>
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
                paginatedAppointments.map((appointment) => (
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
          <TablePagination
          style={{display:"flex" ,justifyContent:"center"}}
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={appointmentList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
      <Divider />
    </>
  );
}
