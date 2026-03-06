import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  CreditCard,
  KeyRound,
  PackageSearch,
  CheckCircle2,
} from "lucide-react";
import CommonModal from "../CommonModal";
import "./style.css";

type PaymentProgressProps = {
  visible: boolean;
  onClose: () => void;
};

type PaymentState = "verifying" | "shipping" | "success";

const PaymentProgress: React.FC<PaymentProgressProps> = ({
  visible,
  onClose,
}) => {
  const [status, setStatus] = useState<PaymentState>("verifying");
  const [countdown, setCountdown] = useState(5);

  // 初始化重置状态
  useEffect(() => {
    if (visible) {
      setStatus("verifying");
      setCountdown(5);

      // 3秒后切换到正在发货
      const verifyTimer = setTimeout(() => {
        setStatus("shipping");
      }, 2000);

      return () => clearTimeout(verifyTimer);
    }
  }, [visible]);

  // 发货倒计时
  useEffect(() => {
    if (status === "shipping" && countdown > 0) {
      const shippingTimer = setTimeout(() => {
        setCountdown((c) => c - 1);
      }, 1000);
      return () => clearTimeout(shippingTimer);
    } else if (status === "shipping" && countdown === 0) {
      setStatus("success");
    }
  }, [status, countdown]);

  const title = (
    <div className="progress-modal-title">
      <ShieldCheck className="progress-modal-title-icon" strokeWidth={1.5} />
      <span>多重支付保护 充值失败全款返回</span>
    </div>
  );

  const renderContent = () => {
    return (
      <div className="progress-content-inner">
        {/* Step 1: 支付信息已填写 */}
        <div className={`progress-step completed`}>
          <div className="progress-step-header">
            <CreditCard className="step-icon" strokeWidth={1.5} />
            <span className="step-title">支付信息已填写</span>
          </div>
        </div>

        {/* Step 2: 支付验证中 -> 支付已验证 */}
        <div
          className={`progress-step ${status === "verifying" ? "active" : "completed"}`}
        >
          {status === "verifying" ? (
            <>
              <KeyRound className="step-icon" strokeWidth={1.5} />
              <div>
                <div className="step-title">支付验证中...</div>
                <div className="step-subtitle">
                  正在核对您的银行卡和账户信息
                </div>
              </div>
              <div className="step-actions" style={{ width: "100%" }}>
                <button className="step-btn-ghost">更换支付方式</button>
                <button className="step-btn-ghost">重新支付</button>
              </div>
            </>
          ) : (
            <div className="progress-step-header">
              <KeyRound className="step-icon" strokeWidth={1.5} />
              <span className="step-title">支付已验证</span>
            </div>
          )}
        </div>

        {/* Step 3: 发货 -> 正在发货 -> 已发货 */}
        {status === "verifying" && (
          <div className="progress-step pending">
            <div className="progress-step-header">
              <CreditCard className="step-icon" strokeWidth={1.5} />
              <span className="step-title">发货</span>
            </div>
          </div>
        )}

        {status === "shipping" && (
          <div className="progress-step active">
            <PackageSearch className="step-icon" strokeWidth={1.5} />
            <div style={{ width: "100%" }}>
              <div className="step-title">正在发货 ({countdown}s)</div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                ></div>
              </div>
              <div className="shipping-box-placeholder"></div>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="progress-step completed">
            <div className="progress-step-header">
              <PackageSearch className="step-icon" strokeWidth={1.5} />
              <span className="step-title">已发货</span>
            </div>
          </div>
        )}

        {/* Step 4: 订单完成 */}
        {status === "success" && (
          <div
            className="progress-step active"
            style={{
              marginTop: "16px",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CheckCircle2
              className="step-icon"
              strokeWidth={1.5}
              style={{ marginBottom: 0 }}
            />
            <div>
              <div
                className="step-title"
                style={{ margin: 0, marginRight: "12px" }}
              >
                订单完成
              </div>
              <div className="step-subtitle" style={{ margin: 0 }}>
                您现在可在游戏账号内查看购买商品
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <CommonModal
      visible={visible}
      onClose={onClose}
      title={title}
      content={renderContent()}
      footer={null} // No primary footer button
      width={480}
      maskClosable={false} // Prevent accidental close while verifying
    />
  );
};

export default PaymentProgress;
