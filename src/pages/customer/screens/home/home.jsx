
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
import Features from "../../../authorize/landingPage/LandingPageDetail/Features/Features";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import LandingHeader from "../../../authorize/landingPage/LandingPageDetail/HeaderPage/LandingHeader/landingHeader";
import SetMealIcon from "@mui/icons-material/SetMeal";
import MedicationIcon from '@mui/icons-material/Medication';
import "./LandingPage.css";

import koi_fish from "../../../../assets/koi3.png";
import fish_market from "../../../../assets/fishmarket.jpg";
import doctor from "../../../../assets/fish-veterinarians-aquarium.jpg";
import car from "../../../../assets/tank_drive.jpg";
import koifishmarket from "../../../../assets/koi_fish_market.png";

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

export default function LandingPage() {
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
      <div className="card-1">
        <div className="koi-img-1">
          <div className="overlay"></div>
          <p className="title">Is Your Fish Sick?</p>
          <p className="subtitle">
            Our Veterinary Facility Is Ready To Help You In Ho Chi Minh City.
          </p>
          <p className="request">Book an Appointment</p>
          <img src={koi_fish} alt="Koi Fish" />
        </div>
      </div>

      <div className="card-1">
        <div className="tittle-center">
          <p className="title">Koi Fish Care Services in Ho Chi Minh City</p>
          <p className="subtitle">
            Koi Fish Care is a premier mobile aquatic care service, offering top-notch care and invaluable support to fish and dedicated fish owners. We turn fish keepers into skilled aquatic parents, helping fish remain healthy, stress-free, and enjoy an excellent quality of life.
          </p>
        </div>
        <div className="container-1-customer">
          <img src={koifishmarket} />
          <div className="box-customer">
            <p className="title">News and Information</p>
            <p className="subtitle">
              Recently, fishkeeping has become increasingly popular in Vietnam, attracting many enthusiasts. The demand for unique and beautiful fish has risen, creating a new trend in leisure activities and interior decoration. Numerous groups and forums about fishkeeping have appeared on social media, where people share care tips and connect with fellow hobbyists. Additionally, specialized stores selling fish, equipment, and accessories have become more diverse and are growing rapidly.
            </p>
          </div>
        </div>
      </div>
      <Features />
      <div className="card-3">
        <div className="container-2-customer">
          <div className="box">
            <p className="title">Meet Your Fish Doctor!</p>
            <p className="subtitle">
              An aquatic veterinarian specializes in the health and care of aquatic animals, including fish, amphibians, and marine mammals. Their expertise includes diagnosing and treating diseases, providing preventive care, and ensuring the welfare of these unique animals...
            </p>
            <div className="custom-button-icon">
              <div className="custom-icon">
              <MedicationIcon style={{ width: 25, height: 25 }} />
              </div>
              <div className="custom-cube">
                <span className="custom-side custom-front">Learn more</span>
                <span className="custom-side custom-top">See doctors info</span>
              </div>
            </div>
          </div>
          <img src={doctor} />
        </div>
      </div>

      <div className="card-4">
        <div className="container-3">
          <img src={car} />
          <div className="box">
            <p className="title">Let Us Come To You</p>
            <p className="subtitle">
              We are a fully-equipped veterinary clinic ready to help you ease the pressure of keeping your fish healthy. Our specialized services go far beyond what traditional veterinarians offer and are tailored specifically to handle all types of fish...
            </p>
            <div className="custom-button-icon">
              <div className="custom-icon">
              <MedicationIcon style={{ width: 25, height: 25 }} />
              </div>
              <div className="custom-cube">
                <span className="custom-side custom-front">Learn more</span>
                <span className="custom-side custom-top">
                  See services
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider />
    </div>
  );
}
