import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  CreditCard,
  KeyRound,
  XCircle,
  ArchiveRestore,
  CircleCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import CommonModal from "../CommonModal";
import PrimaryButton from "../PrimaryButton";
import "./style.css";

type PaymentProgressProps = {
  progressStatus: string;
  visible: boolean;
  onClose: () => void;
  getPaymentOrderDetail: () => void;
  createPaypalOrders: () => void;
  loading: boolean;
};

const PaymentProgress: React.FC<PaymentProgressProps> = ({
  progressStatus,
  visible,
  onClose,
  getPaymentOrderDetail,
  createPaypalOrders,
  loading,
}) => {
  const [countdown, setCountdown] = useState(120);
  const { t } = useTranslation();
  // 发货倒计时
  useEffect(() => {
    if (progressStatus === "shipping" && countdown > 0) {
      const shippingTimer = setTimeout(() => {
        setCountdown((c) => c - 1);
        getPaymentOrderDetail();
      }, 1000);
      return () => clearTimeout(shippingTimer);
    }
  }, [progressStatus, countdown]);

  const title = (
    <div className="flex items-center gap-2.5 text-[20px] font-bold text-white">
      <ShieldCheck className="w-6 h-6" strokeWidth={1.5} />
      <span>{t("payment.multiLayeredPaymentSecurity")}</span>
    </div>
  );

  const renderContent = () => {
    return (
      <div className="mt-6 flex flex-col gap-6 pb-5">
        {/* Step 1: 支付信息已填写 */}
        <div className="flex items-center gap-4 transition-all duration-300 text-white/50">
          <div className="flex items-center gap-4 w-full">
            <CreditCard className="w-6 h-6" strokeWidth={1.5} />
            <span className="text-[14px]">
              {t("payment.paymentInformation")}
            </span>
          </div>
        </div>

        {/* Step 2: 支付验证中 -> 支付已验证 */}
        <div
          className={`flex transition-all duration-300 ${
            progressStatus === "verifying"
              ? "flex-col gap-2 my-2.5 items-start text-white"
              : "items-center gap-4 text-white/50"
          }`}
        >
          {progressStatus === "verifying" ? (
            <>
              <KeyRound className="w-8 h-8 mb-2" strokeWidth={1.5} />
              <div>
                <div className="text-[18px] font-bold">
                  {t("payment.verifyingPayment")}
                </div>
                <div className="text-[14px] text-white/50 mt-1">
                  {t("payment.verifyingPaymentInformation")}
                </div>
              </div>
              {/* <div className="flex gap-4 mt-4 w-full">
                <button className="flex-1 bg-white/5 border border-white/20 text-white rounded-full py-3 text-[16px] cursor-pointer transition-all duration-300 hover:bg-white/10">
                  {t("payment.changePaymentMethod")}
                </button>
                <button className="flex-1 bg-white/5 border border-white/20 text-white rounded-full py-3 text-[16px] cursor-pointer transition-all duration-300 hover:bg-white/10">
                  {t("payment.rePay")}
                </button>
              </div> */}
            </>
          ) : (
            progressStatus !== "canceled" && (
              <div className="flex items-center gap-4 w-full">
                <KeyRound className="w-6 h-6" strokeWidth={1.5} />
                <span className="text-[14px]">
                  {t("payment.paymentVerification")}
                </span>
              </div>
            )
          )}
        </div>

        {progressStatus === "canceled" && (
          <div
            className={`flex transition-all duration-300 flex-col gap-2 mb-2.5 items-start text-white`}
          >
            <>
              <XCircle
                className="w-8 h-8 shrink-0 mt-1"
                strokeWidth={1.5}
                color="#DF393C"
              />
              <div>
                <div className="text-[18px] font-bold">
                  {t("payment.paymentFailed")}
                </div>
                <div className="text-[14px] text-white/50 mt-1">
                  {t("payment.pleaseDoubleCheckYourPaymentInformation")}
                </div>
              </div>
              <div className="flex gap-4 mt-4 w-full">
                {/* <button className="payment-progress-btn glass-gradient-border flex-1 bg-white/5 border border-white/20 text-white rounded-full py-3 text-[14px] cursor-pointer transition-all duration-300 hover:bg-white/10">
                  {t("payment.changePaymentMethod")}
                </button> */}
                <button
                  disabled={loading}
                  onClick={createPaypalOrders}
                  className={`payment-progress-btn glass-gradient-border flex-1 bg-white/5 border border-white/20 text-white rounded-full py-3 text-[14px] ${loading ? "" : "cursor-pointer"} transition-all duration-300 hover:bg-white/10`}
                >
                  {t("payment.rePay")}
                </button>
              </div>
            </>
          </div>
        )}

        {/* Step 3: 发货 -> 正在发货 -> 已发货 */}
        {(progressStatus === "verifying" || progressStatus === "canceled") && (
          <div className="flex items-center gap-4 transition-all duration-300 text-white/50">
            <div className="flex items-center gap-4 w-full">
              <ArchiveRestore className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-[14px]">{t("payment.delivery")}</span>
            </div>
          </div>
        )}

        {progressStatus === "shipping" && (
          <div className="flex flex-col gap-2 my-2.5 items-start text-white transition-all duration-300">
            <ArchiveRestore className="w-8 h-8 mb-2" strokeWidth={1.5} />
            <div className="w-full">
              <div className="text-[18px] font-bold">
                {t("payment.delivering")} ({countdown}s)
              </div>
              <div className="w-full h-1.5 bg-[#383838] rounded overflow-hidden mt-2">
                <div
                  className="h-full bg-gradient-to-r from-[#b122e5] to-[#ff63de] rounded transition-[width] duration-1000 ease-linear"
                  style={{ width: `${((120 - countdown) / 120) * 100}%` }}
                ></div>
              </div>
              <div className="w-full h-[160px] bg-[#2a2a2a] rounded-xl mt-4"></div>
            </div>
          </div>
        )}

        {progressStatus === "successed" && (
          <div className="flex items-center gap-4 transition-all duration-300 text-white/50">
            <div className="flex items-center gap-4 w-full">
              <ArchiveRestore className="w-6 h-6" strokeWidth={1.5} />
              <span className="text-[14px]">{t("payment.delivered")}</span>
            </div>
          </div>
        )}

        {/* Step 4: 订单完成 */}
        {progressStatus === "successed" && (
          <div className="flex items-center gap-4 mt-4 text-white transition-all duration-300 w-full">
            <CircleCheck className="w-12 h-12 mb-0" strokeWidth={1.5} />
            <div>
              <div className="text-[18px] font-bold !m-0 !mr-3 inline-block">
                {t("payment.orderCompleted")}
              </div>
              <div className="text-[14px] text-white/50 mt-1 !m-0 inline-block">
                {t("payment.youCanNowCheckYourPurchasedItemsInYourGameAccount")}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 (Failed): 发货超时 */}
        {progressStatus === "failed" && (
          <div className="flex items-start gap-4 mt-4 text-white transition-all duration-300 w-full">
            <XCircle
              className="w-8 h-8 shrink-0 mt-1"
              strokeWidth={1.5}
              color="#DF393C"
            />
            <div>
              <div className="text-[18px] font-bold text-[#DF393C] mb-2 !m-0">
                {t("payment.timeout")}
              </div>
              <div className="text-[14px] text-white/50 leading-relaxed !m-0">
                {t(
                  "payment.ourSupportTeamWillHelpResolveDeliveryIssuesOrAssistWithRefundingTheAmountToYourPaymentAccount",
                )}
              </div>
            </div>
          </div>
        )}

        {/* 联系客服按钮 */}
        {progressStatus === "failed" && (
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
      onClose={progressStatus === "shipping" ? () => {} : onClose}
      showClose={progressStatus === "shipping" ? false : true}
      title={title}
      content={renderContent()}
      footer={null} // No primary footer button
      width={480}
      maskClosable={false} // Prevent accidental close while verifying
    />
  );
};

export default PaymentProgress;
