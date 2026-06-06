/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-03-03 19:00:36
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-06-06 10:35:01
 * @FilePath: /playSite/src/components/CouponExchangeSuccess/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
          remainingSeconds={coupon?.remainingSeconds}
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
