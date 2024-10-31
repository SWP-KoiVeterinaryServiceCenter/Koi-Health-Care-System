import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { tokens } from "../../../../../theme";
import { allAccountsSelector } from "../../../../../store/sellectors";
import {
  getAllUsersThunk,
  getTotalUsersThunk,
  getTotalStaffsThunk,
  getTotalVetsThunk,
} from "../../../../../store/apiThunk/userThunk";
import { 
  getTotalConfirmAppointmentsThunk,
  getTotalAppointmentThunk,
  getTotalPendingAppointmentsThunk 
} from "../../../../../store/apiThunk/appointment";
import {
  totalUserssSelector,
  totalStaffssSelector,
  totalVetssSelector,
  totalConfirmAppointmentsSelector,
  totalAppointmentsSelector,
  totalPendingAppointmentsSelector
} from "../../../../../store/sellectors";
import Footer from "../../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import bgImage from "../../../../../assets/koibg_account.jpg";
import AdminDashboardDetail from "../../../../admin/screens/dashboard/dashboardDetail/dashboardDetail";

const AccountTable = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const accounts = useSelector(allAccountsSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get appointment data from Redux store
  const totalConfirmAppointmentsData = useSelector(totalConfirmAppointmentsSelector);
  const totalAppointmentsData = useSelector(totalAppointmentsSelector);
  const totalPendingAppointmentsData = useSelector(totalPendingAppointmentsSelector);

  // Get user data from Redux store
  const totalUserResponse = useSelector(totalUserssSelector);
  const totalStaffResponse = useSelector(totalStaffssSelector);
  const totalVetResponse = useSelector(totalVetssSelector);

  // Extract the amount values, defaulting to 0 if undefined
  const totalUserAmount = totalUserResponse?.amount || 0;
  const totalStaffAmount = totalStaffResponse?.amount || 0;
  const totalVetAmount = totalVetResponse?.amount || 0;

  // Extract appointment values from the response objects with correct path
  const confirmedAppointments = totalConfirmAppointmentsData?.totalAppointment || 0;
  const pendingAppointments = totalPendingAppointmentsData?.totalAppointment || 0;
  const totalAppointments = totalAppointmentsData?.totalAppointment || 0;

  // Debug logs
  useEffect(() => {
    console.log('Raw Confirm Data:', totalConfirmAppointmentsData);
    console.log('Raw Pending Data:', totalPendingAppointmentsData);
    console.log('Raw Total Data:', totalAppointmentsData);
    
    console.log('Extracted Values:', {
      confirmed: confirmedAppointments,
      pending: pendingAppointments,
      total: totalAppointments
    });
  }, [totalConfirmAppointmentsData, totalPendingAppointmentsData, totalAppointmentsData]);

  useEffect(() => {
    dispatch(getTotalUsersThunk());
    dispatch(getTotalStaffsThunk());
    dispatch(getTotalVetsThunk());
    dispatch(getTotalConfirmAppointmentsThunk());
    dispatch(getTotalAppointmentThunk());
    dispatch(getTotalPendingAppointmentsThunk());
  }, [dispatch]);

  const chartSetting = {
    xAxis: [{ 
      label: "Number of Appointments",
      min: 0,
      max: Math.max(totalAppointments + 5, confirmedAppointments + 5, pendingAppointments + 5)
    }],
    width: 500,
    height: 400,
  };

  const dataset = [
    {
      appointment: "Number",
      confirm: confirmedAppointments,
      pending: pendingAppointments,
      total: totalAppointments,
    },
  ];

  const valueFormatter = (value) => `${value} appointment`;

  return (
    <div>
      <Box
        minHeight="30vh"
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
                fontSize: 45,
                fontWeight: "900",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                borderRadius: "4px",
                WebkitTextStroke: "1px black",
                display: "inline-block",
                fontFamily: "Helvetica",
              }}
            >
              DASHBOARD
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
        <AdminDashboardDetail />
        <Grid container spacing={2} justifyContent="center" marginTop={2}>
          <Grid item xs={12} md={5}>
            <Card
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                color: "black",
                width: 400,
                height: 230,
              }}
            >
              <div style={{ marginLeft: 20 }}>ACCOUNT:</div>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: totalUserAmount, label: "Customer" },
                      { id: 1, value: totalStaffAmount, label: "Staff" },
                      { id: 2, value: totalVetAmount, label: "Veterinarian" },
                    ],
                    label: {
                      color: "black",
                    },
                  },
                ]}
                width={400}
                height={200}
                colors={[
                  "rgb(134, 141, 251)",
                  "rgb(42, 45, 100)",
                  "rgb(42, 40, 150)",
                ]}
                padding={10}
                sx={{
                  "& .MuiTypography-root": { color: "black" },
                  "& tspan": { fill: "black" },
                }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                color: "black",
                textAlign: "center",
                p: 2
              }}
            >
              <BarChart
                dataset={dataset}
                yAxis={[{ scaleType: "band", dataKey: "appointment" }]}
                series={[
                  {
                    dataKey: "confirm",
                    label: "Confirmed Appointment",
                    valueFormatter,
                    color: "rgb(0, 171, 169)"
                  },
                  {
                    dataKey: "pending",
                    label: "Pending Appointment",
                    valueFormatter,
                    color: "rgb(135, 206, 235)"
                  },
                  {
                    dataKey: "total",
                    label: "Total Appointment",
                    valueFormatter,
                    color: "rgb(255, 0, 255)"
                  },
                ]}
                layout="horizontal"
                grid={{ vertical: true }}
                {...chartSetting}
                sx={{
                  "& .MuiTypography-root": { color: "black" },
                  "& tspan": { fill: "black" },
                  "& .MuiChartLabel-root": { color: "black" },
                }}
              />
            </Card>
          </Grid>
        </Grid>
        <Box pt={18} pb={6}>
          <Container>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                lg={5}
                ml="auto"
                sx={{ textAlign: { xs: "center", lg: "left" } }}
              >
                <Typography variant="h4" fontWeight="bold" mb={0.5} color="black">
                  Thank you for your support!
                </Typography>
                <Typography variant="body1" color="black">
                  We deliver the best web products
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Card>
      <Box pt={6} px={1} mt={6} sx={{ color: "black", background: "#ebe2e1" }}>
        <Footer />
      </Box>
    </div>
  );
};

export default AccountTable;