import { useEffect, useState } from "react";
import PaymentPanel from "@components/RechargeSection/PaymentPanel";
import ProductGrid from "@components/RechargeSection/ProductGrid";
import RecentOrders from "./RecentOrders";
import { useParams } from "react-router-dom";
import { gameDetail } from "@/api/game";
import { message } from "antd";
import { useLanguageContext } from "@/store/languageStore";
import "./style.css";

const GameItemDetail = () => {
  const [selectGameItem, setSelectGameItem] = useState<GameItem | null>(null);
  const [itemsData, setItemsData] = useState<GameDetailResponseData>();
  const [recentOrders, setRecentOrders] = useState<RecentOrdersResponseData[]>(
    [],
  );
  const { selectUnit } = useLanguageContext();
  const gameItemClick = (item: GameItem) => {
    setSelectGameItem(item);
  };
  const { id } = useParams();
  const getGameItemDetail = async () => {
    try {
      const { data } = await gameDetail({
        gameId: Number(id),
        currency: selectUnit?.currency || "",
      });
      setItemsData(data.data);
    } catch (error) {
      message.error("error");
    }
  };

  useEffect(() => {
    if (selectUnit?.currency) {
      getGameItemDetail();
    }
  }, [id, selectUnit?.currency]);

  return (
    <section className="w-full max-w-[1280px] mx-auto">
      <div style={{ padding: "140px 0 50px 0" }}>
        <div
          className="relative flex justify-between game-detail-img"
          style={
            {
              "--behindBgImage": `url('${itemsData?.behindBgImage}')`,
            } as React.CSSProperties
          }
        >
          <RecentOrders recentOrders={recentOrders} />
          <div>
            <img
              className="max-h-[326px]"
              src={itemsData?.frontBgImage}
              alt=""
            />
          </div>
        </div>
        <div className="flex justify-between">
          {/* LEFT SIDEBAR: Payment Panel */}
          <div className="w-[315px]">
            <PaymentPanel
              selectGameItem={selectGameItem}
              isShowRecentOrders={false}
              setRecentOrders={setRecentOrders}
            />
          </div>

          {/* RIGHT GRID: Products */}
          <div className="flex-1 ml-10 text-white">
            <ProductGrid
              isShowTitle={false}
              selectGameItem={selectGameItem}
              products={itemsData?.skuList || []}
              gameItemClick={gameItemClick}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameItemDetail;
