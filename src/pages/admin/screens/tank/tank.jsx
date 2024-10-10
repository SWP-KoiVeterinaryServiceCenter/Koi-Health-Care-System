import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Container, Grid, Typography, Card, Button } from "@mui/material";
import { getAllTanksThunk } from "../../../../store/apiThunk/tankKoiThunk";
import { allTanksSelector } from "../../../../store/sellectors";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import bgImage from "../../../../assets/koibg_account.jpg";
import "./tank.css"; // Assuming the isolated styles for the card component

const Tank = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tanks = useSelector(allTanksSelector);
  const direction = props.direction;
  
  useEffect(() => {
    dispatch(getAllTanksThunk());
  }, [dispatch]);

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
          <div className="gooeyButtonComponent" >
            <button className="c-button c-button--gooey" onClick={() => navigate(`/${direction}/createTank`)} >
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
                        <span className="cardComponent-see-more">See More</span>
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
