import React, { useState } from "react";
import { useInfiniteScroll, useRequest } from "ahooks";
import { useTranslation } from "react-i18next";
import SearchBar from "@components/SearchBar";
import GameCard from "@components/GameCard";
import "./style.css";
import { allGames } from "@/api/game";
import { message } from "antd";
import { useLanguageContext } from "@/store/languageStore";

const Games: React.FC = () => {
  const [gameList, setGameList] = useState<Game[]>([]);
  const [searchList, setSearchList] = useState<Game[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const { selectUnit } = useLanguageContext();
  const { t } = useTranslation();

  const searchGame = async (keyword: string) => {
    try {
      if (keyword.length) {
        const { data } = await allGames({ keyword });
        setIsSearch(true);
        setSearchList(data.data.records);
      } else {
        setIsSearch(false);
      }
    } catch (error) {
      message.error("error");
    }
  };

  const { run } = useRequest(searchGame, {
    debounceWait: 1000,
    manual: true,
  });

  // Mock API function
  const fetchGameList = async (nextId?: number) => {
    try {
      const { data } = await allGames({
        pageSize: 20,
        pageNum: nextId || 1,
      });
      return {
        list: data.data.records,
        total: data.data.total,
        nextId: data.data.current + 1,
      };
    } catch (error) {
      message.error("error");
      return { list: [], total: 0, nextId: undefined };
    }
  };

  const { data, loading, loadingMore, noMore } = useInfiniteScroll(
    async (d) => {
      const res = await fetchGameList(d?.nextId);
      return res; // 确保返回 { list, total, nextId }
    },
    {
      target: document,
      isNoMore: (d) => (d?.list.length || 0) >= (d?.total || 0),
      reloadDeps: [selectUnit?.currency],
    },
  );

  return (
    <div className="games-page">
      <div className="games-container">
        {/* Header */}
        <div className="games-header flex justify-between items-center">
          <div className="games-title">{t("games.allGames")}</div>
          <SearchBar
            placeholder={t("games.searchForGameNamesOrKeywords")}
            onChange={run}
          />
        </div>

        {/* Games Grid */}

        <div className="flex">
          <div className="min-w-60 mr-6 rounded-[14px] bg-white/[.05] border border-white/[.2] p-[20px]">
            <div
              onClick={() => {}}
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
              <span className="text-white font-medium">
                {t("header.allGames")}
              </span>
            </div>
            <div className="p-[16px] text-white/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                style={{
                  margin: "10px auto",
                }}
              >
                <path
                  d="M7.42706 14.5713H13.1423"
                  stroke="gray"
                  stroke-width="2.26667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.2845 11.7134V17.4286"
                  stroke="gray"
                  stroke-width="2.26667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23.6015 5.99854H8.39904C6.98492 5.99886 5.62113 6.52344 4.57131 7.47087C3.52149 8.41829 2.86019 9.72128 2.71524 11.128C2.70667 11.2023 2.70095 11.2723 2.69095 11.3451C2.57522 12.3081 1.71222 19.5093 1.71222 21.7154C1.71222 22.8522 2.16382 23.9425 2.96768 24.7464C3.77154 25.5502 4.86181 26.0018 5.99864 26.0018C7.42745 26.0018 8.14185 25.2874 8.85626 24.573L10.8766 22.5527C11.4124 22.0168 12.1391 21.7156 12.8969 21.7154H19.1037C19.8615 21.7156 20.5882 22.0168 21.124 22.5527L23.1443 24.573C23.8587 25.2874 24.5731 26.0018 26.0019 26.0018C27.1388 26.0018 28.229 25.5502 29.0329 24.7464C29.8368 23.9425 30.2884 22.8522 30.2884 21.7154C30.2884 19.5079 29.4254 12.3081 29.3096 11.3451C29.2996 11.2737 29.2939 11.2023 29.2853 11.1294C29.1407 9.72245 28.4796 8.41912 27.4297 7.4714C26.3799 6.52368 25.0159 5.9989 23.6015 5.99854Z"
                  stroke="gray"
                  stroke-width="2.24"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle cx="22.1074" cy="14.5713" r="2" fill="gray" />
              </svg>
              <div className="text-center">
                更多游戏接入中
                <br />
                敬请期待
              </div>
            </div>
          </div>
          {isSearch ? (
            <div className="flex flex-wrap justify-start">
              {searchList.map((game) => (
                <GameCard item={game} unit={selectUnit?.unit} />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap justify-start">
              {data?.list.map((game) => (
                <GameCard item={game} unit={selectUnit?.unit} />
              ))}
            </div>
          )}
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
          {!loadingMore && !loading && noMore && <span>No more games</span>}
        </div>
      </div>
    </div>
  );
};

export default Games;
