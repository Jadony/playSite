import React, { useState } from "react";
import PaymentPanel from "./PaymentPanel";
import ProductGrid from "./ProductGrid";
import gameItem1 from "@/assets/gameItems/gameitem1.svg";

const products: GameItem[] = [
  {
    id: "1",
    image: gameItem1,
    discount: "-22%",
    itemName: "Zenless Zone Zero",
    oldPrice: "$ 234",
    nowPrice: "$ 260.90",
    tag: null,
  },
  {
    id: "2",
    image: gameItem1,
    discount: "9.2%off today",
    itemName: "Zenless Zone Zero",
    oldPrice: "$ 234",
    nowPrice: "$ 260.90",
    tag: "HOT",
  },
  {
    id: "3",
    image: gameItem1,
    discount: "-5%",
    itemName: "Zenless Zone Zero",
    oldPrice: "$ 234",
    nowPrice: "$ 260.90",
    tag: null,
  },
  {
    id: "4",
    image: gameItem1,
    discount: "-10%",
    itemName: "Zenless Zone Zero",
    oldPrice: "$ 234",
    nowPrice: "$ 260.90",
    tag: null,
  },
  // Row 2
  {
    id: "5",
    image: gameItem1,
    discount: null,
    itemName: "Zenless Zone Zero",
    oldPrice: "$ 234",
    nowPrice: "$ 260.90",
    tag: null,
  },
  {
    id: "6",
    image: gameItem1,
    discount: "-22%",
    itemName: "Zenless Zone Zero",
    oldPrice: "$ 234",
    nowPrice: "$ 260.90",
    tag: null,
  },
  {
    id: "7",
    image: gameItem1,
    discount: "-22%",
    itemName: "Zenless Zone Zero",
    oldPrice: "$ 234",
    nowPrice: "$ 260.90",
    tag: null,
  },
  {
    id: "8",
    image: gameItem1,
    discount: "-22%",
    itemName: "Zenless Zone Zero",
    oldPrice: "$ 234",
    nowPrice: "$ 260.90",
    tag: null,
  },
  // Row 3 (partial to match image approximately or just fill grid)
  {
    id: "9",
    image: gameItem1,
    discount: "-22%",
    itemName: "Zenless Zone Zero",
    oldPrice: "$ 234",
    nowPrice: "$ 260.90",
    tag: null,
  },
  {
    id: "10",
    image: gameItem1,
    discount: "-22%",
    itemName: "Zenless Zone Zero",
    oldPrice: "$ 234",
    nowPrice: "$ 260.90",
    tag: null,
  },
];

const RechargeSection: React.FC = () => {
  const [selectGameItem, setSelectGameItem] = useState<GameItem | null>(null);
  const gameItemClick = (item: GameItem) => {
    setSelectGameItem(item);
  };
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
            products={products}
            gameItemClick={gameItemClick}
          />
        </div>
      </div>
    </section>
  );
};

export default RechargeSection;
