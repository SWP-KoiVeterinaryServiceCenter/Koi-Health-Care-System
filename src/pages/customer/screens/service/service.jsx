import React from "react";
import "./service.css";
import Ultrasound from "../../../../assets/Ultrasound.png";
import fishveterinarians from "../../../../assets/fishveterinarians.png";
import medicine from "../../../../assets/medicine.png";
// import AppAppBar from "../../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
// import Footer from "../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import { Divider } from "@mui/material";
import "./service.css";

import { useNavigate, Outlet } from "react-router-dom";

export default function Service(props) {
  const navigate = useNavigate();
  const direction = props.direction;
  const handleServiceInformationClick = () => {
    navigate(`/${direction}/serviceInformation`);
  };

  return (
    <section className="articles">
 
      <article>
        <div className="article-wrapper">
          <figure>
            <img
              src="https://cafishvet.com/wp-content/uploads/2024/09/Water-Treatment-Jessie-Sanders-Fish-Vetranarian-1320x880.jpg"
              alt=""
            />
          </figure>
          <div className="article-body">
            <h2>Aquatic Veterinary </h2>
            <p>
              All of our services are delivered tank or pond side. We charge a
              small mileage fee for clients outside of Santa Cruz County.
              Estimates are available upon request. Our Ideal Client is one who
              is ready to learn and understands that pet fish deserve the same
              care and compassion as other pets. Our service strives to provide
              high level pet fish owner education and instills confidence in
              keeping pet fish happy and healthy.
            </p>
            <a href="#" className="read-more">
              Read more{" "}
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

      <article>
        <div className="article-wrapper">
          <figure>
            <img
              src="https://cafishvet.com/wp-content/uploads/2020/10/Fish-Surgery-1.jpg"
              alt=""
            />
          </figure>
          <div className="article-body">
            <h2>Fish Surgery</h2>
            <p>
              Yes, even fish can undergo surgery. From a simple wen trim to a
              fully open coelomic cavity, our surgical skills are exceptional.
              Our chief veterinarian, Dr. Sanders, has developed specialty
              skills in fish surgery. For an example of her surgical skill,
              please see this video of an abdominal tumor removal. We also have
              a post on Fish Surgery FAQs. We also offer cryotherapy for skin
              ailments.
            </p>
            <a href="#" className="read-more">
              Read more{" "}
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

      <article>
        <div className="article-wrapper">
          <figure>
            <img
              src="https://cafishvet.com/wp-content/uploads/2023/01/fish-veterinarians-aquarium-1024x684.jpg"
              alt=""
            />
          </figure>
          <div className="article-body">
            <h2>Aquatic Consult</h2>
            <p>
              We offer consultation services to other veterinary professionals
              looking for guidance and assistance with pet fish cases. We are
              here to help virtually demonstrate diagnostic techniques,
              interpret diagnostics, differentiate diagnoses and develop
              treatment plans. This product is only available to veterinary
              professionals whose licensing and employment can be verified.
            </p>
            <a href="#" className="read-more">
              Read more{" "}
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
    </section>
  );
}
