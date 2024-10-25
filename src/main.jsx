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
import TankList from "./pages/admin/screens/tank/tank";
import ServiceTypeList from "./pages/admin/screens/serviceType/serviceType";
import VerifyAccount from "./pages/admin/screens/verifyaccount/verifyaccount";
import WalletTableAdmin from "./pages/admin/screens/wallet/walletTable";
import AdminDashboard from "./pages/admin/screens/dashboard/dashboardPage/dashboard";
import AdminDashboardDetail from "./pages/admin/screens/dashboard/dashboardDetail/dashboardDetail";
import CreateStaffAccount from "./pages/admin/screens/createRoleAccount/createStaffAccount/createStaffAccount";
import CreateVetAccount from "./pages/admin/screens/createRoleAccount/createVetAccount/createVetAccount";
import CreateTank from "./pages/admin/screens/createTank/createTank";
import CreateServiceType from "./pages/admin/screens/createServiceType/createServiceType";
import CreateServiceCenter from "./pages/admin/screens/createServiceCenter/createServiceCenter";
import ListServiceCenter from "./pages/admin/screens/listServiceCenter/listServiceCenter";
import ServiceCenter from "./pages/admin/screens/listServiceCenter/serviceCenter/serviceCenter";
import AppointmentManagement from "./pages/admin/screens/appointmentManagement/appointmentManagement";
import CreateTravelExpense from "./pages/admin/screens/createTravelExpense/createTravelExpense";
import TravelExpenseList from "./pages/admin/screens/travelExpenseList/travelExpenseList";

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

//VET
import VetHome from "./pages/vet/vetHome/vetHome";
import AppointmentByCurrentVet from "./pages/vet/screens/appointmentByCurrentVet/appointmentByCurrentVet";
import MedicalRecordList from "./pages/vet/screens/medicalrecord/medicalrecord";
import CreateMedicalRecord from "./pages/vet/screens/createMedicaRecord/createMedicaRecord";

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
import WorkingSchedule from "./pages/platformStaff/screens/workingSchedule/workingSchedule";
import CreateWorkingSchedule from "./pages/platformStaff/screens/createWorkingSchedule/createWorkingSchedule";
import UpdateWorkingSchedule from "./pages/platformStaff/screens/updateWorkingSchedule/updateWorkingSchedule";
//Customer
// import CreateKoifish from "./pages/createKoifish/createfish";
import DoctorOnNewsPage from "./pages/customer/screens/news/news";
import ServiceKoifish from "./pages/customer/screens/service/service";
import ServiceHome from "./pages/customer/screens/serviceHome/serviceHome";
import GuestServiceKoifish from "./pages/guest/guestService/guestService";
import ServiceInformation from "./pages/customer/screens/serviceInformation/ServiceInformation";
import InputPayment from "./pages/customer/screens/inputPayment/inputPayment";
import PersonalInformation from "./pages/customer/screens/personalInformation/PersonalInformation";
import AddMoreFish from "./pages/customer/screens/addMoreFish/AddMoreFish";
import Booking from "./pages/customer/screens/booking/booking";
import CustomerHome from "./pages/customer/components/home/homeCustomer";

import HomePage from "./pages/customer/screens/home/home";
import ContactUs from "./pages/customer/screens/contactUs/contactUs";
import CreateKoiFishAppointment from "./pages/customer/screens/createKoiFishAppointment/createKoiFishAppointment";
import UpdateKoiFishInformation from "./pages/customer/screens/updateKoiFishInformation/UpdateKoiFishInformation";
import AppointmentList from "./pages/customer/screens/appointmentList/AppointmentList";
import UpdatePersonalInformation from "./pages/customer/screens/updatePersonalInformation/updatePersonalInformation";
import Feedback from "./pages/customer/screens/feedback/feedback";
// import UploadPersonalImage from "./pages/customer/screens/uploadPersonalImage/uploadPersonalImage";

//Guest
import GuestHome from "./pages/guest/guestHome/guestHome";
import GuestContact from "./pages/guest/guestContact/guestContact";
import GuestDoctorNews from "./pages/guest/guestDoctorNews/guestDoctorNews";
import Profile from "./pages/customer/screens/profile/profile";

