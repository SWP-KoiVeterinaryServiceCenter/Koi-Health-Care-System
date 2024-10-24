import { useState, useEffect } from "react";
import "./sidebar.css";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useSelector } from "react-redux";
import { userDataSelector } from "../../../../store/sellectors";
import Admin from "../../../../assets/admin.png";
import { AccountCircleOutlined } from "@mui/icons-material";
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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
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
              {/* <Typography
                variant="h6"
                color={colors.grey[300]}
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
              /> */}
              <Divider />
              <Typography
                variant="h6"
                color={colors.grey[300]}
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
                        color: "white",
                      }}
                    />
                  )}
                  {!isCollapsed && (
                    <ListItemText
                      primary="System"
                      style={{
                        color: "white",
                      }}
                    />
                  )}
                  {open ? (
                    <ExpandLess
                      style={{
                        marginLeft: "10px",
                        color: "white",
                      }}
                    />
                  ) : (
                    <ExpandMore
                      style={{
                        marginLeft: "10px",
                        color: "white",
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
                  <Item
                    title="Tank"
                    to="tankList"
                    icon={<AccountCircleOutlined />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Service Type"
                    to="serviceType"
                    icon={<AccountCircleOutlined />}
                    selected={selected}
                    setSelected={setSelected}
                  />
              
                      <Item
                    title="Service Center List"
                    to="listServiceCenter"
                    icon={<SubscriptionsIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                           <Item
                    title="Appointment "
                    to="appointmentManagement"
                    icon={<SubscriptionsIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                           <Item
                    title="TravelExpense "
                    to="travelExpenseList"
                    icon={<SubscriptionsIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />  

                


                   <List>
                    <ListItemButton onClick={handleClickWorkingSchedule}>
                      {!isCollapsed && (
                        <CalendarMonthIcon
                          style={{
                            marginLeft: "10px",
                            marginRight: "19px",
                            color: "white",
                          }}
                        />
                      )}
                      {!isCollapsed && (
                        <ListItemText
                          primary="Working Schedule"
                          style={{
                            color: "white",
                          }}
                        />
                      )}
                      {openWrk ? (
                        <ExpandLess
                          style={{
                            marginLeft: "10px",
                            color: "white",
                          }}
                        />
                      ) : (
                        <ExpandMore
                          style={{
                            marginLeft: "10px",
                            color: "white",
                          }}
                        />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={openWrk}
                      timeout="auto"
                      unmountOnExit
                      style={{
                        paddingLeft: !isCollapsed ? "20px" : 0,
                      }}
                    >
                      <Item
                        title="Schedule"
                        to="workingSchedule"
                        icon={<EventRepeatIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      <Item
                        title="Create Working Schedule"
                        to="createWorkingSchedule"
                        icon={<AddIcon/>}
                        selected={selected}
                        setSelected={setSelected}
                      />
                      {/* <Item
                        title="Report"
                        to="report"
                        icon={<ReportGmailerrorredIcon />}
                        selected={selected}
                        setSelected={setSelected}
                      /> */}
                    </Collapse>
                  </List>
                  {/* ///////////////////////////////////////////////////////////////////// */}
                </Collapse>
              </List>
            </Box>
          </Menu>
        </ProSidebar>
      </Box>
    </div>
  );
};

export default Sidebar;
