import { useState } from "react";
import UserMenu from "@/components/UserMenu";
import UserPanel from "@/components/UserPanel";
import userMenuData from "@/config/userMenuData";
import { getUserCoupons, redeemInOrder } from "@/api/user";
import "./style.css";
import CouponExchangeSuccess from "@/components/CouponExchangeSuccess";
import CouponExchangeErr from "@/components/CouponExchangeErr";

const UserCenter = () => {
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const [coupon, setCoupon] = useState<UserCouponsResponseData | null>(null);
  const [coupons, setCoupons] = useState<UserCouponsResponseData[]>([]);
  const exchangeOnClick = async (code: string) => {
    try {
      const { data } = await redeemInOrder({ redeemCode: code });
      setSuccessModalVisible(true);
      if (data) {
        setCoupon(data.data);
        getUserCoupons().then((res) => {
          setCoupons(res.data.data);
        });
      } else {
        setFailureModalVisible(true);
      }
    } catch (error) {
      setSuccessModalVisible(true);
      // setFailureModalVisible(true);
    }
  };
  const userMenu = userMenuData(exchangeOnClick, { coupons });
  const [activeMenu, setActiveMenu] = useState("myAchievements");

  const changeMenu = (id: string) => {
    setActiveMenu(id);
  };
  return (
    <div className="flex mx-auto max-w-[1280px] py-44">
      <div className="min-w-[315px] max-w-[315px] mr-5 sticky top-0 self-start">
        <UserMenu
          activeMenu={activeMenu}
          useMenu={userMenu}
          avatars=""
          userName="Saul"
          // integral="123123"
          changeMenu={changeMenu}
        />
      </div>
      <div className="flex-1 text-white min-w-[945px]">
        {userMenu.map((item) => {
          return (
            <UserPanel
              id={item.to}
              className="mb-5"
              key={item.id}
              title={item.label}
              icon={item.icon}
              leftEl={item.leftEl}
            >
              {item.comp}
            </UserPanel>
          );
        })}
      </div>
      {/* 1. 兑换成功 Modal */}
      <CouponExchangeSuccess
        visible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
        coupon={coupon}
      />

      {/* 2. 兑换失败 Modal */}
      <CouponExchangeErr
        visible={failureModalVisible}
        onClose={() => setFailureModalVisible(false)}
      />
    </div>
  );
};

export default UserCenter;
