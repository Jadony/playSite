import request from "@/utils/request";
import axios from "axios";

const api = {
  existEmail: "/front/user/exist/email",
  registerEmail: "/front/user/register/email",
  sendEmailCode: "/front/verify-code/send",
  emailCodeCheck: "/front/verify-code/check",
  loginEmail: "/front/user/login/email",
  loginGoogle: "/front/user/login/google",
  userAchievements: "/front/profile/achievements",
  getUserInfo: "/front/profile/me",
  updateUserInfo: "/front/profile/update",
  setPassword: "/front/profile/set-password",
  bindEmail: "/front/profile/bind-email",
  orderList: "/front/orders/list",
  orderDetail: "/front/orders/detail",
  userCoupons: "/front/profile/coupons",
  redeemInOrder: "/front/coupons/redeem-in-order",
  countryAll: "/front/country/all",
  inviteActivity: "/front/invite/activity",
  purchasedGames: "/front/games/purchased",
  orderRefresh: "/front/orders/refresh",
  orderCancel: "/front/orders/cancel",
};

export const existEmail = (params: ExistEmailRequestParams) => {
  return request<ExistEmailResponseData>({
    url: api.existEmail,
    method: "get",
    params,
  });
};

export const registerEmail = (params: RegisterEmailRequestParams) => {
  return request<RegisterEmailResponseData>({
    url: api.registerEmail,
    method: "post",
    params,
  });
};

export const sendEmailCode = (params: SendEmailCodeRequestParams) => {
  return request<SendEmailCodeResponseData>({
    url: api.sendEmailCode,
    method: "post",
    params,
  });
};

export const emailCodeCheck = (params: EmailCodeCheckRequestParams) => {
  return request<EmailCodeCheckResponseData>({
    url: api.emailCodeCheck,
    method: "post",
    params,
  });
};

export const loginEmail = (params: LoginEmailRequestParams) => {
  return request<LoginEmailResponseData>({
    url: api.loginEmail,
    method: "post",
    params,
  });
};

export const loginGoogle = (params: LoginGoogleRequestParams) => {
  return request<LoginGoogleResponseData>({
    url: api.loginGoogle,
    method: "post",
    params,
  });
};

export const getGoogleUserInfo = (params: { accessToken: string }) => {
  return axios.create().get("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${params.accessToken}` },
  });
};

export const getUserAchievements = () => {
  return request<UserAchievementsResponseData[]>({
    url: api.userAchievements,
    method: "get",
  });
};

export const getUserInfo = () => {
  return request<UserInfoResponseData>({
    url: api.getUserInfo,
    method: "get",
  });
};

export const updateUserInfo = (params: UpdateUserInfoRequestParams) => {
  return request<boolean>({
    url: api.updateUserInfo,
    method: "post",
    params,
  });
};

export const setNewPassword = (params: SetPasswordRequestParams) => {
  return request<boolean>({
    url: api.setPassword,
    method: "post",
    params,
  });
};

export const bindEmail = (params: BindEmailRequestParams) => {
  return request<boolean>({
    url: api.bindEmail,
    method: "post",
    params,
  });
};

export const getOrderList = (params: OrderListRequestParams) => {
  return request<OrderListResponseData>({
    url: api.orderList,
    method: "post",
    params,
  });
};

export const getOrderDetail = (orderId: string) => {
  return request<OrderDetailResponseData>({
    url: api.orderDetail + "/" + orderId,
    method: "get",
  });
};

export const getUserCoupons = (params: { currency?: string }) => {
  return request<UserCouponsResponseData[]>({
    url: api.userCoupons,
    method: "get",
    params,
  });
};

export const redeemInOrder = (params: {
  redeemCode: string;
  currency?: string;
}) => {
  return request<UserCouponsResponseData>({
    url: api.redeemInOrder,
    method: "post",
    params,
  });
};

export const getCountryAll = () => {
  return request<CountryAllResponseData>({
    url: api.countryAll,
    method: "get",
  });
};

export const getInviteActivity = () => {
  return request<GetInviteActivity>({
    url: api.inviteActivity,
    method: "get",
  });
};

export const getPurchasedGames = (params: { limit: number } = { limit: 3 }) => {
  return request<Game[]>({
    url: api.purchasedGames,
    method: "get",
    params,
  });
};

export const orderRefresh = (orderId: string) => {
  return request<OrderDetailResponseData>({
    url: api.orderRefresh + "/" + orderId,
    method: "get",
  });
};

export const orderCancel = (orderId: string) => {
  return request<boolean>({
    url: api.orderCancel + "/" + orderId,
    method: "get",
  });
};
