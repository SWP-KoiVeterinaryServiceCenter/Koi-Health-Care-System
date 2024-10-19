
import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
// import Features from "../../../authorize/landingPage/LandingPageDetail/Features/Features";
import Footer from "../../../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import LandingHeader from "../../../../../authorize/landingPage/LandingPageDetail/HeaderPage/LandingHeader/landingHeader";
import SetMealIcon from "@mui/icons-material/SetMeal";
import MedicationIcon from '@mui/icons-material/Medication';
import "./doctorHeader.css";

import koi_fish from "../../../../../../assets/koi3.png";
import fish_market from "../../../../../../assets/fishmarket.jpg";
import doctor from "../../../../../../assets/fish-veterinarians-aquarium.jpg";
import car from "../../../../../../assets/tank_drive.jpg";
import koifishmarket from "../../../../../../assets/koi_fish_market.png";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.bool.isRequired, 
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function doctorHeader() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <div>
      <div className="card-1-doctor">
        <div className="koi-img-1-doctor">
          <div className="overlay-doctor"></div>
          <p className="title-doctor">Is Your Fish Sick?</p>
          <p className="subtitle-doctor">
            Our Veterinary Facility Is Ready To Help You In Ho Chi Minh City.
          </p>
          <p className="request-doctor">Book an Appointment</p>
          <img src={koi_fish} alt="Koi Fish" />
        </div>
      </div>

      <div className="card-1-doctor">
        <div className="tittle-center-doctor">
          <p className="title-doctor">Koi Fish Care Services in Ho Chi Minh City</p>
          <p className="subtitle-doctor">
            Koi Fish Care is a premier mobile aquatic care service, offering top-notch care and invaluable support to fish and dedicated fish owners. We turn fish keepers into skilled aquatic parents, helping fish remain healthy, stress-free, and enjoy an excellent quality of life.
          </p>
        </div>
       
      </div>
    

  
    </div>
  );
}
