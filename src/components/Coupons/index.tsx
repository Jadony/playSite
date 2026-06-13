/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-02-11 01:57:08
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-06-13 17:33:17
 * @FilePath: /playSite/src/components/Coupons/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
          <div className="w-[calc(50%-0.5rem)]" key={coupon.id}>
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
