import React from 'react';
import PrimaryButton from '@components/PrimaryButton';
import type { OrderProduct, OrderStatus } from '@components/OrderDetailContent';
import './style.css';

export interface ProductItemStatusConfig {
  actionTag?: string;
  primaryBtn?: string;
  secondaryBtn?: string;
  statusColor: string;
}

export interface ProductItemProps {
  product: OrderProduct;
  status: OrderStatus;
  statusConfig: ProductItemStatusConfig;
  showCountdown: boolean;
  countdown?: string;
  showActions: boolean;
  onCancelOrder?: () => void;
  onPayNow?: () => void;
  onRefresh?: () => void;
  onGoProcess?: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  status,
  statusConfig,
  showCountdown,
  countdown,
  showActions,
  onCancelOrder,
  onPayNow,
  onRefresh,
  onGoProcess,
}) => {
  const { actionTag, primaryBtn, secondaryBtn, statusColor } = statusConfig;

  return (
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
          </div>
          {actionTag && (
            <span className={`order-detail-action-tag status-${statusColor}`}>
              {actionTag}
            </span>
          )}
          {showActions && (
            <div className="order-detail-product-actions">
              {secondaryBtn && (
                <button
                  className="order-detail-btn secondary"
                  onClick={onCancelOrder || (() => console.log('取消订单'))}
                >
                  {secondaryBtn}
                </button>
              )}
              {primaryBtn && status === 'paying' && (
                <div className="order-detail-pay-wrapper">
                  {showCountdown && (
                    <span className="order-detail-pay-btn-countdown">{countdown}</span>
                  )}
                  <PrimaryButton
                    size="medium"
                    borderRadius="10px"
                    fontSize="14px"
                    onClick={onPayNow || (() => console.log('立即支付'))}
                  >
                    {primaryBtn}
                  </PrimaryButton>
                </div>
              )}
              {primaryBtn && status === 'in_progress' && (
                <button
                  className="order-detail-btn secondary"
                  onClick={onRefresh || (() => console.log('刷新'))}
                >
                  {primaryBtn}
                </button>
              )}
              {primaryBtn && status === 'pending' && (
                <button
                  className="order-detail-btn secondary"
                  onClick={onGoProcess || (() => console.log('去处理'))}
                >
                  {primaryBtn}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
