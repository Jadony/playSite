import React, { useState, useEffect, useRef } from "react";
import { InboxOutlined, FireOutlined, SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "ahooks";
import { useNavigate } from "react-router-dom";

type GameSearchProps = {
  gameSelectChange: (game: Game) => void;
};

const GameSearch: React.FC<GameSearchProps> = ({ gameSelectChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Game[]>([]);

  const navigate = useNavigate();

  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, { wait: 500 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Mock Data
  const allGames: Game[] = [
    {
      id: "lol",
      name: "League of Legend",
      image:
        "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=600&auto=format&fit=crop",
      discount: "-30%",
    },
    {
      id: "pubg",
      name: "PUBG Mobile",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
      discount: "-10%",
    },
    {
      id: "juequling",
      name: "Zenless Zone Zero",
      image:
        "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?q=80&w=600&auto=format&fit=crop",
      discount: "-10%",
    },
    {
      id: "yuanshen",
      name: "Genshin Impact",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop",
      discount: "-10%",
    },
    {
      id: "benghuai",
      name: "Honkai: Star Rail",
      image:
        "https://images.unsplash.com/photo-1628260412297-a3377e45006f?auto=format&fit=crop&q=80&w=300",
      discount: "-15%",
    },
  ];

  const popularGames = allGames.slice(1, 4); // Show 3 games for popular section

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search Effect
  const fetchGames = async () => {
    setIsLoading(true);
    setShowDropdown(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const results = allGames.filter((game) =>
      game.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
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
            placeholder="Search for game names or keywords"
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
          <span className="text-base">All</span>
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
                      gameSelectChange(game);
                      setShowDropdown(false);
                    }}
                    key={game.id}
                    className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl cursor-pointer group transition-colors"
                  >
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="text-white font-medium group-hover:text-purple-400 transition-colors">
                        {game.name}
                      </div>
                    </div>
                    <span className="bg-purple-600 px-2 py-0.5 rounded text-xs font-bold text-white">
                      {game.discount}
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
                    什么都没有喔
                  </h3>
                </div>

                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-4 text-gray-200">
                    <FireOutlined className="text-orange-500" />
                    <span className="font-medium">Popular Games</span>
                  </div>
                  <div className="space-y-2">
                    {popularGames.map((game) => (
                      <div
                        onClick={() => {
                          gameSelectChange(game);
                          setShowDropdown(false);
                        }}
                        key={game.id}
                        className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-xl cursor-pointer group transition-colors"
                      >
                        <img
                          src={game.image}
                          alt={game.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1 text-white font-medium group-hover:text-purple-400 transition-colors">
                          {game.name}
                        </div>
                        <span className="bg-purple-600 px-2 py-0.5 rounded text-xs font-bold text-white">
                          {game.discount}
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
        {popularGames.map((game) => (
          <button
            key={game.id}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            style={{ border: "0.5px solid rgba(255, 255, 255, 0.8)" }}
          >
            <span>✓</span>
            {game.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameSearch;
