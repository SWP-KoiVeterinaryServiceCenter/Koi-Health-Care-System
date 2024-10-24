import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  Modal,
  Button,
} from "@mui/material";
import {
  getAllServicesTypeThunk,
  deleteServicesTypeThunk,
} from "../../../../store/apiThunk/serviceKoiThunk";
import { allServicesTypeSelector } from "../../../../store/sellectors";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import bgImage from "../../../../assets/koibg_account.jpg";
import "./serviceType.css";
import Lottie from "lottie-react"; // Import Lottie
import ConfirmModal from "../../../..//assets/videoModal/Confirm.json"; // Import animation JSON
import WarnModal from "../../../..//assets/videoModal/Warn2.json"; // Import animation JSON

const ServiceType = (props) => {
  const dispatch = useDispatch();
  const services = useSelector(allServicesTypeSelector);
  const direction = props.direction;
  const navigate = useNavigate();

  // State để quản lý modal confirm và loading
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openLoadingModal, setOpenLoadingModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null); // ID của dịch vụ đang được chọn để xóa
  const [animationComplete, setAnimationComplete] = useState(false); // Quản lý trạng thái hoàn tất animation

  useEffect(() => {
    dispatch(getAllServicesTypeThunk());
  }, [dispatch]);

  // Mở modal xác nhận xóa
  const handleOpenConfirmModal = (typeId) => {
    setSelectedServiceId(typeId);
    setOpenConfirmModal(true);
  };

  // Đóng modal xác nhận xóa
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setSelectedServiceId(null);
  };

  // Xử lý xác nhận xóa
  const handleConfirmDelete = () => {
    setOpenConfirmModal(false); // Đóng modal xác nhận
    setOpenLoadingModal(true); // Mở modal loading
    setAnimationComplete(false); // Reset trạng thái animation

    // Gọi dispatch xóa dịch vụ
    dispatch(deleteServicesTypeThunk(selectedServiceId)).then(() => {
      // Sau khi xóa thành công, đóng modal loading sau khi animation chạy hết
      setTimeout(() => {
        setOpenLoadingModal(false);
        dispatch(getAllServicesTypeThunk());
      }, 800); // Giữ modal mở thêm 3 giây sau khi hoàn thành animation
    });
  };

  return (
    <div>
      <Box
        minHeight="40vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <Typography
              variant="h1"
              color="#F7FBFC"
              sx={{
                marginTop: "-48px",
                marginBottom: "8px",
                fontSize: 40,
                fontWeight: "900",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                borderRadius: "4px",
                WebkitTextStroke: "1px black",
                display: "inline-block",
                fontFamily: "Helvetica",
              }}
            >
              SERVICE TYPE
            </Typography>

            <Typography
              variant="body1"
              color="black"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              Account management system, which allows admin to manage their
              accounts.
            </Typography>
          </Grid>
        </Container>
      </Box>

      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -9,
          mb: 4,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: (theme) => theme.shadows[24],
        }}
      >
        <div className="createButtonWrapper" style={{ float: "right" }}>
          <button
            className="createButton"
            onClick={() => navigate(`/${direction}/createServiceType`)}
          >
            <i className="createAnimation"></i>CREATE
            <i className="createAnimation"></i>
          </button>
        </div>

        <Grid container spacing={2} justifyContent="center" marginTop={5}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={3} key={service.typeId}>
              <div className="flipCardComponent">
                <div className="flipCardComponent-inner">
                  <div
                    className="flipCardComponent-front"
                    style={{
                      backgroundImage:
                        "url('https://i.pinimg.com/enabled_hi/564x/5e/e2/6b/5ee26bb99b59d86e722660d2efc9f401.jpg')",
                    }}
                  >
                    <p style={{ fontSize: 20 }}>{service.typeName}</p>
                  </div>
                  <div
                    className="flipCardComponent-back"
                    style={{
                      backgroundImage:
                        "url('https://i.pinimg.com/736x/95/6d/f5/956df5e4c3a793e137d2de5939fd5cea.jpg",
                    }}
                  >
                    <div className="customButtonWrapper">
                      <button
                        className="customButton"
                        onClick={() => handleOpenConfirmModal(service.typeId)}
                      >
                        <i className="customAnimation"></i>DELETE
                        <i className="customAnimation"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Card>

      {/* Modal xác nhận xóa */}
      <Modal
        open={openConfirmModal}
        onClose={handleCloseConfirmModal}
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="confirm-delete-title" variant="h6" component="h2">
            Confirm Delete
          </Typography>

          <Typography id="confirm-delete-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this service?
          </Typography>
          <Lottie animationData={WarnModal} />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseConfirmModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleConfirmDelete}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Modal loading với Lottie */}
      <Modal
        open={openLoadingModal}
        aria-labelledby="loading-title"
        aria-describedby="loading-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 200,
            height: 200,
          }}
        >
          {/* Thay CircularProgress bằng Lottie */}
          <Lottie
            animationData={ConfirmModal}
            loop={false}
            onComplete={() => setAnimationComplete(true)} // Xác định khi animation chạy hết
          />
        </Box>
      </Modal>

      <Box pt={6} px={1} mt={6} sx={{ color: "black", background: "#ebe2e1" }}>
        <Footer />
      </Box>
    </div>
  );
};

export default ServiceType;
