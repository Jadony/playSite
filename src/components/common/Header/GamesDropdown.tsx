import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-scroll";
import {
  useAllGamesAndSelectContext,
  useAllGamesAndSelectDispatchContext,
} from "@store/gameStore";

interface GamesDropdownProps {
  onClose: () => void;
}

const GamesDropdown: React.FC<GamesDropdownProps> = ({ onClose }) => {
  const { gameList = [], hotGameList = [] } = useAllGamesAndSelectContext();
  const allGamesAndSelectDispatch = useAllGamesAndSelectDispatchContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="absolute top-full left-0 mt-4 w-[800px] h-[550px] bg-[#1a1a1a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex animate-fade-in z-50">
      {/* Left: Popular Games Grid */}
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-2 gap-4">
          {hotGameList.map((game) => (
            <Link
              key={game.gameId}
              to="gameSelector"
              smooth={true}
              duration={300}
            >
              <div
                key={game.gameId}
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
                  src={game.iconUrl}
                  alt={game.gameName}
                  className="w-10 h-10 rounded-lg object-cover bg-gray-800"
                />
                <span className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">
                  {game.gameName}
                </span>
              </div>
            </Link>
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
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g opacity="0.5">
              <path
                d="M7.5 2.5H3.33333C2.8731 2.5 2.5 2.8731 2.5 3.33333V16.6667C2.5 17.1269 2.8731 17.5 3.33333 17.5H7.5C7.96024 17.5 8.33333 17.1269 8.33333 16.6667V3.33333C8.33333 2.8731 7.96024 2.5 7.5 2.5Z"
                stroke="white"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.6666 2.5H12.5C12.0397 2.5 11.6666 2.8731 11.6666 3.33333V7.5C11.6666 7.96024 12.0397 8.33333 12.5 8.33333H16.6666C17.1269 8.33333 17.5 7.96024 17.5 7.5V3.33333C17.5 2.8731 17.1269 2.5 16.6666 2.5Z"
                stroke="white"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.6666 11.6666H12.5C12.0397 11.6666 11.6666 12.0397 11.6666 12.5V16.6666C11.6666 17.1269 12.0397 17.5 12.5 17.5H16.6666C17.1269 17.5 17.5 17.1269 17.5 16.6666V12.5C17.5 12.0397 17.1269 11.6666 16.6666 11.6666Z"
                stroke="white"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
          <span className="text-white font-medium">{t("header.allGames")}</span>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-1">
          {gameList.map((game) => (
            <Link
              key={game.gameId}
              to="gameSelector"
              smooth={true}
              duration={300}
            >
              <div
                key={game.gameId}
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
                {game.gameName}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesDropdown;