// import UpdatePersonalInformation from "./pages/customer/screens/updatePersonalInformation/updatePersonalInformation";
import UploadPersonalImage from "./pages/customer/screens/uploadPersonalImage/uploadPersonalImage";
import VetWorkingSchedule from "./pages/vet/screens/vetWorkingSchedule/vetWorkingSchedule";
import VetDetailSchedule from "./pages/vet/screens/vetDetailSchedule/vetDetailSchedule";
import AllFeedback from "./pages/customer/screens/allFeedback/allFeedback";
// import CreateWorkingSchedule from "./pages/admin/screens/createWorkingSchedule/createWorkingSchedule";

// import UpdatePersonalInformation from "./pages/customer/screens/updatePersonalInformation/updatePersonalInformation";
// import UploadPersonalImage from "./pages/customer/screens/uploadPersonalImage/uploadPersonalImage";
// import CreateWorkingSchedule from "./pages/admin/screens/createWorkingSchedule/createWorkingSchedule";

const router = createBrowserRouter([
  //Guest
  {
    path: "/",
    element: <GuestHome />,
    errorElement: <Error404 />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },

      {
        path: "guestdoctors",
        element: <GuestDoctorNews />,
      },
      {
        path: "guestservice",
        element: <GuestServiceKoifish />,
      },
      {
        path: "guestcontact",
        element: <GuestContact />,
      },
    ],
  },

  {
    path: "/serviceInformation",
    element: <ServiceInformation />,
  },
  // {
  //   path: "",
  //   element: <LandingPage />,
  // },
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
  {
    path: "/verifyAccount",
    element: <VerifyAccount />,
  },
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
        element: <AccountTable direction="admin" />,
      },
      {
        path: "dashboardDetail",
        element: <AdminDashboardDetail />,
      },
      {
        path: "account",
        element: <AccountTable direction="admin" />,
      },
      {
        path: "appointmentManagement",
        element: <AppointmentManagement direction="admin" />,
      },
      {
        path: "tankList",
        element: <TankList direction="admin" />,
      },
      {
        path: "serviceType",
        element: <ServiceTypeList direction="admin" />,
      },
      {
        path: "createStaffAccount",
        element: <CreateStaffAccount />,
      },
      {
        path: "createTank",
        element: <CreateTank />,
      },
      {
        path: "createTravelExpense",
        element: <CreateTravelExpense />,
      },
      {
        path: "travelExpenseList",
        element: <TravelExpenseList direction="admin" />,
      },
      {
        path: "createServiceType",
        element: <CreateServiceType />,
      },
      {
        path: "createServiceCenter",
        element: <CreateServiceCenter />,
      },
      {
        path: "listServiceCenter",
        element: <ListServiceCenter direction="admin" />,
      },
      {
        path: "serviceCenter",
        element: <ServiceCenter direction="admin" />,
      },
      {
        path: "createVetAccount",
        element: <CreateVetAccount />,
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
      {
        path: "workingSchedule",
        element: <WorkingSchedule direction="staff" />,
      },
      {
        path: "createWorkingSchedule",
        element: <CreateWorkingSchedule />,
      },
      {
        path: "updateWorkingSchedule",
        element: <UpdateWorkingSchedule direction="staff" />,
      },
      {
        path: "tankList",
        element: <TankList direction="staff" />,
      },
      {
        path: "serviceType",
        element: <ServiceTypeList direction="staff" />,
      },
      {
        path: "createTank",
        element: <CreateTank />,
      },
      {
        path: "createTravelExpense",
        element: <CreateTravelExpense />,
      },
      {
        path: "travelExpenseList",
        element: <TravelExpenseList direction="staff" />,
      },
      {
        path: "createServiceType",
        element: <CreateServiceType />,
      },
      {
        path: "createServiceCenter",
        element: <CreateServiceCenter />,
      },
      {
        path: "listServiceCenter",
        element: <ListServiceCenter direction="staff" />,
      },
      {
        path: "serviceCenter",
        element: <ServiceCenter direction="staff" />,
      },
      {
        path: "appointmentManagement",
        element: <AppointmentManagement direction="staff" />,
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
      // {
      //   path: "service",
      //   element: <ServiceHome direction="customer" />,
      //   children: [
      //     {
      //       path: "",
      //       element: <ServiceKoifish direction="customer" />,
      //     },
      //     {
      //       path: "createKoiFishAppointment",
      //       element: <CreateKoiFishAppointment />,
      //     },
      //   ],
      // },
      {
        path: "service",
        element: <ServiceKoifish direction="customer" />,
      },
      {
        path: "createKoiFishAppointment",
        element: <CreateKoiFishAppointment direction="customer" />,
      },

      {
        path: "personalInformation",
        element: <PersonalInformation direction="customer" />,
      },
      {
        path: "serviceInformation",
        element: <ServiceInformation direction="customer" />,
      },
      {
        path: "serviceInformation/inputPayment",
        element: <InputPayment />,
      },
      {
        path: "contactUs",
        element: <ContactUs />,
      },
      {
        path: "doctors",
        element: <DoctorOnNewsPage direction="customer" />,
      },
      {
        path: "addMoreFish",
        element: <AddMoreFish />,
      },
      {
        path: "updateKoiFishInformation",
        element: <UpdateKoiFishInformation />,
      },
      {
        path: "appointmentList",
        element: <AppointmentList direction="customer" />,
      },
      {
        path: "updatePersonalInformation",
        element: <UpdatePersonalInformation direction="customer" />,
      },
      // {
      //   path: "uploadPersonalImage",
      //   element: <UploadPersonalImage direction="customer"/>,
      // },
      {
        path: "profile",
        element: <Profile direction="customer" />,
      },
      {
        path: "feedback",
        element: <Feedback direction="customer" />,
      },
      {
        path: "allFeedback",
        element: <AllFeedback direction="customer" />,
      },
    ],
  },
  //VET
  {
    path: "/vet",
    element: <VetHome />,
    errorElement: <Error404 />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      // {
      //   path: "service",
      //   element: <ServiceHome direction="customer" />,
      //   children: [
      //     {
      //       path: "",
      //       element: <ServiceKoifish direction="customer" />,
      //     },
      //     {
      //       path: "createKoiFishAppointment",
      //       element: <CreateKoiFishAppointment />,
      //     },
      //   ],
      // },

      {
        path: "personalInformation",
        element: <PersonalInformation direction="vet" />,
      },

      {
        path: "contactUs",
        element: <ContactUs />,
      },
      {
        path: "doctors",
        element: <DoctorOnNewsPage direction="vet" />,
      },

      {
        path: "appointmentList",
        element: <AppointmentList direction="vet" />,
      },
      {
        path: "updatePersonalInformation",
        element: <UpdatePersonalInformation direction="vet" />,
      },
      {
        path: "appointmentByCurrentVet",
        element: <AppointmentByCurrentVet direction="vet" />,
      },
      {
        path: "vetWorkingSchedule",
        element: <VetWorkingSchedule direction="vet" />,
      },
      {
        path: "profile",
        element: <Profile direction="vet" />,
      },
      {
        path: "vetDetailSchedule",
        element: <VetDetailSchedule direction="vet" />,
      },

      // {
      //   path: "uploadPersonalImage",
      //   element: <UploadPersonalImage direction="customer"/>,
      // },
    ],
  },

  //VET
  {
    path: "/vet",
    element: <VetHome />,
    errorElement: <Error404 />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      // {
      //   path: "service",
      //   element: <ServiceHome direction="customer" />,
      //   children: [
      //     {
      //       path: "",
      //       element: <ServiceKoifish direction="customer" />,
      //     },
      //     {
      //       path: "createKoiFishAppointment",
      //       element: <CreateKoiFishAppointment />,
      //     },
      //   ],
      // },

      {
        path: "personalInformation",
        element: <PersonalInformation direction="vet" />,
      },

      {
        path: "contactUs",
        element: <ContactUs />,
      },
      {
        path: "doctors",
        element: <DoctorOnNewsPage direction="vet" />,
      },

      {
        path: "appointmentList",
        element: <AppointmentList direction="vet" />,
      },
      {
        path: "updatePersonalInformation",
        element: <UpdatePersonalInformation direction="vet" />,
      },
      {
        path: "appointmentByCurrentVet",
        element: <AppointmentByCurrentVet direction="vet" />,
      },
      {
        path: "medicalrecordList",
        element: <MedicalRecordList direction="vet" />,
      },
      {
        path: "createMedicalRecord",
        element: <CreateMedicalRecord />,
      },
      // {
      //   path: "uploadPersonalImage",
      //   element: <UploadPersonalImage direction="customer"/>,
      // },
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
