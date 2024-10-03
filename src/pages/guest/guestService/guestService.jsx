import React, { useState } from "react";
import { Modal, Button, Divider } from "@mui/material";
import AppAppBar from "../../authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
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
      <AppAppBar />
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
              <h2>Thú Y Cá KoI</h2>
              <p>
                Tất cả các dịch vụ của chúng tôi đều được cung cấp tại bể hoặc
                ao. Chúng tôi tính một khoản phí nhỏ cho những khách hàng ở bên
                ngoài Quận Santa Cruz. Có thể ước tính theo yêu cầu...
              </p>
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
              <h2>Phẫu thuật cá</h2>
              <p>
                Vâng, ngay cả cá cũng có thể phẫu thuật. Từ việc cắt bỏ wen đơn
                giản đến khoang coelomic mở hoàn toàn, kỹ năng phẫu thuật của
                chúng tôi là đặc biệt...
              </p>
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
              <h2>Tư vấn thủy sinh</h2>
              <p>
                Chúng tôi cung cấp dịch vụ tư vấn cho các chuyên gia thú y khác
                đang tìm kiếm sự hướng dẫn và hỗ trợ cho các trường hợp cá
                cảnh...
              </p>
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
              <h2>Dịch vụ cho ăn</h2>
              <p>
                Chúng tôi cung cấp dịch vụ chăm sóc thức ăn chuyên nghiệp cho cá
                cảnh hoặc cá ao. Dịch vụ này đảm bảo rằng cá của bạn nhận được
                đúng loại và lượng thức ăn...
              </p>
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

        {/* Modal thông báo cần đăng nhập */}
        <Modal open={open} onClose={handleCloseModal}>
          <div className="modal-content">
            <h2>Cần đăng nhập để trải nghiệm dịch vụ!</h2>
            <Lottie animationData={LoadingFish}/>
            <Divider />
            <div className="modal-actions">
             
              <Button
                className="login-button"
                variant="contained"
                color="primary"
                onClick={handleLoginClick}
              >
                Đăng nhập
              </Button>
              <Button
                className="cancel-button"
                variant="outlined"
                onClick={handleCloseModal}
              >
                Hủy
              </Button>
            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
}
