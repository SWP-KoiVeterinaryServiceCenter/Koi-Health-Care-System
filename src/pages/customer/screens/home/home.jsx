import * as React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
// import AppAppBar from "../landingPage/LandingPageDetail/AppAppBar/AppAppBar";
// import Hero from "../landingPage/LandingPageDetail/Hero/Hero";

// import LogoCollection from "../landingPage/LandingPageDetail/LogoCollection/LogoCollection";
// import Highlights from "../landingPage/LandingPageDetail/Highlights/Highlights";
// import Pricing from "../landingPage/LandingPageDetail/Pricing/Pricing";
import Features from "../../../authorize/landingPage/LandingPageDetail/Features/Features";
// import Testimonials from "../landingPage/LandingPageDetail/Testimonials/Testimonials";
// import FAQ from "../landingPage/LandingPageDetail/FAQ/FAQ";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
// import CarouselProducts from "../landingPage/LandingPageDetail/CarouselProduct/CarouselProduct";
// import getLPTheme from "./getLPTheme";
import LandingHeader from "../../../authorize/landingPage/LandingPageDetail/HeaderPage/LandingHeader/landingHeader";
import SetMealIcon from "@mui/icons-material/SetMeal"; // Import the SetMealIcon from MUI
import MedicationIcon from '@mui/icons-material/Medication';
import "./LandingPage.css";

import koi_fish from "../../../../assets/koi3.png";
import fish_market from "../../../../assets/fishmarket.jpg";
import doctor from "../../../../assets/fish-veterinarians-aquarium.jpg";
import car from "../../../../assets/tank_drive.jpg";
import koifishmarket from "../../../../assets/koi_fish_market.png";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      {/* <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup> */}
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.bool.isRequired, // Sửa kiểu dữ liệu thành bool
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function LandingPage() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  //   const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <div>
      {/* <AppAppBar mode={mode} toggleColorMode={toggleColorMode} /> */}
      <div className="card-1">
        <div className="koi-img-1">
          <div className="overlay"></div>
          <p className="title">Cá Bạn Bị Bệnh?</p>
          <p className="subtitle">
            Cơ Sở Thú Y Của Chúng Tôi Sẵn Sàng Giúp Đỡ Tại Thành Phố Hồ Chí
            Minh.
          </p>
          <p className="request">Đặt Lịch</p>
          <img src={koi_fish} alt="Koi Fish" />
        </div>
      </div>

      <div className="card-1">
        <div className="tittle-center">
          <p className="title">Dịch vụ chăm sóc cá KOI tại TP Hồ Chí Minh</p>
          <p className="subtitle">
            Dịch vụ Chăm sóc cá Koi là cơ sở chắc sóc cá di động chuyên biệt
            hàng đầu, cung cấp dịch vụ chất lượng cao và giá trị vô hình cho cá
            và những chủ nuôi tận tâm. Chúng tôi biến những người nuôi cá thành
            những bậc phụ huynh thủy sinh am hiểu và có kỹ năng, giúp cá khỏe
            mạnh, không căng thẳng và có chất lượng sống tuyệt vời.
          </p>
        </div>
        <div className="container-1-customer">
          <img src={koifishmarket} />
          <div className="box-customer">
            {/* <p className="title">
              Thời Sự Thông Tin Về Sở Thích Nuôi Cá Ở Việt Nam
            </p> */}
            <p className="title">Thời Sự Thông Tin</p>
            <p className="subtitle">
              Trong thời gian gần đây, việc nuôi cá cảnh ở Việt Nam ngày càng
              trở nên phổ biến và được nhiều người yêu thích. Nhu cầu về các
              loại cá đẹp và độc lạ tăng cao, tạo nên một xu hướng mới trong sở
              thích giải trí và trang trí nội thất. Các hội nhóm và diễn đàn về
              cá cảnh xuất hiện nhiều trên mạng xã hội, chia sẻ kinh nghiệm chăm
              sóc và giao lưu với những người cùng đam mê. Bên cạnh đó, các cửa
              hàng chuyên cung cấp cá cảnh, thiết bị và phụ kiện cũng ngày càng
              đa dạng và phát triển mạnh mẽ.
            </p>
          </div>
        </div>
      </div>
      <Features />
      <div className="card-3">
        <div className="container-2-customer">
          <div className="box">
            <p className="title">Gặp Gỡ Bác Sĩ Cho Cá Của Bạn!!</p>
            <p className="subtitle">
              Bác sĩ thú y thủy sản chuyên về sức khỏe và chăm sóc các loài động
              vật dưới nước, bao gồm cá, lưỡng cư và động vật có vú biển. Chuyên
              môn của họ bao gồm chẩn đoán và điều trị bệnh, cung cấp chăm sóc
              phòng ngừa và đảm bảo sự phúc lợi cho những loài động vật đặc biệt
              này...
            </p>
            {/* ///////////////////////////////////////////////////Nút//////////////////////////////////////////// */}
            <div className="custom-button-icon">
              <div className="custom-icon">
              <MedicationIcon style={{ width: 25, height: 25 }} />
              </div>
              <div className="custom-cube">
                <span className="custom-side custom-front">Tìm hiểu thêm</span>
                <span className="custom-side custom-top">
                  Xem thông tin doctors
                </span>
              </div>
            </div>
          </div>
          <img src={doctor} />
        </div>
      </div>

      <div className="card-4">
        <div className="container-3">
          <img src={car} />
          <div className="box">
            <p className="title">Hãy Để Chúng Tôi Đến Với Bạn</p>
            <p className="subtitle">
              Chúng tôi là một phòng khám thú y được trang bị đầy đủ, sẵn sàng
              giúp bạn giảm bớt áp lực trong việc giữ cho cá của bạn khỏe mạnh.
              Các dịch vụ chuyên biệt của chúng tôi vượt xa những gì mà thú y
              thông thường cung cấp và được điều chỉnh đặc biệt để xử lý tất cả
              các loại cá...
            </p>
            <div className="custom-button-icon">
              <div className="custom-icon">
              <MedicationIcon style={{ width: 25, height: 25 }} />
              </div>
              <div className="custom-cube">
                <span className="custom-side custom-front">Tìm hiểu thêm</span>
                <span className="custom-side custom-top">
                  Xem dịch vụ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider />
    </div>

    // <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
    //   <CssBaseline />

    //   <Hero />

    //   <Box sx={{ bgcolor: "background.default" }}>
    //     {/* <LogoCollection /> */}

    //     <Features />
    //     <CarouselProducts />
    //     <Divider />
    //     {/* <Testimonials /> */}
    //     <Divider />
    //     <Highlights />
    //     <Divider />
    //     <Pricing />
    //     <Divider />
    //     <FAQ />
    //     <Divider />
    //     <Footer />
    //   </Box>
    //   <ToggleCustomTheme
    //     showCustomTheme={showCustomTheme}
    //     toggleCustomTheme={toggleCustomTheme}
    //   />
    // </ThemeProvider>
  );
}
