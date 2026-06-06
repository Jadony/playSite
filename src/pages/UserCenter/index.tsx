import { useState } from "react";
import UserMenu from "@/components/UserMenu";
import UserPanel from "@/components/UserPanel";
import userMenuData from "@/config/userMenuData";
import { getUserCoupons, getUserInfo, redeemInOrder } from "@/api/user";
import "./style.css";
import CouponExchangeSuccess from "@/components/CouponExchangeSuccess";
import CouponExchangeErr from "@/components/CouponExchangeErr";
import { useLanguageContext } from "@/store/languageStore";
import { message } from "antd";
import { useAuthContext } from "@/store/authStore";

const UserCenter = () => {
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const [coupon, setCoupon] = useState<UserCouponsResponseData | null>(null);
  const [coupons, setCoupons] = useState<UserCouponsResponseData[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfoResponseData>();
  const [gender, setGender] = useState("male");
  const { selectUnit } = useLanguageContext();
  const { setUser } = useAuthContext();
  const exchangeOnClick = async (code: string) => {
    try {
      const { data } = await redeemInOrder({ redeemCode: code });
      if (data.data) {
        setSuccessModalVisible(true);
        setCoupon(data.data);
        getUserCoupons({ currency: selectUnit?.currency }).then((res) => {
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
  const getUserAllInfo = async () => {
    try {
      const { data } = await getUserInfo();
      setUserInfo(data.data);
      setGender(data.data.gender);
      setUser({
        ...data.data,
        token: localStorage.getItem("token") || "",
      });
      localStorage.setItem("user", JSON.stringify(data.data));
    } catch (error) {
      message.error("error");
    }
  };
  const userMenu = userMenuData(
    getUserAllInfo,
    { userInfo, gender: gender || "" },
    exchangeOnClick,
    { coupons },
  );
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
          avatars={userInfo?.avatar || ""}
          userName={userInfo?.nickname || ""}
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
