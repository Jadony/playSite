import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Coupon from "../Coupon";
import CommonModal from "../CommonModal";
import PrimaryButton from "../PrimaryButton";

type CouponModalProps = {
  visible: boolean;
  onClose: () => void;
  exchangeOnClick: (exchangeCode: string) => void;
  coupons: UserCouponsResponseData[];
  selectCurCoupon: (coupon: UserCouponsResponseData) => void;
  selectedCoupon: UserCouponsResponseData | null;
  totalDiscount?: number;
  unit?: string;
};

const CouponModal: React.FC<CouponModalProps> = ({
  visible,
  onClose,
  exchangeOnClick,
  coupons,
  selectCurCoupon,
  selectedCoupon,
  totalDiscount,
  unit,
}) => {
  const [exchangeCode, setExchangeCode] = useState("");
  const { t } = useTranslation();
  const modalTitle = (
    <div className="flex items-center">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="mr-2.5"
        >
          <path
            d="M1.66675 7.50002C2.32979 7.50002 2.96567 7.76341 3.43451 8.23225C3.90336 8.70109 4.16675 9.33698 4.16675 10C4.16675 10.6631 3.90336 11.2989 3.43451 11.7678C2.96567 12.2366 2.32979 12.5 1.66675 12.5V14.1667C1.66675 14.6087 1.84234 15.0326 2.1549 15.3452C2.46746 15.6578 2.89139 15.8334 3.33341 15.8334H16.6667C17.1088 15.8334 17.5327 15.6578 17.8453 15.3452C18.1578 15.0326 18.3334 14.6087 18.3334 14.1667V12.5C17.6704 12.5 17.0345 12.2366 16.5656 11.7678C16.0968 11.2989 15.8334 10.6631 15.8334 10C15.8334 9.33698 16.0968 8.70109 16.5656 8.23225C17.0345 7.76341 17.6704 7.50002 18.3334 7.50002V5.83335C18.3334 5.39133 18.1578 4.9674 17.8453 4.65484C17.5327 4.34228 17.1088 4.16669 16.6667 4.16669H3.33341C2.89139 4.16669 2.46746 4.34228 2.1549 4.65484C1.84234 4.9674 1.66675 5.39133 1.66675 5.83335V7.50002Z"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.8333 4.16669V5.83335"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.8333 14.1667V15.8334"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.8333 9.16669V10.8334"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>{t("home.selectorAndPayment.coupons")}</span>
      </div>
      <div className="flex bg-white/10 w-[334px] text-[13px] ml-auto rounded-[10px] py-[11px] px-3.5">
        <input
          value={exchangeCode}
          placeholder={t("userCenter.enterTheRedemptionCode")}
          onChange={(e) => setExchangeCode(e.target.value)}
          className="w-[220px] bg-transparent outline-none"
          type="text"
        />
        <div
          onClick={() => exchangeOnClick(exchangeCode)}
          className="ml-auto cursor-pointer"
        >
          ｜ {t("payment.exchange")}
        </div>
      </div>
    </div>
  );
  return (
    <CommonModal
      title={modalTitle}
      className="bg-white-5"
      width={945}
      content={
        <div className="flex flex-wrap gap-4 my-5 overflow-auto max-h-[400px]">
          {/* 紫色样式（带纸屑） */}
          {coupons.map((coupon) => (
            <div
              className="w-[calc(50%-0.5rem)]"
              onClick={() => selectCurCoupon(coupon)}
            >
              <Coupon
                variant="dark"
                discount={coupon.discountValue}
                minOrder={coupon.minOrderAmount}
                maxSave={coupon.maxDiscountAmount}
                remainingSeconds={coupon.remainingSeconds}
                available={coupon.available}
                couponName={coupon.couponName}
                isShowToUse={false}
                unit={unit || ""}
                isSelect={coupon.id === selectedCoupon?.id}
              />
            </div>
          ))}
        </div>
      }
      visible={visible}
      onClose={onClose}
      footer={
        <div className="flex items-center justify-between pt-9 pb-4 px-3.5 border-t border-white/10">
          <div>
            <div className="text-xs">
              {t("home.selectorAndPayment.totalSavings")}
            </div>
            <div
              className="text-2xl mt-2.5 font-black italic"
              style={{
                background: "linear-gradient(180deg, #ff00ff 0%, #d000ff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "1px #fff",
                paintOrder: "stroke fill",
              }}
            >
              {unit} {totalDiscount}
            </div>
          </div>
          <PrimaryButton className="text-base" onClick={onClose}>
            {t("home.userCenter.confirm")}
          </PrimaryButton>
        </div>
      }
    />
  );
};

export default CouponModal;
