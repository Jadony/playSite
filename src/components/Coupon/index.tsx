import React from 'react';
import './style.css';

export interface CouponProps {
  /**
   * 优惠券样式类型
   * - dark: 深灰色背景样式
   * - purple: 紫色背景样式（带纸屑装饰）
   */
  variant?: 'dark' | 'purple';
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
  expiresAt?: string;
  /**
   * 是否显示纸屑装饰（仅 purple 样式）
   */
  showConfetti?: boolean;
  /**
   * 点击 "To Use" 按钮的回调
   */
  onUse?: () => void;
}

const Coupon: React.FC<CouponProps> = ({
  variant = 'dark',
  discount = 5,
  minOrder = 100,
  maxSave = 20,
  expiresAt = '00:52:07',
  showConfetti = true,
  onUse,
}) => {
  return (
    <div className={`coupon coupon-${variant}`}>
      {/* 纸屑装饰（仅 purple 样式） */}
      {variant === 'purple' && showConfetti && (
        <div className="coupon-confetti">
          <div className="confetti-piece confetti-red"></div>
          <div className="confetti-piece confetti-blue"></div>
          <div className="confetti-piece confetti-yellow"></div>
          <div className="confetti-piece confetti-orange"></div>
        </div>
      )}

      {/* 左侧穿孔 */}
      <div className="coupon-perforation coupon-perforation-left"></div>

      {/* 主要内容 */}
      <div className="coupon-content">
        {/* 顶部区域 */}
        <div className="coupon-top">
          <div className="coupon-discount-info">
            <div className="coupon-discount">{discount}% OFF</div>
            <div className="coupon-validity">Valid for orders over ${minOrder}</div>
            <div className="coupon-save">Save up to ${maxSave}</div>
          </div>
          <button className="coupon-use-btn" onClick={onUse}>
            To Use
          </button>
        </div>

        {/* 虚线分隔线 */}
        <div className="coupon-divider"></div>

        {/* 底部区域 */}
        <div className="coupon-bottom">
          <div className="coupon-expires">It expires at {expiresAt}</div>
          <div className="coupon-disclaimer">Click Buy does not stack</div>
        </div>
      </div>

      {/* 右侧穿孔 */}
      <div className="coupon-perforation coupon-perforation-right"></div>
    </div>
  );
};

export default Coupon;
