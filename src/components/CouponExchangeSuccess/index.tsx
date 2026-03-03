import CommonModal from "../CommonModal";
import Coupon from "../Coupon";

type CouponExchangeProps = {
  visible: boolean;
  onClose: () => void;
  coupon: UserCouponsResponseData | null;
};

const CouponExchangeSuccess: React.FC<CouponExchangeProps> = ({
  visible,
  onClose,
  coupon,
}) => {
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
          onUse={() => console.log("使用优惠券")}
        />
      }
      width={480}
      footer={null}
    />
  );
};

export default CouponExchangeSuccess;
