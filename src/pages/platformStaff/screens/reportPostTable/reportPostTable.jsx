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
  import { tokens } from "../../../../theme";
  import Header from "../../components/header/Header";
  import { useDispatch, useSelector } from "react-redux";
  
  import {
    allReportsSelector,
    userReportsSelector,
    allPostReportsSelector,
    postReportsSelector
  } from "../../../../store/sellectors";
  import {
    getAllReportsThunk,
    getReportsUserDetailThunk,
    getAllPostsReportsThunk,
    getReportsPostDetailThunk
  } from "../../../../store/apiThunk/reportThunk";
  
  import { getWalletThunk } from "../../../../store/apiThunk/walletThunk";
  import { useEffect, useState } from "react";
  import Pagination from "../../../../components/pagination/pagination";
  import { AccRole } from "../../../../components/mapping/mapping";
  import Star from "../../../../../src/assets/ratingstar.png";
  import {
    StyledBox,
    CustomNoRowsOverlay,
    GridLoadingOverlay,
  } from "../../../../components/styledTable/styledTable";
  import { FilterComponent } from "../../../../components/filter/filterComponent";
  import { FormatPhoneNumber } from "../../../../components/format/formatText/formatText";
  import { ReportPostBackdrop } from "../../../../components/backdrop/reportBackdrop/reportPostBackdrop";
  import Swal from "sweetalert2";
  
  export default function ReportTable() {
    const theme = useTheme();
    const reportPostDetail = useSelector(postReportsSelector);
    const colors = tokens(theme.palette.mode);
    const accounts = useSelector(allPostReportsSelector);
    const dispatch = useDispatch();
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(0);
    const [open, setOpen] = useState(false);
    console.log(reportPostDetail);
    useEffect(() => {
      dispatch(getAllPostsReportsThunk());
    }, []);
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
              borderRadius: "4px", // Optional: rounded corners for the border
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
  
      
      {
        field: "reportContent",
        headerName: "Report Content",
        flex: 1,
        cellClassName: "name-column--cell",
        renderCell: ({ row: { id, reportContent } }) => {
          const handleOpen = () => {
            setShowLoadingModal(true);
            dispatch(getReportsPostDetailThunk(id))
              .then(() => {
                setShowLoadingModal(false);
                setOpen(true);
              });
          };
          return (
            <div onClick={handleOpen} style={{ cursor: "pointer" }}>
              {reportContent}
            </div>
          );
        },
      },
      // {
      //   field: "reportUserId",
      //   headerName: "Report User ID",
      //   flex: 1,
      //   renderCell: ({ row: { reportUserId } }) => <div>{reportUserId}</div>,
      // },
      {
        field: "postTitle",
        headerName: "Post Title",
        flex: 1,
        renderCell: ({ row: { postTitle } }) => <div>{postTitle}</div>,
      },
      {
        field: "categoryName",
        headerName: "Category Name",
        flex: 1,
        renderCell: ({ row: { categoryName } }) => <div>{categoryName}</div>,
      },
      {
        field: "conditionTypeName",
        headerName: "Type",
        flex: 1,
        renderCell: ({ row: { conditionTypeName } }) => {
          let textColor;
          if (conditionTypeName === "For exchanging") {
            textColor = "#00A7CE";
          } else if (conditionTypeName === "For donation") {
            textColor = "#0D9494";
          } else if (conditionTypeName === "For selling") {
            textColor = "red";
          } else {
            textColor = "inherit"; // Default color if none of the conditions match
          }
    
          return (
            <Typography style={{ color: textColor }}>
              {conditionTypeName}
            </Typography>
          );
        },
      },
   
    //   {
    //     field: "email",
    //     headerName: "Gmail",
    //     flex: 1,
    //     renderCell: ({ row: { email } }) => <div>{email}</div>,
    //   },
    //   {
    //     field: "rating",
    //     flex: 1,
    //     // headerAlign: "center",
    //     headerName: "Rating",
    //     renderCell: ({ row: { rating } }) => (
    //       <Box
    //         display="flex"
    //         alignItems="center"
    //         // justifyContent="center"
    //         width="100%"
    //         gap="6px"
    //       >
    //         <img src={Star} alt="" style={{ width: "35px" }} />
    //         {rating}
    //       </Box>
    //     ),
    //   },
 
    ];
  
    const rows =
      accounts?.map((account, index) => ({
        ...account,
        order: index + 1,
        postTitle: account.postDetail.postTitle,
        conditionTypeName: account.postDetail.conditionTypeName,
        categoryName: account.postDetail.categoryName,
      })) || [];
    const handleClose = () => {
      setOpen(false);
    };
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
              "& .MuiSvgIcon-root": {
                // Thêm phần này để thay đổi màu của icon
                color: "black",
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
        <Header  subtitle="Track reports Posts on the system" />
  
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
          <ReportPostBackdrop
            open={open}
            handleClose={handleClose}
            reportPostDetail={reportPostDetail}
          />
        </Box>
      </Box>
    );
  }
  