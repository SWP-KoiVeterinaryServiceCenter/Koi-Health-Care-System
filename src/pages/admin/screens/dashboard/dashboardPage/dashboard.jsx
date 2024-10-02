import React, { useEffect } from "react";
import { Box, Divider, Typography, Card, CardContent } from "@mui/material";
import Header from "../../../components/header/Header";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { BarChart } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import Coin from "../../../../../assets/coinvnd.png";
import { useDispatch, useSelector } from "react-redux";
import {
  GeneratePastSixMonths,
  ValueFormatter,
} from "../../../../../components/graph/graph";
import { getTotalUsersThunk } from "../../../../../store/apiThunk/userThunk"; // Import thunk
import { totalUserssSelector } from "../../../../../store/sellectors"; // Import selector

import { gettotalPostThunk } from "../../../../../store/apiThunk/postThunk"; // Import thunk
import { totalPostSelector } from "../../../../../store/sellectors"; // Import selector

import {
  getTotalTransactionAmountsThunk,
  getTransactionAmountsThunk,
} from "../../../../../store/apiThunk/walletThunk"; // Import thunk
import {
  totalAmountsSelector,
  AmountsSelector,
} from "../../../../../store/sellectors"; // Import selector

import {
  getTotalBuyStandardSubsThunk,
  getTotalBuyPrioritySubsThunk,
  getTotalBuyThunk,
} from "../../../../../store/apiThunk/packageThunk"; // Import thunks
import {
  totalBuyPrioritySubsSelector,
  totalBuyStandardSubsSelector,
  totalBuySelector,
} from "../../../../../store/sellectors"; // Import selector

import PackageTable from "../../../../platformStaff/screens/package/packageTable/packageTable";

