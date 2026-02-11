import { useEffect, useState } from "react";
import Coupon from "../Coupon";
import { getUserCoupons } from "@/api/user";

const Coupons = () => {
  const [coupons, setCoupons] = useState<UserCouponsResponseData[]>([]);

  useEffect(() => {
    getUserCoupons().then((res) => {
      setCoupons(res.data.data);
    });
  }, []);

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
              onUse={() => console.log("使用优惠券")}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coupons;
