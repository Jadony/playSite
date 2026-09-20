/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-01-24 16:13:31
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-09-20 12:27:36
 * @FilePath: /playSite/src/components/GameCard/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { useTranslation } from "react-i18next";
import DiscountTag from "../DiscountTag";
import "./style.css";
import { useNavigate } from "react-router-dom";
interface GameCardProps {
  item: Game;
  unit?: string;
}

const GameCard: React.FC<GameCardProps> = ({ item }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const gameItemClick = (item: Game) => {
    navigate(`/games/${item.gameId}`);
  };
  return (
    <div
      onClick={() => gameItemClick(item)}
      key={item.gameId}
      className="mb-12 mr-10 relative flex flex-wrap flex-col items-center cursor-pointer backdrop-blur transition-transform duration-300 hover:translate-y-[-15px]"
    >
      {/* Discount Badge */}
      {item.maxDiscount !== undefined && (
        <div className="absolute top-2 right-2 z-10">
          <DiscountTag discount={item.maxDiscount} />
        </div>
      )}

      {/* Image Container - simplified, transparent bg as per image */}
      <div className="w-full aspect-square flex items-center justify-center mb-2">
        <img
          src={item.iconUrl}
          alt="Product"
          className={`w-[240px] h-[290px] object-contain drop-shadow-lg rounded-2xl rounded-[14px] border-[1px] border-gray-500 hover:border-2 hover:border-white`}
        />
      </div>
      <div className="w-full">
        <div className="text-lg text-white font-simibold mb-2">
          {item.gameName}
        </div>
        <div className="text-sm text-[#EE22EB]">
          {t("games.maxDiscount")} {item.maxDiscount} %
        </div>
      </div>
    </div>
  );
};

export default GameCard;
