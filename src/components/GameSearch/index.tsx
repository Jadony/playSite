import React, { useState, useEffect, useRef } from "react";
import { InboxOutlined, SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "ahooks";
import { useNavigate } from "react-router-dom";
import {
  useAllGamesAndSelectContext,
  useAllGamesAndSelectDispatchContext,
} from "@/store/gameStore";
import { useTranslation } from "react-i18next";
import { getPurchasedGames } from "@/api/user";
import { useAuthContext } from "@/store/authStore";

const GameSearch: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [purchasedGames, setPurchasedGames] = useState<Game[]>([]);
  const { isAuthenticated } = useAuthContext();
  const {
    gameList = [],
    hotGameList = [],
    selectGame,
  } = useAllGamesAndSelectContext();
  const allGamesAndSelectDispatch = useAllGamesAndSelectDispatchContext();

  const navigate = useNavigate();

  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, { wait: 500 });

  const containerRef = useRef<HTMLDivElement>(null);

  const searchPopularGames = (hotGameList: Game[]): Game[] => {
    return hotGameList.slice(0, 3);
  };

  const popularGames = searchPopularGames(hotGameList); // Show 3 games for popular section

  const getGamePurchase = async () => {
    const { data } = await getPurchasedGames({ limit: 3 });
    setPurchasedGames(data.data);
  };

  const resolveGame = () => {
    const gameSet = new Set([...purchasedGames, ...hotGameList]);
    return Array.from(gameSet).slice(0, 3);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    if (isAuthenticated) {
      getGamePurchase();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search Effect
  const fetchGames = async () => {
    setIsLoading(true);
    setShowDropdown(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const results = gameList.filter((game) =>
      game.gameName.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    );
    setSearchResults(results);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    fetchGames();
  }, [debouncedSearchTerm]);

  return (
    <div
      ref={containerRef}
      className="sticky top-0 z-50 w-full py-4 flex flex-col items-center gap-4 backdrop-blur-md transition-all"
    >
      <div className="relative flex items-center gap-4 w-full max-w-3xl px-4">
        {/* Search Input */}
        <div className="flex-1 flex items-center bg-[#121212] border border-white rounded-full px-6 py-4 shadow-lg active:border-white/40 transition-all z-50">
          <SearchOutlined className="text-white mr-4 text-xl" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // if (e.target.value) setShowDropdown(true);
            }}
            onFocus={() => {
              if (searchTerm) setShowDropdown(true);
            }}
            placeholder={t("home.search.searchForGameNamesOrKeywords")}
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
          />
        </div>

        {/* All Button */}
        <button
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/games");
          }}
          className="w-[60px] h-[60px] rounded-full border border-white flex items-center justify-center text-white hover:bg-white/10 transition-all bg-[#121212] z-50 cursor-pointer"
        >
          <span className="text-base">{t("home.search.allBtn")}</span>
        </button>

        {/* Dropdown Results */}
        {showDropdown && searchTerm && (
          <div className="absolute top-[calc(100%+10px)] left-4 right-[calc(60px+16px+16px)] bg-[#1a1a1a] rounded-3xl p-6 shadow-2xl border border-white/10 z-40 min-h-[300px] flex flex-col">
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((game) => (
                  <div
                    onClick={() => {
                      allGamesAndSelectDispatch({
                        type: "setSelectGame",
                        payload: {
                          selectGame: game,
                        },
                      });
                      setShowDropdown(false);
                    }}
                    key={game.gameId}
                    className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl cursor-pointer group transition-colors"
                  >
                    <img
                      src={game.iconUrl}
                      alt={game.gameName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-white font-medium group-hover:text-purple-400 transition-colors">
                        {game.gameName}
                      </div>
                    </div>
                    <span className="bg-purple-600 px-2 py-0.5 rounded text-xs font-bold text-white">
                      -{game.maxDiscount}%
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              // Empty State
              <div className="flex-1 flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center py-12 border-b border-white/5">
                  <InboxOutlined className="text-6xl text-gray-600 mb-4" />
                  <h3 className="text-white text-lg font-bold mb-1">
                    {t("home.search.noResultsFound")}
                  </h3>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-4 text-gray-200">
                    🔥
                    <span className="font-medium">Popular Games</span>
                  </div>
                  <div className="space-y-2">
                    {popularGames.map((game) => (
                      <div
                        onClick={() => {
                          allGamesAndSelectDispatch({
                            type: "setSelectGame",
                            payload: {
                              selectGame: game,
                            },
                          });
                          setShowDropdown(false);
                        }}
                        key={game.gameId}
                        className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl cursor-pointer group transition-colors"
                      >
                        <img
                          src={game.iconUrl}
                          alt={game.gameName}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1 text-white font-medium group-hover:text-purple-400 transition-colors">
                          {game.gameName}
                        </div>
                        <span className="bg-purple-600 px-2 py-0.5 rounded text-xs font-bold text-white">
                          -{game.maxDiscount}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pills below search - Keep them but maybe hide when dropdown is huge? Or keep as is. */}
      <div className="flex gap-4 mt-2">
        {resolveGame().map((game) => (
          <button
            key={game.gameId}
            onClick={() => {
              allGamesAndSelectDispatch({
                type: "setSelectGame",
                payload: {
                  selectGame: game,
                },
              });
            }}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            style={{
              border: "0.5px solid rgba(255, 255, 255, 0.8)",
              backgroundColor:
                game.gameId === selectGame?.gameId
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.05)",
            }}
          >
            {!game.purchased ? <span>🔥</span> : <span>✓</span>}
            {game.gameName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameSearch;
