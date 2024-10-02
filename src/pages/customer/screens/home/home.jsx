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
// import Features from "../landingPage/LandingPageDetail/Features/Features";
// import Testimonials from "../landingPage/LandingPageDetail/Testimonials/Testimonials";
// import FAQ from "../landingPage/LandingPageDetail/FAQ/FAQ";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
// import CarouselProducts from "../landingPage/LandingPageDetail/CarouselProduct/CarouselProduct";
// import getLPTheme from "./getLPTheme";
import "./LandingPage.css";

import koi_fish from "../../../../assets/koi-fish-1.jpg";
import fish_market from "../../../../assets/fishmarket.jpg";
import doctor from "../../../../assets/doctor.jpg";
import car from "../../../../assets/car.jpg";

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
          <p className="title">
            Dịch vụ Thú Y Thủy Sản là một dịch vụ thú y di động chuyên chăm sóc
            cá cảnh tại TP Hồ Chí Minh.
          </p>
          <p className="subtitle">
            Dịch vụ Thú Y Thủy Sản là cơ sở thú y di động chuyên biệt hàng đầu,
            cung cấp dịch vụ chất lượng cao và giá trị vô hình cho cá và những
            chủ nuôi tận tâm. Chúng tôi biến những người nuôi cá thành những bậc
            phụ huynh thủy sinh am hiểu và có kỹ năng, giúp cá khỏe mạnh, không
            căng thẳng và có chất lượng sống tuyệt vời.
          </p>
        </div>
        <div className="container-1">
          <img src={fish_market} />
          <div className="box">
            <p className="title">
              Thời Sự Thông Tin Về Sở Thích Nuôi Cá Ở Việt Nam
            </p>
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

      <div className="card-3">
        <div className="container-2">
          <div className="box">
            <p className="title">Gặp Gỡ Bác Sĩ Thú Y Cho Cá Của Bạn</p>
            <p className="subtitle">
              Bác sĩ thú y thủy sản chuyên về sức khỏe và chăm sóc các loài động
              vật dưới nước, bao gồm cá, lưỡng cư và động vật có vú biển. Chuyên
              môn của họ bao gồm chẩn đoán và điều trị bệnh, cung cấp chăm sóc
              phòng ngừa và đảm bảo sự phúc lợi cho những loài động vật đặc biệt
              này. Họ thường làm việc trong các môi trường đa dạng như thủy
              cung, trại cá và các tổ chức nghiên cứu. Vai trò của họ bao gồm
              những nhiệm vụ phức tạp như quản lý chất lượng nước, thực hiện
              phẫu thuật và phát triển kế hoạch điều trị cho các loài thủy sinh
              khác nhau. Với sự gia tăng độ phổ biến của thú cưng dưới nước và
              sự mở rộng của các nỗ lực bảo tồn biển, nhu cầu về bác sĩ thú y
              thủy sản có tay nghề đang gia tăng, điều này nhấn mạnh vai trò
              quan trọng của họ trong việc duy trì sức khỏe và phúc lợi cho động
              vật thủy sản.
            </p>
          </div>
          <img src={doctor} />
        </div>
      </div>

      <div className="card-4">
        <div className="container-3">
          <img src={car} />
          <div className="box">
            <p className="title">Chúng Tôi Đến Tại Bể Cá Hoặc Ao Của Bạn</p>
            <p className="subtitle">
              Chúng tôi là một phòng khám thú y được trang bị đầy đủ, sẵn sàng
              giúp bạn giảm bớt áp lực trong việc giữ cho cá của bạn khỏe mạnh.
              Các dịch vụ chuyên biệt của chúng tôi vượt xa những gì mà thú y
              thông thường cung cấp và được điều chỉnh đặc biệt để xử lý tất cả
              các loại cá. Chúng tôi cung cấp dịch vụ tại bể hoặc ao, cùng với
              một loạt các chẩn đoán và điều trị thú y toàn diện. Thông qua các
              đối tác thú y của mình, chúng tôi có thể cung cấp các chẩn đoán
              nâng cao như CT và chụp X-quang. Bất kỳ phẫu thuật cần thiết nào
              cũng sẽ được thực hiện ngay tại bể hoặc ao với sự hỗ trợ của các
              trợ lý thú y tuyệt vời của chúng tôi.
            </p>
          </div>
        </div>
      </div>
      <Divider/>
      <Footer />
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
