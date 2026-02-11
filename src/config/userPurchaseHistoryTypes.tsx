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
      label: "已取消",
      desc: "订单已取消，请重新下单",
      statusColor: "grey",
      completedStep: 1,
      actionTag: "已取消",
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
      actionTag: "售后中",
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
      desc: t("userCenter.orderCompleted"),
      statusColor: "green",
      completedStep: 4,
    },
  };
};
