import { useEffect, useState } from "react";
import Coupon from "../Coupon";
import { getUserCoupons } from "@/api/user";
import { useLanguageContext } from "@/store/languageStore";
import { useNavigate } from "react-router-dom";

const Coupons = ({ data }: { data: UserCouponsResponseData[] }) => {
  const [coupons, setCoupons] = useState<UserCouponsResponseData[]>([]);
  const { selectUnit } = useLanguageContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectUnit?.currency) {
      return;
    }
    getUserCoupons({ currency: selectUnit?.currency }).then((res) => {
      setCoupons(res.data.data);
    });
  }, [selectUnit?.currency]);

  useEffect(() => {
    setCoupons(data);
  }, [data]);

  return (
    <div>
      <div className="flex flex-wrap gap-4 mt-5">
        {/* 紫色样式（带纸屑） */}
        {coupons.map((coupon) => (
          <div className="w-[calc(50%-0.5rem)]">
            <Coupon
              variant="dark"
              discount={coupon.discountValue}
              minOrder={coupon.minOrderAmount}
              maxSave={coupon.maxDiscountAmount}
              remainingSeconds={coupon.remainingSeconds}
              available={coupon.available}
              couponName={coupon.couponName}
              onUse={() => navigate("/")}
              unit={selectUnit?.unit || ""}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coupons;
