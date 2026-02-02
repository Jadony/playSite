import React from "react";
import { useInfiniteScroll } from "ahooks";
import { useTranslation } from "react-i18next";
import SearchBar from "@components/SearchBar";
import GameCard from "@components/GameCard";
import yuanshenFrontBg from "@assets/background/yuanshenFrontBg.png";
import yuanshenBehindBg from "@assets/background/yuanshenBehindBg.png";
import gameImage from "@assets/games/gameImage.png";
import "./style.css";

const Games: React.FC = () => {
  const { t } = useTranslation();

  // Mock API function
  const fetchGameList = (
    nextId: string | undefined,
    limit: number,
  ): Promise<{ list: Game[]; nextId: string | undefined }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const page = nextId ? parseInt(nextId) : 1;
        const list = Array.from({ length: limit }, (_, i) => {
          const seed = page * limit + i + Math.floor(Math.random() * 1000);
          return {
            id: `yuanshen_${seed}`,
            name: "Genshin Impact",
            spine: {
              json: "./src/assets/spine/yifuna.json",
              atlas: "./src/assets/spine/yifuna.atlas",
              png: "./src/assets/spine/yifuna.png",
            },
            discount: "-15%",
            isPopular: true,
            ranking: 1,
            image: gameImage,
            frontBgImage: yuanshenFrontBg,
            behindBgImage: yuanshenBehindBg,
            icon: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=64&q=80",
          };
        });

        // Stop after 5 pages for demo purposes
        const hasMore = page < 5;
        resolve({
          list,
          nextId: hasMore ? (page + 1).toString() : undefined,
        });
      }, 1000);
    });
  };

  const { data, loading, loadingMore } = useInfiniteScroll(
    (d) => fetchGameList(d?.nextId, 20),
    {
      target: document,
      isNoMore: (d) => d?.nextId === undefined,
    },
  );

  return (
    <div className="games-page">
      <div className="games-container">
        {/* Header */}
        <div className="games-header flex justify-between items-center">
          <div className="games-title">{t("games.allGames")}</div>
          <SearchBar placeholder={t("games.searchForGameNamesOrKeywords")} />
        </div>

        {/* Games Grid */}

        <div className="flex flex-wrap justify-between">
          {data?.list.map((game) => (
            <GameCard item={game} />
          ))}
        </div>

        {/* Loading / No More Data Indicator */}
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          {(loadingMore || loading) && <span>Loading more games...</span>}
          {!loadingMore && !loading && !data?.nextId && (
            <span>No more games</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Games;
