import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";
import "./style.css";
import PrimaryButton from "@/components/PrimaryButton";
import CouponModal from "@/components/CouponModal";
import { redeemInOrder } from "@/api/user";
import { useLanguageContext } from "@/store/languageStore";
import CouponExchangeSuccess from "@/components/CouponExchangeSuccess";
import CouponExchangeErr from "@/components/CouponExchangeErr";
import { availableForOrder, calculate } from "@/api/payment";
import { message } from "antd";
import PaymentModal from "@/components/PaymentModal";

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
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const params = useParams();
  const { selectUnit } = useLanguageContext();

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
        skuId: Number(params.skuId),
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

  return (
    <div className="container payment-container mx-auto px-4 md:px-12 lg:px-24 pt-48 pb-20">
      {/* Back Button Area */}
      <button
        onClick={() => {
          const from = location.state?.from || "";
          navigate(from);
        }}
        className="flex items-center text-white hover:text-gray-300 transition-colors mb-8 group"
      >
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-colors border border-white/30">
          <ArrowLeft size={18} />
        </div>
        <span className="text-xl font-medium">Return a list of products</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Spans 2 columns) */}
        <div className="lg:col-span-2 space-y-8 bg-white/5 border border-white/20 rounded-2xl">
          {/* Product Info Card */}
          <div className="p-6">
            <div className="flex gap-6 items-start">
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-[#282836] shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80"
                  alt="Zenless Zone Zero Backpack"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Zenless Zone Zero
                </h2>
                <p className="text-white/50 text-sm mb-6">
                  Area service : International clothing
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
                    $ 260.90
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
                      {method.price}
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="p-6 border-t border-[#282836]">
              <button className="text-sm text-white underline">
                Don't have the payment method you want? &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/20 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-6">
              Payment details
            </h3>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between items-center text-white">
                <span>官方价格</span>
                <span>$234</span>
              </div>
              <div className="flex justify-between items-center text-white">
                <span>平台价格</span>
                <span
                  style={{
                    background:
                      "linear-gradient(270deg, #EE22EB 0%, #AA00FF 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  -$234
                </span>
              </div>
              <div className="flex justify-between items-center text-white">
                <span>优惠券</span>
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
                  -$234 &gt;
                </span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter the redemption code"
                className="flex-1 bg-white/10 border border-transparent rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
              />
              <button
                className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors whitespace-nowrap"
                onClick={() => exchangeOnClick(promoCode)}
              >
                Confirm
              </button>
            </div>

            <div className="space-y-4 mb-6 text-sm border-b border-[#282836] pb-6">
              <div className="flex justify-between items-center text-gray-300">
                <span>优惠总计</span>
                <span className="text-[#EE22EB]">-$234</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span className="flex items-center gap-1">
                  手续费 <Info size={14} className="text-gray-500" />
                </span>
                <span>-$234</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-white font-medium">合计</span>
              <span className="text-2xl font-bold" style={{ color: "#EE22EB" }}>
                $ 260.90
              </span>
            </div>

            {/* Radiant Payment Button */}
            <PrimaryButton
              onClick={() => setPaymentModalVisible(true)}
              className="w-full py-4 rounded-[73px] text-white font-bold text-lg relative overflow-hidden"
            >
              Payment
            </PrimaryButton>
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
      <PaymentModal
        visible={paymentModalVisible}
        onClose={() => setPaymentModalVisible(false)}
      />
    </div>
  );
};

export default Payment;
