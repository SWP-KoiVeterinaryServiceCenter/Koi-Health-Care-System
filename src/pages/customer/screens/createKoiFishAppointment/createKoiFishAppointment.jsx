import React, { useState } from "react";
import "./createKoiFishAppointment.css";
// import AppAppBar from "../../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
// import Footer from "../../authorize/landingPage/LandingPageDetail/Footer/Footer";
// import { Divider } from "@mui/material";

const CreateKoiFishAppointment = () => {
  const [koiName, setKoiName] = useState("");
  const [service, setService] = useState("");
  const [doctor, setDoctor] = useState("");

  // Mock data for services and doctors
  const koiNames = [
    { id: 1, name: "Koi 1 " },
    { id: 2, name: "Koi 2" },
    { id: 3, name: "Koi 3" },
  ];

  const services = [
    { id: 1, name: "Grooming" },
    { id: 2, name: "Health Checkup" },
    { id: 3, name: "Spa Treatment" },
  ];

  const doctors = [
    { id: 1, name: "Dr. John Doe" },
    { id: 2, name: "Dr. Jane Smith" },
    { id: 3, name: "Dr. Emily Clarke" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const appointmentData = { koiName, service, doctor };
    console.log("Appointment Created:", appointmentData);
    // You can handle the submission logic here
  };
  return (
    <div>
      {/* <AppAppBar /> */}
      <div>
        <form className="appointment-form" onSubmit={handleSubmit}>
          <label htmlFor="koiName">Koi Name:</label>

          <select
            id="koiName"
            value={koiName}
            onChange={(e) => setKoiName(e.target.value)}
            required
          >
            <option value="">Select a Koi</option>
            {koiNames.map((koiName) => (
              <option key={koiName.id} value={koiName.id}>
                {koiName.name}
              </option>
            ))}
          </select>

          <label htmlFor="service">Service:</label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>

          <label htmlFor="doctor">Doctor:</label>
          <select
            id="doctor"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>

          <button type="submit">Create Appointment</button>
        </form>
      </div>
      {/* <Divider /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default CreateKoiFishAppointment;