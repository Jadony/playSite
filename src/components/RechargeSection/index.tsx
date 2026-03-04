import React, { useEffect, useState } from "react";
import PaymentPanel from "./PaymentPanel";
import ProductGrid from "./ProductGrid";
import { gameDetail } from "@/api/game";
import { useAllGamesAndSelectContext } from "@/store/gameStore";
import { message } from "antd";
import { useLanguageContext } from "@/store/languageStore";

const RechargeSection: React.FC = () => {
  const [selectGameItem, setSelectGameItem] = useState<GameItem | null>(null);
  const [itemList, setItemList] = useState<GameItem[]>([]);
  const { selectGame } = useAllGamesAndSelectContext();
  const { selectUnit } = useLanguageContext();
  const gameItemClick = (item: GameItem) => {
    setSelectGameItem(item);
  };
  const getGameItemList = async () => {
    if (!selectGame?.gameId) return;
    try {
      const { data } = await gameDetail({
        gameId: selectGame.gameId,
        currency: selectUnit?.currency || "",
      });
      setItemList(data.data.skuList);
    } catch (error) {
      message.error("error");
    }
  };

  useEffect(() => {
    getGameItemList();
  }, [selectGame, selectUnit]);

  return (
    <section className="w-full max-w-[1280px] mx-auto">
      <div className="flex justify-between">
        {/* LEFT SIDEBAR: Payment Panel */}
        <div className="w-[315px]">
          <PaymentPanel selectGameItem={selectGameItem} />
        </div>

        {/* RIGHT GRID: Products */}
        <div className="flex-1 ml-10">
          <ProductGrid
            selectGameItem={selectGameItem}
            products={itemList}
            gameItemClick={gameItemClick}
          />
        </div>
      </div>
    </section>
  );
};

export default RechargeSection;
