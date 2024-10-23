import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
// import { IconButton } from "@mui/material";
// import ToggleColorMode from "../../ToggleColorMode/ToggleColorMode";
import { LogoutButton } from "../../../../components/function/logout/logout";
import logo from "../../../../assets/koi_loho.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import { Button } from "antd";
import IconButton from "@mui/material/IconButton";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link, useNavigate } from "react-router-dom";
import { colors } from "@mui/material";

const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

function AppAppBar({ mode, toggleColorMode }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [anchorElNews, setAnchorElNews] = React.useState(null);

  const handleClickMenuNews = (event) => {
    setAnchorElNews(event.currentTarget); // Khi bấm vào Dịch vụ sẽ hiển thị menu
  };

  const handleCloseNews = () => {
    setAnchorElNews(null); // Đóng menu khi bấm ra ngoài hoặc chọn mục
  };

  const openNews = Boolean(anchorElNews);

  const handleCloseDrawer = () => {
    setIsDrawerVisible(false);
  };

  const handleLogout = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    } catch (error) {
      console.log({ error });
    }
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSignUPClick = () => {
    navigate("/signup");
  };

  const handleLandingPageClick = () => {
    navigate("");
  };
  const handlePersonalInformationPageClick = () => {
    navigate("personalInformation");
  };
  const handleBookingPageClick = () => {
    navigate("/booking");
  };


  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div className="">
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <img src={logo} style={logoStyle} alt="logo of sitemark" />
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  ml: "auto", // Đẩy MenuItem sang phải
                }}
              >
                   <MenuItem
                  onClick={() => scrollToSection("features")}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <HomeOutlinedIcon sx={{ color: "black", fontSize: "19px" }} />
                  <Typography
                    color="black"
                    fontSize="16px"
                    onClick={() => {
                      navigate("");
                    }}
                    sx={{ ml: 0.1 }} // Thêm khoảng cách nhỏ giữa icon và chữ
                  >
                    HOME
                  </Typography>
                </MenuItem>

                <>
      {/* Mục Tin tức */}
      <MenuItem
        onClick={handleClickMenuNews} // Hiển thị menu khi bấm vào
        sx={{ display: "flex", alignItems: "center" }}
      >
        <NewspaperOutlinedIcon sx={{ color: "black", fontSize: "19px" }} />
        <Typography color="black" fontSize="16px" sx={{ ml: 0.1 }}>
          NEWS
        </Typography>
      </MenuItem>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorElNews}
        open={openNews}
        onClose={handleCloseNews}
      >
        <MenuItem onClick={() => navigate("doctors")}>Veterinarians</MenuItem>
        <MenuItem onClick={() => navigate("doctors")}>News</MenuItem>
        <MenuItem onClick={() => navigate("/fact")}>Facts</MenuItem>
      </Menu>
    </>

                <MenuItem
                  onClick={() => scrollToSection("testimonials")}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <MedicalServicesOutlinedIcon
                    sx={{ color: "black", fontSize: "19px" }}
                  />
                  <Typography
                    // variant="body2"
                    // color="text.primary"
                    color="black"
                    fontSize="16px"
                    onClick={() => {
                      navigate("service");
                    }}
                    sx={{ ml: 0.1 }} // Thêm khoảng cách nhỏ giữa icon và chữ
                  >
                    SERVICE
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => scrollToSection("highlights")}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <EditCalendarIcon sx={{ color: "black", fontSize: "19px" }} />
                  <Typography
                    color="black"
                    fontSize="16px"
                    onClick={() => {
                      navigate("appointmentList");
                    }}
                    sx={{ ml: 0.1 }} // Thêm khoảng cách nhỏ giữa icon và chữ
                  >
                    APPOINTMENT
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => scrollToSection("pricing")}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <PermContactCalendarOutlinedIcon
                    sx={{ color: "black", fontSize: "19px" }}
                  />
                  <Typography
                   onClick={() => {
                    navigate("contactUs");
                  }}
                    color="black"
                    fontSize="16px"
                    sx={{ ml: 0.1 }} // Thêm khoảng cách nhỏ giữa icon và chữ
                  >
                    CONTACT
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={() => scrollToSection("faq")}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <HelpOutlineOutlinedIcon
                    sx={{ color: "black", fontSize: "19px" }}
                  />
                  <Typography
                    color="black"
                    fontSize="16px"
                    sx={{ ml: 0.1 }} // Thêm khoảng cách nhỏ giữa icon và chữ
                  >
                    ABOUT 
                  </Typography>
                </MenuItem>

                {/* IconButton to trigger Drawer */}
                <IconButton onClick={() => setIsDrawerVisible(true)}>
                  <PersonOutlinedIcon
                    fontSize="large"
                    sx={{ color: "black" }}
                  />
                </IconButton>

                {/* Material UI Drawer */}
                <Drawer
                  anchor="right"
                  open={isDrawerVisible}
                  onClose={handleCloseDrawer}
                >
                  <Box
                    sx={{
                      width: 300,
                      p: 2,
                      backgroundColor: "background.paper",
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                        flexGrow: 1,
                      }}
                    >
                      {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
                    </Box>
                    <MenuItem onClick={() => navigate("profile")}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => navigate("personalInformation")}>
                      Fish information
                    </MenuItem>
                    <MenuItem onClick={() => navigate("serviceInformation")}>
                      Service information
                    </MenuItem>

                    <Divider />
                    <MenuItem>
                      {/* <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      onClick={handleLoginClick}
                      target="_blank"
                      sx={{ width: "100%" }}
                    >
                      Login
                    </Button> */}
                    </MenuItem>
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="outlined"
                        component="a"
                        onClick={handleLogout}
                        target="_blank"
                        sx={{ width: "100%" }}
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  </Box>
                </Drawer>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            ></Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    {/* <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} /> */}
                  </Box>
                  <MenuItem onClick={() => scrollToSection("features")}>
                    Features
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("testimonials")}>
                    Testimonials
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("highlights")}>
                    Highlights
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("pricing")}>
                    Pricing
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("faq")}>
                    FAQ
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    {/* <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      onClick={handleLoginClick}
                      target="_blank"
                      sx={{ width: "100%" }}
                    >
                      Login
                    </Button> */}
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      onClick={() => {
                        navigate("/login");
                      }}
                      target="_blank"
                      sx={{ width: "100%" }}
                    >
                      Login
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
