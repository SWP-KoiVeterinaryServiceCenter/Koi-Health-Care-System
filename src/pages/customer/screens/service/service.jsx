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
      {/* ////////////////////////////////Aquatic Veterinary ////////////////////////////////// */}
      <article
     onClick={() => navigate(`/${direction}/createKoiFishAppointment`)}
      >
        <div className="article-wrapper">
          <figure>
            <img
              src="https://cafishvet.com/wp-content/uploads/2024/09/Water-Treatment-Jessie-Sanders-Fish-Vetranarian-1320x880.jpg"
              alt=""
            />
          </figure>
          <div className="article-body">
            <h2>Thú Y Cá KoI</h2>
            <p>
              Tất cả các dịch vụ của chúng tôi đều được cung cấp tại bể hoặc ao.
              Chúng tôi tính một khoản phí nhỏ cho những khách hàng ở bên ngoài
              Quận Santa Cruz. Có thể ước tính theo yêu cầu. Khách hàng lý tưởng
              của chúng tôi là người sẵn sàng học hỏi và hiểu rằng cá cảnh xứng
              đáng được chăm sóc và yêu thương như những loài vật nuôi khác.
              Dịch vụ của chúng tôi cố gắng cung cấp giáo dục cho chủ sở hữu cá
              cảnh ở trình độ cao và tạo sự tự tin trong việc giữ cho cá cảnh
              luôn vui vẻ và khỏe mạnh.
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
      {/* ////////////////////////////////Fish Surger ////////////////////////////////// */}
      <article>
        <div className="article-wrapper">
          <figure>
            <img
              src="https://cafishvet.com/wp-content/uploads/2020/10/Fish-Surgery-1.jpg"
              alt=""
            />
          </figure>
          <div className="article-body">
            <h2>Phẫu thuật cá</h2>
            <p>
              Vâng, ngay cả cá cũng có thể phẫu thuật. Từ việc cắt bỏ wen đơn
              giản đến khoang coelomic mở hoàn toàn, kỹ năng phẫu thuật của
              chúng tôi là đặc biệt. Bác sĩ thú y trưởng của chúng tôi, Tiến sĩ
              Sanders, đã phát triển các kỹ năng chuyên khoa trong phẫu thuật
              cá. Để biết ví dụ về kỹ năng phẫu thuật của cô ấy, vui lòng xem
              video này về việc cắt bỏ khối u bụng. Chúng tôi cũng có một bài
              đăng trên Câu hỏi thường gặp về phẫu thuật cá. Chúng tôi cũng cung
              cấp liệu pháp đông lạnh cho các bệnh về da
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
      {/* ////////////////////////////////Aquatic Consult ////////////////////////////////// */}
      <article>
        <div className="article-wrapper">
          <figure>
            <img
              src="https://cafishvet.com/wp-content/uploads/2023/01/fish-veterinarians-aquarium-1024x684.jpg"
              alt=""
            />
          </figure>
          <div className="article-body">
            <h2>Tư vấn thủy sinh</h2>
            <p>
              Chúng tôi cung cấp dịch vụ tư vấn cho các chuyên gia thú y khác
              đang tìm kiếm sự hướng dẫn và hỗ trợ cho các trường hợp cá cảnh.
              Chúng tôi ở đây để giúp trình diễn trực tuyến các kỹ thuật chẩn
              đoán, giải thích chẩn đoán, phân biệt chẩn đoán và phát triển các
              kế hoạch điều trị. Sản phẩm này chỉ dành cho các chuyên gia thú y
              có giấy phép và việc làm có thể được xác minh.
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
      {/* ////////////////////////////////Feeding service ////////////////////////////////// */}
      <article>
        <div className="article-wrapper">
          <figure>
            <img
              src="https://fullserviceaquatics.com/wp-content/uploads/2018/04/feeding-fish-e1522870688277.jpg"
              alt=""
            />
          </figure>
          <div className="article-body">
            <h2>Dịch vụ cho ăn</h2>
            <p>
              Chúng tôi cung cấp dịch vụ chăm sóc thức ăn chuyên nghiệp cho cá
              cảnh hoặc cá ao. Dịch vụ này đảm bảo rằng cá của bạn nhận được
              đúng loại và lượng thức ăn theo lịch trình thường xuyên, phù hợp
              với nhu cầu chế độ ăn uống cụ thể của chúng. Dịch vụ này thúc đẩy
              sức khỏe, sự phát triển và màu sắc rực rỡ tối ưu trong khi vẫn duy
              trì môi trường sạch sẽ và cân bằng sinh học trong bể cá hoặc ao.
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
    </section>
  );
}
