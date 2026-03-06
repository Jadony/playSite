import React, { useState } from "react";
import { ShieldCheck, CreditCard } from "lucide-react";
import CommonModal from "../CommonModal";
import PayMethodModal from "../PayMethodModal";
import PaymentProgress from "../PaymentProgress";
import "./style.css";

type PaymentModalProps = {
  visible: boolean;
  onClose: () => void;
};

const PaymentModal: React.FC<PaymentModalProps> = ({ visible, onClose }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [payMethodVisible, setPayMethodVisible] = useState(false);
  const [progressVisible, setProgressVisible] = useState(false);

  const handlePayment = () => {
    // 模拟支付逻辑
    setProgressVisible(true);
  };

  const title = (
    <div className="payment-modal-title">
      <ShieldCheck className="payment-modal-title-icon" strokeWidth={1.5} />
      <span>多重支付保护 充值失败全款返回</span>
    </div>
  );

  const content = (
    <div className="payment-modal-content-inner">
      <div className="payment-subtitle">支付数据和渠道已加密，请放心填写</div>

      <div className="payment-methods-row">
        <div className="payment-methods-logos">
          <div className="payment-methods-logo">
            <span
              style={{
                color: "#1A1F71",
                fontStyle: "italic",
                fontWeight: 900,
                fontSize: "18px",
                letterSpacing: "-1px",
              }}
            >
              VISA
            </span>
          </div>
          <div className="payment-methods-logo">
            <span
              style={{
                color: "#1A1F71",
                fontStyle: "italic",
                fontWeight: 900,
                fontSize: "18px",
                letterSpacing: "-1px",
              }}
            >
              VISA
            </span>
          </div>
        </div>
        <div
          className="payment-methods-more"
          onClick={() => setPayMethodVisible(true)}
        >
          更多支付方式
        </div>
      </div>

      <div className="payment-form">
        <div className="payment-form-group">
          <label className="payment-form-label">银行卡号</label>
          <div className="payment-input-wrapper">
            <CreditCard className="payment-input-icon" strokeWidth={1.5} />
            <input
              type="text"
              className="payment-input with-prefix"
              placeholder="请输入银行卡号"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="payment-form-row">
          <div className="payment-form-col">
            <label className="payment-form-label">有效期至</label>
            <div className="payment-input-wrapper">
              <input
                type="text"
                className="payment-input"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </div>
          </div>
          <div className="payment-form-col">
            <label className="payment-form-label">银行卡认证编码</label>
            <div className="payment-input-wrapper">
              <input
                type="text"
                className="payment-input"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <CommonModal
        visible={visible && !progressVisible}
        onClose={onClose}
        title={title}
        content={content}
        primaryButtonText="立即支付"
        onPrimaryClick={handlePayment}
        width={480}
      />
      <PayMethodModal
        visible={payMethodVisible && !progressVisible}
        onClose={() => setPayMethodVisible(false)}
      />
      <PaymentProgress
        visible={progressVisible}
        onClose={() => {
          setProgressVisible(false);
          onClose(); // Optional: close both when progress modal closes
        }}
      />
    </>
  );
};

export default PaymentModal;