// Định nghĩa hàm ValueFormatter
const formatValue = (value) => {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const totalUserAmount = useSelector(totalUserssSelector); // Sử dụng selector để lấy dữ liệu
  const totalPostAmount = useSelector(totalPostSelector); // Sử dụng selector để lấy dữ liệu
  const transactionAmounts = useSelector(totalAmountsSelector); // Lấy dữ liệu giao dịch từ store
  const transactiontotal = useSelector(AmountsSelector); // Lấy dữ liệu giao dịch từ store
  const buyAmount = useSelector(totalBuySelector); // Sử dụng selector đúng
  const buyStandardSubsAmount = useSelector(totalBuyStandardSubsSelector); // Sử dụng selector đúng
  const buyPrioritySubsAmount = useSelector(totalBuyPrioritySubsSelector); // Sử dụng selector đúng

  // Gọi thunk để lấy dữ liệu từ API khi component được mount
  useEffect(() => {
    dispatch(getTotalUsersThunk());
    dispatch(gettotalPostThunk());
    dispatch(getTotalTransactionAmountsThunk());
    dispatch(getTransactionAmountsThunk());
    dispatch(getTotalBuyThunk());
  }, [dispatch]);
  // Gọi các thunk để lấy dữ liệu khi component được mount
  useEffect(() => {
    dispatch(getTotalBuyStandardSubsThunk());
    dispatch(getTotalBuyPrioritySubsThunk());
  }, [dispatch]);
  console.log("buyStandardSubsAmount: ", buyStandardSubsAmount);
  console.log("buyPrioritySubsAmount: ", buyPrioritySubsAmount);
  const HeaderComponent = ({
    title,
    subtitle,
    titleColor = "gray",
    subtitleColor = "gray",
  }) => (
    <Box mb={2}>
      <Typography
        style={{
          fontFamily: "Source Sans Pro, sans-serif",
          fontSize: "32px",
          color: titleColor,
          fontWeight: "700",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          padding: "4px",
          borderRadius: "4px",
        }}
      >
        {title}
      </Typography>
      <Typography variant="subtitle1" style={{ color: subtitleColor }}>
        {subtitle}
      </Typography>
    </Box>
  );

  // Kiểm tra transactionAmounts trước khi sử dụng
  const incomeSeriesData =
    Array.isArray(transactionAmounts) && transactionAmounts.length > 0
      ? [
          {
            data: transactionAmounts.map((item) => item.totalAmount), // Lấy dữ liệu totalAmount
            valueFormatter: formatValue, // Sử dụng hàm formatValue để định dạng giá trị
          },
        ]
      : [];

  const xLabels =
    Array.isArray(transactionAmounts) && transactionAmounts.length > 0
      ? transactionAmounts.map((item) => ` ${item.month}/2024`)
      : []; // Hiển thị tên tháng

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
              "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFVSFHqjkzlz07_OSVHUZptezNuzeisJEUdQ&s')", // URL hình nền
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "black", // Đổi màu chữ để dễ nhìn trên nền
            position: "relative", // Thêm position relative để căn chỉnh tuyệt đối bên trong
            border: "2px solid #456178", // Viền màu xanh xám
            boxShadow: "0 0 10px 2px rgba(69, 97, 120, 0.8)", // Phát sáng màu xanh xám nặng hơn
          }}
        >
          <CardContent>
            <Typography variant="h6" style={{ fontWeight: "600" }}>
              User
            </Typography>
            <Typography variant="body2" style={{ fontSize: "12px" }}>
              Total number of users:
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
                border: "2px solid #456178", // Viền màu xanh xám
                boxShadow: "0 0 30px 15px rgba(69, 97, 120, 0.8)", // Phát sáng màu xanh xám nặng hơn
                backgroundColor: "rgba(255, 255, 255, 0.8)", // Nền trắng nhạt
              }}
            >
              {totalUserAmount?.totalUserAmount || 0}
            </Typography>
          </CardContent>
        </Card>

        {/* Card cho Transaction */}
        <Card
          style={{
            width: "30%",
            background: "#f5f5f5",
            backgroundImage:
              "url('https://png.pngtree.com/thumb_back/fh260/background/20210115/pngtree-blue-gradient-web-ui-background-image_518658.jpg')", // URL hình nền
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "black", // Đổi màu chữ để dễ nhìn trên nền
            position: "relative", // Thêm position relative để căn chỉnh tuyệt đối bên trong
            boxShadow: "0 0 10px 2px rgba(124, 185, 232, 1)", // Phát sáng màu xanh xám nặng hơn
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Nền trắng nhạt
          }}
        >
          <CardContent>
            <Typography variant="h6" style={{ fontWeight: "600" }}>
              Transaction
            </Typography>
            <Typography variant="body2" style={{ fontSize: "12px" }}>
              Total transaction amount:
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
              {transactiontotal?.totalCount || 0}
            </Typography>
          </CardContent>
        </Card>

        {/* Card cho Post */}
        <Card
          style={{
            width: "30%",
            background: "#f5f5f5",
            backgroundImage:
              "url('https://img.freepik.com/free-vector/vibrant-fluid-gradient-background-with-curvy-shapes_1017-32108.jpg')", // URL hình nền
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "black", // Đổi màu chữ để dễ nhìn trên nền
            position: "relative", // Thêm position relative để căn chỉnh tuyệt đối bên trong
            boxShadow: "0 0 10px 2px rgba(99, 28, 179, 0.8)", // Phát sáng màu xanh xám nặng hơn
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Nền trắng nhạt
          }}
        >
          <CardContent>
            <Typography variant="h6" style={{ fontWeight: "600" }}>
              Post
            </Typography>
            <Typography variant="body2" style={{ fontSize: "12px" }}>
              Total Post amount:
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
                border: "2px solid #631CB3", // Viền màu xanh xám
                boxShadow: "0 0 30px 15px rgba(99, 28, 179, 0.8)", // Phát sáng màu xanh xám nặng hơn
                backgroundColor: "rgba(255, 255, 255, 0.8)", // Nền trắng nhạt
              }}
            >
              {totalPostAmount?.totalPostAmount || 0}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      {/* Kết thúc phần các thẻ (card) */}
      <Box
        m="20px"
        padding={4}
        style={{ color: "black", background: "#DBE9F4" }}
      >
        <HeaderComponent
          title="Income"
          subtitle="Total income for each month"
        />
        <Box height="55vh">
          <BarChart
            series={incomeSeriesData}
            xAxis={[
              {
                data: xLabels,
                scaleType: "band",
                categoryGapRatio: 0.3,
                barGapRatio: 0.2,
                valueFormatter: (value) => value, // Đảm bảo định dạng của trục x đúng
              },
            ]}
            yAxis={[
              {
                valueFormatter: formatValue, // Đảm bảo định dạng của trục y đúng
              },
            ]}
            colors={["#7CB9E8"]}
            sx={{
              "& .MuiTypography-root": { color: "black" },
              "& tspan": { fill: "black" },
            }}
          />
        </Box>
      </Box>
      {/* Sử dụng Flexbox để bố trí Card và PackageTable trên cùng một hàng */}
      <Box display="flex" gap={2} mt={4} p={2}>
        {/* Card chiếm 4 phần */}
        <Box flex={4}>
          {/* Card 5 đầu tiên */}
          <Card
            style={{
              backgroundColor: "#DBE9F4",
              color: "black",
              marginBottom: "16px",
              marginTop: "16px",
            }}
          >
            {" "}
            {/* Thêm marginBottom */}
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: "600" }}>
                SUBSCRIPTION
              </Typography>
              <Typography variant="body2">
                Number of subscriptions purchased:{" "}
                <Typography
                  component="span" // Đảm bảo thẻ không tạo dòng mới
                  style={{
                    fontSize: "24px", // Kích cỡ chữ lớn hơn
                    fontWeight: "600", // Đậm hơn
                    color: "black", // Màu chữ
                    marginLeft: "20px",
                  }}
                >
                  {buyAmount?.totalBuySubsAmount || 0}
                </Typography>
              </Typography>
            </CardContent>
          </Card>

          {/* Card thứ hai */}
          <Card style={{ backgroundColor: "#DBE9F4" }}>
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: buyStandardSubsAmount,
                      label: "Standard",
                    },
                    {
                      id: 1,
                      value: buyPrioritySubsAmount,
                      label: "Priority",
                    },
                  ],
                },
              ]}
              colors={[" rgb(134, 141, 251)", " rgb(42, 45, 100)"]}
              height={270}
              padding={10}
              sx={{
                "& .MuiTypography-root": { color: "black" }, // Đổi màu tất cả các văn bản thành màu đen
                "& tspan": { fill: "black" }, // Đổi màu chữ của các label trong pie chart
              }}
            />
          </Card>
        </Box>

        {/* PackageTable chiếm phần còn lại */}
        <Box
          flex={8}
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Box style={{ flexGrow: 1, overflow: "auto" }}>
            <PackageTable direction="admin" />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
