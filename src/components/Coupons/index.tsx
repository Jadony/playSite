import Coupon from "../Coupon";

const Coupons = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-4 mt-5">
        {/* 紫色样式（带纸屑） */}
        <div className="w-[calc(50%-0.5rem)]">
          <Coupon
            variant="purple"
            discount={5}
            minOrder={100}
            maxSave={20}
            onUse={() => console.log("使用优惠券")}
          />
        </div>
        <div className="w-[calc(50%-0.5rem)]">
          <Coupon
            variant="dark"
            discount={5}
            minOrder={100}
            maxSave={20}
            onUse={() => console.log("使用优惠券")}
          />
        </div>
        <div className="w-[calc(50%-0.5rem)]">
          {/* 深灰色样式 */}
          <Coupon
            available={false}
            variant="dark"
            discount={5}
            minOrder={100}
            maxSave={20}
            onUse={() => console.log("使用优惠券")}
          />
        </div>
      </div>
    </div>
  );
};

export default Coupons;
