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
      id: "lol",
      name: "League of Legend",
      spine: {
        json: "/spine/yifuna.json",
        atlas: "/spine/yifuna.atlas",
        png: "/spine/yifuna.png",
      },
      discount: "-30%",
      price: "$ 688.90",
    },
    {
      id: "zzz",
      name: "Zenless Zone Zero",
      spine: {
        json: "/spine/bili.json",
        atlas: "/spine/bili.atlas",
        png: "/spine/bili.png",
      },
      discount: "-15%",
      price: "$ 688.90",
    },
    {
      id: "pubg",
      name: "PUBG Mobile",
      // Reusing yifuna for the third game for now as we only have 2 sets
      spine: {
        json: "/spine/yifuna.json",
        atlas: "/spine/yifuna.atlas",
        png: "/spine/yifuna.png",
      },
      discount: "-25%",
      price: "$ 688.90",
    },
  ];

  // React to selectGame prop change
  useEffect(() => {
    if (selectGame) {
      const index = games.findIndex((g) => g.name === selectGame.name);
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

    let zIndex = 10 - absDiff;
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
      opacity = 0.6; // More visible side items

      // diff > 0 means to the right
      // diff < 0 means to the left
      // Increase spacing significantly to prevent overlap
      translateX = diff * 420;
      translateZ = -100;
      rotateY = diff > 0 ? -25 : 25; // Symmetric rotation for balanced look
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
                              card-wrap relative w-72 h-96 bg-transparent flex items-center justify-center
                            `}
                >
                  {/* Spine Player */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#fff]">
                    <SpinePlayer
                      jsonUrl={game.spine.json}
                      atlasUrl={game.spine.atlas}
                      pngUrl={game.spine.png}
                      animationName="loop"
                      width={332} // Increase width to fit the character
                      height={482} // Increase height to fit the character
                      scale={0.5}
                      playing={isActive}
                      offsetY={150}
                    />
                  </div>

                  {/* Text Overlay - Only if visible? Usually always visible but styled differently */}
                  {isActive && (
                    <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
                      <h3
                        className="text-3xl font-bold italic text-white mb-2"
                        style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                      >
                        {game.name}
                      </h3>
                      <div className="flex items-center gap-4">
                        <span
                          className="text-pink-500 font-black italic text-2xl tracking-tighter"
                          style={{
                            textShadow: "0 0 10px rgba(236,72,153,0.5)",
                          }}
                        >
                          {game.discount}
                        </span>
                        <span className="text-gray-400 text-sm line-through italic">
                          $ 800.00
                        </span>
                        <span className="text-white font-bold italic text-lg">
                          {game.price}
                        </span>
                      </div>
                    </div>
                  )}
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
