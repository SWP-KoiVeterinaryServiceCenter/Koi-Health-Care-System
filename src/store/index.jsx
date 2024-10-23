import { configureStore } from "@reduxjs/toolkit";

import { userDetailSlice } from "./features/user.slice/userDetail.slice";
import { userDataSlice } from "./features/user.slice/userData.slice";

import { staffsSlice } from "./features/user.slice/staffs.slice";
import { allAccountsSlice } from "./features/user.slice/allAccounts.slice";
import { allTanksSlice } from "./features/tank.slice/allTank.slice";
import { currentappointmentSlice } from "./features/appointment.slice/currentappointment.slice";
import { allappointmentSlice } from "./features/appointment.slice/allUserAppointments.slice";
import { appointmentByCurrentVetSlice } from "./features/appointment.slice/appointmentByCurrentVet.slice";
import { allServicesTypeSlice } from "./features/serviceKoi.slice/getAllServicesType.slice";
import { paymentSlice  } from "./features/payment.slice/payment.slice";

import { totalUsersSlice } from "./features/user.slice/totalUsers.slice";

import { totalStaffsSlice } from "./features/user.slice/totalStaffs.slice";
import { totalVetsSlice } from "./features/user.slice/totalVets.slice";
import { totalVetsDetailSlice } from "./features/user.slice/totalVetsDetail.slice";

import { allVerifyUsersSlice } from "./features/user.slice/allVerifyUsers.slice"; //allVerifyUsers

import { petDetailSlice } from "./features/pet.slice/petDetail.slice";
import { petsFromShopSlice } from "./features/pet.slice/petsFromShop.slice";
import { petsFromAreaSlice } from "./features/pet.slice/petsFromArea.slice";

import { areasFromShopSlice } from "./features/area.slice/areasFromShop.slice";
import { areaDetailSlice } from "./features/area.slice/areaDetail.slice";

import { eventDetailSlice } from "./features/event.slice/eventDetail.slice";
import { eventsFromShopSlice } from "./features/event.slice/eventsFromShop.slice";
import { eventDetailForCustomerSlice } from "./features/event.slice/eventDetailForCustomer.slice";
import { joinEventsSlice } from "./features/event.slice/joinEvents.slice";
import { allEventSubmitsSlice } from "./features/event.slice/allEventSubmits.slice";

import { commentSlice } from "./features/comment.slice/comment.slice";
import { replySlice } from "./features/comment.slice/reply.slice";
import { commentDetailSlice } from "./features/comment.slice/commentDetail.slice";
import { postCategorySlice } from "./features/postCategory.slice/postCategory.slice";
import { postCategoryDetailSlice } from "./features/postCategory.slice/postCategoryDetail.slice";

import { petCoffeeShopDetailSlice } from "./features/petCoffeeShop.slice/petCoffeeShopDetail.slice";
import { allPetCoffeeShopsSlice } from "./features/petCoffeeShop.slice/allPetCoffeeShops.slice";
import { petCoffeeShopsSlice } from "./features/petCoffeeShop.slice/petCoffeeShops.slice";
import { petCoffeeShopTaxCodeSlice } from "./features/petCoffeeShop.slice/petCoffeeShopTaxCode.slice";
import { popularPetCoffeeShopsSlice } from "./features/petCoffeeShop.slice/popularPetCoffeeShops.slice";
import { randomPetCoffeeShopsSlice } from "./features/petCoffeeShop.slice/randomPetCoffeeShops.slice";

import { postDetailSlice } from "./features/post.slice/postDetail.slice";
import { postSlice } from "./features/post.slice/post.slice";
import { totalPostSlice } from "./features/post.slice/totalPost.slice";
import { totalAmountsSlice } from "./features/wallet.slice/totalAmounts.slice";
import { AmountsSlice } from "./features/wallet.slice/amounts.slice";

import { allFollowShopsSlice } from "./features/followPetCoffeeShop.slice/allFollowShops.slice";

import { allItemsSlice } from "./features/item.slice/allItems.slice";
import { itemDetailSlice } from "./features/item.slice/itemDetail.slice";
import { itemsFromUserSlice } from "./features/item.slice/itemsFromUser.slice";

