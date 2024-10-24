import React, { useState, useEffect } from "react";
import "./guestDoctorNews.css"; // Import CSS for News component
// import AppAppBar from "../../../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
import { Modal, Button, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { totalVetsDetailsSelector } from "../../../store/sellectors";
import { getTotalVetsDetailThunk } from "../../../store/apiThunk/userThunk";
import LoadingFish from "../../../assets/videoModal/LoadingFish.json";
import Lottie from "lottie-react";
import noImageDoctor from "../../../assets/ifnoimageDoctor.jpg"; // Import ảnh mặc định
import LandingHeader from "../../authorize/landingPage/LandingPageDetail/HeaderPage/LandingHeader/landingHeader";

export default function GuestDoctorNews() {
  const doctors = useSelector(totalVetsDetailsSelector);
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(getTotalVetsDetailThunk());
  }, [dispatch]);

  return (
    <div>
      <LandingHeader />
      <div className="news-wrap-guestDoctor">
        {doctors?.map((doctor) => (
          <div className="news-box-guestDoctor" key={doctor.accountId}>
            <div className="news-box-top-guestDoctor">
              <img
                className="news-box-image-guestDoctor"
                src={doctor.profileImage ? doctor.profileImage : noImageDoctor}
                alt={doctor.username}
              />
              <div className="news-title-flex-guestDoctor">
                <h3 className="news-box-title-guestDoctor">
                  {doctor.username}
                </h3>
              </div>
            </div>
            <a onClick={handleOpenModal} className="news-button-guestDoctor">
              See More
            </a>
          </div>
        ))}
      </div>
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
    </div>
  );
}
