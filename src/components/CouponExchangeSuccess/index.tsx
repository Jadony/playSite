import { useNavigate } from "react-router-dom";
import CommonModal from "../CommonModal";
import Coupon from "../Coupon";
import { useTranslation } from "react-i18next";

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
        />
      }
      width={480}
      footer={null}
    />
  );
};

export default CouponExchangeSuccess;
