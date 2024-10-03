import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../../theme";
// import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../../pages/authorize/landingPage/LandingPageDetail/AppAppBar/AppAppBar";
import Footer from "../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import { useDispatch } from "react-redux";
import { getUserDataThunk } from "../../../store/apiThunk/userThunk";


export default function GuestHome() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [pageEntered, setPageEntered] = useState(false);

  useEffect(() => {
    setPageEntered(true);
  }, [location]);

  useEffect(() => {
    if (pageEntered) {
      const hasToken = localStorage.getItem("accessToken");
      if (!hasToken) {
        setCheck(true);
        navigate("/");
      } else {
        dispatch(getUserDataThunk());
        // dispatch(getWalletThunk());
        // dispatch(getAllNotificationsThunk());
        // dispatch(getUnreadNotificationsThunk());
        // dispatch(getPlatformIncomeThunk());
      }
    }
  }, [pageEntered, navigate, dispatch]);

  return (
    <div>
      <Topbar />
      <Outlet />
      <Footer />
    </div>
  );
}
