import { useState, useEffect } from "react";
import "./sidebar.css";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Divider,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useSelector } from "react-redux";
import { userDataSelector } from "../../../../store/sellectors";
import Admin from "../../../../assets/admin.png";
import { AccountCircleOutlined } from "@mui/icons-material";
import WavesIcon from "@mui/icons-material/Waves";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import RedeemIcon from "@mui/icons-material/Redeem";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import { StyledSidebar } from "../../../../components/styledSidebar/styledSidebar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import PaidIcon from "@mui/icons-material/Paid";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import logo from "../../../../assets/koi_loho.png";
import backgroundGif from "../../../../assets/gif/koi_logo_sidebar.gif";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
const logoStyle = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};
const backgroundStyle = {
  background: `url(${backgroundGif}) no-repeat center center`, // Sử dụng ảnh GIF làm background
  backgroundSize: "270px 150px", // Điều chỉnh kích thước của ảnh GIF, ví dụ 150x150px

  padding: "10px", // Thêm khoảng cách cho logo nếu cần
};
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleLogout = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = (props) => {
  const userData = useSelector(userDataSelector);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let isCollapsed = props.isCollapsed;
  let setIsCollapsed = props.setIsCollapsed;
  const navigate = useNavigate(); // Initialize navigate
  const [selected, setSelected] = useState();
  const [open, setOpen] = useState(true);
  const [openCPM, setOpenCPM] = useState(false);
  const [openTran, setOpenTran] = useState(false);
  const [openPol, setOpenPol] = useState(false);
  const [openWrk, setOpenWrk] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickProductManagement = () => {
    setOpenCPM(!openCPM);
  };
  const handleClickTransaction = () => {
    setOpenTran(!openTran);
  };
  const handleClickPolicy = () => {
    setOpenPol(!openPol);
  };

  const handleClickWorkingSchedule = () => {
    setOpenWrk(!openWrk);
  };

  const handleLogout = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/"); // Use navigate to redirect
    } catch (error) {
      console.log({ error });
    }
  };

  const url = new URL(window.location.href);
  const pathName = url.pathname;
  const parts = pathName?.split("/");
  const locationValue = parts[parts.length - 1];

  return (
    <div className="adminSidebar">
      <Box sx={StyledSidebar}>
        <ProSidebar
          collapsed={isCollapsed}
          style={{
            zIndex: 1,
            height: 900,
          }}
        >
          <Menu iconShape="square">
            <MenuItem
              icon={
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon fontSize="large" className="icon-box" />
                </IconButton>
              }
            >
              <Typography variant="h5" color={"white"} fontWeight="bold">
                {userData.role}
              </Typography>
            </MenuItem>
            <Typography className="typography-logo" style={backgroundStyle}>
              <img src={logo} style={logoStyle} alt="logo of sitemark" />
            </Typography>
            <Box>
              <Typography
                variant="h6"
                color={colors.grey[100]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Statistics
              </Typography>
              <Item
                title="Admin Dashboard"
                to=""
                icon={<BarChartIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Divider />
              <Typography
                variant="h6"
                color={colors.grey[100]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Management
              </Typography>
              <List>
                <ListItemButton onClick={handleClick}>
                  {!isCollapsed && (
                    <PersonalVideoIcon
                      style={{
                        marginLeft: "10px",
                        marginRight: "19px",
                        color: "#000000",
                      }}
                    />
                  )}
                  {!isCollapsed && (
                    <ListItemText
                      primary="System"
                      style={{
                        color: "#000000",
                      }}
                    />
                  )}
                  {open ? (
                    <ExpandLess
                      style={{
                        marginLeft: "10px",
                        color: "#000000",
                      }}
                    />
                  ) : (
                    <ExpandMore
                      style={{
                        marginLeft: "10px",
                        color: "#000000",
                      }}
                    />
                  )}
                </ListItemButton>
                <Collapse
                  in={open}
                  timeout="auto"
                  unmountOnExit
                  style={{
                    paddingLeft: !isCollapsed ? "20px" : 0,
                  }}
                >
                  <Item
                    title="Account"
                    to="account"
                    icon={<AccountCircleOutlined />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  {/* ////////////////////////////////////////////////////////////////// */}
                  <List>
                    <ListItemButton onClick={handleClickTransaction}>
                      {!isCollapsed && (
                        <SubscriptionsIcon
                          style={{
                            marginLeft: "10px",
                            marginRight: "19px",
                            color: "black",
                          }}
                        />
                      )}
                      {!isCollapsed && (
                        <ListItemText
                          primary="Service management"
                          style={{
                            color: "black",
                          }}
                        />
                      )}
                      {openTran ? (
                        <ExpandLess
                          style={{
                            marginLeft: "10px",
                            color: "black",
                          }}
                        />
                      ) : (
                        <ExpandMore
                          style={{
                            marginLeft: "10px",
                            color: "black",
                          }}
                        />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={openTran}
                      timeout="auto"
                      unmountOnExit
                      style={{
                        paddingLeft: !isCollapsed ? "20px" : 0,
                      }}
                    >
                      <Item
                        title="Appointment Center"
                        to="listServiceCenter"
                        icon={<SubscriptionsIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Tank"
                        to="tankList"
                        icon={<WavesIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Service Type"
                        to="serviceType"
                        icon={<HomeRepairServiceIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </Collapse>
                  </List>

                  {/* ///////////////////////////////////////////////////////////////////// */}
                  <List>
                    <ListItemButton onClick={handleClickProductManagement}>
                      {!isCollapsed && (
                        <InventoryIcon
                          style={{
                            marginLeft: "10px",
                            marginRight: "19px",
                            color: "#000000",
                          }}
                        />
                      )}
                      {!isCollapsed && (
                        <ListItemText
                          primary="Tables Services"
                          style={{
                            color: "#000000",
                          }}
                        />
                      )}
                      {openCPM ? (
                        <ExpandLess
                          style={{
                            marginLeft: "10px",
                            color: "#000000",
                          }}
                        />
                      ) : (
                        <ExpandMore
                          style={{
                            marginLeft: "10px",
                            color: "#000000",
                          }}
                        />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={openCPM}
                      timeout="auto"
                      unmountOnExit
                      style={{
                        paddingLeft: !isCollapsed ? "20px" : 0,
                      }}
                    >
                      <Item
                        title="Appointment "
                        to="appointmentManagement"
                        icon={<ClassIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Transaction "
                        to="transaction"
                        icon={<ReceiptLongIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </Collapse>
                  </List>
                  {/* ////////////////////////////////////////////////////////////////// */}

                  <Item
                    title="TravelExpense "
                    to="travelExpenseList"
                    icon={<PaidIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Collapse>
              </List>
            </Box>
          </Menu>
          <Button
            variant="outlined"
            component="a"
            onClick={handleLogout}
            target="_blank"
            sx={{
              width: "96%",
              marginLeft: 1,
              backgroundColor: "white",
              color: "#215D6E",
              marginTop: "30px",
              marginRight: 1,
            }}
          >
            Logout
          </Button>
        </ProSidebar>
      </Box>
    </div>
  );
};

export default Sidebar;
