import React, { createContext, useContext, useReducer } from "react";

type AllGamesAndSelectContextType = {
  gameList?: Game[];
  selectGame?: Game;
};

type AllGamesAndSelectReducerActionType = {
  type: string;
  payload: { gameList?: Game[]; selectGame?: Game };
};

import yuanshenFrontBg from "@assets/background/yuanshenFrontBg.png";
import yuanshenBehindBg from "@assets/background/yuanshenBehindBg.png";
import juequlingFrontBg from "@assets/background/juequlingFrontBg.png";
import juequlingBehindBg from "@assets/background/juequlingBehindBg.png";
import benghuaiFrontBg from "@assets/background/benghuaiFrontBg.png";
import benghuaiBehindBg from "@assets/background/benghuaiBehindBg.png";

const staticData = {
  gameList: [
    {
      id: "yuanshen",
      name: "Genshin Impact",
      spine: {
        json: "./src/assets/spine/yifuna.json",
        atlas: "./src/assets/spine/yifuna.atlas",
        png: "./src/assets/spine/yifuna.png",
      },
      discount: "-15%",
      isPopular: true,
      ranking: 1,
      frontBgImage: yuanshenFrontBg,
      behindBgImage: yuanshenBehindBg,
      icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80",
    },
    {
      id: "juequling",
      name: "Zenless Zone Zero",
      spine: {
        json: "./src/assets/spine/bili.json",
        atlas: "./src/assets/spine/bili.atlas",
        png: "./src/assets/spine/bili.png",
      },
      discount: "-30%",
      isPopular: true,
      ranking: 2,
      frontBgImage: juequlingFrontBg,
      behindBgImage: juequlingBehindBg,
      icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80",
    },
    {
      id: "benghuai",
      name: "Honkai: Star Rail",
      // Reusing yifuna for the third game for now as we only have 2 sets
      spine: {
        json: "./src/assets/spine/yifuna.json",
        atlas: "./src/assets/spine/yifuna.atlas",
        png: "./src/assets/spine/yifuna.png",
      },
      discount: "-25%",
      isPopular: true,
      ranking: 3,
      frontBgImage: benghuaiFrontBg,
      behindBgImage: benghuaiBehindBg,
      icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80",
    },
    {
      id: "yxlm",
      name: "League of Legend",
      spine: {
        json: "./src/assets/spine/bili.json",
        atlas: "./src/assets/spine/bili.atlas",
        png: "./src/assets/spine/bili.png",
      },
      discount: "-25%",
      isPopular: false,
      ranking: 4,
      frontBgImage: benghuaiFrontBg,
      behindBgImage: benghuaiBehindBg,
      icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80",
    },
    {
      id: "pubgm",
      name: "PUBG Mobile",
      spine: {
        json: "./src/assets/spine/bili.json",
        atlas: "./src/assets/spine/bili.atlas",
        png: "./src/assets/spine/bili.png",
      },
      discount: "-25%",
      isPopular: false,
      ranking: 5,
      frontBgImage: benghuaiFrontBg,
      behindBgImage: benghuaiBehindBg,
      icon: "https://images.unsplash.com/photo-1593305841991-05c29736f4de?auto=format&fit=crop&w=64&q=80",
    },
    {
      id: "marvelrivals",
      name: "Marvel Rivals",
      spine: {
        json: "./src/assets/spine/bili.json",
        atlas: "./src/assets/spine/bili.atlas",
        png: "./src/assets/spine/bili.png",
      },
      discount: "-25%",
      isPopular: false,
      ranking: 6,
      frontBgImage: benghuaiFrontBg,
      behindBgImage: benghuaiBehindBg,
      icon: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=64&q=80",
    },
    {
      id: "ww",
      name: "Wuthering Waves",
      spine: {
        json: "./src/assets/spine/bili.json",
        atlas: "./src/assets/spine/bili.atlas",
        png: "./src/assets/spine/bili.png",
      },
      discount: "-25%",
      isPopular: false,
      ranking: 7,
      frontBgImage: "@assets/background/benghuaiFrontBg.png",
      behindBgImage: "@assets/background/benghuaiBehindBg.png",
      icon: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=64&q=80",
    },
  ],
  selectGame: undefined,
};

const allGamesAndSelectContext =
  createContext<AllGamesAndSelectContextType | null>(null);

const allGamesAndSelectDispatchContext = createContext<React.Dispatch<{
  type: string;
  payload: { gameList?: Game[]; selectGame?: Game };
}> | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAllGamesAndSelectContext = () => {
  const context = useContext(allGamesAndSelectContext);
  if (!context) {
    throw new Error(
      "useAllGamesAndSelectContext must be used within a AllGamesAndSelectProvider",
    );
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAllGamesAndSelectDispatchContext = () => {
  const context = useContext(allGamesAndSelectDispatchContext);
  if (!context) {
    throw new Error(
      "useAllGamesAndSelectDispatchContext must be used within a AllGamesAndSelectProvider",
    );
  }
  return context;
};

const allGamesAndSelectReducer = (
  state: AllGamesAndSelectContextType,
  action: AllGamesAndSelectReducerActionType,
) => {
  switch (action.type) {
    case "setGames":
      return {
        ...state,
        gameList: action.payload.gameList,
      };
    case "setSelectGame":
      return {
        ...state,
        selectGame: action.payload.selectGame,
      };
    default:
      return state;
  }
};

const getDefaultSelectGame = (gameList: Game[]) => {
  const game = gameList.find((item) => item.ranking === 1);
  return game;
};

const AllGamesAndSelectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const selectGame = getDefaultSelectGame(staticData.gameList);
  const [data, dispatch] = useReducer(allGamesAndSelectReducer, {
    gameList: staticData.gameList,
    selectGame,
  });
  return (
    <allGamesAndSelectContext.Provider value={data}>
      <allGamesAndSelectDispatchContext.Provider value={dispatch}>
        {children}
      </allGamesAndSelectDispatchContext.Provider>
    </allGamesAndSelectContext.Provider>
  );
};

export default AllGamesAndSelectProvider;
