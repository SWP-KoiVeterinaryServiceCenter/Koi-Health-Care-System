import React, { useEffect } from "react";
import { Box, Divider, Typography, Card, CardContent } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { getTotalUsersThunk } from "../../../../../store/apiThunk/userThunk"; // Import thunk
import { totalUserssSelector } from "../../../../../store/sellectors"; // Import selector

import { getTotalStaffsThunk } from "../../../../../store/apiThunk/userThunk"; // Import thunk
import { totalStaffssSelector } from "../../../../../store/sellectors"; // Import selector

import { getTotalVetsThunk } from "../../../../../store/apiThunk/userThunk"; // Import thunk
import { totalVetssSelector } from "../../../../../store/sellectors"; // Import selector

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const totalUserAmount = useSelector(totalUserssSelector); // Sử dụng selector để lấy dữ liệu
  const totalStaffAmount = useSelector(totalStaffssSelector); // Sử dụng selector để lấy dữ liệu
  const totalVetAmount = useSelector(totalVetssSelector); // Sử dụng selector để lấy dữ liệu

  // Gọi thunk để lấy dữ liệu từ API khi component được mount
  useEffect(() => {
    dispatch(getTotalUsersThunk());
    dispatch(getTotalStaffsThunk());
    dispatch(getTotalVetsThunk());
  }, [dispatch]);

  return (
    <div className="dashboard">
      {/* Bắt đầu phần các thẻ (card) */}
      <Box display="flex" gap={2} p={2}>
        {/* Card cho User */}
        <Card
          style={{
            width: "30%",
            background: "#f5f5f5",
            backgroundImage:
              "url('https://i.pinimg.com/564x/ab/dc/7c/abdc7c2e51ba059be8b51bffc159f5b5.jpg')", // URL hình nền
            //   "url('https://png.pngtree.com/thumb_back/fh260/background/20210115/pngtree-blue-gradient-web-ui-background-image_518658.jpg')", // URL hình nền
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "black", // Đổi màu chữ để dễ nhìn trên nền
            position: "relative", // Thêm position relative để căn chỉnh tuyệt đối bên trong
            // boxShadow: "0 0 10px 2px rgba(124, 185, 232, 1)", // Phát sáng màu xanh xám nặng hơn
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Nền trắng nhạt
          }}
        >
          <CardContent>
            <Typography variant="h6" style={{ fontWeight: "600" }}>
              Customer
            </Typography>
            <Typography variant="body2" style={{ fontSize: "12px" }}>
              Total number of Customer:
            </Typography>

            {/* Tổng số người dùng */}
            <Typography
              style={{
                fontSize: "43px", // Kích cỡ lớn hơn
                color: "black", // Màu chữ
                textAlign: "right", // Căn phải
                fontWeight: "600",
                position: "absolute", // Đặt vị trí tuyệt đối
                right: "70px", // Cách cạnh phải
                bottom: "12px", // Cách cạnh dưới
                padding: "8px", // Khoảng cách bên trong để viền không bị cắt
                borderRadius: "8px", // Bo tròn các góc
                border: "2px solid #7CB9E8", // Viền màu xanh xám
                boxShadow: "0 0 30px 15px rgba(124, 185, 232, 1)", // Phát sáng màu xanh xám nặng hơn
                backgroundColor: "rgba(255, 255, 255, 0.8)", // Nền trắng nhạt
              }}
            >
              {totalUserAmount?.amount || 0}
            </Typography>
          </CardContent>
        </Card>

        {/* Card cho Transaction */}
        <Card
          style={{
            width: "30%",
            background: "#f5f5f5",
            backgroundImage:
              "url('https://i.pinimg.com/564x/ab/dc/7c/abdc7c2e51ba059be8b51bffc159f5b5.jpg')", // URL hình nền
            //   "url('https://png.pngtree.com/thumb_back/fh260/background/20210115/pngtree-blue-gradient-web-ui-background-image_518658.jpg')", // URL hình nền
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "black", // Đổi màu chữ để dễ nhìn trên nền
            position: "relative", // Thêm position relative để căn chỉnh tuyệt đối bên trong
            // boxShadow: "0 0 10px 2px rgba(124, 185, 232, 1)", // Phát sáng màu xanh xám nặng hơn
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Nền trắng nhạt
          }}
        >
          <CardContent>
            <Typography variant="h6" style={{ fontWeight: "600" }}>
              Staff
            </Typography>
            <Typography variant="body2" style={{ fontSize: "12px" }}>
              Total number of Staff:
            </Typography>

            {/* Tổng số người dùng */}
            <Typography
              style={{
                fontSize: "43px", // Kích cỡ lớn hơn
                color: "black", // Màu chữ
                textAlign: "right", // Căn phải
                fontWeight: "600",
                position: "absolute", // Đặt vị trí tuyệt đối
                right: "70px", // Cách cạnh phải
                bottom: "12px", // Cách cạnh dưới
                padding: "8px", // Khoảng cách bên trong để viền không bị cắt
                borderRadius: "8px", // Bo tròn các góc
                border: "2px solid #7CB9E8", // Viền màu xanh xám
                boxShadow: "0 0 30px 15px rgba(124, 185, 232, 1)", // Phát sáng màu xanh xám nặng hơn
                backgroundColor: "rgba(255, 255, 255, 0.8)", // Nền trắng nhạt
              }}
            >
              {totalStaffAmount?.amount || 0}
            </Typography>
          </CardContent>
        </Card>

        {/* Card cho Post */}
        <Card
          style={{
            width: "30%",
            background: "#f5f5f5",
            backgroundImage:
              "url('https://i.pinimg.com/564x/ab/dc/7c/abdc7c2e51ba059be8b51bffc159f5b5.jpg')", // URL hình nền
            //   "url('https://png.pngtree.com/thumb_back/fh260/background/20210115/pngtree-blue-gradient-web-ui-background-image_518658.jpg')", // URL hình nền
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "black", // Đổi màu chữ để dễ nhìn trên nền
            position: "relative", // Thêm position relative để căn chỉnh tuyệt đối bên trong
            // boxShadow: "0 0 10px 2px rgba(124, 185, 232, 1)", // Phát sáng màu xanh xám nặng hơn
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Nền trắng nhạt
          }}
        >
          <CardContent>
            <Typography variant="h6" style={{ fontWeight: "600" }}>
              Veterinarian
            </Typography>
            <Typography variant="body2" style={{ fontSize: "12px" }}>
              Total number of Veterinarian:
            </Typography>

            {/* Tổng số người dùng */}
            <Typography
              style={{
                fontSize: "43px", // Kích cỡ lớn hơn
                color: "black", // Màu chữ
                textAlign: "right", // Căn phải
                fontWeight: "600",
                position: "absolute", // Đặt vị trí tuyệt đối
                right: "70px", // Cách cạnh phải
                bottom: "12px", // Cách cạnh dưới
                padding: "8px", // Khoảng cách bên trong để viền không bị cắt
                borderRadius: "8px", // Bo tròn các góc
                border: "2px solid #7CB9E8", // Viền màu xanh xám
                boxShadow: "0 0 30px 15px rgba(124, 185, 232, 1)", // Phát sáng màu xanh xám nặng hơn
                backgroundColor: "rgba(255, 255, 255, 0.8)", // Nền trắng nhạt
              }}
            >
              {totalVetAmount?.amount || 0}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}