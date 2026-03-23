import { useEffect } from "react";
import PrimaryButton from "../PrimaryButton";
import "./style.css";

type AchievementModalProps = {
  closeRegisterModal: (isClose: boolean) => void;
};

const AchievementModal: React.FC<AchievementModalProps> = ({
  closeRegisterModal,
}) => {
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
  return (
    <div className="modal-overlay">
      <div className="achievement-modal">
        <div
          onClick={() => closeRegisterModal(true)}
          className="absolute right-[10%] top-[10%] text-[20px] text-white cursor-pointer"
        >
          x
        </div>
        <img
          className="w-[500px]"
          src="https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/achievementModalImg.png"
          alt=""
        />
        <img
          className="absolute left-[50%] translate-x-[-50%] bottom-[0px] w-[350px] max-w-[350px]"
          src="https://play-test.oss-cn-hangzhou.aliyuncs.com/front-userCenter/achievementUnderImg.png"
          alt=""
        />
        <div className="absolute bottom-[-145px] left-[50%] translate-x-[-50%]">
          <p
            className="text-4xl font-black italic text-center mb-2"
            style={{
              background:
                "linear-gradient(to right, #FACA89 25%, #FEFFE9 50%, #FFF5DB 75%, #FFFFFF 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            The Trail Blazers
          </p>
          <p className="text-base text-white text-center mb-4">
            送给内测及首批用户,后续会解锁特殊玩法与技能
          </p>
          <PrimaryButton
            onClick={() => closeRegisterModal(false)}
            className="w-[350px] max-w-[350px]"
          >
            立即注册领取
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default AchievementModal;
