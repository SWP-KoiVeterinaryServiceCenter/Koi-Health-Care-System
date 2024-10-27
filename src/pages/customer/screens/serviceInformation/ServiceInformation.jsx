import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserAppointmentsThunk } from "../../../../store/apiThunk/appointment";
import { getUserDataThunk } from "../../../../store/apiThunk/userThunk";
import {
  deleteAppointmentsThunk,
  cancelAppointmentsThunk,
} from "../../../../store/apiThunk/appointment";
import { currentappointmentSelector } from "../../../../store/sellectors";
import { userDataSelector } from "../../../../store/sellectors";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import SettingsIcon from "@mui/icons-material/Settings";
import { Modal, CircularProgress } from "@mui/material";
import LoadingFish from "../../../../assets/videoModal/loading.json";
import Lottie from "lottie-react";

import "./ServiceInformation.css";

const ServiceInformation = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentAppointments = useSelector(currentappointmentSelector);
  const currentAccounts = useSelector(userDataSelector);
  const direction = props.direction;

  const [activeMenuCardId, setActiveMenuCardId] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for page loading
  const [actionLoading, setActionLoading] = useState(false); // Loading state for Reject and Delete actions
  const menuRef = useRef(null);

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    dispatch(getCurrentUserAppointmentsThunk())
      .then(() => setLoading(false)) // Set loading to false when data is fetched
      .catch(() => setLoading(false));
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

  const handleCheckout = (appointmentId, price) => {
    navigate(
      `/customer/serviceInformation/inputPayment?appointmentId=${appointmentId}&amount=${price}`
    );
  };

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case "PENDING":
        return "#FFE41E";
      case "CONFIRMED":
        return "#4CAF50";
      case "MISSED":
        return "#A30B2E";
      case "CANCELLED":
        return "#0A3161";
      case "FINISHED":
        return "#A908B5";
      default:
        return "#000000";
    }
  };

  const handleSettingsClick = (id) => {
    setActiveMenuCardId((prevId) => (prevId === id ? null : id));
  };

  const handleCancelAppointment = (appointmentId) => {
    setActionLoading(true); // Start loading before the action
    dispatch(cancelAppointmentsThunk(appointmentId))
      .unwrap()
      .then(() => {
        dispatch(getCurrentUserAppointmentsThunk()).finally(() => {
          setActionLoading(false); // End loading after the action
        });
      })
      .catch((error) => {
        console.error("Error cancelling appointment:", error);
        alert("Could not cancel the appointment. Please try again.");
        setActionLoading(false); // End loading if there's an error
      });
  };

  const handleDeleteAppointment = (appointmentId) => {
    setActionLoading(true); // Start loading before the action
    dispatch(deleteAppointmentsThunk(appointmentId))
      .unwrap()
      .then(() => {
        dispatch(getCurrentUserAppointmentsThunk()).finally(() => {
          setActionLoading(false); // End loading after the action
        });
      })
      .catch((error) => {
        console.error("Error deleting appointment:", error);
        alert("Could not delete the appointment. Please try again.");
        setActionLoading(false); // End loading if there's an error
      });
  };

  // const handleFeedback = (appointmentId) => {
  //   navigate(`/feedback?appointmentId=${appointmentId}`);
  // };

  return (
    <div className="checkout-container">
      {/* Show loading modal when fetching data or performing actions */}
      {loading || actionLoading ? (
        <Modal open={loading || actionLoading} onClose={() => {}}>
          <div className="modal-loading">
            <p>It will take a while to load, please wait.</p>
            <Lottie animationData={LoadingFish} />
            <p>Loading...</p>
          </div>
        </Modal>
      ) : (
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
                        <p>Service: {appointment.serviceName}</p>
                        <p>Doctor: {appointment.vetName}</p>
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
                          <span>Service fee:</span>
                          <span style={{ marginRight: 20 }}>
                            {appointment.serviceFee}đ
                          </span>
                          <span>Travel fee:</span>
                          <span style={{ marginRight: 20 }}>
                            {appointment.travelFee}đ
                          </span>
                        </div>
                        <hr className="custom-divider" />
                        <div className="payment-details">
                          <span>Total:</span>
                          <span style={{ marginRight: 20 }}>
                            {appointment.price}đ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="checkout-card checkout-footer">
                    <div className="footer-details">
                      <label className="checkout-price">
                        {appointment.price} vnđ
                      </label>

                    
                      {!(["CANCELLED", "MISSED", "FINISHED", "CONFIRMED"].includes(appointment.status.toUpperCase())) && (
                        <button
                          className="checkout-button"
                          onClick={() =>
                            handleCheckout(appointment.id, appointment.price)
                          }
                        >
                          Check Out
                        </button>
                      )}
                    </div>
                  </div> */}

                  {/* <div className="checkout-card checkout-footer">
                    <div
                      className={`footer-details ${appointment.status.toUpperCase()}`}
                    >
                      <label className="checkout-price">
                        {appointment.price} vnđ
                      </label>

                      {![
                        "CANCELLED",
                        "MISSED",
                        "FINISHED",
                        "CONFIRMED",
                      ].includes(appointment.status.toUpperCase()) && (
                        <button
                          className="checkout-button"
                          onClick={() =>
                            handleCheckout(appointment.id, appointment.price)
                          }
                        >
                          Check Out
                        </button>
                      )}
                    </div>
                  </div> */}

                  <div className="checkout-card checkout-footer">
                    <div
                      className={`footer-details ${appointment.status.toUpperCase()}`}
                    >
                      <label className="checkout-price">
                        {appointment.price} vnđ
                      </label>

                      {appointment.status.toUpperCase() === "FINISHED" ? (
                        <button
                          className="feedback-button-1"
                          onClick={() => {
                            console.log(appointment.id);
                            navigate(`/${direction}/feedback`, {
                              state: { appointment: appointment.id },
                            });
                            window.scrollTo(0, 0);
                          }}
                        >
                          Feedback
                        </button>
                      ) : !["CANCELLED", "MISSED", "CONFIRMED"].includes(
                          appointment.status.toUpperCase()
                        ) ? (
                        <button
                          className="checkout-button"
                          onClick={() =>
                            handleCheckout(appointment.id, appointment.price)
                          }
                        >
                          Check Out
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>

                {activeMenuCardId === appointment.id && (
                  <div className="menu-overlay" ref={menuRef}>
                    <div className="menu-buttons">
                      {/* Conditionally render Reject button */}
                      {![
                        "CONFIRMED",
                        "MISSED",
                        "CANCELLED",
                        "FINISHED",
                      ].includes(appointment.status.toUpperCase()) && (
                        <button
                          className="cancel-button"
                          onClick={() =>
                            handleCancelAppointment(appointment.id)
                          }
                        >
                          Reject
                        </button>
                      )}
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteAppointment(appointment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No appointments found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceInformation;
