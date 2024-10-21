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
  getAllTanksThunk,
  deleteTankThunk,
} from "../../../../store/apiThunk/tankKoiThunk"; // Import thunk xóa
import { allTanksSelector } from "../../../../store/sellectors";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import bgImage from "../../../../assets/koibg_account.jpg";
import "./listServiceCenter.css";
import Lottie from "lottie-react"; // Import Lottie
import ConfirmModal from "../../../../assets/videoModal/Confirm.json"; // Import animation JSON
import WarnModal from "../../../../assets/videoModal/Warn2.json"; // Import animation JSON
import Service from "./serviceCenter/serviceCenter";
const listServiceCenter = (props) => {
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
                SERVICE CENTER
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
          <div className="serviceCenter_admin" >\
          <button
            className="serviceCenter_admin-btn"
            onClick={() => navigate(`/${direction}/createServiceCenter`)}
          >
            CREATE
            <div className="serviceCenter_admin-star-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 784.11 815.53"
              >
                <g>
                  <path
                    className="fil0"
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="serviceCenter_admin-star-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 784.11 815.53"
              >
                <g>
                  <path
                    className="fil0"
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="serviceCenter_admin-star-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 784.11 815.53"
              >
                <g>
                  <path
                    className="fil0"
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="serviceCenter_admin-star-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 784.11 815.53"
              >
                <g>
                  <path
                    className="fil0"
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="serviceCenter_admin-star-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 784.11 815.53"
              >
                <g>
                  <path
                    className="fil0"
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="serviceCenter_admin-star-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 784.11 815.53"
              >
                <g>
                  <path
                    className="fil0"
                    d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                  ></path>
                </g>
              </svg>
            </div>
          </button>
          </div>
          <Service />
        </Card>

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

export default listServiceCenter;
