import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Grid, Typography, Card } from "@mui/material";
import { getAllServicesTypeThunk } from "../../../../store/apiThunk/serviceKoiThunk";
import { allServicesTypeSelector } from "../../../../store/sellectors";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import bgImage from "../../../../assets/koibg_account.jpg";
import "./serviceType.css"; // Assuming the isolated styles for the card component

const ServiceType = (props) => {
  const dispatch = useDispatch();
  const services = useSelector(allServicesTypeSelector);
  
  useEffect(() => {
    dispatch(getAllServicesTypeThunk());
  }, [dispatch]);
console.log(services);

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
              Account management system, which allows admin to manage their accounts.
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
        <Grid container spacing={2} justifyContent="center">
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={3} key={service.typeId}>
              <div className="flipCardComponent">
                <div className="flipCardComponent-inner">
                  <div className="flipCardComponent-front">
                    <p >{service.typeName}</p>
                  </div>
                  <div className="flipCardComponent-back">
                    <p>{service.typeId}</p>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Card>

      <Box pt={6} px={1} mt={6} sx={{ color: "black", background: "#ebe2e1" }}>
        <Footer />
      </Box>
    </div>
  );
};

export default ServiceType;
