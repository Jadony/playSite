import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@/components/PrimaryButton";
import GameSelectDropDown from "./GameSelectDropDown";
import LoginModal from "@/components/LoginModal";
import avatar1 from "@/assets/avatars/Ellipse 1.png";
import avatar2 from "@/assets/avatars/Ellipse 2.png";
import avatar3 from "@/assets/avatars/Ellipse 36.png";
import { useAuthContext } from "@/store/authStore";
import CouponModal from "../CouponModal";
import { redeemInOrder } from "@/api/user";
import CouponExchangeSuccess from "../CouponExchangeSuccess";
import CouponExchangeErr from "../CouponExchangeErr";
import { message } from "antd";
import { availableForOrder, calculate } from "@/api/payment";

const staticData = [
  {
    id: 1,
    image: avatar1,
    name: "sa******df",
    time: "5",
  },
  {
    id: 2,
    image: avatar2,
    name: "sa******df",
    time: "6",
  },
  {
    id: 3,
    image: avatar3,
    name: "sa******df",
    time: "7",
  },
];

type PaymentPanelProps = {
  selectGameItem: GameItem | null;
};

const PaymentPanel: React.FC<PaymentPanelProps> = ({ selectGameItem }) => {
  // const [quantity, setQuantity] = useState(1);
  const [selectedServerType, setSelectedServerType] = useState<{
    type: string;
    name: string;
  } | null>(null);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [couponModalVisible, setCouponModalVisible] = useState(false);
  const [uid, setUid] = useState("");
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const [coupon, setCoupon] = useState<UserCouponsResponseData | null>(null);
  const [coupons, setCoupons] = useState<UserCouponsResponseData[]>([]);
  const [selectedCoupon, setSelectedCoupon] =
    useState<UserCouponsResponseData | null>(null);
  const [calculateData, setCalculateData] =
    useState<CalculateResponseData | null>(null);
  const { isAuthenticated } = useAuthContext();
  const { t } = useTranslation();

  const handleTradeBtn = () => {
    if (!isAuthenticated) {
      setLoginModalVisible(true);
    }
  };

  const exchangeOnClick = async (code: string) => {
    try {
      const { data } = await redeemInOrder({ redeemCode: code });
      if (data.code === 200) {
        setSuccessModalVisible(true);
        setCoupon(data.data);
        const { data: couponsData } = await availableForOrder({
          orderAmount: calculateData?.finalPrice.toString() || "0",
        });
        setCoupons(couponsData.data);
      } else {
        setFailureModalVisible(true);
      }
    } catch (error) {
      // setSuccessModalVisible(true);
      setFailureModalVisible(true);
    }
  };

  const selectCurCoupon = (coupon: UserCouponsResponseData) => {
    setSelectedCoupon(coupon);
    getCalculateData(coupon);
  };

  const getCalculateData = async (
    selectedCoupon?: UserCouponsResponseData | null,
  ) => {
    try {
      const { data } = await calculate({
        skuId: selectGameItem?.id || 0,
        couponId: selectedCoupon?.id,
        quantity: 1,
      });
      setSelectedCoupon(data.data.selectedCoupon);
      setCalculateData(data.data);
      setCoupons(data.data.availableCoupons);
    } catch (error) {
      message.error("error");
    }
  };

  useEffect(() => {
    getCalculateData();
    setSelectedServerType(null);
  }, [selectGameItem]);

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
          <p className="text-sm">
            {t("home.selectorAndPayment.user")} {staticData[0].name}
          </p>
          <p className="text-xs">
            {t("home.selectorAndPayment.placedAnOrder")} {staticData[0].time}{" "}
            {t("home.selectorAndPayment.minutesAgo")}
          </p>
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
            {t("home.selectorAndPayment.commodity")}
          </label>
          <div className="transition-colors">
            <span className="text-sm text-white">
              {selectGameItem?.goodsName}
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
            {t("home.selectorAndPayment.rechargeMethod")}
          </label>
          <div className="transition-colors">
            <span className="text-sm text-white">
              {t("home.selectorAndPayment.selfServiceRecharge")}
            </span>
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
            placeholder={t("home.selectorAndPayment.plaseSelectServer")}
            label={t("home.selectorAndPayment.areaService")}
            options={
              selectGameItem?.zoneInfo.map((item) => {
                return {
                  type: item,
                  name: item,
                };
              }) ?? []
            }
            name={selectedServerType?.name ?? ""}
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
            {t("home.selectorAndPayment.uid")}
          </label>
          <input
            value={uid}
            onChange={(e) => {
              setUid(e.target.value);
            }}
            type="text"
            placeholder={t("home.selectorAndPayment.gameId")}
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
            {t("home.selectorAndPayment.quantity")}
          </label>
          <div className="flex items-center justify-between rounded-lg p-1">
            <span>1</span>
            {/* <button
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
            </button> */}
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-4">
          <label className="text-sm text-white mb-1 block font-medium ml-1">
            {t("home.selectorAndPayment.price")}
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
              $ {calculateData?.finalPrice}
            </span>
            <span
              className="text-sm text-gray-500 cursor-pointer"
              onClick={() => setCouponModalVisible(true)}
            >
              $ {calculateData?.couponDiscount}
              {t("home.selectorAndPayment.savings")} &gt;
            </span>
          </div>
          <PrimaryButton
            variant="primary"
            size="large"
            fullWidth
            onClick={handleTradeBtn}
          >
            <span className="text-base">
              {t("home.selectorAndPayment.topUpNow")}
            </span>
          </PrimaryButton>
        </div>
      </div>
      <LoginModal
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
      />
      <CouponModal
        selectedCoupon={selectedCoupon}
        visible={couponModalVisible}
        onClose={() => setCouponModalVisible(false)}
        exchangeOnClick={exchangeOnClick}
        coupons={coupons}
        selectCurCoupon={selectCurCoupon}
      />
      <CouponExchangeSuccess
        visible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
        coupon={coupon}
      />
      <CouponExchangeErr
        visible={failureModalVisible}
        onClose={() => setFailureModalVisible(false)}
      />
    </div>
  );
};

export default PaymentPanel;
