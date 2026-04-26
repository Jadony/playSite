import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import SpinePlayer from "@/components/SpinePlayer";
import "./style.css";
import {
  useAllGamesAndSelectContext,
  useAllGamesAndSelectDispatchContext,
} from "@/store/gameStore";

const GameSelector: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with the middle one (Zenless Zone Zero)
  const [cardShowGameList, setCardShowGameList] = useState<Game[]>([]);
  const { gameList = [], selectGame } = useAllGamesAndSelectContext();
  const allGamesAndSelectDispatch = useAllGamesAndSelectDispatchContext();

  const settleGamesRanking = (gameList: Game[]) => {
    const result: Game[] = [];
    let pushFlag = false;
    while (result.length < gameList.length) {
      for (let i = 0; i < gameList.length; i++) {
        if (!pushFlag) {
          result.push(gameList[i]);
          pushFlag = true;
        } else {
          result.unshift(gameList[i]);
          pushFlag = false;
        }
      }
    }
    return result;
  };

  const searchPopularGame = (newGameList: Game[]) => {
    const len = newGameList.length;
    const mid = Math.floor(len / 2);
    if (newGameList[mid].gameId === gameList[0].gameId) {
      setActiveIndex(mid);
    } else {
      setActiveIndex(mid - 1);
    }
  };

  // React to selectGame prop change
  useEffect(() => {
    if (selectGame) {
      const index = cardShowGameList.findIndex(
        (g) => g.gameId === selectGame.gameId,
      );
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [selectGame, cardShowGameList]);

  useEffect(() => {
    if (gameList.length) {
      const newGameList = settleGamesRanking(gameList);
      searchPopularGame(newGameList);
      setCardShowGameList(newGameList);
    }
  }, [gameList]);

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? gameList.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
    changeSelectGame(cardShowGameList[newIndex]);
  };

  const handleNext = () => {
    const newIndex = activeIndex === gameList.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
    changeSelectGame(cardShowGameList[newIndex]);
  };

  // Calculate 3D styles
  const getCardStyle = (index: number) => {
    const len = cardShowGameList.length;
    let diff = index - activeIndex;
    
    // Circular logic for seamless looping
    if (len > 0) {
      if (diff > len / 2) {
        diff -= len;
      } else if (diff < -Math.floor((len - 1) / 2)) {
        // Use Math.floor((len - 1) / 2) to perfectly handle even and odd number of elements wrapping
        diff += len;
      }
    }
    
    const absDiff = Math.abs(diff);

    const zIndex = 10 - absDiff;
    let opacity = 1;
    let rotateY = 0;
    let translateX = 0;
    let scale = 1;
    let translateZ = 0;

    if (diff === 0) {
      // Center
      scale = 1.2;
    } else if (absDiff === 1) {
      // Side items
      scale = 0.9; // Slightly larger side items
      opacity = 0.4; // More visible side items

      // diff > 0 means to the right
      // diff < 0 means to the left
      // Increase spacing significantly to prevent overlap
      translateX = diff * 420;
      translateZ = -100;
      rotateY = diff > 0 ? -45 : 45; // Symmetric rotation for balanced look
    } else {
      opacity = 0;
    }

    // Specific tweaks for exact "image match" feel
    // If it's effectively "hidden" or too far, just fade it out more
    if (absDiff > 2) opacity = 0;

    return {
      zIndex,
      opacity,
      transform: `perspective(1000px) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    };
  };

  const gameNameResolve = (name: string, isActive: boolean) => {
    // const nameList = name.split(" ");
    // if (nameList.length === 1) {
    return (
      <>
        <span className={`${isActive ? "has-star" : ""}`}>{name}</span>
      </>
    );
    // }
    // return nameList.map((item, index) => (
    //   <span
    //     key={index}
    //     style={{
    //       backgroundImage: `${isActive ? "url('https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/gameNameBg.png')" : ""}`,
    //       backgroundClip: "text",
    //       WebkitBackgroundClip: "text",
    //       color: `${isActive ? "transparent" : "#fff"}`,
    //       backgroundSize: "cover",
    //       backgroundPosition: "center",
    //       backgroundRepeat: "no-repeat",
    //       "--left": "-35%",
    //     }}
    //     className={`${index === 1 && isActive ? "has-star relative" : ""}`}
    //   >
    //     {index < nameList.length - 1 ? item + " " : item}
    //   </span>
    // ));
  };

  const changeSelectGame = (game: Game, index?: number) => {
    if (index !== undefined) setActiveIndex(index);
    allGamesAndSelectDispatch({
      type: "setSelectGame",
      payload: { selectGame: game },
    });
  };

  return (
    <section
      className="w-full px-4 relative z-20 overflow-hidden pt-20 pb-60 game-selector-container"
      id="gameSelector"
    >
      <div className="max-w-7xl mx-auto h-[500px] relative flex items-center justify-center">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="game-selector-btn game-selector-left absolute left-4 md:left-24 z-50 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-sm glass-gradient-border"
        >
          <LeftOutlined style={{ fontSize: "20px" }} />
        </button>
        <button
          onClick={handleNext}
          className="game-selector-btn game-selector-right absolute right-4 md:right-24 z-50 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all glass-gradient-border"
        >
          <RightOutlined style={{ fontSize: "20px" }} />
        </button>

        {/* Carousel Container */}
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          {cardShowGameList.map((game, index) => {
            const style = getCardStyle(index);
            const isActive = index === activeIndex;

            return (
              <div
                key={game.gameId}
                className="spine-player-wrap absolute transition-all duration-500 ease-out origin-center"
                style={
                  {
                    ...style,
                    left: "50%",
                    top: "50%",
                    // We use margins to center the element itself before transforms
                    marginLeft: "-144px", // half of w-72
                    marginTop: "-192px", // half of h-96
                    "--footerImage": isActive
                      ? `url('${game.spine?.footerImage}')`
                      : "",
                  } as React.CSSProperties
                }
                onClick={() => changeSelectGame(game, index)}
              >
                {/* Card Container */}
                <div
                  className="card-wrap relative w-72 h-96 bg-transparent flex items-center justify-center"
                  style={
                    {
                      "--bgFrontImage": `url('${game.spine?.frontBgImage}')`,
                      "--bgBehindImage": `url('${game.spine?.behindBgImage}')`,
                    } as React.CSSProperties
                  }
                >
                  {/* Spine Player */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <SpinePlayer
                      jsonUrl={game.spine?.json}
                      atlasUrl={game.spine?.atlas}
                      pngUrl={game.spine?.png}
                      animationName="loop"
                      width={690} // Increase width to fit the character
                      height={493} // Increase height to fit the character
                      scale={0.7}
                      playing={isActive}
                      offsetY={170}
                    />
                  </div>

                  {/* Text Overlay - Only if visible? Usually always visible but styled differently */}
                  <div
                    className={`${isActive ? "active-card-text" : "left-6"} absolute bottom-4 z-20 pointer-events-none duration-500`}
                  >
                    <div
                      className="text-4xl font-bold italic mb-2 game-name"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {gameNameResolve(game.gameName, isActive)}
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className="text-pink-500 font-black italic text-3xl tracking-tighter"
                        style={{
                          background:
                            "linear-gradient(275.92deg, #EE22EB 29.33%, #AA00FF 92.01%), linear-gradient(0deg, #FFFFFF, #FFFFFF)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          WebkitTextStroke: "1px #fff",
                        }}
                      >
                        -{game.maxDiscount}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GameSelector;
