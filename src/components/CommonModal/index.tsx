import React from "react";
import ReactDOM from "react-dom";
import PrimaryButton from "../PrimaryButton";
import "./style.css";

export interface CommonModalProps {
  /**
   * 是否显示 Modal
   */
  visible: boolean;
  /**
   * 关闭 Modal 的回调
   */
  onClose: () => void;
  /**
   * Modal 标题
   */
  title?: string | React.ReactNode;
  /**
   * Modal 内容（可以是文本或 JSX）
   */
  content?: React.ReactNode;
  /**
   * Modal 宽度（默认 400px）
   */
  width?: string | number;
  /**
   * 底部按钮配置
   */
  footer?: React.ReactNode;
  /**
   * 是否显示关闭按钮（默认 true）
   */
  showClose?: boolean;
  /**
   * 是否点击遮罩层关闭（默认 true）
   */
  maskClosable?: boolean;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 主按钮文本（如果不提供 footer）
   */
  primaryButtonText?: string;
  /**
   * 主按钮点击回调（如果不提供 footer）
   */
  onPrimaryClick?: () => void;
  /**
   * 次要按钮文本（如果不提供 footer）
   */
  secondaryButtonText?: string;
  /**
   * 次要按钮点击回调（如果不提供 footer）
   */
  onSecondaryClick?: () => void;
  /**
   * 主按钮是否禁用
   */
  primaryButtonDisabled?: boolean;
  /**
   * 主按钮是否加载中
   */
  primaryButtonLoading?: boolean;

  /**
   * 自定义 z-index
   */
  zIndex?: string;
}

const CommonModal: React.FC<CommonModalProps> = ({
  visible,
  onClose,
  title,
  content,
  width = 366,
  footer,
  showClose = true,
  maskClosable = true,
  className = "",
  primaryButtonText,
  onPrimaryClick,
  secondaryButtonText,
  onSecondaryClick,
  primaryButtonDisabled = false,
  primaryButtonLoading = false,
  zIndex,
}) => {
  if (!visible) return null;

  const handleMaskClick = () => {
    if (maskClosable) {
      onClose();
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const modalWidth = typeof width === "number" ? `${width}px` : width;

  // 默认底部按钮
  const defaultFooter = (
    <div className="common-modal-footer">
      {secondaryButtonText && onSecondaryClick && (
        <PrimaryButton
          variant="secondary"
          size="medium"
          onClick={onSecondaryClick}
          className="common-modal-secondary-btn"
        >
          {secondaryButtonText}
        </PrimaryButton>
      )}
      {primaryButtonText && onPrimaryClick && (
        <PrimaryButton
          onClick={onPrimaryClick}
          disabled={primaryButtonDisabled || primaryButtonLoading}
          className="common-modal-primary-btn"
          fullWidth
          size="medium"
        >
          {primaryButtonLoading ? "加载中..." : primaryButtonText}
        </PrimaryButton>
      )}
    </div>
  );

  return ReactDOM.createPortal(
    <div
      className="common-modal-mask"
      style={{ zIndex }}
      onClick={handleMaskClick}
    >
      <div
        className={`common-modal ${className}`}
        style={{ width: modalWidth }}
        onClick={handleModalClick}
      >
        {/* 关闭按钮 */}
        {showClose && (
          <button className="common-modal-close" onClick={onClose}>
            ×
          </button>
        )}

        {/* 标题 */}
        {title && <div className="common-modal-title">{title}</div>}

        {/* 内容 */}
        {content && <div className="common-modal-content">{content}</div>}

        {/* 底部 */}
        {footer !== undefined ? footer : defaultFooter}
      </div>
    </div>,
    document.getElementsByTagName("body")[0],
  );
};

export default CommonModal;
