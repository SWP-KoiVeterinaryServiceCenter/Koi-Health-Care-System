import React, { useState, useEffect } from "react";
import Ultrasound from "../../../../assets/Ultrasound.png";
import fishveterinarians from "../../../../assets/fishveterinarians.png";
import medicine from "../../../../assets/medicine.png";
// import AppAppBar from "../../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
// import Footer from "../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import { Divider } from "@mui/material";
import "./service.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

import { allServicesSelector } from "../../../../store/sellectors";
import { getAllServicesThunk } from "../../../../store/apiThunk/serviceKoiThunk";

// import { getAllServices } from "../../../../api/serviceCenterKoi";

export default function Service(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const direction = props.direction;
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const handleServiceInformationClick = () => {
    navigate(`/${direction}/serviceInformation`);
  };

  const allServices = useSelector(allServicesSelector);
  console.log(allServices);

  useEffect(() => {
    dispatch(getAllServicesThunk()).then(() => setShowLoadingModal(false));
  }, [dispatch]);

  return (
    <>
      <section className="articles_customer">
        {allServices.map((service) => (
          <article
            onClick={() => navigate(`/${direction}/createKoiFishAppointment`)}
            key={service.id}
            loading={showLoadingModal}
          >
            <div className="article-wrapper">
              <figure>
                <img
                  src="https://cafishvet.com/wp-content/uploads/2024/09/Water-Treatment-Jessie-Sanders-Fish-Vetranarian-1320x880.jpg"
                  alt=""
                />
              </figure>
              <div className="article-body-customer" key={service.id}>
                <h2>{service.name} </h2>
                <p className="price">{service.price} VND</p>
                <p>{service.description}</p>
                <a href="#" className="read-more">
                  Tìm hiểu thêm{" "}
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
        ))}
      </section>
      <Divider />
    </>
  );
}
