import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./style.css";

export interface CouponProps {
  /**
   * 优惠券样式类型
   * - dark: 深灰色背景样式
   * - purple: 紫色背景样式（带纸屑装饰）
   */
  variant?: "dark" | "purple";
  /**
   * 折扣百分比
   */
  discount?: number;
  /**
   * 最低订单金额
   */
  minOrder?: number;
  /**
   * 最大节省金额
   */
  maxSave?: number;
  /**
   * 过期时间（倒计时显示）
   */
  remainingSeconds?: number;
  /**
   * 是否显示纸屑装饰（仅 purple 样式）
   */
  showConfetti?: boolean;
  /**
   * 点击 "To Use" 按钮的回调
   */
  onUse?: () => void;

  /**
   * 是否可用
   */
  available?: boolean;

  /**
   * 是否显示ToUse按钮
   */
  isShowToUse?: boolean;

  /**
   * 优惠券名称
   */
  couponName?: string;

  /**
   * 是否选中
   */
  isSelect?: boolean;

  /**
   * 是否显示右侧按钮
   */
  isShowRightBtn?: boolean;

  unit: string;
}

const Coupon: React.FC<CouponProps> = ({
  variant = "dark",
  discount = 5,
  minOrder = 100,
  maxSave = 20,
  remainingSeconds = 0,
  onUse,
  available = true,
  isShowToUse = true,
  couponName,
  isSelect = false,
  isShowRightBtn = true,
  unit,
}) => {
  const [curTime, setCurTime] = useState(remainingSeconds);
  const { t } = useTranslation();

  useEffect(() => {
    if (available && curTime > 0) {
      const timer = setInterval(() => {
        setCurTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [remainingSeconds, available, curTime]);

  const showTime = () => {
    const h = Math.floor(curTime / 3600);
    const m = Math.floor((curTime % 3600) / 60);
    const s = curTime % 60;

    return [h, m, s].map((v) => v.toString().padStart(2, "0")).join(":");
  };

  const selectBtn = (isSelect: boolean) => {
    if (isSelect) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="42"
          height="42"
          viewBox="0 0 42 42"
          fill="none"
          className="cursor-pointer mt-4"
        >
          <circle cx="21.0013" cy="21.0013" r="21.0013" fill="white" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            x="7.5"
            y="7.5"
            viewBox="0 0 27 27"
            fill="none"
          >
            <path
              d="M22.0078 6.60229L9.90354 18.7065L4.40161 13.2046"
              stroke="#0C0B0F"
              strokeWidth="3.77275"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </svg>
      );
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        className="cursor-pointer mt-4"
      >
        <circle
          opacity="0.2"
          cx="21.0013"
          cy="21.0013"
          r="21.0013"
          fill="white"
        />
      </svg>
    );
  };

  return (
    <div className={`coupon coupon-${variant}`}>
      {/* 左侧穿孔 */}
      <div className="coupon-perforation coupon-perforation-left"></div>

      {/* 主要内容 */}
      <div className="coupon-content">
        {/* 顶部区域 */}
        <div className="coupon-top">
          <div className="coupon-discount-info">
            <div
              className={`text-sm text-white font-bold ${!available ? "expiration-opacity" : ""}`}
            >
              {couponName}
            </div>
            <div
              className={`coupon-discount italic ${!available ? "expiration-opacity" : ""}`}
            >
              {discount}% {t("home.selectorAndPayment.off")}
            </div>
            <div
              className={`coupon-validity ${!available ? "expiration-opacity" : ""}`}
            >
              {unit}
              {minOrder} {t("home.selectorAndPayment.validForOrdersOver")}
            </div>
            <div
              className={`coupon-save ${!available ? "expiration-opacity" : ""}`}
            >
              {t("userCenter.saved")} ${maxSave}
            </div>
          </div>
          {available ? (
            isShowRightBtn ? (
              isShowToUse ? (
                <button className="coupon-use-btn" onClick={onUse}>
                  {t("userCenter.use")}
                </button>
              ) : (
                selectBtn(isSelect)
              )
            ) : (
              ""
            )
          ) : (
            <div
              className="relative expiration-bg text-[#3a393d]"
              style={
                {
                  "--expirationBg": `url(https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/expirationBg.png)`,
                  transform: "rotate(25deg)",
                } as React.CSSProperties
              }
            >
              <span className="absolute top-[25px] left-[-60px] text-base font-semibold">
                {t("userCenter.expiration")}
              </span>
            </div>
          )}
        </div>

        {/* 虚线分隔线 */}
        <div
          className={`coupon-divider ${!available ? "expiration-opacity" : ""}`}
        ></div>

        {/* 底部区域 */}
        <div className="coupon-bottom">
          <div
            className={`coupon-expires ${!available ? "expiration-opacity" : ""}`}
          >
            {showTime()} {t("userCenter.expiresIn")}
          </div>
          <div
            className={`coupon-disclaimer ${!available ? "expiration-opacity" : ""}`}
          >
            {t("userCenter.cannotBeCombinedWithOhterOffers")}
          </div>
        </div>
      </div>

      {/* 右侧穿孔 */}
      <div className="coupon-perforation coupon-perforation-right"></div>
    </div>
  );
};

export default Coupon;
