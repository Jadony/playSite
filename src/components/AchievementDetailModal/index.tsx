import { useEffect, useId } from "react";
import CommonModal from "../CommonModal";
import { formatAchievementTitle } from "@/utils/formatAchievementTitle";

export interface AchievementDetailModalProps {
  visible: boolean;
  onClose: () => void;
  curAchievement: UserAchievementsResponseData;
}

const AchievementDetailModal = ({
  visible,
  onClose,
  curAchievement,
}: AchievementDetailModalProps) => {
  const titleId = useId();
  const {
    achievementBody,
    achievementName,
    achievementTitle,
    invertedImgUrl,
    achievementDesc,
    bigImgUrl,
    needImgUrl,
  } = curAchievement;

  useEffect(() => {
    if (!visible) return;
    const { overflow, paddingRight } = document.body.style;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const currentPadding =
      parseFloat(getComputedStyle(document.body).paddingRight) || 0;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [visible]);

  return (
    <CommonModal
      className="!w-[595px] !max-w-[calc(100vw-32px)] !max-h-[calc(100dvh-24px)] !rounded-none !bg-transparent !p-0 !shadow-none !backdrop-blur-none [scrollbar-width:thin]"
      visible={visible}
      width={595}
      showClose={false}
      onClose={onClose}
      footer={null}
      content={
        <>
          <article
            className="relative isolate overflow-hidden min-h-[735px] rounded-[20px] text-white"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <img
              className="pointer-events-none absolute inset-0 -z-[1] h-full w-full select-none object-fill"
              src={bigImgUrl}
              alt=""
              aria-hidden="true"
            />
            <header className="px-3 pt-[18px] text-center">
              <h2
                id={titleId}
                className="relative inline-block bg-[linear-gradient(105deg,#e6cca0_0%,#fff3d3_38%,#fffdf4_75%)] bg-clip-text text-[26px] font-extrabold italic leading-8 text-transparent"
              >
                <img
                  className="pointer-events-none absolute left-1/2 -top-[15px] w-[62px] max-w-none -translate-x-1/2"
                  src="https://play-test.oss-cn-hangzhou.aliyuncs.com/front-userCenter/image%201323998.png"
                  alt=""
                />
                {achievementName}
              </h2>
              <p className="text-xs font-light leading-5 text-[#b2afb1]">
                {achievementDesc}
              </p>
            </header>
            <div className="relative mx-auto mt-[11px] h-[396px] w-[230px]">
              <img
                className="relative z-[1] h-[354px] w-[230px] object-contain"
                src={needImgUrl}
                alt={achievementName}
              />
              <img
                className="pointer-events-none absolute left-1/2 top-[315px] h-[176px] w-[314px] max-w-none -translate-x-1/2 opacity-70"
                src={invertedImgUrl}
                alt=""
              />
            </div>
            <div className="relative px-[27px] pb-7 max-[480px]:px-5 max-[480px]:pb-[26px]">
              <h3 className="mb-2.5 whitespace-pre-line bg-[linear-gradient(100deg,#919191,#fff_62%)] bg-clip-text text-2xl font-extrabold leading-[29px] tracking-[-0.55px] text-transparent max-[480px]:text-[21px] max-[480px]:leading-[27px]">
                {formatAchievementTitle(achievementTitle)}
              </h3>
              <p className="m-0 text-xs font-light leading-5 text-[#b5b3b6]">
                {achievementBody}
              </p>
            </div>
          </article>
          <button
            type="button"
            className="mx-auto mt-2.5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent p-2.5 hover:bg-[#ffffff1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-[-2px]"
            aria-label="Close achievement details"
            onClick={onClose}
          >
            <img
              className="h-6 w-6 brightness-200"
              src="https://play-test.oss-cn-hangzhou.aliyuncs.com/front-userCenter/%E5%85%B3%E9%97%AD.svg"
              alt=""
            />
          </button>
        </>
      }
    />
  );
};

export default AchievementDetailModal;
