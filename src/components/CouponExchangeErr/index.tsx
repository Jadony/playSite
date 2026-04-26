import CommonModal from "../CommonModal";
import { useTranslation } from "react-i18next";

type CouponExchangeErrProps = {
  visible: boolean;
  onClose: () => void;
};

const CouponExchangeErr: React.FC<CouponExchangeErrProps> = ({
  visible,
  onClose,
}) => {
  const { t } = useTranslation();
  return (
    <CommonModal
      visible={visible}
      onClose={onClose}
      title={t("home.selectorAndPayment.redemptionFailed")}
      content={
        <div>
          <div className="w-[155px] mx-auto" style={{ marginBottom: "8px" }}>
            <img
              width={155}
              src="https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/exchangeErr.png"
              alt=""
            />
          </div>
          <div className="text-center text-sm text-white">
            {t("home.selectorAndPayment.invalidCode")}
          </div>
        </div>
      }
      width={480}
      footer={null}
    />
  );
};

export default CouponExchangeErr;
