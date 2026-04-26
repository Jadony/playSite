import React from "react";
import { useTranslation } from "react-i18next";
import CommonModal from "../CommonModal";

interface PriceDetailModalProps {
  visible: boolean;
  onClose: () => void;
  originalPrice?: number;
  platformPrice?: number;
  couponDiscount?: number;
  finalPrice?: number;
  unit?: string;
  openCouponModal?: () => void;
}

const PriceDetailModal: React.FC<PriceDetailModalProps> = ({
  visible,
  onClose,
  originalPrice,
  platformPrice,
  couponDiscount,
  finalPrice,
  unit,
  openCouponModal,
}) => {
  const { t } = useTranslation();
  const content = (
    <div className="flex flex-col pt-2 pb-2">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#d1d1d1]">
            {t("userCenter.officialPrice")}
          </span>
          <span className="text-white text-base">
            {unit} {originalPrice}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#d1d1d1]">
            {t("home.selectorAndPayment.platformPrice")}
          </span>
          <span className="text-[#E700FF] text-base">
            {unit} {platformPrice}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#d1d1d1]">
            {t("home.selectorAndPayment.discountSavings")}
          </span>
          <span
            className="text-[#E700FF] text-base flex items-center cursor-pointer"
            onClick={openCouponModal}
          >
            - {unit} {couponDiscount}
            <svg
              className="ml-1.5 mt-[2px]"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="mt-8 bg-[#3c3c3c] rounded-xl flex justify-between items-center px-5 py-4">
        <span className="text-[#e2e2e2] text-base">
          {t("home.selectorAndPayment.finalPrice")}
        </span>
        <span
          className="text-xl italic font-black text-[#E700FF] flex items-baseline"
          style={{
            background:
              "linear-gradient(275.92deg, #EE22EB 29.33%, #AA00FF 92.01%), linear-gradient(0deg, #FFFFFF, #FFFFFF)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            WebkitTextStroke: "1px #fff",
          }}
        >
          {unit} {finalPrice}
        </span>
      </div>
    </div>
  );

  return (
    <CommonModal
      visible={visible}
      onClose={onClose}
      title={
        <span className="text-lg">
          {t("home.selectorAndPayment.discountDetails")}
        </span>
      }
      content={content}
      footer={null}
      width={400}
    />
  );
};

export default PriceDetailModal;
