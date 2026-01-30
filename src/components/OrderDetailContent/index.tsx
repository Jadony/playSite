import React from 'react';
import PrimaryButton from '@components/PrimaryButton';
import './style.css';

export type OrderStatus =
  | 'cancelled'   // 已取消
  | 'in_progress' // 进行中
  | 'refund'      // 退款售后
  | 'pending'     // 待处理
  | 'paying'      // 支付中
  | 'completed';  // 完成

export interface OrderProduct {
  image?: string;
  name: string;
  quantity: number;
  uid: string;
  server: string;
  totalPrice: string;
}

export interface OrderInfo {
  orderNo: string;
  paymentMethod: string;
  orderTime: string;
  originalPrice: string;
  discount: string;
}

export interface OrderDetailContentProps {
  /** 是否显示，不传则始终显示 */
  visible?: boolean;
  onClose?: () => void;
  onBack?: () => void;
  status: OrderStatus;
  product: OrderProduct;
  orderInfo: OrderInfo;
  /** 支付中时的倒计时，如 "00:54:43" */
  countdown?: string;
  onCancelOrder?: () => void;
  onPayNow?: () => void;
  onRefresh?: () => void;
  onGoProcess?: () => void;
  className?: string;
}

const STEPS = ['下单', '支付', '发货', '完成'] as const;

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; desc: string; statusColor: string; completedStep: number; actionTag?: string; primaryBtn?: string; secondaryBtn?: string; showHeaderStatus?: boolean }
> = {
  cancelled: {
    label: '已取消',
    desc: '订单已取消，请重新下单',
    statusColor: 'grey',
    completedStep: 1,
    actionTag: '已取消',
    showHeaderStatus: true,
  },
  in_progress: {
    label: '进行中',
    desc: '我们正在处理您的订单，请耐心等待...',
    statusColor: 'green',
    completedStep: 3,
    primaryBtn: '刷新',
  },
  refund: {
    label: '退款售后',
    desc: '抱歉，您的订单处理过程中遇到了一点异常，未能充值成功，我们将全额退回您的款项',
    statusColor: 'red',
    completedStep: 2,
    actionTag: '售后中',
  },
  pending: {
    label: '待处理',
    desc: '您提供的账号密码有错，请及时确认并重新提交，方便我们尽快为您完成充值',
    statusColor: 'orange',
    completedStep: 2,
    primaryBtn: '去处理',
  },
  paying: {
    label: '支付中',
    desc: '支付确认中，支付成功后我们将尽快发货',
    statusColor: 'neutral',
    completedStep: 1,
    secondaryBtn: '取消订单',
    primaryBtn: '立即支付',
  },
  completed: {
    label: '完成',
    desc: '订单已完成',
    statusColor: 'green',
    completedStep: 4,
  },
};

const OrderDetailContent: React.FC<OrderDetailContentProps> = ({
  visible = true,
  onClose,
  onBack,
  status,
  product,
  orderInfo,
  countdown,
  onCancelOrder,
  onPayNow,
  onRefresh,
  onGoProcess,
  className = '',
}) => {
  if (visible === false) return null;

  const config = STATUS_CONFIG[status];
  const showCountdown = status === 'paying' && countdown;
  const showActions =
    (status === 'paying' && (onCancelOrder || onPayNow)) ||
    (status === 'in_progress' && onRefresh) ||
    (status === 'pending' && onGoProcess);

  return (
    <div className={`order-detail-content ${className}`.trim()}>
      {/* Header */}
      <div className="order-detail-header">
        <div className="order-detail-header-left" onClick={onBack || onClose} role="button">
          <span className="order-detail-back">←</span>
          <span className="order-detail-title">订单详情</span>
        </div>
        {config.showHeaderStatus && (
          <span className={`order-detail-header-status status-${config.statusColor}`}>
            {config.label}
          </span>
        )}
      </div>

      {/* Status Area */}
      <div className="order-detail-status-area">
        <div className={`order-detail-status-text status-${config.statusColor}`}>
          {config.label}
        </div>
        <div className="order-detail-status-desc">{config.desc}</div>

        {/* Progress Stepper */}
        <div className="order-detail-stepper">
          {STEPS.map((step, index) => {
            const completed = index + 1 <= config.completedStep;
            const isLast = index === STEPS.length - 1;
            return (
              <React.Fragment key={step}>
                <div className="order-detail-step">
                  <div className={`order-detail-step-circle ${completed ? 'completed' : ''}`}>
                    {completed ? '✓' : ''}
                  </div>
                  <div className={`order-detail-step-label ${completed ? 'completed' : ''}`}>{step}</div>
                </div>
                {!isLast && (
                  <div
                    className={`order-detail-step-line ${index + 1 < config.completedStep ? 'completed' : ''}`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Product Section */}
      <div className="order-detail-product">
        <div className="order-detail-product-main">
          <div className="order-detail-product-image">
            {product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <div className="order-detail-product-placeholder">图</div>
            )}
          </div>
          <div className="order-detail-product-info">
            <div>
              <div className="order-detail-product-name">{product.name}</div>
              <div className="order-detail-product-meta">数量：{product.quantity}</div>
            </div>
            <div className="order-detail-product-footer">
              <span className="order-detail-product-uid">UID：{product.uid}</span>
              <span className="order-detail-product-server">区服：{product.server}</span>
            </div>
          </div>
          <div className="order-detail-product-right">
            <div className="order-detail-product-price-row">
              <span className="order-detail-product-price">$ {product.totalPrice}</span>
              {showCountdown && (
                <span className="order-detail-product-countdown">{countdown}</span>
              )}
            </div>
            {config.actionTag && (
              <span className={`order-detail-action-tag status-${config.statusColor}`}>
                {config.actionTag}
              </span>
            )}
            {showActions && (
              <div className="order-detail-product-actions">
                {config.secondaryBtn && onCancelOrder && (
                  <button className="order-detail-btn secondary" onClick={onCancelOrder}>
                    {config.secondaryBtn}
                  </button>
                )}
                {config.primaryBtn && (
                  <PrimaryButton
                    size="small"
                    fontSize="14px"
                    onClick={
                      status === 'paying'
                        ? onPayNow
                        : status === 'in_progress'
                          ? onRefresh
                          : onGoProcess
                    }
                  >
                    {config.primaryBtn}
                  </PrimaryButton>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Info */}
      <div className="order-detail-info">
        <div className="order-detail-info-title">订单信息</div>
        <div className="order-detail-info-grid">
          <div className="order-detail-info-item">
            <span className="key">订单编号：</span>
            <span className="value">{orderInfo.orderNo}</span>
          </div>
          <div className="order-detail-info-item">
            <span className="key">充值方式：</span>
            <span className="value">{orderInfo.paymentMethod}</span>
          </div>
          <div className="order-detail-info-item">
            <span className="key">优惠总价：</span>
            <span className="value">{orderInfo.discount}</span>
          </div>
          <div className="order-detail-info-item">
            <span className="key">订单时间：</span>
            <span className="value">{orderInfo.orderTime}</span>
          </div>
          <div className="order-detail-info-item">
            <span className="key">商品原价：</span>
            <span className="value">{orderInfo.originalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailContent;
