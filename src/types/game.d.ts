type Game = {
  spine?: {
    json: string;
    atlas: string;
    png: string;
  };
  gameId: number;
  gameName: string;
  code?: string;
  iconUrl?: string;
  maxDiscount?: number;
  purchased?: boolean;
  orderCount?: number;
  frontBgImage?: string;
  behindBgImage?: string;
};
