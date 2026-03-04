import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { languages } from "@/i18n";
import {
  useLanguageContext,
  useLanguageDispatchContext,
} from "@/store/languageStore";
import LoginModal from "@components/LoginModal";
import GamesDropdown from "./GamesDropdown";
import "./style.css";
import { useAuthContext } from "@/store/authStore";
import userImg from "@/assets/avatars/user.jpg";
import { allGames, hotGames } from "@/api/game";
import { message } from "antd";
import { useAllGamesAndSelectDispatchContext } from "@/store/gameStore";

const Header: React.FC = () => {
  const location = useLocation();
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const [showGames, setShowGames] = useState(false);

  const langRef = React.useRef<HTMLDivElement>(null);
  const currencyRef = React.useRef<HTMLDivElement>(null);
  const gamesRef = React.useRef<HTMLDivElement>(null);
  const { selectLanguage, unitAndLanguageList, selectUnit } =
    useLanguageContext();
  const allGamesAndSelectDispatch = useAllGamesAndSelectDispatchContext();

  const languageDispatch = useLanguageDispatchContext();
  const { isAuthenticated, user } = useAuthContext();

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    languageDispatch({
      type: "setSelectLanguage",
      payload: {
        selectLanguage: lang,
      },
    });
    setShowLang(false);
  };

  function handleClickOutside(event: MouseEvent) {
    if (langRef.current && !langRef.current.contains(event.target as Node)) {
      setShowLang(false);
    }
    if (
      currencyRef.current &&
      !currencyRef.current.contains(event.target as Node)
    ) {
      setShowCurrency(false);
    }
    if (gamesRef.current && !gamesRef.current.contains(event.target as Node)) {
      setShowGames(false);
    }
  }

  const getHotGames = async () => {
    try {
      const { data } = await hotGames({
        limit: 14,
      });
      allGamesAndSelectDispatch({
        type: "setHotGames",
        payload: {
          hotGameList: data.data,
        },
      });
    } catch (error) {
      message.error("error");
    }
  };

  const getAllGames = async () => {
    try {
      const { data } = await allGames();
      allGamesAndSelectDispatch({
        type: "setAllGames",
        payload: {
          gameList: data.data.records,
        },
      });
      allGamesAndSelectDispatch({
        type: "setSelectGame",
        payload: {
          selectGame: data.data.records[0],
        },
      });
    } catch (error) {
      message.error("error");
    }
  };

  useEffect(() => {
    getAllGames();
    getHotGames();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const menuItems: {
    key: string;
    label: string;
    path: string;
    icon?: React.ReactNode;
  }[] = [
    { key: "/", label: t("header.home"), path: "/" },
    { key: "/games", label: t("header.games"), path: "/games" },
    {
      key: "/invite",
      label: t("header.inviteFriends"),
      path: "/invite",
      icon: <span className="mr-1">🔥</span>,
    },
    { key: "/suggested", label: t("header.suggestion"), path: "/suggested" },
    { key: "/help", label: t("header.helpCenter"), path: "/help" },
    { key: "/about", label: t("header.about"), path: "/about" },
  ];

  return (
    <>
      {/* 1. FIXED LEFT: LOGO */}
      <div className="absolute top-6 left-8 z-50 animate-fade-in">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-md shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] group-hover:bg-white/10 transition-all">
            <span className="text-xl">⚡</span>
          </div>
          <span className="text-white font-bold text-xl tracking-wide hidden sm:block drop-shadow-md group-hover:text-game-primary transition-colors">
            LOGO
          </span>
        </Link>
      </div>

      {/* 2. FIXED CENTER: MENU ONLY */}
      <div className="absolute top-0 left-0 right-0 z-40 flex justify-center pt-6 px-4 pointer-events-none">
        <div className="pointer-events-auto h-14 flex items-center justify-center transition-all duration-300 px-2 glass-gradient-border">
          <div className="flex items-center gap-1">
            {menuItems.map((item) => (
              <div key={item.key} className="relative">
                {item.key === "/games" ? (
                  <div
                    ref={gamesRef}
                    onClick={() => {
                      setShowGames(!showGames);
                      setShowLang(false);
                      setShowCurrency(false);
                    }}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group flex items-center gap-1 cursor-pointer select-none ${
                      isActive(item.path)
                        ? "text-black bg-white shadow-lg scale-105"
                        : "text-white"
                    }`}
                  >
                    {item.label}
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-300 ${showGames ? "rotate-180" : ""} ${isActive(item.path) ? "stroke-black" : "stroke-current"}`}
                    >
                      <path
                        d="M1 1L5 5L9 1"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    {showGames && (
                      <GamesDropdown onClose={() => setShowGames(false)} />
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group flex items-center gap-1 ${
                      isActive(item.path)
                        ? "text-black bg-white shadow-lg scale-105"
                        : "text-white"
                    }`}
                  >
                    {item.key === "/invite" && (
                      <span className="text-base">🔥</span>
                    )}
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. FIXED RIGHT: USER ACTIONS */}
      <div className="absolute top-6 right-8 z-50 flex items-center gap-4 animate-fade-in">
        <div className="hidden lg:flex items-center gap-6 mr-2">
          <div className="relative" ref={langRef}>
            <div
              onClick={() => {
                setShowLang(!showLang);
                setShowCurrency(false);
              }}
              className="flex items-center gap-2 text-white cursor-pointer transition-colors select-none"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-colors"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M2.05 12h19.9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 2.05c2.5 3.5 4 6.83 4 9.95s-1.5 6.45-4 9.95c-2.5-3.5-4-6.83-4-9.95s1.5-6.45 4-9.95z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="text-sm font-medium">{selectLanguage}</span>
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`stroke-current opacity-50 transition-transform duration-300 ${showLang ? "rotate-180" : ""}`}
              >
                <path
                  d="M1 1L5 5L9 1"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Language Dropdown */}
            {showLang && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-32 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl py-2 animate-fade-in z-50 backdrop-blur-md">
                {languages.map((lang) => (
                  <div
                    key={lang}
                    onClick={() => {
                      changeLanguage(lang);
                    }}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-white/10 transition-colors ${selectLanguage === lang ? "text-white font-bold" : "text-gray-400"}`}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-px h-4 bg-white/10"></div>

          <div className="relative" ref={currencyRef}>
            <div
              onClick={() => {
                setShowCurrency(!showCurrency);
                setShowLang(false);
              }}
              className="flex items-center gap-2 text-white cursor-pointer transition-colors select-none"
            >
              <span className="text-sm font-medium">
                {selectUnit?.unit} {selectUnit?.currency}
              </span>
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`stroke-current opacity-50 transition-transform duration-300 ${showCurrency ? "rotate-180" : ""}`}
              >
                <path
                  d="M1 1L5 5L9 1"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Currency Dropdown */}
            {showCurrency && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-24 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl py-2 animate-fade-in z-50 backdrop-blur-md">
                {unitAndLanguageList?.map((curr) => (
                  <div
                    key={curr.currency}
                    onClick={() => {
                      languageDispatch({
                        type: "setSelectUnit",
                        payload: {
                          selectUnit: {
                            currency: curr.currency,
                            unit: curr.unit,
                          },
                        },
                      });
                      setShowCurrency(false);
                    }}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-white/10 transition-colors ${selectUnit?.currency === curr.currency ? "text-white font-bold" : "text-gray-400"}`}
                  >
                    {curr.unit} {curr.currency}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <img
              src={user?.avatar || userImg}
              alt="user"
              className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
              onClick={() => navigate("/user-center")}
            />
          </div>
        ) : (
          <button
            onClick={() => setLoginModalVisible(true)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-white/90 hover:text-white font-medium text-sm hover:bg-[#2a2a2a] transition-all glass-gradient-border"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t("loginSignUp")}
          </button>
        )}
      </div>

      <LoginModal
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
      />
    </>
  );
};

export default Header;