import { walletSlice } from "./features/wallet.slice/wallet.slice";
import { walletDetailSlice } from "./features/wallet.slice/walletDetail.slice";
import { managerIncomeSlice } from "./features/wallet.slice/managerIncome.slice";
import { managerOutcomeSlice } from "./features/wallet.slice/managerOutcome.slice";
import { managerMonthIncomeSlice } from "./features/wallet.slice/managerMonthIncome.slice";
import { managerMonthOutcomeSlice } from "./features/wallet.slice/managerMonthOutcome.slice";
import { shopMonthIncomeSlice } from "./features/wallet.slice/shopMonthIncome.slice";
import { shopMonthOutcomeSlice } from "./features/wallet.slice/shopMonthOutcome.slice";
import { shopOutcomeSlice } from "./features/wallet.slice/shopOutcome.slice";
import { shopIncomeSlice } from "./features/wallet.slice/shopIncome.slice";
import { platformIncomeSlice } from "./features/wallet.slice/platformIncome.slice";
import { platformMonthIncomeSlice } from "./features/wallet.slice/platformMonthIncome.slice";

import { cancelSlice } from "./features/policy.slice/cancelAmount.slice";
import { priceSlice } from "./features/policy.slice/priceAmount.slice";



import { packagesSlice } from "./features/package.slice/packages.slice";
import { packageDetailSlice } from "./features/package.slice/packageDetail.slice";
import { totalBuySlice } from "./features/package.slice/totalBuy.slice";
import { totalBuyStandardSubsSlice } from "./features/package.slice/totalBuyStandardSubs.slice";
import { totalBuyPrioritySubsSlice } from "./features/package.slice/totalBuyPrioritySubs.slice";

import { allReportsSlice } from "./features/report.slice/allReports.slice";
import { allPostReportsSlice } from "./features/report.slice/allPostReports.slice";

import { userReportsSlice } from "./features/report.slice/reportUser.slice";
import { postReportsSlice } from "./features/report.slice/reportPost.slice";



import { shopReportsSlice } from "./features/report.slice/shopReports.slice";

import { transactionDetailSlice } from "./features/transaction.slice/transactionDetail.slice";
import { transactionsFromShopSlice } from "./features/transaction.slice/transactionsFromShop.slice";

import { allOrdersSlice } from "./features/order.slice/allOrders.slice";
import { ordersFromShopSlice } from "./features/order.slice/ordersFromShop.slice";
import { orderDetailSlice } from "./features/order.slice/orderDetail.slice";

import { allNotificationsSlice } from "./features/notification.slice/allNotifications.slice";
import { unreadNotificationsSlice } from "./features/notification.slice/unreadNotifications.slice";

import { promotionDetailSlice } from "./features/promotion.slice/promotionDetail.slice";
import { promotionsFromShopSlice } from "./features/promotion.slice/promotionsFromShop.slice";

import { productDetailSlice } from "./features/product.slice/productDetail.slice";
import { productsFromShopSlice } from "./features/product.slice/productsFromShop.slice";

import { allKoiByAccountIdSlice } from "./features/koi.slice/koiByAccountId.slice";
import { allKoiByIdSlice } from "./features/koi.slice/koiById.slice";

import { allServicesSlice } from "./features/serviceKoi.slice/getAllServices.slice";

import { vetDetailSlice } from "./features/user.slice/vetDetail.slice"; 

import { currentUserAppointmentsSlice } from "./features/appointment.slice/currentUserAppointments.slice";

import { allWorkingScheduleSlice } from "./features/schedule.slice/getAllWorkingSchedule.slice";

