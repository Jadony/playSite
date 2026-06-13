/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-02-10 18:20:03
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-06-13 17:39:48
 * @FilePath: /playSite/src/components/AccountSetting/InfoBox.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";

type InfoBoxProps = {
  label: string;
  value?: React.ReactNode | string;
  rightEl?: React.ReactNode | string;
  rightBtnClick?: () => void;
};

const InfoBox: React.FC<InfoBoxProps> = ({
  label,
  value,
  rightEl = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M16.1564 6.51808C16.5112 6.16336 16.7105 5.68222 16.7106 5.18051C16.7107 4.6788 16.5114 4.19762 16.1567 3.84281C15.802 3.488 15.3208 3.28864 14.8191 3.28857C14.3174 3.28851 13.8362 3.48775 13.4814 3.84247L4.52515 12.8008C4.36934 12.9561 4.25411 13.1474 4.18961 13.3578L3.30311 16.2783C3.28577 16.3363 3.28446 16.398 3.29932 16.4567C3.31418 16.5154 3.34466 16.569 3.38753 16.6118C3.4304 16.6546 3.48405 16.685 3.54279 16.6998C3.60154 16.7146 3.66319 16.7132 3.7212 16.6957L6.64242 15.8099C6.85258 15.746 7.04384 15.6314 7.19942 15.4764L16.1564 6.51808Z"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.0137 5.30176L14.698 7.98609"
        stroke="white"
        strokeOpacity="0.5"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  rightBtnClick,
}) => {
  return (
    <div className="min-w-[440px] max-w-[440px] h-12 flex justify-between items-center py-2 px-5 bg-white/10 rounded-[10px] text-white flex-1">
      <div>{label}</div>
      <div className="flex justify-between items-center">
        <div className="mr-2.5 font-semibold">{value}</div>
        <div className="cursor-pointer" onClick={rightBtnClick}>
          {rightEl}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
