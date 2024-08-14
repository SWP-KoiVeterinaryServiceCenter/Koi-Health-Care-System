import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../../../theme";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  allCancelAmountSelector,
} from "../../../../../store/sellectors";
import {
  getCancelledAmountThunk,
  updateAmountThunk,
} from "../../../../../store/apiThunk/policyThunk";
import {
  StyledBox,
} from "../../../../../components/styledTable/styledTable";

export default function WalletTable() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const accounts = useSelector(allCancelAmountSelector);
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [newCancelledAmount, setNewCancelledAmount] = useState("");

  useEffect(() => {
    dispatch(getCancelledAmountThunk());
  }, [dispatch]);

  const handleEditClick = (id, orderCancelledAmount) => {
    setEditingId(id);
    setNewCancelledAmount(orderCancelledAmount);
  };

  const handleUpdateCancelledAmount = (id) => {
    setShowLoadingModal(true);
    dispatch(updateAmountThunk({ id, orderCancelledAmount: newCancelledAmount }))
      .then(() => {
        dispatch(getCancelledAmountThunk()).then(() => {
          setShowLoadingModal(false);
          Swal.fire({
            title: "Success!",
            text: "Order cancelled amount has been updated.",
            icon: "success",
          });
          setEditingId(null); // Exit edit mode after successful update
        });
      })
      .catch((error) => {
        setShowLoadingModal(false);
        Swal.fire({
          title: "Error!",
          text: "There was an issue updating the orderCancelledAmount.",
          icon: "error",
        });
      });
  };

  const columns = [
    {
      field: "orderCancelledAmount",
      headerName: "CancelledAmount",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row: { id, orderCancelledAmount } }) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          {editingId === id ? (
            <input
              type="number"
              value={newCancelledAmount}
              onChange={(e) => setNewCancelledAmount(e.target.value)}
              autoFocus
            />
          ) : (
            <span>{orderCancelledAmount}</span>
          )}
        </Box>
      ),
    },
    {
      field: "activity",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row: { id, orderCancelledAmount } }) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          gap="10px"
        >
          {editingId === id ? (
            <Button
              variant="contained"
              color="success"
              style={{ color: "white", textTransform: "capitalize" }}
              onClick={() => handleUpdateCancelledAmount(id)}
            >
              Ok
            </Button>
          ) : (
            <Button
              variant="contained"
              color="warning"
              style={{ color: "white", textTransform: "capitalize" }}
              onClick={() => handleEditClick(id, orderCancelledAmount)}
            >
              Edit
            </Button>
          )}
        </Box>
      ),
    },
  ];

  const rows =
    accounts?.map((account, index) => ({
      ...account,
      order: index + 1,
    })) || [];

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPageNumber(0); // Reset to the first page when page size changes
  };

  const paginatedRows = rows.slice(
    pageNumber * pageSize,
    (pageNumber + 1) * pageSize
  );

  const CustomFooter = () => (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1}
      sx={{ color: "black", borderRadius: 1, gap: 1 }}
    >
      {/* <Box display="flex" alignItems="center" gap={1}>
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
          disabled={(pageNumber + 1) * pageSize >= rows.length}
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
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl> */}
    </Box>
  );

  const Header = ({
    title,
    subtitle,
    titleColor = "black",
    subtitleColor = "gray",
  }) => {
    return (
      <Box mb={2}>
        <Typography
          style={{
            fontFamily: "Source Sans Pro, sans-serif",
            fontSize: "32px",
            color: "black",
            fontWeight: "700",
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

  return (
    <Box m="20px">
      <Header title="GIAO DỊCH" subtitle="Quản Lý Giao Dịch Hệ Thống" />
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
          rowCount={rows.length} // Total number of rows
          rowsPerPageOptions={[]} // Hides the rows per page selector
          components={{
            Pagination: CustomFooter, // Custom footer component
          }}
        />
      </Box>
    </Box>
  );
}
