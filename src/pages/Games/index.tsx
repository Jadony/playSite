import React from "react";
import { useInfiniteScroll } from "ahooks";
import { Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import SearchBar from "@components/SearchBar";
import GameCard from "@components/GameCard";
import "./style.css";

const Games: React.FC = () => {
  const { t } = useTranslation();
  // Define Game Interface
  interface Game {
    id: string;
    title: string;
    image: string;
    price: string;
    discount?: number;
    popular: boolean;
  }

  interface Result {
    list: Game[];
    nextId: string | undefined;
  }

  // Mock API function
  const fetchGameList = (
    nextId: string | undefined,
    limit: number,
  ): Promise<Result> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const page = nextId ? parseInt(nextId) : 1;
        const list = Array.from({ length: limit }, (_, i) => {
          const seed = page * limit + i + Math.floor(Math.random() * 1000);
          return {
            id: `game-${seed}`,
            title: [
              "Genshin Impact",
              "Zenless Zone Zero",
              "League of Legend",
              "Honkai Star Rail",
              "PUBG Mobile",
              "Mobile Legends:Bang Bang",
              "Valorant",
              "Honor of Kings",
              "Legends of Runeterra",
              "Tom and Jerry: Chase",
              "Wuthering Waves",
              "Arema Breakout",
              "MarvelRivals",
              "Delta Force",
            ][seed % 14],
            image: `https://picsum.photos/seed/${seed}/300/400`,
            price: `Top-up game available 0.1$`,
            discount:
              [0, 20, 15, 0, 25, 20, 0, 15, 30, 0, 20, 25, 15, 0][seed % 14] ||
              undefined,
            popular: seed % 5 === 0,
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
        <Row gutter={[24, 24]} className="games-grid">
          {data?.list.map((game) => (
            <Col key={game.id} xs={24} sm={12} md={8} lg={6} xl={6}>
              <GameCard
                id={game.id}
                title={game.title}
                image={game.image}
                price={game.price}
                discount={game.discount}
                popular={game.popular}
              />
            </Col>
          ))}
        </Row>

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
