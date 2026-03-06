import React, { useState } from "react";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import CommonModal from "../CommonModal";
import "./style.css";

type PayMethodModalProps = {
  visible: boolean;
  onClose: () => void;
};

const paymentMethods = [
  { id: "visa", name: "USD", price: "$234" },
  { id: "usdt", name: "USDT", price: "$234" },
  { id: "alipay", name: "USDT", price: "$234" },
  { id: "unionpay", name: "USDT", price: "$234" },
];

const PayMethodModal: React.FC<PayMethodModalProps> = ({
  visible,
  onClose,
}) => {
  const [activeMethod, setActiveMethod] = useState("usdt");

  const renderIcon = (id: string) => {
    switch (id) {
      case "visa":
        return (
          <div className="pay-method-icon-container">
            <span
              style={{
                color: "#1A1F71",
                fontStyle: "italic",
                fontWeight: 900,
                fontSize: "16px",
                letterSpacing: "-1px",
              }}
            >
              VISA
            </span>
          </div>
        );
      case "usdt":
        return (
          <div
            className="pay-method-icon-container"
            style={{
              background: "linear-gradient(135deg, #0a1f18 0%, #153b2e 100%)",
              border: "1px solid #1f6b4a",
              boxShadow: "inset 0 0 10px rgba(0, 255, 128, 0.2)",
            }}
          >
            <span
              style={{
                color: "#00E894",
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: "18px",
              }}
            >
              T
            </span>
          </div>
        );
      case "alipay":
        return (
          <div
            className="pay-method-icon-container"
            style={{ background: "#1677FF", borderRadius: "10px" }}
          >
            <span
              style={{ color: "#fff", fontWeight: "bold", fontSize: "20px" }}
            >
              支
            </span>
          </div>
        );
      case "unionpay":
        return (
          <div
            className="pay-method-icon-container"
            style={{
              background: "linear-gradient(135deg, #e0f7fa 0%, #ffffff 100%)",
              border: "2px solid #00acc1",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                lineHeight: 1,
              }}
            >
              <span
                style={{
                  color: "#E0172D",
                  fontSize: "9px",
                  fontWeight: "bold",
                }}
              >
                UnionPay
              </span>
              <span
                style={{
                  color: "#0054A6",
                  fontSize: "8px",
                  fontWeight: "bold",
                }}
              >
                银联
              </span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const content = (
    <div>
      <div className="pay-method-title-bar">
        <div className="pay-method-back-btn" onClick={onClose}>
          <ArrowLeft size={20} />
        </div>
        <div className="pay-method-title-text">选择支付方式</div>
      </div>

      <div className="pay-method-list">
        {paymentMethods.map((method) => {
          const isActive = activeMethod === method.id;
          return (
            <div
              key={method.id}
              className={`pay-method-item ${isActive ? "active" : ""}`}
              onClick={() => setActiveMethod(method.id)}
            >
              <div className="pay-method-radio">
                {isActive && (
                  <Check className="pay-method-check" strokeWidth={3} />
                )}
              </div>
              {renderIcon(method.id)}
              <div className="pay-method-name">{method.name}</div>
              <div className="pay-method-price">{method.price}</div>
            </div>
          );
        })}
      </div>

      <div className="pay-method-footer">
        <div className="pay-method-footer-link">
          Don't have the payment method you want?
          <ChevronRight size={16} className="pay-method-footer-arrow" />
        </div>
      </div>
    </div>
  );

  return (
    <CommonModal
      visible={visible}
      onClose={onClose}
      content={content}
      showClose={false}
      footer={null}
      width={420}
    />
  );
};

export default PayMethodModal;
