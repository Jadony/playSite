import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../PrimaryButton";
import { capturePayPalOrder, createPayPalOrder } from "@/api/payment";
import { message } from "antd";

type PayPalCustomButtonProps = {
  orderId?: string;
  onSuccess: (details: any) => void;
  currency: string;
  showPaymentProgress: () => void;
  cancelPayment: () => void;
};

const PayPalCustomButton: React.FC<PayPalCustomButtonProps> = ({
  orderId,
  onSuccess,
  currency,
  showPaymentProgress,
  cancelPayment,
}) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isButtonReady, setIsButtonReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useTranslation();

  // 使用 ref 保存最新值，防止闭包陈旧
  const orderIdRef = useRef(orderId);
  const currencyRef = useRef(currency);
  const onSuccessRef = useRef(onSuccess);
  const showProgressRef = useRef(showPaymentProgress);
  const cancelProgressRef = useRef(cancelPayment);

  useEffect(() => {
    orderIdRef.current = orderId;
  }, [orderId]);
  useEffect(() => {
    currencyRef.current = currency;
  }, [currency]);
  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);
  useEffect(() => {
    showProgressRef.current = showPaymentProgress;
  }, [showPaymentProgress]);
  useEffect(() => {
    cancelProgressRef.current = cancelPayment;
  }, [cancelPayment]);

  // 1. 加载 PayPal SDK（仅在 currency 变化时重新加载，且移除旧脚本）
  useEffect(() => {
    const existingScript = document.querySelector("#paypal-sdk");
    if (existingScript) {
      // 如果已存在，但 currency 变了，移除后重新加载
      if (existingScript.getAttribute("data-currency") === currency) return;
      existingScript.remove();
      delete (window as any).paypal;
      setIsScriptLoaded(false);
      setIsButtonReady(false);
    }

    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.setAttribute("data-currency", currency);
    script.src = `https://www.paypal.com/sdk/js?client-id=AQGqw2CKOA790W2oaSV_wyJ2riCAaZQETB_4oM_CZ5wdBhHnxntpbF_pQe1tt-LKvBN8RD8xQCRDm8re&currency=${currency}`;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      // 组件卸载时清理
      script.remove();
    };
  }, [currency]);

  // 2. SDK 加载完成后，渲染透明的 PayPal 按钮（只在 SDK 加载完成后执行一次）
  useEffect(() => {
    if (!isScriptLoaded || !window.paypal) return;

    const container = document.querySelector("#paypal-button-container");
    if (container) container.innerHTML = "";

    window.paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal",
          height: 48,
          tagline: false,
        },
        onInit: () => {
          console.log("✅ PayPal 按钮已成功渲染");
          setIsButtonReady(true);
        },
        onClick: () => {
          setIsProcessing(true);
        },
        onCancel: () => {
          cancelProgressRef.current();
          setIsProcessing(false);
        },
        onError: (err: any) => {
          console.error("PayPal 支付错误:", err);
          message.error("支付失败，请稍后重试");
          cancelProgressRef.current();
          setIsProcessing(false);
        },
        createOrder: async () => {
          try {
            const res = await createPayPalOrder({
              orderNo: orderIdRef.current || "",
              currency: currencyRef.current || "USD",
            });
            const paypalOrderId = res.data?.data?.paypalOrderId;
            if (!paypalOrderId) {
              message.error(res.data.msg || "创建订单失败");
              cancelProgressRef.current();
              setIsProcessing(false);
              throw new Error("未获取到 PayPal 订单 ID");
            }
            showProgressRef.current();
            return paypalOrderId;
          } catch (error) {
            cancelProgressRef.current();
            setIsProcessing(false);
            throw error; // 让 PayPal 处理错误显示
          }
        },
        onApprove: async (data: any) => {
          try {
            const response = await capturePayPalOrder({
              orderNo: orderIdRef.current || "",
              paypalOrderId: data.orderID,
            });
            const captureData = response.data.data;
            if (captureData.status === "COMPLETED") {
              onSuccessRef.current(captureData);
            } else {
              console.error("捕获订单状态异常", captureData);
              message.error("支付未完成，请重试");
            }
          } catch (err) {
            console.error("捕获订单失败", err);
            message.error("支付确认失败，请联系客服");
          } finally {
            setIsProcessing(false);
          }
        },
      })
      .render("#paypal-button-container");
  }, [isScriptLoaded]);

  // 按钮禁用条件：按钮未就绪 或 正在支付中
  const isDisabled = !isButtonReady || isProcessing;

  return (
    <div
      style={{ position: "relative", display: "inline-block", width: "100%" }}
    >
      <PrimaryButton
        className="w-full py-4 rounded-[73px] text-white font-bold text-lg relative overflow-hidden"
        disabled={isDisabled}
      >
        {isProcessing
          ? t("支付中...")
          : isButtonReady
            ? t("userCenter.payNow")
            : "Loading..."}
      </PrimaryButton>

      <div
        id="paypal-button-container"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default PayPalCustomButton;
