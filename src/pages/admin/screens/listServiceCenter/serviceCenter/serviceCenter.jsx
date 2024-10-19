import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Divider, Modal, Button } from "@mui/material";
import "./serviceCenter.css";
import LoadingModal from "../../../../../components/modal/loadingModal/loadingModal";
import { allServicesSelector } from "../../../../../store/sellectors";
import { getAllServicesThunk, deleteServiceCenterThunk } from "../../../../../store/apiThunk/serviceKoiThunk";

export default function Service(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const allServices = useSelector(allServicesSelector);
  const direction = props.direction;

  useEffect(() => {
    dispatch(getAllServicesThunk()).then(() => setShowLoadingModal(false));
  }, [dispatch]);

  // Open delete confirmation modal
  const handleOpenDeleteModal = (serviceId) => {
    setSelectedServiceId(serviceId);
    setShowDeleteModal(true);
  };

  // Close delete confirmation modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedServiceId(null);
  };

  // Confirm delete and dispatch API call
  const handleConfirmDelete = () => {
    dispatch(deleteServiceCenterThunk(selectedServiceId))
      .unwrap()
      .then(() => {

        dispatch(getAllServicesThunk()); // Reload services after deletion
        handleCloseDeleteModal(); // Close modal
      })
      .catch((error) => {
        console.error("Error deleting service:", error);
        alert("Failed to delete service.");
      });
  };

  return (
    <div className="serviceCenter_admin">
      {!showLoadingModal ? (
        <section className="articles_admin">
          {allServices.map((service) => (
            <article className="flip-card" key={service.id}>
              <div className="flip-card-inner">
                {/* Front of the Card */}
                <div className="flip-card-front">
                  <div className="article-wrapper">
                    <figure>
                      <img src={service.serviceImage} alt="service-img" />
                    </figure>
                    <div className="article-body-admin">
                      <h2>{service.name}</h2>
                      <button className="btn-shine" style={{ marginTop: 80 }}>
                        <p className="price">{service.price} đ</p>
                      </button>
                      <p style={{ color: "black", marginBottom: 20 }}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back of the Card */}
                <div className="flip-card-back">
                  <div className="article-body-admin">
                    <h2>Delete Service</h2>
                    <button
                      className="delete-btn"
                      onClick={() => handleOpenDeleteModal(service.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <LoadingModal />
      )}

      <Divider />

      {/* Modal for Confirming Deletion */}
      <Modal
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-content" style={{color:"black"}}>
          <h2 id="modal-title">Confirm Deletion</h2>
          <p id="modal-description">
            Are you sure you want to delete this service? This action cannot be
            undone.
          </p>
          <div className="modal-actions">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
