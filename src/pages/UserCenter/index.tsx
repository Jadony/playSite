import { useState } from "react";
import exchangeErr from "@/assets/userPanel/exchangeErr.png";
import CommonModal from "@/components/CommonModal";
import Coupon from "@/components/Coupon";
import UserMenu from "@/components/UserMenu";
import UserPanel from "@/components/UserPanel";
import userMenuData from "@/config/userMenuData";

const UserCenter = () => {
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const exchangeOnClick = (code: string) => {
    console.log(code);
  };
  const userMenu = userMenuData(exchangeOnClick);
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
      <CommonModal
        visible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
        title="兑换成功"
        content={
          <Coupon
            variant="purple"
            discount={5}
            minOrder={100}
            maxSave={20}
            onUse={() => console.log("使用优惠券")}
          />
        }
        width={480}
        footer={null}
      />

      {/* 2. 兑换失败 Modal */}
      <CommonModal
        visible={failureModalVisible}
        onClose={() => setFailureModalVisible(false)}
        title="兑换失败"
        content={
          <div>
            <div className="w-[155px] mx-auto" style={{ marginBottom: "8px" }}>
              <img width={155} src={exchangeErr} alt="" />
            </div>
            <div className="text-center text-sm text-white">
              兑换码无效，请检查后重试
            </div>
          </div>
        }
        width={480}
        footer={null}
      />
    </div>
  );
};

export default UserCenter;
