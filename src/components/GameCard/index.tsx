import React from "react";
import { useTranslation } from "react-i18next";
import DiscountTag from "../DiscountTag";
import "./style.css";

interface GameCardProps {
  item: Game;
}

const GameCard: React.FC<GameCardProps> = ({ item }) => {
  const { t } = useTranslation();
  const gameItemClick = (item: Game) => {
    console.log(item);
  };
  return (
    <div
      onClick={() => gameItemClick(item)}
      key={item.id}
      className="mb-12 relative flex flex-col items-center cursor-pointer backdrop-blur transition-transform duration-300 hover:translate-y-[-15px]"
    >
      {/* Discount Badge */}
      {item.discount && (
        <div className="absolute top-2 right-2 z-10">
          <DiscountTag discount={item.discount} />
        </div>
      )}

      {/* Image Container - simplified, transparent bg as per image */}
      <div className="w-full aspect-square flex items-center justify-center mb-2">
        <img
          src={item.image}
          alt="Product"
          className={`w-[240px] h-[290px] object-contain drop-shadow-lg rounded-2xl rounded-[14px] border-[1px] border-gray-500 hover:border-2 hover:border-white`}
        />
      </div>
      <div className="w-full">
        <div className="text-lg text-white font-simibold mb-2">{item.name}</div>
        <div className="text-sm text-[#EE22EB]">
          {t("games.theHighestProvince")} $ {item.discount}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
