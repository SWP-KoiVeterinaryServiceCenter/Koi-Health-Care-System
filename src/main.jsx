import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/authorize/login/login";
import Signup from "./pages/authorize/signup/signup";
import ForgotPassword from "./pages/authorize/forgotPassword/forgotPassword";
// import VerifyAccount from "./pages/authorize/verifyAccount/verifyAccount";
import NewPassword from "./pages/authorize/newPassword/newPassword";
import TransferStatus from "./pages/authorize/transferStatus/transferStatus";
import Error404 from "./pages/error404/error404";
import CreateShop from "./pages/authorize/createShop/createShop";
import BecomeManager from "./pages/authorize/becomeManager/becomeManager";
import LandingPage from "./pages/authorize/landingPage/landingPage";
import ChangePassword from "./pages/authorize/changePassword/changePassword";
//Admin
import AdminHome from "./pages/admin/screens/home/adminHome";
import AccountTable from "./pages/admin/screens/account/accountTable";
import VerifyAccount from "./pages/admin/screens/verifyaccount/verifyaccount";
import WalletTableAdmin from "./pages/admin/screens/wallet/walletTable";
import AdminDashboard from "./pages/admin/screens/dashboard/dashboardPage/dashboard";
import AdminDashboardDetail from "./pages/admin/screens/dashboard/dashboardDetail/dashboardDetail";

//Manager
import CreateShopManager from "./pages/manager/screens/shop/createShop/createShop";
import ManagerHome from "./pages/manager/screens/home/managerHome";
import ShopTable from "./pages/manager/screens/shop/shopTable/shopTable";
import UpdateShop from "./pages/manager/screens/shop/updateShop/updateShop";
import ManagerProfile from "./pages/manager/screens/profile/profile";
import WalletTable from "./pages/manager/screens/wallet/walletTable";
import OrderTable from "./pages/manager/screens/order/orderTable";
import ManagerDashboard from "./pages/manager/screens/dashboard/dashboardPage/dashboard";
import DashboardDetail from "./pages/manager/screens/dashboard/dashboardDetail/dashboardDetail";
import CancelAmount from "./pages/platformStaff/screens/policy/cancelledAmount/cancelledAmount";
import AdjustMoney from "./pages/platformStaff/screens/policy/postPrice/postPrice";
//Staff
import StaffHome from "./pages/platformStaff/screens/home/staffHome";
import ShopTableStaff from "./pages/platformStaff/screens/shop/shopTable";
import ReportTable from "./pages/platformStaff/screens/reportPostTable/reportTable";
import ReportPostTable from "./pages/platformStaff/screens/reportPostTable/reportPostTable";
import ItemTable from "./pages/platformStaff/screens/item/itemTable/itemTable";
import CreateItem from "./pages/platformStaff/screens/item/createItem/createItem";
import UpdateItem from "./pages/platformStaff/screens/item/updateItem/updateItem";
import CreatePackage from "./pages/platformStaff/screens/package/createPackage/createPackage";
import UpdatePackage from "./pages/platformStaff/screens/package/updatePackage/updatePackage";
import PackageTable from "./pages/platformStaff/screens/package/packageTable/packageTable";
import CategoryList from "./pages/platformStaff/screens/categoryList/categorydetail/categorydetail";
import CreateCategoryList from "./pages/platformStaff/screens/categoryList/createCategory/createCategory";
import UpdateCategoryList from "./pages/platformStaff/screens/categoryList/updateCategory/updateCategory";
import OrdertrackTable from "./pages/admin/screens/order/ordertrack";

