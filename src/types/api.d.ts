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
