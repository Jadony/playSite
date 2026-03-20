type Game = {
  spine?: {
    json: string;
    atlas: string;
    png: string;
    frontBgImage?: string;
    behindBgImage?: string;
    footerImage?: string;
  };
  gameId: number;
  gameName: string;
  code?: string;
  iconUrl?: string;
  maxDiscount?: number;
  purchased?: boolean;
  orderCount?: number;
};
