import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@/components/PrimaryButton";
import { useLocation, useNavigate } from "react-router-dom";
import GameSelectDropDown from "./GameSelectDropDown";
import LoginModal from "@/components/LoginModal";
import { useAuthContext } from "@/store/authStore";
import CouponModal from "../CouponModal";
import { redeemInOrder } from "@/api/user";
import CouponExchangeSuccess from "../CouponExchangeSuccess";
import CouponExchangeErr from "../CouponExchangeErr";
import { message } from "antd";
import {
  availableForOrder,
  calculate,
  createOrder,
  recentOrders,
} from "@/api/payment";
import { useLanguageContext } from "@/store/languageStore";
import CommonModal from "../CommonModal";
import PriceDetailModal from "../PriceDetailModal";
import UIDErrorModal from "../UIDErrorModal";

type PaymentPanelProps = {
  selectGameItem: GameItem | null;
  isShowRecentOrders?: boolean;
  setRecentOrders?: (data: RecentOrdersResponseData[]) => void;
};

const PaymentPanel: React.FC<PaymentPanelProps> = ({
  selectGameItem,
  isShowRecentOrders = true,
  setRecentOrders,
}) => {
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
  const [recentOrdersData, setRecentOrdersData] = useState<
    RecentOrdersResponseData[]
  >([]);
  const [coupon, setCoupon] = useState<UserCouponsResponseData | null>(null);
  const [coupons, setCoupons] = useState<UserCouponsResponseData[]>([]);
  const [selectedCoupon, setSelectedCoupon] =
    useState<UserCouponsResponseData | null>(null);
  const [calculateData, setCalculateData] =
    useState<CalculateResponseData | null>(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [priceDetailVisible, setPriceDetailVisible] = useState(false);
  const [showUIDErrorModal, setShowUIDErrorModal] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const { selectUnit } = useLanguageContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleTradeBtn = async () => {
    if (!isAuthenticated) {
      setLoginModalVisible(true);
      return;
    }
    try {
      const { data } = await createOrder({
        skuId: selectGameItem?.id || 0,
        couponUserId: selectedCoupon?.id,
        uId: uid || "",
        serverInfo: selectedServerType?.name || "",
      });
      if (data.code === 1005) {
        setShowUIDErrorModal(true);
        return;
      }
      navigate(`/payment/${data.data.orderNo}`, {
        state: { from: location.pathname },
      });
    } catch (error) {
      message.error("error");
    }
  };

  const exchangeOnClick = async (code: string) => {
    try {
      const { data } = await redeemInOrder({
        redeemCode: code,
        currency: selectUnit?.currency,
      });
      if (data.code === 200) {
        setSuccessModalVisible(true);
        setCoupon(data.data);
        const { data: couponsData } = await availableForOrder({
          orderAmount: calculateData?.finalPrice.toString() || "0",
          currency: selectUnit?.currency,
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
    if (!isAuthenticated) return;
    try {
      const { data } = await calculate({
        skuId: selectGameItem?.id || 0,
        couponId: selectedCoupon?.id,
        quantity: 1,
        currency: selectUnit?.currency,
      });
      setSelectedCoupon(data.data.selectedCoupon);
      setCalculateData(data.data);
      setCoupons(data.data.availableCoupons);
    } catch (error) {
      message.error("error");
    }
  };

  const getRecentOrders = async () => {
    try {
      const { data } = await recentOrders({
        skuId: selectGameItem?.id || -1,
      });
      setRecentOrdersData(data.data);
      setRecentOrders?.(data.data);
    } catch (error) {
      message.error("error");
    }
  };

  useEffect(() => {
    if (selectGameItem) {
      getCalculateData();
      setSelectedServerType(null);
    }
    getRecentOrders();
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
      {isShowRecentOrders &&
        recentOrdersData &&
        recentOrdersData.length > 0 && (
          <div
            className="gap-3 rounded-lg pb-3 mb-3 relative"
            style={{
              borderBottom: "1px solid #282836",
              borderRadius: "0",
            }}
          >
            {recentOrdersData.map((item, index) => {
              if (index > 3) return;
              return (
                <div
                  className="absolute"
                  key={item.nickname}
                  style={{
                    left: `${index * 15}px`,
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-white/10">
                    <div className="text-xs">
                      <img
                        className="rounded-full border-white border-2"
                        src={item.avatar}
                        alt={item.nickname}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className="text-white relative left-[50px]"
              style={{
                left: 72,
              }}
            >
              <p className="text-sm">{recentOrdersData[0]?.nickname}</p>
              <p className="text-xs">
                {t("home.selectorAndPayment.placedAnOrder")}{" "}
                {recentOrdersData[0]?.finishedTime}
              </p>
            </div>
          </div>
        )}
      <div>
        {/* Community Select */}
        <div
          className="pb-3"
          style={{
            borderBottom: "1px solid #282836",
          }}
        >
          <label className="text-sm text-white mb-2 block font-medium">
            {t("home.selectorAndPayment.commodity")}
          </label>
          <div className="transition-colors">
            <span className="text-sm text-white">
              {selectGameItem?.skuNames}
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
            {t("home.selectorAndPayment.topUpMethod")}
          </label>
          <div className="transition-colors">
            <span className="text-sm text-white">
              {t("home.selectorAndPayment.uidTopUp")}
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
              selectGameItem?.zoneInfos.map((item) => {
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
          <label className="text-sm text-white mb-2 block font-medium ml-1 flex items-center">
            {t("home.selectorAndPayment.uid")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="ml-2 cursor-pointer"
              onClick={() => setShowHelpModal(true)}
            >
              <g opacity="0.5" clip-path="url(#clip0_92_852)">
                <path
                  d="M7 9.3335H7.00583"
                  stroke="white"
                  stroke-width="0.875"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 4.6665V6.99984"
                  stroke="white"
                  stroke-width="0.875"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.93202 1.1665C9.24141 1.16657 9.53811 1.28953 9.75685 1.50834L12.4915 4.243C12.7103 4.46175 12.8333 4.75844 12.8334 5.06784V8.93184C12.8333 9.24123 12.7103 9.53793 12.4915 9.75667L9.75685 12.4913C9.53811 12.7101 9.24141 12.8331 8.93202 12.8332H5.06802C4.75863 12.8331 4.46193 12.7101 4.24319 12.4913L1.50852 9.75667C1.28971 9.53793 1.16675 9.24123 1.16669 8.93184V5.06784C1.16675 4.75844 1.28971 4.46175 1.50852 4.243L4.24319 1.50834C4.46193 1.28953 4.75863 1.16657 5.06802 1.1665H8.93202Z"
                  stroke="white"
                  stroke-width="0.875"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_92_852">
                  <rect width="14" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
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
            {t("useCenter.quantity")}
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
              {selectUnit?.unit}{" "}
              {isAuthenticated && selectGameItem?.id
                ? calculateData?.finalPrice
                : selectGameItem?.bubblePrice}
            </span>
            {isAuthenticated && selectGameItem?.id && (
              <span
                className="text-sm text-white/50 cursor-pointer"
                onClick={() => {
                  if (!isAuthenticated) {
                    setLoginModalVisible(true);
                    return;
                  }
                  setPriceDetailVisible(true);
                  // setCouponModalVisible(true);
                }}
              >
                {selectUnit?.unit}
                {calculateData?.totalDiscount}&nbsp;
                {t("home.selectorAndPayment.offAlready")} &gt;
              </span>
            )}
          </div>
          <PrimaryButton
            variant="primary"
            size="large"
            fullWidth
            disabled={!selectGameItem?.id}
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
      <PriceDetailModal
        visible={priceDetailVisible}
        originalPrice={calculateData?.originalPrice}
        platformPrice={calculateData?.platformPrice}
        couponDiscount={calculateData?.couponDiscount}
        finalPrice={calculateData?.finalPrice}
        unit={selectUnit?.unit}
        openCouponModal={() => {
          setPriceDetailVisible(false);
          setCouponModalVisible(true);
        }}
        onClose={() => setPriceDetailVisible(false)}
      />
      <CouponModal
        selectedCoupon={selectedCoupon}
        visible={couponModalVisible}
        onClose={() => setCouponModalVisible(false)}
        exchangeOnClick={exchangeOnClick}
        coupons={coupons}
        selectCurCoupon={selectCurCoupon}
        unit={selectUnit?.unit}
        totalDiscount={calculateData?.totalDiscount}
      />
      <CouponExchangeSuccess
        visible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
        coupon={coupon}
        isShowRightBtn={false}
      />
      <CouponExchangeErr
        visible={failureModalVisible}
        onClose={() => setFailureModalVisible(false)}
      />
      <CommonModal
        content="如何获取游戏UID如何获取游戏UID如何获取游戏UID如何获取游戏UID"
        title="如何获取游戏UID"
        visible={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
      <UIDErrorModal
        visible={showUIDErrorModal}
        onClose={() => setShowUIDErrorModal(false)}
      />
    </div>
  );
};

export default PaymentPanel;
