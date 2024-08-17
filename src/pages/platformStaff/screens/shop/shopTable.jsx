
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { tokens } from "../../../../theme";
import Header from "../../components/header/Header";
import { allAccountsSelector } from "../../../../store/sellectors";
import { getPostThunk, banPostThunk, unbanPostThunk } from "../../../../store/apiThunk/postThunk";
import {
  getAllUsersThunk,
  banUserThunk,
  unbanUserThunk,
} from "../../../../store/apiThunk/userThunk";
import {
  StyledBox,
  CustomNoRowsOverlay,
  GridLoadingOverlay,
} from "../../../../components/styledTable/styledTable";
import { postSelector,postDetailSelector} from "../../../../store/sellectors";
// import { CategoryList } from "../../../platformStaff/screens/categoryList/categorydetail/categorydetail";

// import "./accountTable.css";

const ShopTableStaff = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const accounts = useSelector(postSelector);
  // const shopDetail = useSelector(postDetailSelector);
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [pageSize, setPageSize] = useState(5); // State for number of rows per page
  const [pageNumber, setPageNumber] = useState(0); // Current page index

  useEffect(() => {
    dispatch(getPostThunk());
  }, [dispatch]);

  const handleAccept = (id) => {
    setShowLoadingModal(true);
    dispatch(banPostThunk(id))
      .then(() => {
        dispatch(getPostThunk()).then(() => {
          setShowLoadingModal(false);
          Swal.fire({
            title: "Success!",
            text: "User has been approved.",
            icon: "success",
          });
        });
      })
      .catch((error) => {
        setShowLoadingModal(false);
        Swal.fire({
          title: "Error!",
          text: "There was an issue approving the user.",
          icon: "error",
        });
      });
  };

  const handleDeny = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowLoadingModal(true);
        dispatch(unbanPostThunk(id)).then(() => {
          dispatch(getPostThunk()).then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            }).then(() => {
              setShowLoadingModal(false);
            });
          });
        });
      }
    });
  };
  const Header = ({
    title,
    subtitle,
    titleColor = "gray",
    subtitleColor = "gray",
  }) => {
    return (
      <Box mb={2}>
        <Typography
          style={{
            fontFamily: "Source Sans Pro, sans-serif",
            fontSize: "32px",
            color: titleColor,
            fontWeight: "700",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Shadow effect
            // border: "1px solid rgba(255, 255, 255, 0.5)", // Light white border
            padding: "4px", // Optional: padding to make the border more visible
            borderRadius: "4px" // Optional: rounded corners for the border
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
          field: "postTitle",
          headerName: "Post Title",
          flex: 1,
          cellClassName: "name-column--cell",
          renderCell: ({ row: { id, postTitle } }) => {
            const handleOpen = () => {
              setShowLoadingModal(true);
              dispatch(getPostThunk({ id })).then(() => {
                setShowLoadingModal(false);
                setOpen(true);
              });
            };
            return (
              <div onClick={handleOpen} style={{ cursor: "pointer" }}>
                {postTitle}
              </div>
            );
          },
        },
        {
          field: "postContent",
          headerName: "Post Content",
          flex: 1,
        },
        {
          field: "creationDate",
          headerName: "Creation Date",
          flex: 1,
          renderCell: ({ row: { creationDate } }) => (
            <div>{creationDate}</div>
          ),
        },
        {
          field: "status",
          headerName: "Status",
          flex: 1,
          renderCell: ({ row: { status } }) => (
            <div className={status === "Unban" ? "status-not-ban" : "status-ban"}>
              {status}
            </div>
          ),
        },
        {
          field: "action",
          headerName: "Action",
          headerAlign: "center",
          flex: 1,
          renderCell: ({ row: { id } }) => {
            return (
              <Box width="100%" display="flex" justifyContent="center" gap="4px">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#55ab95", minWidth: "50px", textTransform: "capitalize" }}
                  onClick={() => handleAccept(id)}
                >
                  Ban
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: colors.redAccent[600], minWidth: "50px", textTransform: "capitalize" }}
                  onClick={() => handleDeny(id)}
                >
                  Unban
                </Button>
              </Box>
            );
          },
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
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  return (
    <Box m="20px">
      {/* <CategoryList/> */}
      <Header title="POSTS MANAGEMENT" subtitle="System Post Management" />

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
          {/* <ShopBackdrop
                    open={open}
                    handleClose={handleClose}
                    shopDetail={shopDetail}
                /> */}
      </Box>
    </Box>
  );
};

export default ShopTableStaff;
