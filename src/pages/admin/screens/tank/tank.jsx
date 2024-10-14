import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Grid, Typography, Card, Modal, Button } from "@mui/material";
import { getAllTanksThunk, deleteTankThunk } from "../../../../store/apiThunk/tankKoiThunk"; // Import thunk xóa
import { allTanksSelector } from "../../../../store/sellectors";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import bgImage from "../../../../assets/koibg_account.jpg";
import "./tank.css"; // Assuming the isolated styles for the card component
import Lottie from "lottie-react"; // Import Lottie
import ConfirmModal from "../../../../assets/videoModal/Confirm.json"; // Import animation JSON
import WarnModal from "../../../../assets/videoModal/Warn2.json"; // Import animation JSON
const Tank = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tanks = useSelector(allTanksSelector);
  const direction = props.direction;
  
  const [openConfirmModal, setOpenConfirmModal] = useState(false); // State quản lý modal xác nhận
  const [openLoadingModal, setOpenLoadingModal] = useState(false); // State quản lý modal loading
  const [selectedTankId, setSelectedTankId] = useState(null); // State quản lý tank được chọn để xóa
  const [animationComplete, setAnimationComplete] = useState(false); // Quản lý trạng thái hoàn tất animation

  useEffect(() => {
    dispatch(getAllTanksThunk()); // Gọi API lấy tất cả tanks khi component mount
  }, [dispatch]);

  // Mở modal xác nhận xóa
  const handleOpenConfirmModal = (tankId) => {
    setSelectedTankId(tankId);
    setOpenConfirmModal(true);
  };

  // Đóng modal xác nhận
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
    setSelectedTankId(null);
  };

  // Xử lý xác nhận xóa
  const handleConfirmDelete = () => {
    setOpenConfirmModal(false); // Đóng modal xác nhận
    setOpenLoadingModal(true); // Mở modal loading
    setAnimationComplete(false); // Reset trạng thái animation

    // Dispatch để xóa tank
    dispatch(deleteTankThunk(selectedTankId)).then(() => {
      // Sau khi xóa thành công, giữ modal thêm 3 giây để animation chạy hết
      setTimeout(() => {
        setOpenLoadingModal(false);
        dispatch(getAllTanksThunk()); // Tải lại dữ liệu
      }, 3000); // Giữ modal thêm 3 giây
    });
  };

  return (
    <div>
      <>
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
            <Grid
              container
              item
              xs={12}
              lg={7}
              justifyContent="center"
              mx="auto"
            >
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
                TANK MANAGEMENT
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
          <div className="gooeyButtonComponent">
            <button className="c-button c-button--gooey" onClick={() => navigate(`/${direction}/createTank`)}>
              Create Tank
              <div className="c-button__blobs">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              style={{ display: "block", height: 0, width: 0 }}
            >
              <defs>
                <filter id="goo">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="10"
                    result="blur"
                  ></feGaussianBlur>
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                    result="goo"
                  ></feColorMatrix>
                  <feBlend in="SourceGraphic" in2="goo"></feBlend>
                </filter>
              </defs>
            </svg>
          </div>
          <Grid container spacing={3} sx={{marginTop:10}}>
            {tanks && tanks.length > 0 ? (
              tanks.map((tank) => (
                <Grid item xs={12} sm={6} md={4} key={tank.tankId}>
                  <div className="cardComponent-parent">
                    <div className="cardComponent-card">
                      <div className="cardComponent-content-box">
                        <span className="cardComponent-card-title">
                          {tank.tankName}
                        </span>
                        <p className="cardComponent-card-content">
                          {tank.tankStatus}
                        </p>
                        <span className="cardComponent-see-more" onClick={() => handleOpenConfirmModal(tank.tankId)}>
                          DELETE
                        </span>
                      </div>
                      <div className="cardComponent-date-box">
                        <span className="cardComponent-month">Capacity</span>
                        <span className="cardComponent-date">
                          {tank.tankCapacity}
                        </span>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))
            ) : (
              <Typography variant="body1" textAlign="center" mt={2}>
                No tanks available.
              </Typography>
            )}
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
              Are you sure you want to delete this tank?
            </Typography>
            <Lottie
              animationData={WarnModal}
           
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" onClick={handleCloseConfirmModal}>
                Cancel
              </Button>
              <Button variant="contained" color="secondary" onClick={handleConfirmDelete}>
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

        <Box
          pt={6}
          px={1}
          mt={6}
          sx={{ color: "black", background: "#ebe2e1" }}
        >
          <Footer />
        </Box>
      </>
    </div>
  );
};

export default Tank;
