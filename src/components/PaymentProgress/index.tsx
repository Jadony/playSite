import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  CreditCard,
  KeyRound,
  PackageSearch,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import CommonModal from "../CommonModal";
import PrimaryButton from "../PrimaryButton";

type PaymentProgressProps = {
  visible: boolean;
  onClose: () => void;
};

type PaymentState = "verifying" | "shipping" | "success" | "failed";

const PaymentProgress: React.FC<PaymentProgressProps> = ({
  visible,
  onClose,
}) => {
  const [status, setStatus] = useState<PaymentState>("verifying");
  const [countdown, setCountdown] = useState(5);
  const { t } = useTranslation();

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
    <div className="flex items-center gap-2.5 text-[20px] font-bold text-white">
      <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
      <span>多重支付保护 充值失败全款返回</span>
    </div>
  );

  const renderContent = () => {
    return (
      <div className="mt-6 flex flex-col gap-6 pb-5">
        {/* Step 1: 支付信息已填写 */}
        <div className="flex items-center gap-4 transition-all duration-300 text-gray-500">
          <div className="flex items-center gap-4 w-full">
            <CreditCard className="w-6 h-6" strokeWidth={1.5} />
            <span className="text-[16px]">
              {t("payment.paymentInformation")}
            </span>
          </div>
        </div>

        {/* Step 2: 支付验证中 -> 支付已验证 */}
        <div
          className={`flex transition-all duration-300 ${
            status === "verifying"
              ? "flex-col gap-2 my-2.5 items-start text-white"
              : "items-center gap-4 text-gray-500"
          }`}
        >
          {status === "verifying" ? (
            <>
              <KeyRound className="w-8 h-8 mb-2" strokeWidth={1.5} />
              <div>
                <div className="text-[24px] font-bold">
                  {t("payment.paymentVerification")}
                </div>
                <div className="text-[14px] text-[#9cb3c9] mt-1">
                  {t("payment.verifyingPaymentInformation")}
                </div>
              </div>
              <div className="flex gap-4 mt-4 w-full">
                <button className="flex-1 bg-white/5 border border-white/20 text-white rounded-full py-3 text-[16px] cursor-pointer transition-all duration-300 hover:bg-white/10">
                  {t("payment.changePaymentMethod")}
                </button>
                <button className="flex-1 bg-white/5 border border-white/20 text-white rounded-full py-3 text-[16px] cursor-pointer transition-all duration-300 hover:bg-white/10">
                  {t("payment.rePay")}
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4 w-full">
              <KeyRound className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-[16px]">支付已验证</span>
            </div>
          )}
        </div>

        {/* Step 3: 发货 -> 正在发货 -> 已发货 */}
        {status === "verifying" && (
          <div className="flex items-center gap-4 transition-all duration-300 text-gray-500">
            <div className="flex items-center gap-4 w-full">
              <CreditCard className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-[16px]">{t("payment.delivery")}</span>
            </div>
          </div>
        )}

        {status === "shipping" && (
          <div className="flex flex-col gap-2 my-2.5 items-start text-white transition-all duration-300">
            <PackageSearch className="w-8 h-8 mb-2" strokeWidth={1.5} />
            <div className="w-full">
              <div className="text-[24px] font-bold">
                {t("payment.delivering")} ({countdown}s)
              </div>
              <div className="w-full h-1.5 bg-[#383838] rounded overflow-hidden mt-2">
                <div
                  className="h-full bg-gradient-to-r from-[#b122e5] to-[#ff63de] rounded transition-[width] duration-1000 ease-linear"
                  style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                ></div>
              </div>
              <div className="w-full h-[160px] bg-[#2a2a2a] rounded-xl mt-4"></div>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="flex items-center gap-4 transition-all duration-300 text-gray-500">
            <div className="flex items-center gap-4 w-full">
              <PackageSearch className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-[16px]">已发货</span>
            </div>
          </div>
        )}

        {/* Step 4: 订单完成 */}
        {status === "success" && (
          <div className="flex items-center gap-4 mt-4 text-white transition-all duration-300 w-full">
            <CheckCircle2 className="w-8 h-8 mb-0" strokeWidth={1.5} />
            <div>
              <div className="text-[24px] font-bold !m-0 !mr-3 inline-block">
                {t("userCenter.orderCompleted")}
              </div>
              <div className="text-[14px] text-[#9cb3c9] mt-1 !m-0 inline-block">
                {t("payment.youCanNowCheckYourPurchasedItemsInYourGameAccount")}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 (Failed): 发货超时 */}
        {status === "failed" && (
          <div className="flex items-start gap-4 mt-4 text-white transition-all duration-300 w-full">
            <XCircle
              className="w-8 h-8 shrink-0 mt-1"
              strokeWidth={1.5}
              color="#F53F3F"
            />
            <div>
              <div className="text-[24px] font-bold text-[#F53F3F] mb-2 !m-0">
                {t("payment.timeout")}
              </div>
              <div className="text-[14px] text-[#9cb3c9] leading-relaxed !m-0">
                {t(
                  "payment.ourSupportTeamWillHelpResolveDeliveryIssuesOrAssistWithRefundingTheAmountToYourPaymentAccount",
                )}
              </div>
            </div>
          </div>
        )}

        {/* 联系客服按钮 */}
        {status === "failed" && (
          <div className="w-full mt-8">
            <PrimaryButton
              fullWidth
              variant="gradient"
              glow
              glowColor="rgba(170, 0, 255, 0.5)"
              fontSize="18px"
              className="py-4 font-bold"
            >
              {t("payment.pleaseContactCustomerService")}
            </PrimaryButton>
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
