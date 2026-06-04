import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { message } from "antd";
import { createPayPalOrder, capturePayPalOrder } from "@/api/payment";
import { useLanguageContext } from "@/store/languageStore";
import { useTranslation } from "react-i18next";

type UsePayPalPaymentOptions = {
  orderNo: string;
  currency?: string;
  onPaymentSuccess?: () => void;
  onPaymentCancel?: () => void;
  onPaymentError?: (error: any) => void;
  setProgressStatus?: Dispatch<
    SetStateAction<
      "verifying" | "shipping" | "successed" | "failed" | "canceled"
    >
  >;
};

export function usePayPalPayment({
  orderNo,
  currency = "USD",
  onPaymentSuccess,
  onPaymentCancel,
  onPaymentError,
  setProgressStatus,
}: UsePayPalPaymentOptions) {
  const [loading, setLoading] = useState(false);
  const [paypalOrderId, setPaypalOrderId] = useState("");
  const paypalWindow = useRef<Window | null>(null);
  const timerRef = useRef<number | null>(null);
  const { selectUnit } = useLanguageContext();
  const { t } = useTranslation();

  // 清理资源：关闭弹窗、清除定时器
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (paypalWindow.current && !paypalWindow.current.closed) {
      paypalWindow.current.close();
    }
    paypalWindow.current = null;
  }, []);

  // 捕获订单
  const captureOrder = useCallback(
    async (paypalOrderId: string) => {
      if (!paypalOrderId) return null;
      try {
        const { data } = await capturePayPalOrder({
          orderNo,
          paypalOrderId,
        });
        return data.data.status as
          | "COMPLETED"
          | "DECLINED"
          | "CANCELLED"
          | undefined;
      } catch (err) {
        console.error("捕获订单失败", err);
        return null;
      }
    },
    [orderNo],
  );

  // 启动支付
  const startPayment = useCallback(async () => {
    setLoading(true);
    try {
      setProgressStatus?.("verifying");
      const { data } = await createPayPalOrder({
        orderNo,
        currency: selectUnit?.currency || currency,
      });
      const { paypalOrderId: newOrderId, approveUrl } = data.data;
      setPaypalOrderId(newOrderId);

      // 先打开空白窗口，再跳转，避免被浏览器拦截
      const popup = window.open("", "_blank", "width=600,height=600");
      if (!popup) {
        message.error(t("payment.enanblePop"));
        setLoading(false);
        return;
      }
      popup.location.href = approveUrl;
      paypalWindow.current = popup;

      // 定时监控弹窗是否关闭
      timerRef.current = window.setInterval(async () => {
        if (popup.closed) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          paypalWindow.current = null;

          // 弹窗关闭后尝试捕获
          const status = await captureOrder(newOrderId);
          setLoading(false);

          if (status === "COMPLETED") {
            onPaymentSuccess?.();
          } else {
            onPaymentCancel?.();
          }
        }
      }, 1000);
    } catch (err) {
      setLoading(false);
      onPaymentError?.(err);
      message.error("创建支付订单失败");
    }
  }, [
    orderNo,
    currency,
    selectUnit,
    captureOrder,
    onPaymentSuccess,
    onPaymentCancel,
    onPaymentError,
  ]);

  // 组件卸载时清理
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return {
    loading,
    paypalOrderId,
    startPayment,
    cleanup,
    setLoading,
  };
}
