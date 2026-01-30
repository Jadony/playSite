import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useAllGamesAndSelectContext,
  useAllGamesAndSelectDispatchContext,
} from "@store/gameStore";

interface GamesDropdownProps {
  onClose: () => void;
}

const GamesDropdown: React.FC<GamesDropdownProps> = ({ onClose }) => {
  const { gameList = [] } = useAllGamesAndSelectContext();
  const allGamesAndSelectDispatch = useAllGamesAndSelectDispatchContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="absolute top-full left-0 mt-4 w-[800px] h-[550px] bg-[#1a1a1a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex animate-fade-in z-50">
      {/* Left: Popular Games Grid */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-2 gap-4">
          {gameList.map((game) => (
            <div
              key={game.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
              onClick={() => {
                allGamesAndSelectDispatch({
                  type: "setSelectGame",
                  payload: {
                    selectGame: game,
                  },
                });
                onClose();
              }}
            >
              <img
                src={game.icon}
                alt={game.name}
                className="w-10 h-10 rounded-lg object-cover bg-gray-800"
              />
              <span className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">
                {game.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Sidebar List */}
      <div className="w-64 bg-[#222] p-4 flex flex-col gap-2 border-l border-white/5">
        <div
          onClick={() => {
            navigate("/games");
            onClose();
          }}
          className="flex items-center gap-2 p-3 bg-white/10 hover:bg-white/20 rounded-xl cursor-pointer transition-colors mb-2"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-white font-medium">{t("header.allGames")}</span>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-1">
          {gameList.map((game) => (
            <div
              key={game.id}
              className="px-3 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer transition-colors text-sm"
              onClick={() => {
                allGamesAndSelectDispatch({
                  type: "setSelectGame",
                  payload: {
                    selectGame: game,
                  },
                });
                onClose();
              }} // Or navigate to specific game
            >
              {game.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesDropdown;
