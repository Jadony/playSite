import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import "./style.css";
import PrimaryButton from "@/components/PrimaryButton";
import CouponModal from "@/components/CouponModal";
import { getOrderDetail, redeemInOrder } from "@/api/user";
import { useLanguageContext } from "@/store/languageStore";
import CouponExchangeSuccess from "@/components/CouponExchangeSuccess";
import CouponExchangeErr from "@/components/CouponExchangeErr";
import { availableForOrder, calculate } from "@/api/payment";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import PaymentProgress from "@/components/PaymentProgress";
import { usePayPalPayment } from "@/hooks/usePayPalPayment";

const staticPaymentMethods = [
  {
    id: "paypal",
    name: "PayPal",
    icon: "P",
  },
];

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const { selectUnit } = useLanguageContext();
  const { t } = useTranslation();

  // ---------- 支付相关状态 ----------
  const [selectedMethod] = useState("paypal");
  const [progressVisible, setProgressVisible] = useState(false);
  const [progressStatus, setProgressStatus] = useState<
    "verifying" | "shipping" | "successed" | "failed" | "canceled"
  >("verifying");

  // ---------- 支付 Hook ----------
  const {
    loading,
    startPayment,
    cleanup: closePayWindow,
    setLoading,
  } = usePayPalPayment({
    orderNo: orderId || "",
    currency: selectUnit?.currency,
    setProgressStatus,
    onPaymentSuccess: () => {
      setProgressStatus("shipping");
      // 后续可通过轮询 orderDetail.status 来自动跳到 successed
    },
    onPaymentCancel: () => {
      setProgressStatus("canceled");
    },
  });

  // ---------- 订单详情 ----------
  const [orderDetail, setOrderDetail] =
    useState<OrderDetailResponseData | null>(null);

  const getPaymentOrderDetail = useCallback(async () => {
    if (!orderId) return;
    try {
      const { data } = await getOrderDetail(orderId);
      setOrderDetail(data.data);
      // 根据订单状态设置进度
      if (data.data.status === "REFUNDING") setProgressStatus("failed");
      if (data.data.status === "COMPLETED") setProgressStatus("successed");
    } catch (error) {
      message.error("获取订单信息失败");
    }
  }, [orderId]);

  useEffect(() => {
    getPaymentOrderDetail();
  }, [getPaymentOrderDetail]);

  // ---------- 优惠券相关状态 ----------
  const [promoCode, setPromoCode] = useState("");
  const [couponModalVisible, setCouponModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] =
    useState<UserCouponsResponseData | null>(null);
  const [calculateData, setCalculateData] =
    useState<CalculateResponseData | null>(null);
  const [coupon, setCoupon] = useState<UserCouponsResponseData | null>(null);
  const [coupons, setCoupons] = useState<UserCouponsResponseData[]>([]);

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
          orderAmount: calculateData?.finalPrice?.toString() || "0",
          currency: selectUnit?.currency,
        });
        setCoupons(couponsData.data);
      } else {
        setFailureModalVisible(true);
      }
    } catch (error) {
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
        skuId: Number(orderDetail?.skuId),
        couponId: selectedCoupon?.id,
        quantity: 1,
        currency: selectUnit?.currency,
      });
      setSelectedCoupon(data.data.selectedCoupon);
      setCalculateData(data.data);
      setCoupons(data.data.availableCoupons);
    } catch (error) {
      message.error("计算价格失败");
    }
  };

  // ---------- 支付按钮点击 ----------
  const handlePay = () => {
    setProgressStatus("verifying");
    setProgressVisible(true);
    startPayment();
  };

  // ---------- 关闭进度弹窗 ----------
  const handleCloseProgress = () => {
    closePayWindow(); // 关闭可能还开着的支付窗口
    setProgressVisible(false);
    setLoading(false);
    getPaymentOrderDetail(); // 刷新订单状态
  };

  return (
    <div className="w-[1280px] payment-container mx-auto pt-48 pb-20">
      {/* Back Button */}
      <button
        onClick={() => {
          navigate(`/games/${orderDetail?.gameId}`);
        }}
        className="flex items-center text-white hover:text-gray-300 transition-colors mb-8 group"
      >
        <div className="payment-return-btn glass-gradient-border w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors border border-white/30">
          <ArrowLeft size={18} />
        </div>
        <span className="text-xl font-medium">
          {t("payment.backToItemList")}
        </span>
      </button>

      <div className="flex flex-row gap-[20px] w-full">
        {/* Left Column */}
        <div className="shrink-0 space-y-8 bg-white/5 border border-white/20 rounded-2xl w-[905px]">
          {/* Product Info Card */}
          <div className="p-6">
            <div className="flex gap-6 items-start">
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-[#282836] shrink-0">
                <img
                  src={orderDetail?.skuImage}
                  alt="product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {orderDetail?.skuName}
                </h2>
                <p className="text-white/50 text-sm mb-6">
                  {t("home.selectorAndPayment.areaService")} :{" "}
                  {orderDetail?.gameServer}
                </p>
                <div className="flex items-center justify-between">
                  <div
                    className="text-2xl font-bold"
                    style={{
                      background:
                        "linear-gradient(270deg, #EE22EB 0%, #AA00FF 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    {selectUnit?.unit} {orderDetail?.orderAmount}
                  </div>
                  <div className="flex items-center bg-[#282836] rounded-lg p-1">
                    <span className="w-8 text-center text-white font-medium">
                      {1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="overflow-hidden">
            <div className="flex flex-col">
              {staticPaymentMethods.map((method, index) => {
                const isSelected = selectedMethod === method.id;
                return (
                  <label
                    key={method.id}
                    className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors"
                    style={{
                      borderBottom:
                        index < staticPaymentMethods.length - 1
                          ? "1px solid #282836"
                          : "none",
                      backgroundColor: isSelected
                        ? "rgba(255, 255, 255, 0.03)"
                        : "transparent",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-5 h-5 flex items-center justify-center">
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-black">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="23"
                              height="23"
                              viewBox="0 0 23 23"
                              fill="none"
                            >
                              <circle
                                cx="11.1331"
                                cy="11.1331"
                                r="11.1331"
                                fill="white"
                              />
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                x={4}
                                y={4}
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  d="M11.6668 3.5L5.25016 9.91667L2.3335 7"
                                  stroke="#0C0B0F"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </svg>
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-gray-600"></div>
                        )}
                      </div>
                      <div className="w-8 h-8 rounded bg-black flex items-center justify-center text-lg">
                        {method.icon}
                      </div>
                      <span className="text-white font-medium text-base">
                        {method.name}
                      </span>
                    </div>
                    <span className="text-white font-bold text-xl">
                      {selectUnit?.unit}
                      {orderDetail?.orderAmount}
                    </span>
                  </label>
                );
              })}
            </div>
            <div className="p-6 border-t border-[#282836]">
              <button className="text-sm text-white underline">
                {t("payment.notThePaymentMethodYouPrefer")} &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="shrink-0 w-[355px]">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6">
              {t("payment.paymentDetails")}
            </h3>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between items-center text-white">
                <span>{t("userCenter.officialPrice")}</span>
                <span>
                  {selectUnit?.unit}
                  {orderDetail?.originalPrice}
                </span>
              </div>
              <div className="flex justify-between items-center text-white">
                <span>{t("home.selectorAndPayment.platformPrice")}</span>
                <span
                  style={{
                    background:
                      "linear-gradient(270deg, #EE22EB 0%, #AA00FF 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {selectUnit?.unit}
                  {orderDetail?.platformPrice}
                </span>
              </div>
              <div className="flex justify-between items-center text-white">
                <span>{t("home.selectorAndPayment.coupons")}</span>
                <span
                  className="cursor-pointer"
                  onClick={() => setCouponModalVisible(true)}
                  style={{
                    background:
                      "linear-gradient(270deg, #EE22EB 0%, #AA00FF 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  -{selectUnit?.unit}
                  {orderDetail?.couponDiscount} &gt;
                </span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder={t("payment.couponCode")}
                className="flex-1 bg-white/10 border border-transparent rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
              />
              <button
                className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
                onClick={() => exchangeOnClick(promoCode)}
              >
                {t("payment.redeem")}
              </button>
            </div>

            <div className="space-y-4 mb-6 text-sm border-b border-[#282836] pb-6">
              <div className="flex justify-between items-center text-gray-300">
                <span>{t("payment.totalDiscounts")}</span>
                <span className="text-[#EE22EB]">
                  -{selectUnit?.unit}
                  {orderDetail?.discountAmount}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span className="flex items-center gap-1">
                  {t("payment.paymentFee")}{" "}
                  <Info size={14} className="cursor-pointer text-gray-500" />
                </span>
                <span>
                  -{selectUnit?.unit}
                  {orderDetail?.paymentFee}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-white font-medium">
                {t("payment.totalAmount")}
              </span>
              <span className="text-2xl font-bold" style={{ color: "#EE22EB" }}>
                {selectUnit?.unit} {orderDetail?.orderAmount}
              </span>
            </div>

            <PrimaryButton
              disabled={loading}
              onClick={handlePay}
              className="w-full py-4 rounded-[73px] text-white font-bold text-lg relative overflow-hidden"
            >
              {t("userCenter.payNow")}
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* Modals */}
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

      {/* Payment Progress Modal */}
      <PaymentProgress
        createPaypalOrders={startPayment}
        visible={progressVisible}
        onClose={handleCloseProgress}
        loading={loading}
        getPaymentOrderDetail={getPaymentOrderDetail}
        progressStatus={progressStatus}
      />
    </div>
  );
};

export default Payment;
