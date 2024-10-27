import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserAppointmentsThunk } from "../../../../store/apiThunk/appointment";
import { getUserDataThunk } from "../../../../store/apiThunk/userThunk";
import {
  deleteAppointmentsThunk,
  cancelAppointmentsThunk,
} from "../../../../store/apiThunk/appointment";
import { currentappointmentSelector, userDataSelector } from "../../../../store/sellectors";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { Modal } from "@mui/material";
import Lottie from "lottie-react";
import LoadingFish from "../../../../assets/videoModal/loading.json";
import "./ServiceInformation.css";

const ServiceInformation = React.memo(({ direction }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentAppointments = useSelector(currentappointmentSelector);
  const currentAccounts = useSelector(userDataSelector);

  const [activeMenuCardId, setActiveMenuCardId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const menuRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([
        dispatch(getCurrentUserAppointmentsThunk()),
        dispatch(getUserDataThunk())
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const handleCheckout = useCallback((appointmentId, price) => {
    navigate(
      `/customer/serviceInformation/inputPayment?appointmentId=${appointmentId}&amount=${price}`
    );
  }, [navigate]);

  const getStatusColor = useMemo(() => (status) => {
    const colors = {
      PENDING: "#FFE41E",
      CONFIRMED: "#4CAF50",
      MISSED: "#A30B2E",
      CANCELLED: "#0A3161",
      FINISHED: "#A908B5"
    };
    return colors[status.toUpperCase()] || "#000000";
  }, []);

  const handleSettingsClick = useCallback((id) => {
    setActiveMenuCardId((prevId) => (prevId === id ? null : id));
  }, []);

  const handleAppointmentAction = useCallback(async (actionThunk, appointmentId) => {
    try {
      setActionLoading(true);
      await dispatch(actionThunk(appointmentId)).unwrap();
      await dispatch(getCurrentUserAppointmentsThunk());
    } catch (error) {
      console.error(`Error performing action on appointment:`, error);
      alert(`Could not perform the action. Please try again.`);
    } finally {
      setActionLoading(false);
    }
  }, [dispatch]);

  const handleCancelAppointment = useCallback((appointmentId) => {
    handleAppointmentAction(cancelAppointmentsThunk, appointmentId);
  }, [handleAppointmentAction]);

  const handleDeleteAppointment = useCallback((appointmentId) => {
    handleAppointmentAction(deleteAppointmentsThunk, appointmentId);
  }, [handleAppointmentAction]);

  const renderAppointmentCard = useCallback((appointment) => (
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
                  navigate(`/${direction}/feedback`, {
                    state: { appointment: appointment.id },
                  });
                  window.scrollTo(0, 0);
                }}
              >
                FEEDBACK
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
                CHECKOUT
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {activeMenuCardId === appointment.id && (
        <div className="menu-overlay" ref={menuRef}>
          <div className="menu-buttons">
            {!["CONFIRMED", "MISSED", "CANCELLED", "FINISHED"].includes(
              appointment.status.toUpperCase()
            ) && (
              <button
                className="cancel-button"
                onClick={() => handleCancelAppointment(appointment.id)}
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
  ), [activeMenuCardId, currentAccounts.location, direction, getStatusColor, handleCancelAppointment, handleCheckout, handleDeleteAppointment, handleSettingsClick, menuRef, navigate]);

  return (
    <div className="checkout-container">
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
            currentAppointments.map(renderAppointmentCard)
          ) : (
            <p>No appointments found.</p>
          )}
        </div>
      )}
    </div>
  );
});

export default ServiceInformation;