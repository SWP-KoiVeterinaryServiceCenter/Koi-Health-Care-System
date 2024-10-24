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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { tokens } from "../../../../theme";
import { getAllTravelExpenseSelector } from "../../../../store/sellectors";
import {
  getAllTravelExpenseThunk,
  deleteTravelExpenseThunk,
} from "../../../../store/apiThunk/travelExpense";
import {
  StyledBox,
  CustomNoRowsOverlay,
  GridLoadingOverlay,
} from "../../../../components/styledTable/styledTable";
import "./travelExpenseList.css"; // Updated CSS import
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import bgImage from "../../../../assets/koibg_account.jpg";

const TravelExpenseList = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const accounts = useSelector(getAllTravelExpenseSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const direction = props.direction;

  useEffect(() => {
    dispatch(getAllTravelExpenseThunk());
  }, [dispatch]);

  useEffect(() => {
    setFilteredRows(
      accounts?.map((account, index) => ({
        ...account,
        id: account.id, // Ensure we're using the correct `id` from the API response
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
        id: account.id, // Ensure unique id for each row
        order: index + 1,
      }))
    );
    setPageNumber(0); // Reset page number after search
  };

  const handleDelete = (id) => {
    // Show confirmation modal using SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete this travel expense?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, dispatch deleteTravelExpenseThunk
        dispatch(deleteTravelExpenseThunk(id))
          .then(() => {
            // After deletion, reload the data
            Swal.fire({
              title: 'Deleted!',
              text: 'Travel expense has been deleted.',
              icon: 'success',
            });
            dispatch(getAllTravelExpenseThunk()); // Reload data
          })
          .catch((error) => {
            // Handle errors
            Swal.fire({
              title: 'Error!',
              text: 'There was an issue deleting the travel expense.',
              icon: 'error',
            });
          });
      }
    });
  };

  const columns = [
    {
      field: "order",
      headerName: "STT",
      headerAlign: "center",
      renderCell: ({ row: { order } }) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          {order}
        </Box>
      ),
    },
    {
      field: "baseRate",
      headerName: "Base Rate",
      flex: 1,
      renderCell: ({ row: { baseRate } }) => <div>{baseRate}</div>,
    },
    {
      field: "minimumTravelRate",
      headerName: "Min Travel Rate",
      flex: 1,
      renderCell: ({ row: { minimumTravelRate } }) => <div>{minimumTravelRate}</div>,
    },
    {
      field: "maximumTravelRate",
      headerName: "Max Travel Rate",
      flex: 1,
      renderCell: ({ row: { maximumTravelRate } }) => <div>{maximumTravelRate}</div>,
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            gap="4px"
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#A30B2E",
                minWidth: "50px",
                textTransform: "capitalize",
              }}
              onClick={() => handleDelete(id)} // Call handleDelete on button click
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

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
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1}
      sx={{ color: "black", borderRadius: 1, gap: 1 }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <Button
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 0}
          sx={{ color: "black", backgroundColor: "#7CB9E8" }}
        >
          Previous
        </Button>
        <Box p={1} sx={{ color: "black" }}>
          {pageNumber + 1}
        </Box>
        <Button
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={(pageNumber + 1) * pageSize >= filteredRows.length}
          sx={{ color: "black", backgroundColor: "#7CB9E8" }}
        >
          Next
        </Button>
      </Box>
      <FormControl variant="outlined" sx={{ minWidth: 100, maxWidth: 120 }}>
        <InputLabel id="page-size-select-label" style={{ color: "black" }}>
          Rows per page
        </InputLabel>
        <Select
          labelId="page-size-select-label"
          id="page-size-select"
          value={pageSize}
          onChange={handlePageSizeChange}
          label="Rows per page"
          sx={{
            "& .MuiOutlinedInput-input": {
              padding: "8px 14px",
              fontSize: "0.875rem",
              color: "black",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "black",
            },
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
    <div className="travelExpenseList-container">
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
          <Grid
            container
            item
            xs={12}
            lg={7}
            justifyContent="center"
            mx="auto"
          >
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
                WebkitTextStroke: "1px black", // Add border around text
                display: "inline-block", // Ensure border doesn't stretch
                fontFamily: "Helvetica",
              })}
            >
              TRAVEL EXPENSE LIST
            </Typography>

            <Typography
              variant="body1"
              color="black"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              Manage travel expenses for various accounts.
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
        {/* Search and action buttons */}
        <Box className="travelExpenseList-Box-Template-Modal" m="20px">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
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
                InputProps={{
                  style: { color: "black" }, // Text color
                }}
                sx={{
                  mb: 2,
                  width: "200px",
                  "& .MuiInputBase-input": { color: "black" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                  "& .MuiInputLabel-root": { color: "black" }, // Label color
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  mb: 2,
                  ml: 1,
                  height: "50px",
                  backgroundColor: "#7CB9E8",
                }}
              >
                Search
              </Button>
            </Box>
            <div className="travelExpenseList-button_css_createAmin">
              <div className="travelExpenseList-button-row">
                <div
                  className="travelExpenseList-custom-button-icon-create-staff"
                  onClick={() =>
                    navigate(`/${direction}/createTravelExpense`)
                  }
                >
                  <div className="travelExpenseList-custom-icon-create-staff">
                    <AdminPanelSettingsIcon
                      style={{ width: 25, height: 25, color: "black" }}
                    />
                  </div>
                  <div className="travelExpenseList-custom-cube-create-staff">
                    <span className="travelExpenseList-custom-side-create-staff travelExpenseList-custom-front-create-staff">
                      Create Fee Travel
                    </span>
                    <span className="travelExpenseList-custom-side-create-staff travelExpenseList-custom-top-create-staff">
                      FEE TRAVEL
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
              getRowId={(row) => row.id} // Use the `id` as the unique row identifier
              components={{
                Pagination: CustomFooter,
              }}
            />
          </Box>
        </Box>
      </Card>
      <Box
        pt={6}
        px={1}
        mt={6}
        sx={{ color: "black", background: "#ebe2e1" }}
      >
        <Footer />
      </Box>
    </div>
  );
};

export default TravelExpenseList;
