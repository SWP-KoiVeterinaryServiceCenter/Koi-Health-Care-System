import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserAppointmentsThunk } from "../../../../store/apiThunk/appointment";
import { getUserDataThunk } from "../../../../store/apiThunk/userThunk";
import { currentappointmentSelector } from "../../../../store/sellectors";
import { userDataSelector } from "../../../../store/sellectors";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import SettingsIcon from "@mui/icons-material/Settings";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ServiceInformation.css";

const ServiceInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const currentAppointments = useSelector(currentappointmentSelector);
  const currentAccounts = useSelector(userDataSelector);

  const [activeMenuCardId, setActiveMenuCardId] = useState(null);
  const menuRef = useRef(null);
  console.log(currentAppointments);

  useEffect(() => {
    dispatch(getCurrentUserAppointmentsThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserDataThunk());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuCardId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckout = (appointmentId) => {
    navigate(`/customer/serviceInformation/inputPayment?appointmentId=${appointmentId}`); // Direct navigation with query string
  };
  
  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "#EFD033";
      case "CONFIRMED":
        return "#4CAF50";
      case "MISSED":
        return "#A30B2E";
      case "CANCELLED":
        return "#0A3161";
      default:
        return "#000000";
    }
  };

  const handleSettingsClick = (id) => {
    setActiveMenuCardId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="checkout-container">
      <div className="card-grid" style={{ marginTop: 100 }}>
        {currentAppointments && currentAppointments.length > 0 ? (
          currentAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`checkout-card cart-card ${
                activeMenuCardId === appointment.id ? "blur" : ""
              }`}
            >
              <div className="checkout-card-content">
                <div className="more-icon-container">
                  <SettingsIcon
                    onClick={() => handleSettingsClick(appointment.id)}
                  />
                </div>

                <div className="header-container">
                  <label className="checkout-title" style={{ marginTop: 20 }}>
                    SERVICE INFORMATION
                  </label>
                  <span
                    className="status-label"
                    style={{
                      color: getStatusColor(appointment.status),
                      marginTop: 20,
                    }}
                  >
                    {appointment.status.toUpperCase()}
                  </span>
                </div>
                <hr className="custom-divider" />
                <div className="checkout-steps">
                  <div className="checkout-step">
                    <div>
                      <span>SERVICE</span>
                      <p>Dịch vụ: {appointment.serviceName}</p>
                      <p>Bác sĩ: {appointment.vetName}</p>
                    </div>
                    <hr />
                    <div>
                      <span>KOI FISH</span>
                      <p>{appointment.koiName}</p>
                      <p>Description: {appointment.description}</p>
                      <p>Location: {currentAccounts.location}</p>
                    </div>
                    <hr className="custom-divider" />
                    <div className="checkout-payments">
                      <span>PAYMENT</span>
                      <div className="payment-details">
                        <span>Chi phí (+ Phí phát sinh):</span>
                        <span style={{ marginRight: 20 }}>
                          {appointment.price}đ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="checkout-card checkout-footer">
                  <div className="footer-details">
                    <label className="checkout-price">
                      {appointment.price} vnđ
                    </label>
                    <button
                    className="checkout-button"
                    onClick={() => handleCheckout(appointment.id)} // Điều hướng trực tiếp với URL chứa appointmentId
                  >
                    Check Out
                  </button>
                  </div>
                </div>
              </div>

              {activeMenuCardId === appointment.id && (
                <div className="menu-overlay" ref={menuRef}>
                  <div className="menu-buttons">
                    <button className="cancel-button">Reject</button>
                    <button className="delete-button">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceInformation;
