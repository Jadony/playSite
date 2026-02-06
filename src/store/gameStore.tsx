import React, { createContext, useContext, useReducer } from "react";

type AllGamesAndSelectContextType = {
  gameList?: Game[];
  selectGame?: Game;
  hotGameList?: Game[];
};

type AllGamesAndSelectReducerActionType = {
  type: string;
  payload: { gameList?: Game[]; selectGame?: Game; hotGameList?: Game[] };
};

const allGamesAndSelectContext =
  createContext<AllGamesAndSelectContextType | null>(null);

const allGamesAndSelectDispatchContext = createContext<React.Dispatch<{
  type: string;
  payload: { gameList?: Game[]; selectGame?: Game; hotGameList?: Game[] };
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
    case "setAllGames":
      return {
        ...state,
        gameList: action.payload.gameList,
      };
    case "setSelectGame":
      return {
        ...state,
        selectGame: action.payload.selectGame,
      };
    case "setHotGames":
      return {
        ...state,
        hotGameList: action.payload.hotGameList,
      };
    default:
      return state;
  }
};

const AllGamesAndSelectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, dispatch] = useReducer(allGamesAndSelectReducer, {
    gameList: [],
    hotGameList: [],
    selectGame: undefined,
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
