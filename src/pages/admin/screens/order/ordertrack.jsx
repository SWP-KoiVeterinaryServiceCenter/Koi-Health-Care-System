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
import { allOrdersSelector,orderDetailSelector } from "../../../../store/sellectors";
import {
  getAllOrdersThunk,
  cancelOrderThunk,
  getOrderDetailThunk
} from "../../../../store/apiThunk/orderThunk";
import {
  StyledBox,
  CustomNoRowsOverlay,
  GridLoadingOverlay,
} from "../../../../components/styledTable/styledTable";
import OrderBackdrop from "../../../../components/backdrop/orderBackdrop/orderBackdrop";

import "./ordertrack.css";

const OrdertrackTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const orders = useSelector(allOrdersSelector);
  const orderDetail = useSelector(orderDetailSelector);
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  const [open, setOpen] = useState(false);
  console.log(orderDetail);

  useEffect(() => {
    dispatch(getAllOrdersThunk());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowLoadingModal(true);
        dispatch(cancelOrderThunk(id)).then(() => {
          dispatch(getAllOrdersThunk()).then(() => {
            Swal.fire({
              title: "Cancelled!",
              text: "The order has been cancelled.",
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
    // {
    //   field: "id",
    //   headerName: "Order Id",
    //   flex: 2,
    //   cellClassName: "name-column--cell",
    //   renderCell: ({ row: { id } }) => {
    //     const handleOpen = () => {
    //       setShowLoadingModal(true);
    //       dispatch(getOrderDetailThunk(id)).then(() => {
    //         setShowLoadingModal(false);
    //         setOpen(true);
    //       });
    //     };
    //     return (
    //       <div onClick={handleOpen} style={{ cursor: "pointer" }}>
    //         {id}
    //       </div>
    //     );
    //   },
    // },
    {
      field: "senderUsername",
      headerName: "Sender Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { id, senderUsername } }) => {
        const handleOpen = () => {
          setShowLoadingModal(true);
          dispatch(getOrderDetailThunk(id)).then(() => {
            setShowLoadingModal(false);
            setOpen(true);
          });
        };
        return (
          <div onClick={handleOpen} style={{ cursor: "pointer" }}>
            {senderUsername}
          </div>
        );
      },
    },
    {
      field: "postTitle",
      headerName: "Post Title",
      flex: 1,
      renderCell: ({ row: { postTitle } }) => <div>{postTitle}</div>,
    },
    {
      field: "postContent",
      headerName: "Post Content",
      flex: 1,
      renderCell: ({ row: { postContent } }) => <div>{postContent}</div>,
    },
    {
      field: "orderStatus",
      headerName: "Status",
      renderCell: ({ row: { orderStatus } }) => (
        <div
          className={
            orderStatus === "Pending"
              ? "status-Pending"
              : orderStatus === "Delivered"
              ? "status-Delivered"
              : orderStatus === "Reject"
              ? "status-Rejected"
              : "status-Canceled"
          }
        >
          {orderStatus}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row: { id, orderStatus } }) => {
        if (["Delivered", "Confirm", "Accept"].includes(orderStatus)) {
          return (
            <Box width="100%" display="flex" justifyContent="center" gap="4px">
              <Button
                variant="contained"
                style={{
                  backgroundColor: colors.blueAccent[400],
                  minWidth: "50px",
                  textTransform: "capitalize",
                }}
                onClick={() => handleCancel(id)}
              >
                Cancel
              </Button>
            </Box>
          );
        } else {
          return null;
        }
      },
    },
  ];

  const rows =
    orders?.map((order, index) => ({
      ...order,
      order: index + 1,
      id: order.id,
      senderUsername: order.user.senderUsername,
      postTitle: order.post.postTitle,
      postContent: order.post.postContent,
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
      <Header title="ORDER TRACKING" subtitle="Track Orders From The System" />

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
          rowCount={rows.length}
          rowsPerPageOptions={[]} // Hides the rows per page selector
          components={{
            Pagination: CustomFooter,
          }}
        />
            <OrderBackdrop
                    open={open}
                    handleClose={handleClose}
                    orderDetail={orderDetail}
                />
      </Box>
    </Box>
  );
};

export default OrdertrackTable;
