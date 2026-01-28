import React, { createContext, useContext, useReducer } from "react";

type AllGamesAndSelectContextType = {
  gameList?: Game[];
  selectGame?: Game;
};

type AllGamesAndSelectReducerActionType = {
  type: string;
  payload: { gameList: Game[]; selectGame: Game };
};

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
      icon: "https://images.unsplash.com/photo-1593305841991-05c29736f4de?auto=format&fit=crop&w=64&q=80",
    },
    {
      id: "marvelrivals",
      name: "MarvelRivals",
      spine: {
        json: "./src/assets/spine/bili.json",
        atlas: "./src/assets/spine/bili.atlas",
        png: "./src/assets/spine/bili.png",
      },
      discount: "-25%",
      isPopular: false,
      ranking: 6,
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
      icon: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=64&q=80",
    },
  ],
  selectGame: undefined,
};

const allGamesAndSelectContext =
  createContext<AllGamesAndSelectContextType | null>(null);

const allGamesAndSelectDispatchContext = createContext<
  React.Dispatch<{
    type: string;
    payload: { gameList: Game[]; selectGame: Game };
  }>
>(() => {});

// eslint-disable-next-line react-refresh/only-export-components
export const useAllGamesAndSelectContext = () => {
  return useContext(allGamesAndSelectContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAllGamesAndSelectDispatch = () => {
  return useContext(allGamesAndSelectDispatchContext);
};

const allGamesAndSelectReducer = (
  state: AllGamesAndSelectContextType | null,
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

export const AllGamesAndSelectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, dispatch] = useReducer(allGamesAndSelectReducer, staticData);
  return (
    <allGamesAndSelectContext.Provider value={data}>
      <allGamesAndSelectDispatchContext.Provider value={dispatch}>
        {children}
      </allGamesAndSelectDispatchContext.Provider>
    </allGamesAndSelectContext.Provider>
  );
};
