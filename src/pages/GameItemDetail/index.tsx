import { useEffect, useState } from "react";
import PaymentPanel from "@components/RechargeSection/PaymentPanel";
import ProductGrid from "@components/RechargeSection/ProductGrid";
import { useParams } from "react-router-dom";
import { gameDetail } from "@/api/game";
import { message } from "antd";

const GameItemDetail = () => {
  const [selectGameItem, setSelectGameItem] = useState<GameItem | null>(null);
  const [itemList, setItemList] = useState<GameItem[]>([]);
  const gameItemClick = (item: GameItem) => {
    setSelectGameItem(item);
  };
  const { id } = useParams();
  const getGameItemDetail = async () => {
    try {
      const { data } = await gameDetail({
        gameId: Number(id),
      });
      setItemList(data.data.skuList);
    } catch (error) {
      message.error("error");
    }
  };

  useEffect(() => {
    getGameItemDetail();
  }, [id]);

  return (
    <section className="w-full max-w-[1280px] mx-auto">
      <div style={{ padding: "140px 0 50px 0" }}>
        <div className="flex justify-between">
          {/* LEFT SIDEBAR: Payment Panel */}
          <div className="w-[315px]">
            <PaymentPanel selectGameItem={selectGameItem} />
          </div>

          {/* RIGHT GRID: Products */}
          <div className="flex-1 ml-10 text-white">
            <ProductGrid
              isShowTitle={false}
              selectGameItem={selectGameItem}
              products={itemList}
              gameItemClick={gameItemClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameItemDetail;
