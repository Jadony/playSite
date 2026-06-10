/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-01-28 19:49:18
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-06-06 11:41:40
 * @FilePath: /playSite/src/components/RechargeSection/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import PaymentPanel from "./PaymentPanel";
import ProductGrid from "./ProductGrid";
import { gameDetail } from "@/api/game";
import { useAllGamesAndSelectContext } from "@/store/gameStore";
import { message } from "antd";
import { useLanguageContext } from "@/store/languageStore";
import "./style.css";

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
    setSelectGameItem(null);
  }, [selectGame]);

  useEffect(() => {
    getGameItemList();
  }, [selectGame, selectUnit]);

  return (
    <section className="relative recharge-section-container w-full max-w-[1280px] mx-auto">
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
