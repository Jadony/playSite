import React, { useState, useEffect, useRef } from "react";
import { InboxOutlined, SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "ahooks";
import { useNavigate } from "react-router-dom";
import {
  useAllGamesAndSelectContext,
  useAllGamesAndSelectDispatchContext,
} from "@/store/gameStore";
import { useTranslation } from "react-i18next";
// import { useAuthContext } from "@/store/authStore";
import "./style.css";

const GameSearch: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [isCompact, setIsCompact] = useState(false); // 紧凑模式（Header 隐藏后）
  // const { isAuthenticated } = useAuthContext();
  const {
    gameList = [],
    hotGameList = [],
    selectGame,
  } = useAllGamesAndSelectContext();
  const allGamesAndSelectDispatch = useAllGamesAndSelectDispatchContext();

  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(searchTerm, { wait: 500 });
  const containerRef = useRef<HTMLDivElement>(null);

  const popularGames = hotGameList.slice(0, 4);

  // 点击外部关闭下拉
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 监听滚动，超过 700px 进入紧凑模式（与 Header 隐藏同步）
  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 700);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 搜索逻辑
  const fetchGames = async () => {
    setIsLoading(true);
    setShowDropdown(true);
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

  // 动态样式：紧凑模式下 top 为 0，减少垂直内边距
  const containerStyle: React.CSSProperties = {
    top: isCompact ? 0 : "80px",
    paddingTop: isCompact ? "8px" : "16px",
    paddingBottom: isCompact ? "8px" : "16px",
    transition: "top 0.3s ease, padding 0.3s ease",
  };

  return (
    <div
      ref={containerRef}
      className="sticky z-50 w-full flex flex-col items-center gap-4 backdrop-blur-md"
      style={containerStyle}
    >
      <div className="relative flex items-center gap-4 w-full max-w-3xl px-4">
        {/* 搜索框 */}
        <div className="flex-1 flex items-center bg-[#121212] border border-white rounded-full px-6 py-4 shadow-lg active:border-white/40 transition-all z-50">
          <SearchOutlined className="text-white mr-4 text-xl" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => {
              if (searchTerm) setShowDropdown(true);
            }}
            placeholder={t("home.search.searchForGameNamesOrKeywords")}
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
          />
        </div>

        {/* All 按钮 */}
        <button
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/games");
          }}
          className="w-[60px] h-[60px] rounded-full border border-white flex items-center justify-center text-white hover:bg-white/10 transition-all bg-[#121212] z-50 cursor-pointer"
        >
          <span className="text-base">{t("home.search.allBtn")}</span>
        </button>

        {/* 下拉搜索结果 */}
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
                        payload: { selectGame: game },
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
                            payload: { selectGame: game },
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

      {/* 热门游戏标签 —— 仅在非紧凑模式下显示 */}
      {!isCompact && (
        <div className="flex justify-start gap-4 mt-2 max-w-3xl w-full px-4">
          {hotGameList.map((game) => (
            <button
              key={game.gameId}
              onClick={() => {
                allGamesAndSelectDispatch({
                  type: "setSelectGame",
                  payload: { selectGame: game },
                });
              }}
              className="game-search-tag flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all glass-gradient-border"
              style={{
                border: "0.5px solid rgba(255, 255, 255, 0.8)",
                backgroundColor:
                  game.gameId === selectGame?.gameId
                    ? "rgba(255, 255, 255, 0.1)"
                    : "",
              }}
            >
              {!game.purchased ? <span>🔥</span> : <span>✓</span>}
              {game.gameName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameSearch;