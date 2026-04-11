import React from "react";
import { useAllGamesAndSelectContext } from "@/store/gameStore";
import DiscountTag from "@/components/DiscountTag";
// import Pagination from "@/components/Pagination";

type ProductGridProps = {
  isShowTitle?: boolean;
  gameItemClick: (item: GameItem) => void;
  products: GameItem[];
  selectGameItem: GameItem | null;
};

const ProductGrid: React.FC<ProductGridProps> = ({
  isShowTitle = true,
  gameItemClick,
  products,
  selectGameItem,
}) => {
  const { selectGame } = useAllGamesAndSelectContext();

  return (
    <div className="space-y-6 backdrop-blur">
      {/* Search Header */}
      {isShowTitle ? (
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-black italic">
            {selectGame?.gameName}
          </div>
          {/* <div className="relative w-full max-w-md">
          <div className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for game names or keywords"
            className="w-full bg-black border border-white rounded-full py-2.5 pl-12 pr-12 text-sm text-white focus:outline-none focus:border-white transition-colors"
          />
        </div> */}
        </div>
      ) : (
        ""
      )}

      {/* Grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        style={{
          borderBottom: "1px solid #FFFFFF1A",
        }}
      >
        {products.map((item) => (
          <div
            onClick={() => gameItemClick(item)}
            key={item.id}
            className="mb-6 relative flex flex-col items-center cursor-pointer backdrop-blur transition-transform duration-300 hover:scale-105"
            style={{
              transform:
                selectGameItem?.id === item.id ? "translateY(-10px)" : "",
            }}
          >
            {/* Discount Badge */}
            {item.discount !== undefined && (
              <div className="absolute top-2 right-2 z-10">
                <DiscountTag
                  hasSpecialOffer={item.hasSpecialOffer}
                  discount={item.discount}
                />
              </div>
            )}

            {/* Image Container - simplified, transparent bg as per image */}
            <div className="w-full aspect-square flex items-center justify-center mb-2">
              <img
                src={item.skuImg}
                alt="Product"
                className={`w-full h-full object-contain drop-shadow-lg hover:border-2 hover:border-white bg-[#18181c] border-[#484448] border-[1px] rounded-2xl`}
                style={{
                  border:
                    selectGameItem?.id === item.id ? "2px solid white" : "",
                }}
              />
            </div>
            <div className="w-full">
              <div className="text-base font-simibold mb-2">
                {item.skuNames}
              </div>
              <div className="flex justify-between">
                <div className="text-base">
                  {item.unit}&nbsp;
                  {item.bubblePrice}
                </div>
                <div className="text-sm line-through text-gray-500">
                  {item.unit}
                  {item.originalPrice}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination 一期显示所有商品 */}
      {/* <Pagination /> */}
    </div>
  );
};

export default ProductGrid;
