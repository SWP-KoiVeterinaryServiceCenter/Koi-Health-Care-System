import React from "react";
import "./aboutUs.css";
import AppAppBar from "../../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
import Footer from "../../authorize/landingPage/LandingPageDetail/Footer/Footer";
// import koiImage from "../../assets/koi.jpg"; // Assume you have koi fish images in the assets folder
// import teamImage from "../../assets/team.jpg"; // Assume you have a team/character image here

import Ultrasound from "../../../assets/Ultrasound.png";
import fishveterinarians from "../../../assets/fishveterinarians.png";
import { Divider } from "@mui/material";

const AboutUs = () => {
  return (
    <div>
      <AppAppBar />
      <div className="aboutus__container">
        <section className="aboutus__intro">
          <h1>About Us</h1>
          <p>
            Welcome to [Your Company Name], where we are passionate about Koi
            fish! We have been dedicated to providing top-quality Koi fish care
            services and products for over a decade. Our mission is to ensure
            the well-being of these beautiful creatures while educating our
            clients on proper Koi care.
          </p>
        </section>

        <section className="aboutus__koi-mission">
          <div className="aboutus__content">
            <div className="aboutus__text">
              <h2>Our Mission</h2>
              <p>
                Our mission is to promote the health and beauty of Koi fish by
                offering the best care and services available. We believe that
                Koi fish bring peace and tranquility to their surroundings, and
                we strive to ensure they live long, healthy lives.
              </p>
            </div>
            <div className="aboutus__image">
              <img src={Ultrasound} alt="Koi Fish" />
            </div>
          </div>
        </section>

        <section className="aboutus__values">
          <h2>Our Values</h2>
          <ul>
            <li>Commitment to Koi health and welfare</li>
            <li>Respect for nature and sustainable practices</li>
            <li>Client education and satisfaction</li>
            <li>Integrity in all our services</li>
          </ul>
        </section>

        <section className="aboutus__team">
          <h2>Meet Our Team</h2>
          <div className="aboutus__content">
            <div className="aboutus__image">
              <img src={fishveterinarians} alt="Our Team" />
            </div>
            <div className="aboutus__text">
              <p>
                Our team consists of experienced Koi caretakers, veterinarians,
                and enthusiasts who are all dedicated to providing the highest
                level of care for your Koi. We treat each Koi as if they were
                our own, ensuring their health and happiness.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Divider />
      <Footer />
    </div>
  );
};

export default AboutUs;
