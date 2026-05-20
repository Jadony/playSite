import React, { useState } from "react";
import { ShieldCheck, CreditCard } from "lucide-react";
import CommonModal from "../CommonModal";
import PayMethodModal from "../PayMethodModal";
// import PaymentProgress from "../PaymentProgress";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  const handlePayment = () => {
    // 模拟支付逻辑
    setProgressVisible(true);
  };

  const title = (
    <div className="payment-modal-title">
      <ShieldCheck className="payment-modal-title-icon" strokeWidth={1.5} />
      <span>{t("payment.multiLayeredPaymentSecurity")}</span>
    </div>
  );

  const content = (
    <div className="payment-modal-content-inner">
      <div className="payment-subtitle">
        {t("payment.encryptedDataPaymentNetwork")}
      </div>

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
          {t("payment.morePaymentMethods")}
        </div>
      </div>

      <div className="payment-form">
        <div className="payment-form-group">
          <label className="payment-form-label">
            {t("payment.cardNumber")}
          </label>
          <div className="payment-input-wrapper">
            <CreditCard className="payment-input-icon" strokeWidth={1.5} />
            <input
              type="text"
              className="payment-input with-prefix"
              placeholder={t("payment.enterCardNumber")}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="payment-form-row">
          <div className="payment-form-col">
            <label className="payment-form-label">{t("payment.expires")}</label>
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
            <label className="payment-form-label">{t("payment.cvv")}</label>
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
        primaryButtonText={t("userCenter.payNow")}
        onPrimaryClick={handlePayment}
        width={480}
      />
      <PayMethodModal
        visible={payMethodVisible && !progressVisible}
        onClose={() => setPayMethodVisible(false)}
      />
      {/* <PaymentProgress
        visible={progressVisible}
        onClose={() => {
          setProgressVisible(false);
          onClose(); // Optional: close both when progress modal closes
        }}
      /> */}
    </>
  );
};

export default PaymentModal;
