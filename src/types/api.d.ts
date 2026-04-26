// import { OrderStatus } from "@/components/OrderDetailContent";

type ExistEmailRequestParams = {
  email: string;
};

type ExistEmailResponseData = {
  exist: boolean;
  fetchGoogle: boolean;
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
  currency: string;
};

type AllGamesRequestParams = {
  pageSize?: number;
  pageNum?: number;
  keyword?: string;
  currency?: string;
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
  currency: string;
};

type GameDetailResponseData = {
  gameId: number;
  gameName: string;
  code: string;
  iconUrl: string;
  maxDiscount: number;
  frontBgImage: string;
  behindBgImage: string;
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
  userId: string;
  nickname: string;
  email: string;
  avatar: string;
  gender: string;
  birthday: string;
  inviteCode: string;
  channelName: string;
  thirdPartyType: string;
  fetchPassword: boolean;
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
  current: number;
  pages: number;
  records: {
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
  }[];
  size: number;
  total: number;
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
  skuId: string;
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

type CalculateRequestParams = {
  skuId: number;
  quantity: number;
  couponId?: number;
  orderAmount?: number;
  currency?: string;
};

type CalculateResponseData = {
  originalPrice: number;
  platformPrice: number;
  platformDiscount: number;
  couponDiscount: number;
  totalDiscount: number;
  finalPrice: number;
  selectedCoupon: {
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
  availableCoupons: {
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
  }[];
};

type AvailableForOrderParams = {
  orderAmount: string;
  currency?: string;
};

type AvailableForOrderResponseData = {
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

type CountryConfigs = {
  id: number;
  countryName: string;
  languageName: string;
  displayLanguage: string;
  currency: string;
  unit: string;
  status: number;
  exchange: number;
  createdAt: string;
  updatedAt: string;
};

type CountryAllResponseData = {
  countryConfigs: CountryConfigs[];
  currentCountry: string;
  currentLanguage: string;
  currentCurrency: string;
  currentUnit: string;
};

type GetInviteActivity = {
  inviteCode: string;
  inviteUrl: string;
  totalInviteCount: number;
  invitedUsers: {
    userId: number;
    nickname: string;
    avatar: string;
    registerTime: string;
  }[];
  rewardProgress: {
    targetCount: number;
    rewardDesc: string;
    rewardType: string;
    rewardValue: string;
    achieved: boolean;
    claimed: boolean;
  }[];
};

type RecentOrdersParams = {
  skuId: number;
};

type RecentOrdersResponseData = {
  avatar: string;
  nickname: string;
  finishedTime: string;
};

type CreateOrderParams = {
  skuId: number;
  couponUserId?: number;
  uId?: string;
  serverInfo?: string;
};

type CreateOrderResponseData = {
  orderNo: string;
};
