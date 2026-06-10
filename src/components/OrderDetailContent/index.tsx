import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@components/PrimaryButton";
import { usePurchaseHistoryStatusConfig } from "@/config/userPurchaseHistoryTypes";

export interface OrderProduct {
  image?: string;
  name: string;
  quantity: number;
  uid: string;
  server: string;
  totalPrice: string;
  date: string;
}

export interface OrderInfo {
  orderNo: string;
  paymentMethod: string;
  orderTime: string;
  originalPrice: string;
  discount: string;
}

export interface OrderDetailContentProps {
  onClose?: () => void;
  onBack?: () => void;
  status?: OrderStatus;
  product: OrderDetailResponseData | null;
  orderInfo: OrderDetailResponseData | null;
  /** 支付中时的倒计时，如 "00:54:43" */
  countdown?: number;
  onCancelOrder?: () => void;
  onPayNow?: () => void;
  onRefresh?: () => void;
  onGoProcess?: () => void;
  className?: string;
  loading: boolean;
  unit: string;
}

const OrderDetailContent: React.FC<OrderDetailContentProps> = ({
  onClose,
  onBack,
  status,
  product,
  orderInfo,
  countdown,
  onCancelOrder,
  onPayNow,
  onRefresh,
  // onGoProcess,
  className = "",
  loading,
  unit,
}) => {
  const config = usePurchaseHistoryStatusConfig()[status || "PENDING"];
  const showCountdown = status === "PENDING" && countdown;
  const showActions = status === "PENDING" || status === "PROCESSING";
  const [curTime, setCurTime] = useState(
    (countdown || 0) + 60 * 20 * 1000 - Date.now(),
  );
  const { t } = useTranslation();
  const STEPS = [
    t("userCenter.order"),
    t("userCenter.payment"),
    t("userCenter.delivery"),
    t("userCenter.completed"),
  ] as const;

  useEffect(() => {
    if (showCountdown && curTime > 0) {
      const timer = setInterval(() => {
        setCurTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showCountdown, curTime]);

  const showTime = () => {
    const h = Math.floor(curTime / 3600);
    const m = Math.floor((curTime % 3600) / 60);
    const s = curTime % 60;

    return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
  };

  // Helper function map for status colors
  const getStatusColor = (colorConfig: string, isTag: boolean = false) => {
    switch (colorConfig) {
      case "grey":
        return isTag ? "text-[#949494]" : "text-white";
      case "red":
        return "text-[#DF393C]";
      case "orange":
        return "text-[#009844]";
      case "green":
      case "neutral":
      default:
        return "text-white";
    }
  };

  return (
    <div
      className={`w-full max-w-[945px] h-[640px] bg-[#1a1a1f] rounded-2xl border border-white/10 overflow-hidden flex flex-col px-5 pb-5 box-border ${className}`.trim()}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-5 border-b border-white/10 shrink-0">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={onBack || onClose}
          role="button"
        >
          <span className="text-white text-[16px]">←</span>
          <span className="text-white text-[16px] font-medium">
            {t("userCenter.orderDetails")}
          </span>
        </div>
      </div>

      {/* Status Area */}
      <div className="py-5 text-center shrink-0">
        <div
          className={`text-[20px] font-semibold mb-2 leading-6 ${getStatusColor(
            config.statusColor,
          )}`}
        >
          {config.label}
        </div>
        <div className="text-[#949494] text-[14px] font-normal leading-[18px] mb-5">
          {config.desc}
        </div>

        {/* Progress Stepper */}
        <div className="flex flex-wrap sm:flex-nowrap items-start justify-center gap-2 sm:gap-5 py-5">
          {STEPS.map((step, index) => {
            const completed = index + 1 <= config.completedStep;
            const isLast = index === STEPS.length - 1;
            return (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-[26px] mb-[2px] transition-colors ${
                      completed
                        ? "bg-white text-[#0C0B0F]"
                        : "bg-[#3f3f46] text-transparent"
                    }`}
                  >
                    {completed ? "✓" : ""}
                  </div>
                  <div
                    className={`mt-2 text-[14px] font-normal leading-normal transition-colors ${
                      completed ? "text-white" : "text-[#949494]"
                    }`}
                  >
                    {step}
                  </div>
                </div>
                {!isLast && (
                  <div
                    className={`hidden sm:block w-[80px] md:w-[120px] lg:w-[160px] h-1 mt-[15px] rounded-[15px] shrink-0 transition-colors ${
                      index + 1 < config.completedStep
                        ? "bg-white"
                        : "bg-[#3f3f46]"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Product Section */}
      <div className="border-t border-white/10 shrink-0">
        <div className="flex flex-col sm:flex-row items-start py-5 gap-4">
          <div className="w-full sm:w-[140px] h-[140px] rounded-[10px] overflow-hidden bg-white/5 shrink-0">
            {product?.skuImage ? (
              <img
                src={product.skuImage}
                alt={product.gameName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#6b7280] text-[12px]">
                图
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between h-[140px] w-full">
            <div>
              <div className="text-white text-[20px] font-semibold mb-1.5 truncate">
                {product?.skuName}
              </div>
              <div className="text-[#949494] text-[14px] font-normal leading-normal mb-1">
                {t("userCenter.quantity")}：{product?.quantity}
              </div>
            </div>
            <div className="flex items-center gap-6 mt-auto flex-wrap">
              <span className="text-[#949494] text-[14px] font-normal leading-normal">
                UID：{product?.gameUid}
              </span>
              <span className="text-[#949494] text-[14px] font-normal leading-normal">
                {t("userCenter.server")}：{product?.gameServer}
              </span>
            </div>
          </div>
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:h-[140px] gap-2 shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
            <div className="flex items-center gap-4">
              <span className="text-white text-[20px] font-bold">
                {unit} {product?.orderAmount}
              </span>
            </div>
            {config.actionTag && (
              <span
                className={`text-[20px] font-bold ${getStatusColor(
                  config.statusColor,
                  true,
                )}`}
              >
                {config.actionTag}
              </span>
            )}
            {showActions && (
              <div className="flex items-end gap-3 mt-1">
                {config.secondaryBtn && (
                  <button
                    className="px-4 py-2.5 rounded-lg text-[14px] font-normal cursor-pointer border border-white/30 bg-white text-[#0C0B0F] disabled:opacity-50 hover:bg-gray-200 transition-colors"
                    disabled={loading}
                    onClick={onCancelOrder || (() => console.log("取消订单"))}
                  >
                    {config.secondaryBtn}
                  </button>
                )}
                {config.primaryBtn && status === "PENDING" && (
                  <div className="flex flex-col items-end gap-2">
                    {showCountdown && (
                      <span className="text-[#DB7DFF] text-[14px] font-normal">
                        {showTime()}
                      </span>
                    )}
                    <PrimaryButton
                      size="medium"
                      borderRadius="10px"
                      fontSize="14px"
                      onClick={onPayNow || (() => console.log("立即支付"))}
                    >
                      {config.primaryBtn}
                    </PrimaryButton>
                  </div>
                )}
                {config.primaryBtn && status === "PROCESSING" && (
                  <button
                    className="px-4 py-2.5 rounded-lg text-[14px] font-normal cursor-pointer border border-white/30 bg-white text-[#0C0B0F] disabled:opacity-50 hover:bg-gray-200 transition-colors"
                    disabled={loading}
                    onClick={onRefresh || (() => console.log("刷新"))}
                  >
                    {config.primaryBtn}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Info */}
      <div className="p-5 bg-white/5 rounded-[10px] mt-auto">
        <div className="text-white text-[14px] font-medium pb-4 border-b border-white/10 mb-5">
          {t("userCenter.orderDetails")}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-0 gap-x-6">
          <div className="flex items-center gap-2 leading-[27px]">
            <span className="text-white text-[14px] whitespace-nowrap font-normal">
              {t("userCenter.orderId")}：
            </span>
            <span className="text-white text-[14px] font-normal">
              {orderInfo?.orderNo}
            </span>
          </div>
          <div className="flex items-center gap-2 leading-[27px]">
            <span className="text-white text-[14px] whitespace-nowrap font-normal">
              {t("userCenter.paymentMethod")}：
            </span>
            <span className="text-white text-[14px] font-normal">
              {orderInfo?.paymentMethod}
            </span>
          </div>
          <div className="flex items-center gap-2 leading-[27px]">
            <span className="text-white text-[14px] whitespace-nowrap font-normal">
              {t("userCenter.totalDiscount")}：
            </span>
            <span className="text-white text-[14px] font-normal">
              {orderInfo?.discountAmount}
            </span>
          </div>
          <div className="flex items-center gap-2 leading-[27px]">
            <span className="text-white text-[14px] whitespace-nowrap font-normal">
              {t("userCenter.orderTime")}：
            </span>
            <span className="text-white text-[14px] font-normal">
              {orderInfo?.createTime}
            </span>
          </div>
          <div className="flex items-center gap-2 leading-[27px]">
            <span className="text-white text-[14px] whitespace-nowrap font-normal">
              {t("userCenter.officialPrice")}：
            </span>
            <span className="text-white text-[14px] font-normal">
              {orderInfo?.originalPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailContent;
