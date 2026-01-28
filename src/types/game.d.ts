interface Game {
  id: string;
  name: string;
  image?: string;
  discount: string;
  spine?: {
    json: string;
    atlas: string;
    png: string;
  };
  price?: string;
}