import React, { useEffect, useState } from "react";
import expirationBg from "@/assets/userPanel/expirationBg.png";
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
}

const Coupon: React.FC<CouponProps> = ({
  variant = "dark",
  discount = 5,
  minOrder = 100,
  maxSave = 20,
  remainingSeconds = 20,
  onUse,
  available = true,
}) => {
  const [curTime, setCurTime] = useState(remainingSeconds || 0);

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
              className={`coupon-discount ${!available ? "expiration-opacity" : ""}`}
            >
              {discount}% OFF
            </div>
            <div
              className={`coupon-validity ${!available ? "expiration-opacity" : ""}`}
            >
              Valid for orders over ${minOrder}
            </div>
            <div
              className={`coupon-save ${!available ? "expiration-opacity" : ""}`}
            >
              Save up to ${maxSave}
            </div>
          </div>
          {available ? (
            <button className="coupon-use-btn" onClick={onUse}>
              To Use
            </button>
          ) : (
            <div
              className="relative expiration-bg text-[#3a393d]"
              style={
                {
                  "--expirationBg": `url(${expirationBg})`,
                  transform: "rotate(25deg)",
                } as React.CSSProperties
              }
            >
              <span className="absolute top-[25px] left-[-60px] text-base font-semibold">
                Expiration
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
            It expires at {showTime()}
          </div>
          <div
            className={`coupon-disclaimer ${!available ? "expiration-opacity" : ""}`}
          >
            Click Buy does not stack
          </div>
        </div>
      </div>

      {/* 右侧穿孔 */}
      <div className="coupon-perforation coupon-perforation-right"></div>
    </div>
  );
};

export default Coupon;
