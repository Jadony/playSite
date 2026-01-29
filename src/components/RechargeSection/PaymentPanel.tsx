import React, { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import GameSelectDropDown from "./GameSelectDropDown";
import avatar1 from "@/assets/avatars/Ellipse 1.png";
import avatar2 from "@/assets/avatars/Ellipse 2.png";
import avatar3 from "@/assets/avatars/Ellipse 36.png";

const staticData = [
  {
    id: 1,
    image: avatar1,
    name: "sa******df",
    time: "5 minutes ago",
  },
  {
    id: 2,
    image: avatar2,
    name: "sa******df",
    time: "6 minutes ago",
  },
  {
    id: 3,
    image: avatar3,
    name: "sa******df",
    time: "7 minutes ago",
  },
];
const serverOptions = [
  {
    type: "International-Clothing",
    name: "International-Clothing",
  },
  {
    type: "Asia",
    name: "Asia",
  },
  {
    type: "America",
    name: "America",
  },
  {
    type: "Europe",
    name: "Europe",
  },
  {
    type: "TW, HK, MO",
    name: "TW, HK, MO",
  },
];

type PaymentPanelProps = {
  selectGameItem: GameItem | null;
};

const PaymentPanel: React.FC<PaymentPanelProps> = ({ selectGameItem }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedServerType, setSelectedServerType] = useState<{
    type: string;
    name: string;
  }>(serverOptions[0]);

  return (
    <div
      className="h-fit p-5 rounded-2xl backdrop-blur"
      style={{
        backgroundColor: "#FFFFFF0D",
        border: "1px solid #FFFFFF33",
      }}
    >
      {/* User Info / Ticker */}
      <div
        className="gap-3 rounded-lg pb-3 relative"
        style={{
          borderBottom: "1px solid #282836",
          borderRadius: "0",
        }}
      >
        {staticData.map((item, index) => {
          if (index > 3) return;
          return (
            <div
              className="absolute"
              key={item.id}
              style={{
                left: `${index * 15}px`,
              }}
            >
              <div className="w-8 h-8 rounded-full bg-white/10">
                <div className="text-xs">
                  <img src={item.image} alt={item.name} />
                </div>
              </div>
            </div>
          );
        })}
        <div
          className="text-white relative left-[50px]"
          style={{
            left: staticData.length * 24,
          }}
        >
          <p className="text-sm">User {staticData[0].name}</p>
          <p className="text-xs">placed an order {staticData[0].time}</p>
        </div>
      </div>
      <div>
        {/* Community Select */}
        <div
          className="mt-3 pb-3"
          style={{
            borderBottom: "1px solid #282836",
          }}
        >
          <label className="text-sm text-white mb-2 block font-medium">
            Community
          </label>
          <div className="transition-colors">
            <span className="text-sm text-white">
              {selectGameItem?.itemName}
            </span>
          </div>
        </div>

        {/* Recharge Method */}
        <div
          className="mt-3 pb-3"
          style={{
            borderBottom: "1px solid #282836",
          }}
        >
          <label className="text-sm text-white mb-2 block font-medium">
            Recharge method
          </label>
          <div className="transition-colors">
            <span className="text-sm text-white">Self-service recharge</span>
          </div>
        </div>

        {/* Area / Server */}
        <div
          className="mt-3 pb-3"
          style={{
            borderBottom: "1px solid #282836",
          }}
        >
          <GameSelectDropDown
            onChange={(value) => {
              setSelectedServerType(value);
            }}
            label="Area / Server"
            options={serverOptions}
            name={selectedServerType.name}
            keyName="type"
          />
        </div>

        {/* UID */}
        <div
          className="mt-3 pb-3"
          style={{
            borderBottom: "1px solid #282836",
          }}
        >
          <label className="text-sm text-white mb-2 block font-medium ml-1">
            UID
          </label>
          <input
            type="text"
            placeholder="Game ID"
            className="w-full bg-[#2e2e36] rounded-lg p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50"
          />
        </div>

        {/* Quantity */}
        <div
          className="mt-3 pb-3"
          style={{
            borderBottom: "1px solid #282836",
          }}
        >
          <label className="text-sm text-white mb-2 block font-medium ml-1">
            Quantity
          </label>
          <div className="flex items-center justify-between bg-[#2e2e36] rounded-lg p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
            >
              -
            </button>
            <span className="text-sm font-medium text-white">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
            >
              +
            </button>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-4">
          <label className="text-sm text-white mb-1 block font-medium ml-1">
            Price
          </label>
          <div className="flex justify-between items-baseline mb-4">
            <span
              className="text-base font-bold"
              style={{
                background:
                  "linear-gradient(275.92deg, #EE22EB 29.33%, #AA00FF 92.01%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              $ 260.90
            </span>
            <span className="text-sm text-gray-500 cursor-pointer">
              $200 OFF Weekly &gt;
            </span>
          </div>
          <PrimaryButton
            variant="primary"
            size="large"
            fullWidth
            onClick={() => {
              console.log("Trade Now");
            }}
          >
            <span className="text-base">Trade Now</span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default PaymentPanel;