export const store = configureStore({
  reducer: {
    userDetail: userDetailSlice.reducer,
    userData: userDataSlice.reducer,
    staffs: staffsSlice.reducer,
    allAccounts: allAccountsSlice.reducer,
    allTanks: allTanksSlice.reducer,
    currentappointment: currentappointmentSlice.reducer,
    allappointment: allappointmentSlice.reducer,
    appointmentByCurrentVet: appointmentByCurrentVetSlice.reducer,
    allServicesType: allServicesTypeSlice.reducer,
    payment: paymentSlice .reducer,
    totalUsers: totalUsersSlice.reducer,
    totalStaffs: totalStaffsSlice.reducer,
    totalVets: totalVetsSlice.reducer,
    totalVetsDetail: totalVetsDetailSlice.reducer,
    allVerifyUsers: allVerifyUsersSlice.reducer,

    allKoiByAccountId : allKoiByAccountIdSlice.reducer,
    allKoiById: allKoiByIdSlice.reducer,

    allServices: allServicesSlice.reducer,
    vetDetail: vetDetailSlice.reducer,

    currentUserAppointments: currentUserAppointmentsSlice.reducer,

    allWorkingSchedule : allWorkingScheduleSlice.reducer,

    petDetail: petDetailSlice.reducer,
    petsFromShop: petsFromShopSlice.reducer,
    petsFromArea: petsFromAreaSlice.reducer,

    petCoffeeShopDetail: petCoffeeShopDetailSlice.reducer,
    allPetCoffeeShops: allPetCoffeeShopsSlice.reducer,
    petCoffeeShops: petCoffeeShopsSlice.reducer,
    petCoffeeShopTaxCode: petCoffeeShopTaxCodeSlice.reducer,
    popularPetCoffeeShops: popularPetCoffeeShopsSlice.reducer,
    randomPetCoffeeShops: randomPetCoffeeShopsSlice.reducer,

    allFollowShops: allFollowShopsSlice.reducer,

    reply: replySlice.reducer,
    comment: commentSlice.reducer,
    commentDetail: commentDetailSlice.reducer,

    postCategory: postCategorySlice.reducer,
    postCategoryDetailSlice: postCategoryDetailSlice.reducer,

    areasFromShop: areasFromShopSlice.reducer,
    areaDetail: areaDetailSlice.reducer,

    eventDetail: eventDetailSlice.reducer,
    eventsFromShop: eventsFromShopSlice.reducer,
    eventDetailForCustomer: eventDetailForCustomerSlice.reducer,
    joinEvents: joinEventsSlice.reducer,
    allEventSubmits: allEventSubmitsSlice.reducer,

    postDetail: postDetailSlice.reducer,
    post: postSlice.reducer,
    totalPost: totalPostSlice.reducer,
    totalAmounts: totalAmountsSlice.reducer,
    Amounts: AmountsSlice.reducer,

    allItems: allItemsSlice.reducer,
    itemDetail: itemDetailSlice.reducer,
    itemsFromUser: itemsFromUserSlice.reducer,

    wallet: walletSlice.reducer,
    walletDetail: walletDetailSlice.reducer,
    shopMonthIncome: shopMonthIncomeSlice.reducer,
    managerMonthIncome: managerMonthIncomeSlice.reducer,
    managerMonthOutcome: managerMonthOutcomeSlice.reducer,
    shopMonthOutcome: shopMonthOutcomeSlice.reducer,
    managerIncome: managerIncomeSlice.reducer,
    managerOutcome: managerOutcomeSlice.reducer,
    shopOutcome: shopOutcomeSlice.reducer,
    shopIncome: shopIncomeSlice.reducer,
    platformIncome: platformIncomeSlice.reducer,
    platformMonthIncome: platformMonthIncomeSlice.reducer,

    packages: packagesSlice.reducer,


    cancelAmount: cancelSlice.reducer,
    priceAmount: priceSlice.reducer,


    packageDetail: packageDetailSlice.reducer,
    totalBuy: totalBuySlice.reducer,
    totalBuyPrioritySubs: totalBuyPrioritySubsSlice.reducer,
    totalBuyStandardSubs: totalBuyStandardSubsSlice.reducer,

    allReports: allReportsSlice.reducer,
    allPostReports: allPostReportsSlice.reducer,




    userReports: userReportsSlice.reducer,
    postReports: postReportsSlice.reducer,
    
    shopReports: shopReportsSlice.reducer,

    transactionDetail: transactionDetailSlice.reducer,
    transactionsFromShop: transactionsFromShopSlice.reducer,

    allOrders: allOrdersSlice.reducer,
    ordersFromShop: ordersFromShopSlice.reducer,
    orderDetail: orderDetailSlice.reducer,

    allNotifications: allNotificationsSlice.reducer,
    unreadNotifications: unreadNotificationsSlice.reducer,

    promotionDetail: promotionDetailSlice.reducer,
    promotionsFromShop: promotionsFromShopSlice.reducer,

    productDetail: productDetailSlice.reducer,
    productsFromShop: productsFromShopSlice.reducer,
  },
});