//Customer
import CreateKoifish from "./pages/createKoifish/createfish";
import Service from "./pages/customer/screens/service/service";
import ServiceInformation from "./pages/customer/screens/serviceInformation/ServiceInformation";
import PersonalInformation from "./pages/customer/screens/personalInformation/PersonalInformation";
import AddMoreFish from "./pages/customer/screens/addMoreFish/AddMoreFish";
import Booking from "./pages/customer/screens/booking/booking";
import CustomerHome from "./pages/customer/components/home/homeCustomer";
import HomePage from "./pages/customer/screens/home/home";
const router = createBrowserRouter([
  {
    path: "",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/newPassword",
    element: <NewPassword />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/becomeManager",
    element: <BecomeManager />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // {
  //     path: "/verifyAccount",
  //     element: <VerifyAccount />,
  // },
  {
    path: "/error404",
    element: <Error404 />,
  },
  {
    path: "/createShop",
    element: <CreateShop />,
  },
  {
    path: "/transferStatus",
    element: <TransferStatus />,
  },
 
  {
    path: "/serviceInformation",
    element: <ServiceInformation />,
  },
  {
    path: "/service",
    element: <Service />,
  },
  {
    path: "/personalInformation",
    element: <PersonalInformation />,
  },
  {
    path: "/addMoreFish",
    element: <AddMoreFish />,
  },
  {
    path: "/booking",
    element: <Booking />,
  },


  //Admin
  {
    path: "/admin",
    element: <AdminHome />,
    errorElement: <Error404 />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
      {
        path: "dashboardDetail",
        element: <AdminDashboardDetail />,
      },
      {
        path: "account",
        element: <AccountTable />,
      },
      {
        path: "verifyAccount",
        element: <VerifyAccount />,
      },
      {
        path: "wallet",
        element: <WalletTableAdmin />,
      },
      {
        path: "shop",
        element: <ShopTableStaff />,
      },
      // {
      //     path: "item",
      //     element: <ItemTable direction="admin" />,
      // },
      {
        path: "report",
        element: <ReportTable />,
      },
      {
        path: "reportPost",
        element: <ReportPostTable />,
      },
      {
        path: "package",
        element: <PackageTable direction="admin" />,
      },
      {
        path: "createItem",
        element: <CreateItem />,
      },
      {
        path: "updateItem",
        element: <UpdateItem />,
      },
      {
        path: "updatePackage",
        element: <UpdatePackage />,
      },
      {
        path: "createPackage",
        element: <CreatePackage />,
      },
      {
        path: "category",
        element: <CategoryList direction="admin" />,
      },
      {
        path: "createCategory",
        element: <CreateCategoryList />,
      },
      {
        path: "updateCategory",
        element: <UpdateCategoryList />,
      },
      {
        path: "ordertable",
        element: <OrdertrackTable />,
      },
      {
        path: "cancelAmount",
        element: <CancelAmount />,
      },
      {
        path: "adjustMoney",
        element: <AdjustMoney />,
      },
    ],
  },
  //Staff
  {
    path: "/staff",
    element: <StaffHome />,
    errorElement: <Error404 />,
    children: [
      {
        path: "",
        element: <ShopTableStaff />,
      },
      {
        path: "account",
        element: <AccountTable />,
      },
      {
        path: "wallet",
        element: <WalletTableAdmin />,
      },
      {
        path: "item",
        element: <ItemTable direction="staff" />,
      },
      {
        path: "report",
        element: <ReportTable />,
      },
      {
        path: "reportPost",
        element: <ReportPostTable />,
      },
      {
        path: "package",
        element: <PackageTable direction="staff" />,
      },
      {
        path: "createItem",
        element: <CreateItem />,
      },
      {
        path: "updateItem",
        element: <UpdateItem />,
      },
      {
        path: "updatePackage",
        element: <UpdatePackage />,
      },
      {
        path: "createPackage",
        element: <CreatePackage />,
      },
      {
        path: "category",
        element: <CategoryList direction="staff" />,
      },
      {
        path: "createCategory",
        element: <CreateCategoryList />,
      },
      {
        path: "updateCategory",
        element: <UpdateCategoryList />,
      },
      {
        path: "ordertable",
        element: <OrdertrackTable />,
      },
    ],
  },
  //Customer
  {
    path: "/customer",
    element: <CustomerHome />,
    errorElement: <Error404 />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "service",
        element: <Service direction="customer"/>,
      },
      {
        path: "personalInformation",
        element: <PersonalInformation />,
      },
      {
        path: "serviceInformation",
        element: <ServiceInformation />,
      },
    
    ],
  },
  //Manager
  {
    path: "/manager",
    element: <ManagerHome />,
    errorElement: <Error404 />,
    children: [
      {
        path: "",
        element: <ManagerDashboard />,
      },
      {
        path: "shop",
        element: <ShopTable />,
      },
      {
        path: "dashboardDetail",
        element: <DashboardDetail />,
      },
      {
        path: "profile",
        element: <ManagerProfile />,
      },
      {
        path: "wallet",
        element: <WalletTable />,
      },
      {
        path: "order",
        element: <OrderTable />,
      },
      {
        path: "updateShop",
        element: <UpdateShop />,
      },
      {
        path: "createShopManager",
        element: <CreateShopManager />,
      },
      {
        path: "changePassword",
        element: <ChangePassword />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
