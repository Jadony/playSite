import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@components/PrimaryButton";
import { usePurchaseHistoryStatusConfig } from "@/config/userPurchaseHistoryTypes";
import "./style.css";

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
}

const STEPS = ["下单", "支付", "发货", "完成"] as const;

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
  onGoProcess,
  className = "",
}) => {
  const config = usePurchaseHistoryStatusConfig()[status || "PENDING"];
  const showCountdown = status === "PENDING" && countdown;
  const showActions = status === "PENDING" || status === "PROCESSING";
  const [curTime, setCurTime] = useState(countdown || 0);
  // || status === "pending";
  const { t } = useTranslation();

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

  return (
    <div className={`order-detail-content ${className}`.trim()}>
      {/* Header */}
      <div className="order-detail-header">
        <div
          className="order-detail-header-left"
          onClick={onBack || onClose}
          role="button"
        >
          <span className="order-detail-back">←</span>
          <span className="order-detail-title">
            {t("userCenter.orderDetails")}
          </span>
        </div>
      </div>

      {/* Status Area */}
      <div className="order-detail-status-area">
        <div
          className={`order-detail-status-text status-${config.statusColor}`}
        >
          {config.label}
        </div>
        <div className="order-detail-status-desc">{config.desc}</div>

        {/* Progress Stepper */}
        <div className="order-detail-stepper">
          {STEPS.map((step, index) => {
            const completed = index + 1 <= config.completedStep;
            const isLast = index === STEPS.length - 1;
            return (
              <React.Fragment key={step}>
                <div className="order-detail-step">
                  <div
                    className={`order-detail-step-circle ${completed ? "completed" : ""}`}
                  >
                    {completed ? "✓" : ""}
                  </div>
                  <div
                    className={`order-detail-step-label ${completed ? "completed" : ""}`}
                  >
                    {step}
                  </div>
                </div>
                {!isLast && (
                  <div
                    className={`order-detail-step-line ${index + 1 < config.completedStep ? "completed" : ""}`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Product Section */}
      <div className="order-detail-product">
        <div className="order-detail-product-main">
          <div className="order-detail-product-image">
            {product?.skuImage ? (
              <img src={product.skuImage} alt={product.gameName} />
            ) : (
              <div className="order-detail-product-placeholder">图</div>
            )}
          </div>
          <div className="order-detail-product-info">
            <div>
              <div className="order-detail-product-name">
                {product?.skuName}
              </div>
              <div className="order-detail-product-meta">
                {t("userCenter.quantity")}：{product?.quantity}
              </div>
            </div>
            <div className="order-detail-product-footer">
              <span className="order-detail-product-uid">
                UID：{product?.gameUid}
              </span>
              <span className="order-detail-product-server">
                {t("userCenter.server")}：{product?.gameServer}
              </span>
            </div>
          </div>
          <div className="order-detail-product-right">
            <div className="order-detail-product-price-row">
              <span className="order-detail-product-price">
                $ {product?.orderAmount}
              </span>
            </div>
            {config.actionTag && (
              <span
                className={`order-detail-action-tag status-${config.statusColor}`}
              >
                {config.actionTag}
              </span>
            )}
            {showActions && (
              <div className="order-detail-product-actions">
                {config.secondaryBtn && (
                  <button
                    className="order-detail-btn secondary"
                    onClick={onCancelOrder || (() => console.log("取消订单"))}
                  >
                    {config.secondaryBtn}
                  </button>
                )}
                {config.primaryBtn && status === "PENDING" && (
                  <div className="order-detail-pay-wrapper">
                    {showCountdown && (
                      <span className="order-detail-pay-btn-countdown">
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
                    className="order-detail-btn secondary"
                    onClick={onRefresh || (() => console.log("刷新"))}
                  >
                    {config.primaryBtn}
                  </button>
                )}
                {config.primaryBtn && (
                  // && status === "pending"
                  <button
                    className="order-detail-btn secondary"
                    onClick={onGoProcess || (() => console.log("去处理"))}
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
      <div className="order-detail-info">
        <div className="order-detail-info-title">
          {t("userCenter.orderDetails")}
        </div>
        <div className="order-detail-info-grid">
          <div className="order-detail-info-item">
            <span className="key">{t("userCenter.orderId")}：</span>
            <span className="value">{orderInfo?.orderNo}</span>
          </div>
          <div className="order-detail-info-item">
            <span className="key">{t("userCenter.paymentMethod")}：</span>
            <span className="value">{orderInfo?.paymentMethod}</span>
          </div>
          <div className="order-detail-info-item">
            <span className="key">{t("userCenter.totalDiscount")}：</span>
            <span className="value">{orderInfo?.discountAmount}</span>
          </div>
          <div className="order-detail-info-item">
            <span className="key">{t("userCenter.orderTime")}：</span>
            <span className="value">{orderInfo?.createTime}</span>
          </div>
          <div className="order-detail-info-item">
            <span className="key">{t("userCenter.officialPrice")}：</span>
            <span className="value">{orderInfo?.originalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailContent;
