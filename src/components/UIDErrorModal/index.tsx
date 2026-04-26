import React from "react";
import { useTranslation } from "react-i18next";
import CommonModal from "../CommonModal";
import PrimaryButton from "../PrimaryButton";

interface UIDErrorModalProps {
  visible: boolean;
  onClose: () => void;
}

const UIDErrorModal: React.FC<UIDErrorModalProps> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const content = (
    <div className="flex flex-col items-center pt-8 pb-4">
      {/* Icon */}
      <div className="mb-6">
        <svg
          width="76"
          height="76"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M40 10V20M24 16L32 24M56 16L48 24"
            stroke="#999999"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Lid */}
          <path
            d="M24 30 H56 C 59.3137 30 62 32.6863 62 36 V 42 C 62 45.3137 59.3137 48 56 48 H 47 C 47 51.866 43.866 55 40 55 C 36.134 55 33 51.866 33 48 H 24 C 20.6863 48 18 45.3137 18 42 V 36 C 18 32.6863 20.6863 30 24 30 Z"
            stroke="#999999"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Base */}
          <path
            d="M22 48 V 60 C 22 64.4183 25.5817 68 30 68 H 50 C 54.4183 68 58 64.4183 58 60 V 48"
            stroke="#999999"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-[22px] font-bold text-white mb-3 tracking-wide">
        {t("home.selectorAndPayment.warning")}
      </h2>

      {/* Subtitle */}
      <div className="text-center text-[#999999] text-[15px] leading-relaxed mb-8">
        <p>{t("home.selectorAndPayment.uidOrServerWarning")}</p>
      </div>

      {/* Button */}
      <PrimaryButton
        fullWidth
        fontSize="17px"
        className="h-[52px] mb-6"
        onClick={onClose}
      >
        {t("home.selectorAndPayment.changeUidServer")}
      </PrimaryButton>

      {/* Ignore link */}
      <div
        className="text-[#999999] text-base underline cursor-pointer hover:text-white transition-colors underline-offset-4 decoration-[#999999]/60 hover:decoration-white"
        onClick={onClose}
      >
        {t("home.selectorAndPayment.continueToPurchase")}
      </div>
    </div>
  );

  return (
    <CommonModal
      visible={visible}
      onClose={onClose}
      content={content}
      footer={null}
      width={400}
    />
  );
};

export default UIDErrorModal;
