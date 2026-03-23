import { useNavigate } from "react-router-dom";
import CommonModal from "../CommonModal";
import Coupon from "../Coupon";

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
  return (
    <CommonModal
      className="coupons-success-modal"
      visible={visible}
      onClose={onClose}
      title="兑换成功"
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
