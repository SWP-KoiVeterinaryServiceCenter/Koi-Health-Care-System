import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../../../theme";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/topbar";
import Footer from "../../../authorize/landingPage/LandingPageDetail/Footer/Footer";
import { useDispatch } from "react-redux";
import { getUserDataThunk } from "../../../../store/apiThunk/userThunk";
import {
  getAllNotificationsThunk,
  getUnreadNotificationsThunk,
} from "../../../../store/apiThunk/notificationThunk";
import {
  getPlatformIncomeThunk,
  getWalletThunk,
} from "../../../../store/apiThunk/walletThunk";

export default function ServiceHome() {
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

  return (
    <div>

      <Outlet />

    </div>
  );
}
