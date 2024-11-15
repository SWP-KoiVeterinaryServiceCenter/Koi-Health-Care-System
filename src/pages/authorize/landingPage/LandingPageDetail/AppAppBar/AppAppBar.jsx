import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import logo from "../../../../../assets/koi_loho.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";

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
  const [anchorElNews, setAnchorElNews] = React.useState(null);

  const handleClickMenuNews = (event) => {
    setAnchorElNews(event.currentTarget); // When clicking on News, the menu will appear
  };

  const handleCloseNews = () => {
    setAnchorElNews(null); // Close the menu when clicking outside or selecting an item
  };

  const openNews = Boolean(anchorElNews);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSignUPClick = () => {
    navigate("/signup");
  };

  const handlePersonalInformationPageClick = () => {
    navigate("/personalInformation");
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
                  ml: "auto", // Push MenuItem to the right
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
                      navigate("/");
                    }}
                    sx={{ ml: 0.1 }} // Add small space between icon and text
                  >
                    HOME
                  </Typography>
                </MenuItem>

                <>
                  {/* News Section */}
                  <MenuItem
                    onClick={handleClickMenuNews} // Show menu when clicking
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <NewspaperOutlinedIcon
                      sx={{ color: "black", fontSize: "19px" }}
                    />
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
                    <MenuItem onClick={() => navigate("/guestdoctors")}>
                      Doctors
                    </MenuItem>
                    {/* <MenuItem onClick={() => navigate("/news")}>News</MenuItem>
                    <MenuItem onClick={() => navigate("/fact")}>Facts</MenuItem> */}
                  </Menu>
                </>

                <MenuItem sx={{ display: "flex", alignItems: "center" }}>
                  <MedicalServicesOutlinedIcon
                    sx={{ color: "black", fontSize: "19px" }}
                  />
                  <Typography
                    color="black"
                    fontSize="16px"
                    onClick={() => {
                      navigate("/guestservice");
                    }}
                    sx={{ ml: 0.1 }} // Add small space between icon and text
                  >
                    SERVICES
                  </Typography>
                </MenuItem>

                {/* <MenuItem
                  onClick={() => scrollToSection("highlights")}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <EditCalendarIcon
                    sx={{ color: "black", fontSize: "19px" }}
                  />
                  <Typography
                    color="black"
                    fontSize="16px"
                    sx={{ ml: 0.1 }} // Add small space between icon and text
                  >
                    Appointments
                  </Typography>
                </MenuItem> */}

                <MenuItem
                  onClick={() => scrollToSection("pricing")}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <PermContactCalendarOutlinedIcon
                    sx={{ color: "black", fontSize: "19px" }}
                  />
                  <Typography
                    onClick={() => {
                      navigate("/guestcontact");
                    }}
                    color="black"
                    fontSize="16px"
                    sx={{ ml: 0.1 }} // Add small space between icon and text
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
                    sx={{ ml: 0.1 }} // Add small space between icon and text
                  >
                    ABOUT
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <Button
                sx={{ background: "#D5762B" }}
                variant="contained"
                size="small"
                component="a"
                onClick={() => {
                  navigate("/login");
                }}
                target="_blank"
              >
                Book Appointment
              </Button>
              <Button
                sx={{ background: "#005F5F" }}
                variant="contained"
                size="small"
                component="a"
                onClick={() => {
                  navigate("/login");
                }}
                target="_blank"
              >
                Login
              </Button>
            </Box>
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
                  />
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

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
