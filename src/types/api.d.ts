// import { OrderStatus } from "@/components/OrderDetailContent";

type ExistEmailRequestParams = {
  email: string;
};

type ExistEmailResponseData = {
  fetchGoogle: boolean;
  data: boolean;
};

type RegisterEmailRequestParams = {
  email: string;
  password: string;
  nickname?: string;
  invitationCode?: string;
};

type RegisterEmailResponseData = {
  userId: string;
  nickname: string;
  avatar: string;
  email: string;
  token: string;
};

type SendEmailCodeRequestParams = {
  email: string;
  scene?: string;
};

type SendEmailCodeResponseData = boolean;

type EmailCodeCheckRequestParams = {
  email: string;
  code: string;
  scene?: string;
};

type EmailCodeCheckResponseData = boolean;

type LoginEmailRequestParams = {
  account: string;
  password: string;
};

type LoginEmailResponseData = {
  userId: string;
  nickname: string;
  avatar: string;
  email: string;
  token: string;
};

type LoginGoogleRequestParams = {
  accessToken: string;
  googleId: string;
  email?: string;
  nickname?: string;
  avatar?: string;
  inviteCode?: string;
};

type LoginGoogleResponseData = {
  userId: string;
  nickname: string;
  avatar: string;
  email: string;
  token: string;
};

type HotGamesRequestParams = {
  limit: number;
};

type AllGamesRequestParams = {
  pageSize?: number;
  pageNum?: number;
  keyword?: string;
};

type AllGamesResponseData = {
  records: Game[];
  total: number;
  size: number;
  current: number;
  orders: [
    {
      column: string;
      asc: boolean;
    },
  ];
  optimizeCountSql: boolean;
  searchCount: boolean;
  optimizeJoinOfCountSql: boolean;
  maxLimit: number;
  countId: string;
};

type GameDetailRequestParams = {
  gameId: number;
};

type GameDetailResponseData = {
  gameId: number;
  gameName: string;
  code: string;
  iconUrl: string;
  maxDiscount: number;
  skuList: GameItem[];
};

type UserAchievementsResponseData = {
  id: number;
  achievementCode: string;
  achievementName: string;
  achievementDesc: string;
  achievementIcon: string;
  unlockTime: string;
};

type UserInfoResponseData = {
  userId: number;
  nickname: string;
  email: string;
  avatar: string;
  gender: string;
  birthday: string;
  inviteCode: string;
  channelName: string;
  thirdPartyType: string;
};

type UpdateUserInfoRequestParams = {
  nickname?: string;
  gender?: string;
  birthday?: string;
  avatar?: string;
};

type SetPasswordRequestParams = {
  newPassword: string;
  confirmPassword: string;
  code?: string;
};

type BindEmailRequestParams = {
  email: string;
  code: string;
};

type OrderListRequestParams = {
  status: string;
};

type OrderListResponseData = {
  orderId: number;
  orderNo: string;
  gameName: string;
  skuName: string;
  skuImage: string;
  quantity: number;
  orderAmount: number;
  status: OrderStatus;
  statusDesc: string;
  createTime: string;
};

type OrderDetailResponseData = {
  orderId: number;
  orderNo: string;
  gameName: string;
  skuName: string;
  skuImage: string;
  quantity: number;
  gameUid: string;
  gameServer: string;
  paymentMethod: string;
  originalPrice: number;
  platformPrice: number;
  discountAmount: number;
  orderAmount: number;
  status: OrderStatus;
  statusDesc: string;
  createTime: string;
  payTime: string;
  completeTime: string;
  remainingPaySeconds: number;
};

type OrderStatus =
  | "CANCELLED" // 已取消
  | "PROCESSING" // 进行中
  | "REFUNDING" // 退款售后
  // | "pending" // 待处理
  | "PENDING" // 支付中
  | "COMPLETED"; // 完成

type UserCouponsResponseData = {
  id: number;
  couponCode: string;
  couponName: string;
  couponType: string;
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount: number;
  validFrom: string;
  validTo: string;
  status: number;
  statusDesc: string;
  rules: string;
  source: string;
  remainingSeconds: number;
  available: boolean;
};
