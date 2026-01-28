import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import SpinePlayer from "@components/SpinePlayer";
import "./style.css";

type GameSelectorProps = {
  selectGame: Game | null;
};

const GameSelector: React.FC<GameSelectorProps> = ({ selectGame }) => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with the middle one (Zenless Zone Zero)

  const games = [
    {
      id: "juequling",
      name: "Zenless Zone Zero",
      spine: {
        json: "./src/assets/spine/bili.json",
        atlas: "./src/assets/spine/bili.atlas",
        png: "./src/assets/spine/bili.png",
      },
      discount: "-30%",
      price: "$ 688.90",
    },
    {
      id: "yuanshen",
      name: "Genshin Impact",
      spine: {
        json: "./src/assets/spine/yifuna.json",
        atlas: "./src/assets/spine/yifuna.atlas",
        png: "./src/assets/spine/yifuna.png",
      },
      discount: "-15%",
      price: "$ 688.90",
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
      price: "$ 688.90",
    },
  ];

  // React to selectGame prop change
  useEffect(() => {
    if (selectGame) {
      const index = games.findIndex((g) => g.id === selectGame.id);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [selectGame]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? games.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === games.length - 1 ? 0 : prev + 1));
  };

  // Calculate 3D styles
  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
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
    } else {
      // Side items
      scale = 0.9; // Slightly larger side items
      opacity = 0.4; // More visible side items

      // diff > 0 means to the right
      // diff < 0 means to the left
      // Increase spacing significantly to prevent overlap
      translateX = diff * 420;
      translateZ = -100;
      rotateY = diff > 0 ? -45 : 45; // Symmetric rotation for balanced look
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
    const nameList = name.split(" ");
    if (nameList.length === 1) {
      return (
        <>
          <span className={`${isActive ? "has-star" : ""}`}>{nameList[0]}</span>
        </>
      );
    }
    return nameList.map((item, index) => (
      <span
        key={index}
        style={{
          backgroundImage: `${isActive ? "url('/src/assets/background/gameNameBg.png')" : ""}`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: `${isActive ? "transparent" : "#fff"}`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className={`${index === 1 && isActive ? "has-star relative" : ""}`}
      >
        {index < nameList.length - 1 ? item + " " : item}
      </span>
    ));
  };

  return (
    <section className="w-full px-4 mb-24 relative z-20 overflow-hidden py-20">
      <div className="max-w-7xl mx-auto h-[500px] relative flex items-center justify-center">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-24 z-50 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-sm"
        >
          <LeftOutlined style={{ fontSize: "20px" }} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-24 z-50 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all backdrop-blur-sm"
        >
          <RightOutlined style={{ fontSize: "20px" }} />
        </button>

        {/* Carousel Container */}
        <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
          {games.map((game, index) => {
            const style = getCardStyle(index);
            const isActive = index === activeIndex;

            return (
              <div
                key={game.id}
                className="absolute transition-all duration-500 ease-out origin-center"
                style={{
                  ...style,
                  left: "50%",
                  top: "50%",
                  // We use margins to center the element itself before transforms
                  marginLeft: "-144px", // half of w-72
                  marginTop: "-192px", // half of h-96
                }}
                onClick={() => setActiveIndex(index)}
              >
                {/* Card Container */}
                <div
                  className={`
                              card-${game.id}-wrap relative w-72 h-96 bg-transparent flex items-center justify-center
                            `}
                >
                  {/* Spine Player */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <SpinePlayer
                      jsonUrl={game.spine.json}
                      atlasUrl={game.spine.atlas}
                      pngUrl={game.spine.png}
                      animationName="loop"
                      width={690} // Increase width to fit the character
                      height={493} // Increase height to fit the character
                      scale={0.7}
                      playing={isActive}
                      offsetY={180}
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
                      {gameNameResolve(game.name, isActive)}
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
                        {game.discount}
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
