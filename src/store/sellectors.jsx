export const userDetailSelector = (state) => state.userDetail.entities; //lấy ở verify user Detail
export const userDataSelector = (state) => state.userData.entities;
export const staffsSelector = (state) => state.staffs.entities;

export const allAccountsSelector = (state) => state.allAccounts.entities; //allAccountUsers
export const allTanksSelector = (state) => state.allTanks.entities; //allAccountUsers
export const currentappointmentSelector = (state) => state.currentappointment.entities; //allAccountUsers
export const allServicesTypeSelector = (state) => state.allServicesType.entities; //allAccountUsers
export const totalUserssSelector = (state) => state.totalUsers.entities; //allAccountUsers
export const totalStaffssSelector = (state) => state.totalStaffs.entities; //allAccountUsers
export const totalVetssSelector = (state) => state.totalVets.entities; //allAccountUsers
export const totalVetsDetailsSelector = (state) => state.totalVetsDetail.entities; //allAccountUsers
export const allVerifyUsersSelector = (state) => state.allVerifyUsers.entities; //allVerifyUsers
export const paymentSelector = (state) => state.payment.entities;



export const  allKoiByAccountIdSelector =(state) => state.allKoiByAccountId.entities;//allKoiByAccountId
export const  allKoiByIdSelector =(state) => state.allKoiById.entities;//allKoiById

export const  allServicesSelector =(state) => state.allServices.entities;

export const currentUserAppointmentsSelector = (state) => state. currentUserAppointments.entities;

export const  vetDetailSelector =(state) => state.vetDetail.entities;

export const petDetailSelector = (state) => state.petDetail.entities;
export const petsFromShopSelector = (state) => state.petsFromShop.entities;
export const petsFromAreaSelector = (state) => state.petsFromArea.entities;

export const petCoffeeShopDetailSelector = (state) =>
  state.petCoffeeShopDetail.entities;
export const allPetCoffeeShopsSelector = (state) =>
  state.allPetCoffeeShops.entities;
export const petCoffeeShopsSelector = (state) => state.petCoffeeShops.entities;
export const petCoffeeShopTaxCodeSelector = (state) =>
  state.petCoffeeShopTaxCode.entities;
export const popularPetCoffeeShopsSelector = (state) =>
  state.popularPetCoffeeShops.entities;
export const randomPetCoffeeShopsSelector = (state) =>
  state.randomPetCoffeeShops.entities;

export const allFollowShopsSelector = (state) => state.allFollowShops.entities;

export const areasFromShopSelector = (state) => state.areasFromShop.entities;
export const areaDetailSelector = (state) => state.areaDetail.entities;

export const momentsFromPetSelector = (state) => state.momentsFromPet.entities;
export const momentDetailSelector = (state) => state.momentDetail.entities;

export const eventDetailSelector = (state) => state.eventDetail.entities;
export const eventsFromShopSelector = (state) => state.eventsFromShop.entities;
export const eventDetailForCustomerSelector = (state) =>
  state.eventDetailForCustomer.entities;
export const joinEventsSelector = (state) => state.joinEvents.entities;
export const allEventSubmitsSelector = (state) =>
  state.allEventSubmits.entities;

export const vaccinationsFromPetSelector = (state) =>
  state.vaccinationsFromPet.entities;

export const vaccinationDetailSelector = (state) =>
  state.vaccinationDetail.entities;

export const postDetailSelector = (state) => state.postDetail.entities;
export const postSelector = (state) => state.post.entities;
export const totalPostSelector = (state) => state.totalPost.entities;
export const totalAmountsSelector = (state) => state.totalAmounts.entities;
export const AmountsSelector = (state) => state.Amounts.entities;


export const replySelector = (state) => state.reply.entities;
export const commentSelector = (state) => state.comment.entities;
export const commentDetailSelector = (state) => state.commentDetail.entities;

export const postCategorySelector = (state) => state.postCategory.entities;
export const postCategoryDetailSelector = (state) =>
  state.postCategoryDetail?.entities || [];

export const allItemsSelector = (state) => state.allItems.entities;
export const itemDetailSelector = (state) => state.itemDetail.entities;
export const itemsFromUserSelector = (state) => state.itemsFromUser.entities;

export const walletSelector = (state) => state.wallet.entities;
export const walletDetailSelector = (state) => state.walletDetail.entities;
export const managerIncomeSelector = (state) => state.managerIncome.entities;
export const managerOutcomeSelector = (state) => state.managerOutcome.entities;
export const shopMonthIncomeSelector = (state) =>
  state.shopMonthIncome.entities;
export const managerMonthIncomeSelector = (state) =>
  state.managerMonthIncome.entities;
export const managerMonthOutcomeSelector = (state) =>
  state.managerMonthOutcome.entities;
export const shopMonthOutcomeSelector = (state) =>
  state.shopMonthOutcome.entities;
export const shopOutcomeSelector = (state) => state.shopOutcome.entities;
export const shopIncomeSelector = (state) => state.shopIncome.entities;
export const platformIncomeSelector = (state) => state.platformIncome.entities;
export const platformMonthIncomeSelector = (state) =>
  state.platformMonthIncome.entities;

export const packagesSelector = (state) => state.packages.entities; //GetAllSubscription
export const totalBuySelector = (state) => state.totalBuy.entities; //GetAllSubscription
export const totalBuyPrioritySubsSelector = (state) => state.totalBuyPrioritySubs.entities; //GetAllSubscription
export const totalBuyStandardSubsSelector = (state) => state.totalBuyStandardSubs.entities; //GetAllSubscription

export const allCancelAmountSelector = (state) => state.cancelAmount.entities; //getCancelledAmount
export const allPriceAmountSelector = (state) => state.priceAmount.entities; //getPriceAmount

export const packageDetailSelector = (state) => state.packageDetail.entities;

export const allReportsSelector = (state) => state.allReports.entities;
export const allPostReportsSelector = (state) => state.allPostReports.entities;

export const userReportsSelector = (state) => state.userReports.entities;
export const postReportsSelector = (state) => state.postReports.entities;

export const shopReportsSelector = (state) => state.shopReports.entities;

export const transactionDetailSelector = (state) =>
  state.transactionDetail.entities;
export const transactionsFromShopSelector = (state) =>
  state.transactionsFromShop.entities;

export const allOrdersSelector = (state) => state.allOrders.entities;
export const ordersFromShopSelector = (state) => state.ordersFromShop.entities;
export const orderDetailSelector = (state) => state.orderDetail.entities;

export const allNotificationsSelector = (state) =>
  state.allNotifications.entities;
export const unreadNotificationsSelector = (state) =>
  state.unreadNotifications.entities;

export const promotionDetailSelector = (state) =>
  state.promotionDetail.entities;
export const promotionsFromShopSelector = (state) =>
  state.promotionsFromShop.entities;

export const productDetailSelector = (state) => state.productDetail.entities;
export const productsFromShopSelector = (state) =>
  state.productsFromShop.entities;


