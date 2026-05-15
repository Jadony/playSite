import CommonModal from "../CommonModal";
import { useEffect, useState } from "react";
import { getUserAchievements } from "@/api/user";

const UserAchievement = () => {
  const [visible, setVisible] = useState(false);
  const [achievements, setAchievements] = useState<
    UserAchievementsResponseData[]
  >([]);
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  };

  const enableScroll = () => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  };
  useEffect(() => {
    disableScroll();
    return () => enableScroll();
  }, []);

  useEffect(() => {
    getUserAchievements().then((res) => {
      if (res.data.data.length < 3) {
        const empty = Array.from({ length: 3 - res.data.data.length }).map(
          (_, index) => ({
            id: index,
            achievementCode: "",
            achievementName: "",
            achievementDesc: "",
            achievementIcon: "",
            unlockTime: "",
          }),
        );
        setAchievements([...res.data.data, ...empty]);
      } else {
        setAchievements(res.data.data);
      }
    });
  }, []);

  return (
    <div>
      {/* 外层容器：固定宽度，隐藏超出部分 */}
      <div className="relative max-w-[945px] top-[-20px]">
        {/* 滚动容器 */}
        <div className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory">
          {achievements.map((item, index) => {
            if (!item.achievementName) {
              return (
                <div
                  key={item.id}
                  className="relative flex-shrink-0 snap-center min-h-[300px]"
                  style={{
                    marginRight:
                      index === achievements.length - 1 ? "0" : "150px",
                    marginLeft: index === 1 ? "80px" : "0",
                  }}
                >
                  <img
                    width={135}
                    src="https://play-test.oss-cn-hangzhou.aliyuncs.com/front-userCenter/none.png"
                    alt={`none`}
                    className="rounded-lg relative left-0 top-[78px]"
                  />
                  <img
                    className="absolute left-[50%] translate-x-[-50%] bottom-[25px] w-[200px] max-w-[200px]"
                    src="https://play-test.oss-cn-hangzhou.aliyuncs.com/front-userCenter/achievementUnderImg.png"
                    alt=""
                  />
                  <div className="min-w-[70px] text-white absolute left-[50%] translate-x-[-50%] bottom-0 text-sm opacity-50">
                    Stay tuned
                  </div>
                </div>
              );
            }
            return (
              <div
                onClick={() => setVisible(true)}
                key={item.id}
                className="relative flex-shrink-0 snap-center min-h-[300px]"
              >
                <img
                  width={300}
                  src={item.achievementIcon}
                  alt={`成就 ${item.achievementName}`}
                  className="rounded-lg cursor-pointer"
                />
                <img
                  className="absolute left-[50%] translate-x-[-50%] bottom-[25px] w-[200px] max-w-[200px]"
                  src="https://play-test.oss-cn-hangzhou.aliyuncs.com/front-userCenter/achievementUnderImg.png"
                  alt=""
                />
                <div className="absolute left-[50%] translate-x-[-50%] bottom-0 text-sm font-semibold">
                  {item.achievementName}
                </div>
              </div>
            );
          })}
        </div>
        <CommonModal
          className="p-0 rounded-[25px]"
          visible={visible}
          width={450}
          onClose={() => setVisible(false)}
          content={
            <img
              width={450}
              src="https://play-test.oss-cn-hangzhou.aliyuncs.com/front-userCenter/achievement.png"
              alt=""
            />
          }
          footer={null}
        />
      </div>
    </div>
  );
};

export default UserAchievement;
