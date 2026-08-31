/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-02-10 21:33:30
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-08-31 21:30:04
 * @FilePath: /playSite/src/config/userPurchaseHistoryTypes.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useTranslation } from "react-i18next";

const usePurchaseHistoryTypes = () => {
  const { t } = useTranslation();
  return [
    {
      label: t("userCenter.all"),
      value: "ALL",
    },
    {
      label: t("userCenter.processing"),
      value: "PROCESSING",
    },
    {
      label: t("userCenter.pending"),
      value: "PENDING",
    },
    {
      label: t("userCenter.success"),
      value: "COMPLETED",
    },
    {
      label: t("userCenter.refundAndAfterSales"),
      value: "REFUNDING",
    },
  ];
};

export default usePurchaseHistoryTypes;

export const usePurchaseHistoryStatusConfig = (): Record<
  OrderStatus,
  {
    label: string;
    desc: string;
    statusColor: string;
    completedStep: number;
    actionTag?: string;
    primaryBtn?: string;
    secondaryBtn?: string;
    showHeaderStatus?: boolean;
  }
> => {
  const { t } = useTranslation();
  return {
    CANCELLED: {
      label: t("payment.canceled"),
      desc: t("payment.orderCancelPleaseReorder"),
      statusColor: "grey",
      completedStep: 1,
      actionTag: t("payment.canceled"),
      showHeaderStatus: true,
    },
    PROCESSING: {
      label: t("userCenter.processing"),
      desc: t("userCenter.orderProcessingText"),
      statusColor: "green",
      completedStep: 3,
      primaryBtn: t("userCenter.refresh"),
    },
    REFUNDING: {
      label: t("userCenter.refundAndAfterSales"),
      desc: t("userCenter.refundAndAfterSalesText"),
      statusColor: "red",
      completedStep: 2,
      actionTag: t("userCenter.refundAndAfterSales"),
    },
    // pending: {
    //   label: "待处理",
    //   desc: "您提供的账号密码有错，请及时确认并重新提交，方便我们尽快为您完成充值",
    //   statusColor: "orange",
    //   completedStep: 2,
    //   primaryBtn: "去处理",
    // },
    PENDING: {
      label: t("userCenter.paymentPending"),
      desc: t("userCenter.paymentConfirming"),
      statusColor: "neutral",
      completedStep: 1,
      secondaryBtn: t("userCenter.cancelOrder"),
      primaryBtn: t("userCenter.payNow"),
    },
    COMPLETED: {
      label: t("userCenter.success"),
      desc: t("payment.orderCompleted"),
      statusColor: "green",
      completedStep: 4,
    },
  };
};
