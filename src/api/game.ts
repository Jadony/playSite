import request from "@/utils/request";

const api = {
  hotGames: "/front/games/hot",
  allGames: "/front/games/all",
  gameDetail: "/front/games/detail",
};

export const hotGames = (params: HotGamesRequestParams) => {
  return request<Game[]>({
    url: api.hotGames,
    method: "get",
    params,
  });
};

export const allGames = (params?: AllGamesRequestParams) => {
  return request<AllGamesResponseData>({
    url: api.allGames,
    method: "post",
    params,
  });
};

export const gameDetail = (params: GameDetailRequestParams) => {
  return request<GameDetailResponseData>({
    url: api.gameDetail,
    method: "get",
    params,
  });
};
