import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import "./style.css";
import CouponModal from "@/components/CouponModal";
import { getOrderDetail, redeemInOrder } from "@/api/user";
import { useLanguageContext } from "@/store/languageStore";
import CouponExchangeSuccess from "@/components/CouponExchangeSuccess";
import CouponExchangeErr from "@/components/CouponExchangeErr";
import { availableForOrder, calculate } from "@/api/payment";
import { useTranslation } from "react-i18next";
import { message } from "antd";
import PayPalCustomButton from "@/components/PaypalButton";
import PaymentProgress from "@/components/PaymentProgress";
import { Timeout } from "ahooks/lib/useRequest/src/types";

// import PaymentModal from "@/components/PaymentModal";

const staticPaymentMethods = [
  { id: "visa-usd", name: "VISA", currency: "USD", price: "$234", icon: "🌐" },
  { id: "usdt-trc20", name: "USDT", currency: "", price: "$234", icon: "₮" },
  {
    id: "alipay-usdt",
    name: "Alipay",
    currency: "USDT",
    price: "$234",
    icon: "支",
  },
  {
    id: "unionpay-usdt",
    name: "UnionPay",
    currency: "USDT",
    price: "$234",
    icon: "银",
  },
];

type PaymentState =
  | "verifying" // 支付中
  | "shipping" // 发货中
  | "success" // 发货成功
  | "failed" // 发货失败
  | "canceled"; // 支付取消

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [quantity, setQuantity] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState("usdt-trc20");
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
  const [paymentProgressVisible, setPaymentProgressVisible] = useState(false);
  const [progressStatus, setProgressStatus] =
    useState<PaymentState>("verifying");
  const [orderDetail, setOrderDetail] =
    useState<OrderDetailResponseData | null>(null);
  const { orderId } = useParams();
  const { selectUnit } = useLanguageContext();
  const { t } = useTranslation();

  // 使用 ref 存储定时器，确保在组件生命周期内唯一且可清理
  const pollTimerRef = useRef<Timeout | null>(null);

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
      message.error("error");
    }
  };

  const getPaymentOrderDetail = async () => {
    try {
      const { data } = await getOrderDetail(orderId || "");
      setOrderDetail(data.data);
    } catch (error) {
      message.error("error");
    }
  };

  const handlePaymentSuccess = () => {
    setProgressStatus("shipping");
  };

  const cancelPayment = () => {
    setProgressStatus("canceled");
  };

  const showPaymentProgress = () => {
    setPaymentProgressVisible(true);
  };

  useEffect(() => {
    // 如果订单详情还没加载出来，不进行轮询判断
    if (!orderDetail || progressStatus !== "shipping") return;

    const status = orderDetail.status;
    const isFinished = status === "COMPLETED" || status === "REFUNDING";

    // 如果已经结束，清除可能存在的定时器
    if (isFinished) {
      if (pollTimerRef.current) {
        clearTimeout(pollTimerRef.current);
        pollTimerRef.current = null;
      }

      // 可选：在这里处理结束后的逻辑，比如跳转或弹窗
      if (status === "COMPLETED") {
        setProgressStatus("success");
      }
      if (status === "REFUNDING") {
        setProgressStatus("failed");
      }
      return;
    }

    // 如果没结束，设置定时器继续请求
    // 先清除旧的定时器防止重叠
    if (pollTimerRef.current) {
      clearTimeout(pollTimerRef.current);
    }

    pollTimerRef.current = setTimeout(() => {
      getPaymentOrderDetail();
    }, 1000); // 每 3 秒轮询一次

    // 清理函数：当组件卸载或依赖变化时清除定时器
    return () => {
      if (pollTimerRef.current) {
        clearTimeout(pollTimerRef.current);
      }
    };
  }, [orderDetail, progressStatus]); // 关键：依赖 orderDetail，每次数据更新都会重新评估是否继续

  useEffect(() => {
    getPaymentOrderDetail();
  }, []);

  return (
    <div className="w-[1280px] payment-container mx-auto pt-48 pb-20">
      {/* Back Button Area */}
      <button
        onClick={() => {
          const from = location.state?.from || "";
          navigate(from);
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
        {/* Left Column (Spans 2 columns) */}
        <div className="shrink-0 space-y-8 bg-white/5 border border-white/20 rounded-2xl w-[905px]">
          {/* Product Info Card */}
          <div className="p-6">
            <div className="flex gap-6 items-start">
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-[#282836] shrink-0">
                <img
                  src={orderDetail?.skuImage}
                  alt="Zenless Zone Zero Backpack"
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

                  {/* Quantity Selector */}
                  <div className="flex items-center bg-[#282836] rounded-lg p-1">
                    {/* <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >
                      <Minus size={14} />
                    </button> */}
                    <span className="w-8 text-center text-white font-medium">
                      {1}
                    </span>
                    {/* <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >
                      <Plus size={14} />
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods Card */}
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
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-center gap-4">
                      {/* Custom Radio Button */}
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

                      {/* Icon placeholder */}
                      <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-lg">
                        {method.icon}
                      </div>

                      <span className="text-white font-medium text-base">
                        {method.name} {method.currency}
                      </span>
                    </div>

                    <span className="text-white font-bold text-xl">
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
          <div className="p-6 rounded-2xl bg-white/5 border border-white/20 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6">
              {t("payment.paymentDetails")}
            </h3>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between items-center text-white">
                <span>{t("userCenter.officialPrice")}</span>
                <span>$234</span>
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
                  {orderDetail?.discountAmount} &gt;
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
                <span className="text-[#EE22EB]">-$234</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span className="flex items-center gap-1">
                  {t("payment.paymentFee")}{" "}
                  <Info size={14} className="cursor-pointer text-gray-500" />
                </span>
                <span>-$234</span>
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

            {/* Radiant Payment Button */}
            <PayPalCustomButton
              cancelPayment={cancelPayment}
              showPaymentProgress={showPaymentProgress}
              currency={selectUnit?.currency || "USD"}
              orderId={orderId}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        </div>
      </div>
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
      <PaymentProgress
        progressStatus={progressStatus}
        visible={paymentProgressVisible}
        onClose={() => setPaymentProgressVisible(false)}
      />
    </div>
  );
};

export default Payment;
