import React, { useState } from "react";
import { Modal, Button, Divider } from "@mui/material";
// import AppAppBar from "../../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
import LoadingFish from "../../../assets/videoModal/LoadingFish.json";
import Lottie from "lottie-react";

import "./guestService.css";
import { useNavigate } from "react-router-dom";

export default function Service() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div>
      {/* <AppAppBar /> */}
      <section className="articles">
        {/* Aquatic Veterinary */}
        <article onClick={handleOpenModal}>
          <div className="article-wrapper">
            <figure>
              <img
                src="https://cafishvet.com/wp-content/uploads/2024/09/Water-Treatment-Jessie-Sanders-Fish-Vetranarian-1320x880.jpg"
                alt="Aquatic Veterinary"
              />
            </figure>
            <div className="article-body">
              <h2>Koi Fish Veterinary</h2>
              <p>
                All our services are provided at the tank or pond. We charge a
                small fee for clients outside Santa Cruz County. Estimates are
                available upon request...
              </p>
              <a href="#" className="read-more">
                Learn more{" "}
                <span className="sr-only">about this is some title</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        {/* Fish Surgery */}
        <article onClick={handleOpenModal}>
          <div className="article-wrapper">
            <figure>
              <img
                src="https://cafishvet.com/wp-content/uploads/2020/10/Fish-Surgery-1.jpg"
                alt="Fish Surgery"
              />
            </figure>
            <div className="article-body">
              <h2>Fish Surgery</h2>
              <p>
                Yes, even fish can undergo surgery. From simple wen removals to
                full coelomic cavity openings, our surgical skills are
                exceptional...
              </p>
              <a href="#" className="read-more">
                Learn more{" "}
                <span className="sr-only">about this is some title</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        {/* Aquatic Consult */}
        <article onClick={handleOpenModal}>
          <div className="article-wrapper">
            <figure>
              <img
                src="https://cafishvet.com/wp-content/uploads/2023/01/fish-veterinarians-aquarium-1024x684.jpg"
                alt="Aquatic Consult"
              />
            </figure>
            <div className="article-body">
              <h2>Aquatic Consultation</h2>
              <p>
                We offer consultation services for other veterinarians seeking
                guidance and support for ornamental fish cases...
              </p>
              <a href="#" className="read-more">
                Learn more{" "}
                <span className="sr-only">about this is some title</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        {/* Feeding Service */}
        <article onClick={handleOpenModal}>
          <div className="article-wrapper">
            <figure>
              <img
                src="https://fullserviceaquatics.com/wp-content/uploads/2018/04/feeding-fish-e1522870688277.jpg"
                alt="Feeding Service"
              />
            </figure>
            <div className="article-body">
              <h2>Feeding Service</h2>
              <p>
                We provide professional feeding care for ornamental fish or pond
                fish. This service ensures that your fish receive the right type
                and amount of food...
              </p>
              <a href="#" className="read-more">
                Learn more{" "}
                <span className="sr-only">about this is some title</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </article>

        {/* Modal for login notification */}
        <Modal open={open} onClose={handleCloseModal}>
          <div className="modal-content">
            <h2>Login required to experience the service!</h2>
            <Lottie animationData={LoadingFish} />
            <Divider />
            <div className="modal-actions">
              <Button
                className="login-button"
                variant="contained"
                color="primary"
                onClick={handleLoginClick}
              >
                Login
              </Button>
              <Button
                className="cancel-button"
                variant="outlined"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
}
