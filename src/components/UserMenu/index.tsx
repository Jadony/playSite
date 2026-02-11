import React from "react";
import user from "@/assets/avatars/user.jpg";
// import userMenuBg from "@/assets/userPanel/userMenuBg.png";
import "./style.css";
import { Link } from "react-scroll";

type UserMenuProps = {
  activeMenu: string;
  changeMenu: (id: string) => void;
  useMenu: {
    id: string;
    icon: React.ReactNode;
    label: string;
    to: string;
  }[];
  avatars: string;
  userName: string;
  // integral: string;
};

const UserMenu: React.FC<UserMenuProps> = ({
  activeMenu,
  changeMenu,
  useMenu,
  avatars,
  userName,
  // integral,
}) => {
  return (
    <div
      // 关键：添加 relative 和 overflow-hidden
      className="text-white rounded-xl border border-white/20 bg-white/5 p-5 relative overflow-hidden"
    >
      {/* 新增：单独的模糊背景层 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${user})`,
          backgroundSize: "100%",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          filter: "blur(42px)", // 只模糊这个层
          WebkitFilter: "blur(42px)",
          zIndex: 0, // 放在内容下面
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // 关键：控制暗度
          // 0.5 = 50%透明度，值越大背景越暗
          // 可以尝试: 0.3(较亮) ~ 0.7(较暗)
          zIndex: 1, // 在模糊层之上，内容层之下
        }}
      />

      {/* 内容层 - 保持所有内容清晰 */}
      <div className="relative z-10">
        <div>
          <div>
            <img
              className="w-[88px] h-[88px] border-4 border-white rounded-full mx-auto mb-2.5"
              width={88}
              height={88}
              src={avatars || user}
              alt=""
            />
          </div>
          <div className="text-xl font-semibold text-center">{userName}</div>
          {/* <div className="flex justify-center items-center gap-1 text-white/50 mt-1 cursor-pointer border-b border-white/10 pb-3.5">
            <div>Integral: {integral}</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <g opacity="0.5">
                <path
                  d="M4.17577 2.305C4.25591 2.22489 4.36216 2.17624 4.47516 2.16791C4.58816 2.15958 4.7004 2.19213 4.79141 2.25963L4.84434 2.305L8.2048 5.66608C8.28483 5.7461 8.3335 5.85219 8.34194 5.96505C8.35038 6.07791 8.31804 6.19005 8.25079 6.28109L8.2048 6.33402L4.84434 9.69511C4.76001 9.77966 4.6468 9.82916 4.52746 9.83365C4.40813 9.83814 4.29152 9.79728 4.20108 9.71929C4.11064 9.64131 4.05308 9.53197 4.03997 9.41328C4.02686 9.29458 4.05917 9.17532 4.13041 9.07947L4.17577 9.02654L7.20227 6.00005L4.17577 2.97356C4.09567 2.89342 4.04702 2.78718 4.03869 2.67417C4.03036 2.56117 4.06291 2.44894 4.13041 2.35793L4.17577 2.305Z"
                  fill="white"
                />
              </g>
            </svg>
          </div> */}
        </div>
        <div>
          <div className="pt-3.5">
            {useMenu.map((item) => (
              <Link key={item.id} to={item.to} smooth={true} duration={200}>
                <div
                  className="flex px-5 py-2 items-center cursor-pointer hover:bg-white/10 rounded-lg mb-3.5 h-12"
                  style={{
                    backgroundColor:
                      activeMenu === item.id ? "rgba(255, 255, 255, 0.10)" : "",
                  }}
                  onClick={() => changeMenu(item.id)}
                >
                  {item.icon}
                  <div className="pl-2.5 text-base">{item.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* <div className="relative pt-3.5 z-10">
        <div
          className="relative flex border border-white/20 rounded-lg py-2.5 px-3.5 cursor-pointer"
          style={{
            background:
              "linear-gradient(90deg, #453681 -13.88%, #1E0961 47.57%, #453681 109.01%)",
          }}
        >
          <div className="w-[calc(100%-60px)] text-base font-extrabold">
            Start your own team and get paid instantly!
          </div>
          <div className="absolute right-0 bottom-0 w-[100px]">
            <img width={100} height={100} src={userMenuBg} alt="" />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default UserMenu;
