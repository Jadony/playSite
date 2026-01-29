type Game = {
  id: string;
  name: string;
  image?: string;
  discount: string;
  spine: {
    json: string;
    atlas: string;
    png: string;
  };
  frontBgImage: string;
  behindBgImage: string;
  price?: string;
  isPopular: boolean;
  ranking: number;
  icon: string;
};
