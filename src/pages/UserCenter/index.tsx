import UserMenu from "@/components/UserMenu";
import UserPanel from "@/components/UserPanel";
import userMenuData from "@/config/userMenuData";
import { useState } from "react";

const UserCenter = () => {
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
      <div className="min-w-[315px] max-w-[315px] mr-5">
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
    </div>
  );
};

export default UserCenter;
