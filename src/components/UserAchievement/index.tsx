import userAchievementImg from "@/assets/userPanel/achievementImg.png";
import userAchievementUnderImg from "@/assets/userPanel/achievementUnderImg.png";
import achievementImg from "@/assets/userPanel/achievement.png";
import CommonModal from "../CommonModal";
import { useState } from "react";

const UserAchievement = () => {
  const [visible, setVisible] = useState(false);
  // 模拟数据，你可以替换成真实的数据
  const achievements = [
    { id: 1, img: userAchievementImg, underImg: userAchievementUnderImg },
    { id: 2, img: userAchievementImg, underImg: userAchievementUnderImg },
    { id: 3, img: userAchievementImg, underImg: userAchievementUnderImg },
    // { id: 4, img: userAchievementImg, underImg: userAchievementUnderImg },
    // { id: 5, img: userAchievementImg, underImg: userAchievementUnderImg },
    // { id: 6, img: userAchievementImg, underImg: userAchievementUnderImg },
  ];

  return (
    <div>
      {/* 外层容器：固定宽度，隐藏超出部分 */}
      <div className="relative max-w-[945px] top-[-20px]">
        {/* 滚动容器 */}
        <div className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory">
          {achievements.map((item) => (
            <div
              onClick={() => setVisible(true)}
              key={item.id}
              className="relative flex-shrink-0 snap-center min-h-[300px]" // 关键：防止卡片被压缩
            >
              <img
                width={300}
                src={item.img}
                alt={`成就 ${item.id}`}
                className="rounded-lg cursor-pointer"
              />
              <img
                className="absolute left-[50%] translate-x-[-50%] bottom-[25px] w-[200px] max-w-[200px]"
                src={item.underImg}
                alt=""
              />
              <div className="absolute left-[50%] translate-x-[-50%] bottom-0 text-sm font-semibold">
                123123
              </div>
            </div>
          ))}
        </div>
        <CommonModal
          className="p-0 rounded-[14px]"
          visible={visible}
          width={500}
          onClose={() => setVisible(false)}
          content={<img width={500} src={achievementImg} alt="" />}
          footer={null}
        />
      </div>
    </div>
  );
};

export default UserAchievement;
