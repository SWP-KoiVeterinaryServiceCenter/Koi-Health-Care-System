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
  TextField,
  Container,
  Grid,
  Card,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { tokens } from "../../../../theme";
import Header from "../../components/header/Header";
import { allAccountsSelector } from "../../../../store/sellectors";
import {
  getAllUsersThunk,
  banUserThunk,
  unbanUserThunk,
  changeRoleUserThunk,
} from "../../../../store/apiThunk/userThunk";
import {
  StyledBox,
  CustomNoRowsOverlay,
  GridLoadingOverlay,
} from "../../../../components/styledTable/styledTable";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import "./accountTable.css";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import bgImage from "../../../../assets/koibg_account.jpg";

const AccountTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const accounts = useSelector(allAccountsSelector);
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [pageSize, setPageSize] = useState(5); // State for number of rows per page
  const [pageNumber, setPageNumber] = useState(0); // Current page index
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  console.log(accounts);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    setFilteredRows(
      accounts?.map((account, index) => ({
        ...account,
        id: account.accountId, // Sử dụng `accountId` làm id
        order: index + 1,
      })) || []
    );
  }, [accounts]);

  // const handleSearch = () => {
  //   const lowercasedQuery = searchQuery.toLowerCase();
  //   const filteredData = accounts.filter((account) =>
  //     Object.values(account).some((value) =>
  //       value.toString().toLowerCase().includes(lowercasedQuery)
  //     )
  //   );

  //   setFilteredRows(
  //     filteredData.map((account, index) => ({
  //       ...account,
  //       order: index + 1,
  //     }))
  //   );
  //   setPageNumber(0); // Reset page number after search
  // };
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
        id: account.accountId, // Đảm bảo rằng mỗi hàng có id duy nhất
        order: index + 1,
      }))
    );
    setPageNumber(0); // Reset page number after search
  };

  // const handleAccept = (accountId) => {
  //   setShowLoadingModal(true);
  //   dispatch(banUserThunk(accountId))
  //     .then(() => {
  //       dispatch(getAllUsersThunk()).then(() => {
  //         setShowLoadingModal(false);
  //         Swal.fire({
  //           title: "Success!",
  //           text: "User has been banned.",
  //           icon: "success",
  //         });
  //       });
  //     })
  //     .catch((error) => {
  //       setShowLoadingModal(false);
  //       Swal.fire({
  //         title: "Error!",
  //         text: "There was an issue banning the user.",
  //         icon: "error",
  //       });
  //     });
  // };
  const handleAccept = (accountId) => {
    console.log("Banning user with id:", accountId); // Thêm log để kiểm tra
    setShowLoadingModal(true);
    dispatch(banUserThunk(accountId))
      .then(() => {
        return dispatch(getAllUsersThunk());
      })
      .then(() => {
        setShowLoadingModal(false);
        Swal.fire({
          title: "Success!",
          text: "User has been banned.",
          icon: "success",
        });
      })
      .catch((error) => {
        setShowLoadingModal(false);
        Swal.fire({
          title: "Error!",
          text: "There was an issue banning the user.",
          icon: "error",
        });
      });
  };

  const handleChangeRole = (id) => {
    setShowLoadingModal(true);
    dispatch(changeRoleUserThunk(id))
      .then(() => {
        dispatch(getAllUsersThunk()).then(() => {
          setShowLoadingModal(false);
          Swal.fire({
            title: "Success!",
            text: "User role has been changed.",
            icon: "success",
          });
        });
      })
      .catch((error) => {
        setShowLoadingModal(false);
        Swal.fire({
          title: "Error!",
          text: "There was an issue changing the user's role.",
          icon: "error",
        });
      });
  };

  const handleDeny = (accountId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will update the status of this account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowLoadingModal(true);
        dispatch(unbanUserThunk(accountId)).then(() => {
          dispatch(getAllUsersThunk()).then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "User has been unbanned.",
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
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            padding: "4px",
            borderRadius: "4px",
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
      field: "status",
      headerName: "Account Status",
      renderCell: ({ row: { status } }) => (
        <div className={status === "Not ban" ? "status-not-ban" : "status-ban"}>
          {status}
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",

      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { id, email } }) => {
        const handleOpen = () => {
          setShowLoadingModal(true);
          dispatch(getAllUsersThunk(id)).then(() => {
            setShowLoadingModal(false);
            setOpen(true);
          });
        };
        return (
          <div onClick={handleOpen} style={{ cursor: "pointer" }}>
            {email}
          </div>
        );
      },
    },
    {
      field: "username",
      headerName: "User Name",
      flex: 1,
      renderCell: ({ row: { username } }) => <div>{username}</div>,
    },
    // {
    //   field: "changeRole",
    //   headerName: "Change Role",
    //   headerAlign: "center",
    //   flex: 1,
    //   renderCell: ({ row: { id, role } }) => {
    //     if (role === "Moderator") return null;

    //     return (
    //       <Box width="100%" display="flex" justifyContent="center" alignItems="center">
    //         <Button>
    //           <SwapHorizIcon
    //             color="primary"
    //             style={{ cursor: "pointer", fontSize: 30 }}
    //             onClick={() => {
    //               Swal.fire({
    //                 title: "Confirm Role Change",
    //                 text: "This account will be given the Moderator role, you cannot change the role from here!",
    //                 icon: "warning",
    //                 showCancelButton: true,
    //                 confirmButtonColor: "#3085d6",
    //                 cancelButtonColor: "#d33",
    //                 confirmButtonText: "Yes, change role!",
    //                 cancelButtonText: "No, cancel!",
    //               }).then((result) => {
    //                 if (result.isConfirmed) {
    //                   handleChangeRole(id);
    //                 }
    //               });
    //             }}
    //           />
    //         </Button>
    //       </Box>
    //     );
    //   },
    // },
    {
      field: "location",
      headerName: "Location",

      flex: 1,
      renderCell: ({ row: { location } }) => <div>{location}</div>,
    },
    {
      field: "role",
      headerName: "Role",
      headerAlign: "center",

      flex: 1,
      renderCell: ({ row: { role } }) => (
        <Box width="100%" display="flex" justifyContent="center" gap="4px">
          {role}
        </Box>
      ),
    },

    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row: { id, status } }) => {
        return (
          <Box width="100%" display="flex" justifyContent="center" gap="4px">
            {status === "Not ban" && (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#55ab95",
                  minWidth: "50px",
                  textTransform: "capitalize",
                }}
                onClick={() => handleAccept(id)}
              >
                Ban
              </Button>
            )}
            {status === "Ban" && (
              <Button
                variant="contained"
                style={{
                  backgroundColor: colors.redAccent[600],
                  minWidth: "50px",
                  textTransform: "capitalize",
                }}
                onClick={() => handleDeny(id)}
              >
                Unban
              </Button>
            )}
          </Box>
        );
      },
    },
  ];

  const rows =
    accounts?.map((account, index) => ({
      ...account,
      id: account.accountId, // Sử dụng `accountId` làm id
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
    <div>
      <>
        <Box
          minHeight="45vh"
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
                color="#00CAFF"
                sx={({ breakpoints, typography: { fontSize } }) => ({
                  marginTop: "-48px",
                  marginBottom: "8px",
                  [breakpoints.down("md")]: {
                    fontSize: fontSize["h3"],
                  },
                  fontWeight: "700",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                   borderRadius: "4px"
                })}
              >
                Account Management
              </Typography>
              <Typography
                variant="body1"
                color="black"
                textAlign="center"
                px={{ xs: 6, lg: 12 }}
                mt={1}
               
              >
            Account management system, which allows you to manage your accounts. Create accounts for staff/vet
              </Typography>
            </Grid>
          </Container>
        </Box>
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: (theme) => theme.shadows[24],
        
          }}
        >
          {/* //////////////////////////////////////////////////////////////TABLE///////////////////////////////////////////////////////////////////// */}

          <Box m="20px" className="Box-Template-Modal">
            {/* <Header title="ACCOUNT" subtitle="System Account Management" /> */}
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

              <div className="custom-buttons">
                <button>Create Vet Account</button>
                <button>Create Staff</button>
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
                components={{
                  Pagination: CustomFooter,
                }}
              />
            </Box>
          </Box>

          {/* //////////////////////////////////////////////////////////////END///////////////////////////////////////////////////////////////////// */}

          <Box pt={18} pb={6}>
            <Container>
              <Grid container spacing={3}>
                <Grid
                  item
                  xs={12}
                  lg={5}
                  ml="auto"
                  sx={{ textAlign: { xs: "center", lg: "left" } }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    mb={0.5}
                    color="black"
                  >
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
        <Box pt={6} px={1} mt={6} sx={{color:"black",background:"#E5E5E5"}} >
        <Footer/>
        </Box>
      </>

      {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

    </div>
  );
};

export default AccountTable;
