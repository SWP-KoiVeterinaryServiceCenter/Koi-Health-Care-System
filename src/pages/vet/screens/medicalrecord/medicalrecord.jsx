import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  Container,
  Grid,
  Card,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { tokens } from "../../../../theme";
import { appointmentByCurrentVetSelector } from "../../../../store/sellectors";
import {
  getAppointmentByCurrentVetThunk,
  confirmAppointmentsThunk,
  missAppointmentsThunk,
} from "../../../../store/apiThunk/appointment";
import {
  StyledBox,
  CustomNoRowsOverlay,
  GridLoadingOverlay,
} from "../../../../components/styledTable/styledTable";
import "./medicalrecord.css";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import bgImage from "../../../../assets/koibg_account.jpg";

const MedicalRecordList = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const accounts = useSelector(appointmentByCurrentVetSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    dispatch(getAppointmentByCurrentVetThunk());
  }, [dispatch]);

  useEffect(() => {
    setFilteredRows(
      accounts?.map((account, index) => ({
        ...account,
        id: account.id, // Sử dụng `id` từ API
        order: index + 1,
      })) || []
    );
  }, [accounts]);

  const handleSearch = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filteredData = accounts.filter((account) =>
      Object.values(account).some((value) =>
        value.toString().toLowerCase().includes(lowercasedQuery)
      )
    );

    setFilteredRows(
      filteredData.map((account, index) => ({
        ...account,
        id: account.id, // Đảm bảo rằng mỗi hàng có id duy nhất
        order: index + 1,
      }))
    );
    setPageNumber(0); // Reset page number after search
  };

  const handleConfirm = (row) => {
    console.log("Confirm ID:", row.id); // Log to check
    dispatch(confirmAppointmentsThunk(row.id))
      .then((response) => {
        console.log("Confirm Response:", response); // Log response
        if (response.error) {
          Swal.fire("Error", response.error.message, "error");
        } else {
          Swal.fire("Success", "Appointment confirmed successfully!", "success").then(() => {
            dispatch(getAppointmentByCurrentVetThunk()); // Reload data after success
          });
        }
      })
      .catch((error) => {
        console.error("Confirm Error:", error);
      });
  };

  const handleMiss = (row) => {
    console.log("Miss ID:", row.id); // Log to check
    dispatch(missAppointmentsThunk(row.id))
      .then((response) => {
        console.log("Miss Response:", response); // Log response
        if (response.error) {
          Swal.fire("Error", response.error.message, "error");
        } else {
          Swal.fire("Success", "Appointment marked as missed!", "success").then(() => {
            dispatch(getAppointmentByCurrentVetThunk()); // Reload data after success
          });
        }
      })
      .catch((error) => {
        console.error("Miss Error:", error);
      });
  };
  const handlePrescription = (rowId) => {
    // Navigate to /vet/createMedicalRecord with the row id
    navigate(`/vet/createMedicalRecord`, {
      state: { id: rowId },
    });
  };
  
  

  const columns = [
    {
      field: "order",
      headerName: "STT",
      headerAlign: "center",
      renderCell: ({ row: { order } }) => (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
          {order}
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        let style = {}; // Define default style object
        
        // Check the status and apply appropriate colors
        switch (status) {
          case "Cancelled":
            style = { color: "#000080", backgroundColor: "#4F86F7" };
            break;
          case "Confirmed":
            style = { color: "#00504B", backgroundColor: "#76BB68" };
            break;
          case "Missed":
            style = { color: "#A30B2E", backgroundColor: "#E8917D" };
            break;
          case "Pending":
            style = { color: "#C46210", backgroundColor: "#DAC98E" };
            break;
          case "Finished":
            style = { color: "#41214F", backgroundColor: "#7D74A8" };
            break;
          default:
            style = { color: "black", backgroundColor: "white" };
        }
  
        return (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            p={1}
            sx={{
              borderRadius: 1,
              ...style,
            }}
          >
            {status}
          </Box>
        );
      },
    },
    {
      field: "serviceName",
      headerName: "ServiceName",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { serviceName } }) => <div>{serviceName}</div>,
    },
    {
      field: "koiName",
      headerName: "KOI Name",
      flex: 1,
      renderCell: ({ row: { koiName } }) => <div>{koiName}</div>,
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 1,
      renderCell: ({ row: { customerName } }) => <div>{customerName}</div>,
    },
    // {
    //   field: "vetName",
    //   headerName: "Vet Name",
    //   flex: 1,
    //   renderCell: ({ row: { vetName } }) => <div>{vetName}</div>,
    // },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      renderCell: ({ row: { description } }) => <div>{description}</div>,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        // Check if the status is one of Finished, Missed, Pending, Cancelled
        const showActions = !["Confirmed", "Missed", "Pending", "Cancelled"].includes(row.status);
  
        return (
          <Box width="100%" display="flex" justifyContent="center" gap="8px">
            {showActions && (
              <>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "green", color: "white" }}
                  onClick={() => handlePrescription(row.id)} // Navigate to createMedicalRecord
                >
                  Prescription
                </Button>
           
              </>
            )}
          </Box>
        );
      },
    },
  ];

  const rows =
    accounts?.map((account, index) => ({
      ...account,
      id: account.id, // Sử dụng `id` từ API, đảm bảo mọi hàng đều có `id`
      order: index + 1,
    })) || [];

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
  };

  const paginatedRows = filteredRows.slice(
    pageNumber * pageSize,
    pageNumber * pageSize + pageSize
  );

  const CustomFooter = () => (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={1} sx={{ color: "black", borderRadius: 1, gap: 1 }}>
      <Box display="flex" alignItems="center" gap={1}>
        <Button
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 0}
          sx={{ color: "black", backgroundColor: "#7CB9E8" }}
        >
          Previous
        </Button>
        <Box p={1} sx={{ color: "black" }}>{pageNumber + 1}</Box>
        <Button
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={(pageNumber + 1) * pageSize >= filteredRows.length}
          sx={{ color: "black", backgroundColor: "#7CB9E8" }}
        >
          Next
        </Button>
      </Box>
      <FormControl variant="outlined" sx={{ minWidth: 100, maxWidth: 120 }}>
        <InputLabel id="page-size-select-label" style={{ color: "black" }}>Rows per page</InputLabel>
        <Select
          labelId="page-size-select-label"
          id="page-size-select"
          value={pageSize}
          onChange={handlePageSizeChange}
          label="Rows per page"
          sx={{
            "& .MuiOutlinedInput-input": { padding: "8px 14px", fontSize: "0.875rem", color: "black" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "black" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "black" },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "black" },
          }}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <div>
      <>
        <Box
          minHeight="40vh"
          width="100%"
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Container>
            <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
              <Typography
                variant="h1"
                color="#F7FBFC"
                sx={({ breakpoints, typography: { fontSize } }) => ({
                  marginTop: "-48px",
                  marginBottom: "8px",
                  fontSize: 45,
                  fontWeight: "900",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  borderRadius: "4px",
                  WebkitTextStroke: "1px black",
                  display: "inline-block",
                  fontFamily: "Helvetica",
                })}
              >
                MEDICAL RECORD
              </Typography>

              <Typography variant="body1" color="black" textAlign="center" px={{ xs: 6, lg: 12 }} mt={1}>
              A place to help doctors prescribe medicine and monitor the condition of fish for customers
              </Typography>
            </Grid>
          </Container>
        </Box>
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -9,
            mb: 4,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: (theme) => theme.shadows[24],
          }}
        >
          <Box m="20px" className="Box-Template-Modal">
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <TextField
                  label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  placeholder="Search Information"
                  InputProps={{ style: { color: "black" } }}
                  sx={{
                    mb: 2,
                    width: "200px",
                    "& .MuiInputBase-input": { color: "black" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "black" },
                    "& .MuiInputLabel-root": { color: "black" },
                  }}
                />
                <Button variant="contained" onClick={handleSearch} sx={{ mb: 2, ml: 1, height: "50px", backgroundColor: "#7CB9E8" }}>
                  Search
                </Button>
              </Box>
            </Box>

            <Box sx={StyledBox} height="100%">
              <DataGrid
                disableRowSelectionOnClick
                loading={showLoadingModal}
                rows={paginatedRows}
                columns={columns}
                pagination
                paginationMode="client"
                pageSize={pageSize}
                page={pageNumber}
                onPageChange={handlePageChange}
                rowCount={filteredRows.length}
                rowsPerPageOptions={[]}
                components={{
                  Pagination: CustomFooter,
                }}
              />
            </Box>
          </Box>

          <Box pt={18} pb={6}>
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={5} ml="auto" sx={{ textAlign: { xs: "center", lg: "left" } }}>
                  <Typography variant="h4" fontWeight="bold" mb={0.5} color="black">
                    Thank you for your support!
                  </Typography>
                  <Typography variant="body1" color="black">
                    We deliver the best web products
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={5}
                  my={{ xs: 5, lg: "auto" }}
                  mr={{ xs: 0, lg: "auto" }}
                  sx={{ textAlign: { xs: "center", lg: "right" } }}
                >
                  <IconButton
                    component="a"
                    href="https://twitter.com/intent/tweet?text=Check%20Material%20Design%20System%20made%20by%20%40CreativeTim%20%23webdesign%20%23designsystem%20%23mui5&amp;url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fmaterial-kit-react"
                    target="_blank"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    <TwitterIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/material-kit-react"
                    target="_blank"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton
                    component="a"
                    href="https://www.pinterest.com/pin/create/button/?url=https://www.creative-tim.com/product/material-kit-react"
                    target="_blank"
                    color="primary"
                  >
                    <PinterestIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Card>
        <Box pt={6} px={1} mt={6} sx={{ color: "black", background: "#ebe2e1" }}>
          <Footer />
        </Box>
      </>
    </div>
  );
};

export default MedicalRecordList;
