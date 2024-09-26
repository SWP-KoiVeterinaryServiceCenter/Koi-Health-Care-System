import React from "react";
import "./ServiceInformation.css";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button"; // Import Button
import AppAppBar from "../../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
import Footer from "../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import { Divider } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(Name, Description, Price, Duration, Action) {
  return { Name, Description, Price, Duration, Action };
}

const rows = [
  createData(
    "Frozen yoghurt",
    159,
    6.0,
    24,
    <Button variant="contained" color="primary">
      Thêm Vào Cuộc Hẹn
    </Button>
  ),
  createData(
    "Ice cream sandwich",
    237,
    9.0,
    37,
    <Button variant="contained" color="primary">
      Thêm Vào Cuộc Hẹn
    </Button>
  ),
  createData(
    "Eclair",
    262,
    16.0,
    24,
    <Button variant="contained" color="primary">
      Thêm Vào Cuộc Hẹn
    </Button>
  ),
  createData(
    "Cupcake",
    305,
    3.7,
    67,
    <Button variant="contained" color="primary">
      Thêm Vào Cuộc Hẹn
    </Button>
  ),
  createData(
    "Gingerbread",
    356,
    16.0,
    49,
    <Button variant="contained" color="primary">
      Thêm Vào Cuộc Hẹn
    </Button>
  ),
];

const ServiceInformation = () => {
  return (
    <>
      <AppAppBar />
      <div className="si-main">
        <p>Bảng Miêu Tả Dịch Vụ</p>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Tên Dịch Vụ</StyledTableCell>
                <StyledTableCell align="left"> Miêu Tả </StyledTableCell>
                <StyledTableCell align="left">
                  Giá Tiền &nbsp;($)
                </StyledTableCell>
                <StyledTableCell align="left">
                  Thời Gian &nbsp;(h)
                </StyledTableCell>
                <StyledTableCell align="left">Hành Động</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="left">{row.Name}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.Description}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.Price}</StyledTableCell>
                  <StyledTableCell align="left">{row.Duration}</StyledTableCell>
                  <StyledTableCell align="left">{row.Action}</StyledTableCell>
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

export default ServiceInformation;
