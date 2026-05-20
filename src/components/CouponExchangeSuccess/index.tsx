import { useNavigate } from "react-router-dom";
import CommonModal from "../CommonModal";
import Coupon from "../Coupon";
import { useTranslation } from "react-i18next";
import { useLanguageContext } from "@/store/languageStore";

type CouponExchangeProps = {
  visible: boolean;
  onClose: () => void;
  coupon: UserCouponsResponseData | null;
  isShowRightBtn?: boolean;
};

const CouponExchangeSuccess: React.FC<CouponExchangeProps> = ({
  visible,
  onClose,
  coupon,
  isShowRightBtn = true,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { selectUnit } = useLanguageContext();
  return (
    <CommonModal
      className="coupons-success-modal"
      visible={visible}
      onClose={onClose}
      title={t("userCenter.redemptionSuccessful")}
      content={
        <Coupon
          variant="purple"
          discount={coupon?.discountValue}
          minOrder={coupon?.minOrderAmount}
          maxSave={coupon?.maxDiscountAmount}
          onUse={() => navigate("/")}
          isShowRightBtn={isShowRightBtn}
          unit={selectUnit?.unit || ""}
        />
      }
      width={480}
      footer={null}
    />
  );
};

export default CouponExchangeSuccess;
