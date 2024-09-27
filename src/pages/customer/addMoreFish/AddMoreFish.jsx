import React from "react";
import "./AddMoreFish.css";
import AppAppBar from "../../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
import Footer from "../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import { Divider } from "@mui/material";

const AddMoreFish = () => {
  return (
    <div>
      <AppAppBar />
      <div className="add-more-fish">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder="At Least 5 Character" />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input type="text" id="type" />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="text" id="age" />
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="gender">Gender:</label>
          <input type="checkbox" id="gender" />
          <span>Male</span>
          <input type="checkbox" id="gender" />
          <span>Female</span>
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight (kg):</label>
          <input type="number" id="weight" />
        </div>

        <div className="form-group">
          <label htmlFor="length">Length (cm):</label>
          <input type="number" id="length" />
        </div>

        <div className="add-more-fish-button">
          <button class="pushable">
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front"> Add More Fish </span>
          </button>
        </div>
      </div>
      <Divider />
      <Footer />
    </div>
  );
};

export default AddMoreFish;
