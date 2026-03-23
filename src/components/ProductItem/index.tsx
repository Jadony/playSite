import React from "react";
import { useTranslation } from "react-i18next";
import { usePurchaseHistoryStatusConfig } from "@/config/userPurchaseHistoryTypes";
import "./style.css";

/** ProductItem 内状态对应的颜色：in_progress 绿、cancelled 灰、completed 白、refund/pending/paying 红 */
const PRODUCT_ITEM_STATUS_COLOR: Record<OrderStatus, string> = {
  PROCESSING: "green",
  CANCELLED: "grey",
  COMPLETED: "white",
  REFUNDING: "red",
  // pending: "red",
  PENDING: "red",
};

export interface ProductItemProps {
  product: OrderListResponseData["records"][0];
  status: OrderStatus;
  /** 是否展示顶部边框，默认 true */
  showBorderTop?: boolean;
  /** 点击整块商品区域时的回调 */
  onClick?: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  status,
  showBorderTop = true,
  onClick,
}) => {
  const config = usePurchaseHistoryStatusConfig()[status];
  const displayStatus = config?.actionTag ?? config?.label;
  const statusColor = PRODUCT_ITEM_STATUS_COLOR[status];
  const { t } = useTranslation();

  return (
    <div
      className={`order-detail-product ${showBorderTop ? "" : "product-item-no-border"} cursor-pointer`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
    >
      <div className="order-detail-product-main">
        <div className="order-detail-product-image">
          {product.skuImage ? (
            <img src={product.skuImage} alt={product.gameName} />
          ) : (
            <div className="order-detail-product-placeholder">图</div>
          )}
        </div>
        <div className="order-detail-product-info">
          <div>
            <div className="order-detail-product-name">{product.skuName}</div>
            <div className="order-detail-product-meta">{product.gameName}</div>
          </div>
          <div className="order-detail-product-footer">
            <span className="order-detail-product-uid">
              {t("userCenter.quantity")}：{product.quantity}
            </span>
            <span className="order-detail-product-server">
              {t("userCenter.orderForm")}：{product.orderNo}
            </span>
          </div>
        </div>
        <div className="order-detail-product-right">
          <span className={`order-detail-action-tag status-${statusColor}`}>
            {displayStatus || " "}
          </span>
          <div className="order-detail-product-price-row">
            <span className="order-detail-product-price">
              $ {product.orderAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
