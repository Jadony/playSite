import React, { useState } from "react";
import { Input } from "antd";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@components/PrimaryButton";
import "./style.css";

// 用户头像图片（这里用颜色模拟，实际可替换为真实头像）
const userAvatars = [
  { color: "#4CAF50", emoji: "👤" },
  { color: "#2196F3", emoji: "👤" },
  { color: "#9C27B0", emoji: "👤" },
  { color: "#FF9800", emoji: "👤" },
];

const Invite: React.FC = () => {
  const { t } = useTranslation();
  const [inviteCode] = useState("245KNFSHJNJK");
  const [invitedCount] = useState(4);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    alert(t("inviteFriends.copySuccess"));
  };

  const steps = [
    {
      number: 1,
      text: t("inviteFriends.sendInvitationCodeToFriends"),
    },
    {
      number: 2,
      text: t(
        "inviteFriends.friendsEnterTheInvitationCodeWhenSigningUpAndCompleteRegistration",
      ),
    },
    {
      number: 3,
      text: t(
        "inviteFriends.uponSuccessfulRegistrationBothPartiesWillReceiveDiscountCoupons",
      ),
    },
  ];

  // 根据当前邀请用户数动态计算里程碑解锁状态
  const milestones = [
    {
      count: 1,
      reward: `5% ${t("inviteFriends.coupon")}`,
      unlocked: invitedCount >= 1,
    },
    {
      count: 3,
      reward: `5% ${t("inviteFriends.coupon")}`,
      unlocked: invitedCount >= 3,
    },
    {
      count: 5,
      reward: `5% ${t("inviteFriends.coupon")}`,
      unlocked: invitedCount >= 5,
    },
    {
      count: 10,
      reward: `5% ${t("inviteFriends.coupon")}`,
      unlocked: invitedCount >= 10,
    },
  ];

  return (
    <div className="invite-page">
      <div className="stars-space">
        <div className="star star-a"></div>
        <div className="star star-b"></div>
        <div className="star star-c"></div>
        <div className="star star-d"></div>
        <div className="star star-e"></div>
        <div className="star star-f"></div>
      </div>
      <div className="invite-container">
        {/* Hero Section */}
        <div className="invite-hero">
          {/* 握手图片 */}
          <div className="fist-image-container">
            <img
              src="/src/assets/invite/fist.png"
              alt="Fist Bump"
              className="fist-image"
            />
          </div>

          {/* 主标题 */}
          <div className="invite-title">{t("inviteFriends.subTitle")}</div>

          {/* 邀请码输入框 */}
          <div className="invite-code-section">
            <div className="invite-code-wrapper">
              <Input
                value={inviteCode}
                readOnly
                size="large"
                className="invite-code-input"
              />
              <button className="copy-button" onClick={handleCopy}>
                {t("inviteFriends.copy")}
              </button>
            </div>
          </div>

          {/* 三个步骤 */}
          <div className="invite-steps">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div
                  className={
                    index === 0 ? "invite-step first-step" : "invite-step"
                  }
                >
                  <div className="step-number">
                    <span className="step-number-text">{step.number}</span>
                  </div>
                  <div className="step-text">{step.text}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className="step-arrow">
                    <img
                      src="https://play-test.oss-cn-hangzhou.aliyuncs.com/front-invite/arrow.png"
                      alt="arrow"
                      className="arrow-icon"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Milestones Section */}
        <div className="milestones-section">
          {/* 该位置放 step_bg 图（img 元素，非背景） */}
          <div className="milestones-section-bg">
            <img
              src="https://play-test.oss-cn-hangzhou.aliyuncs.com/front-invite/milestones_section_bg.png"
              alt=""
              className="milestones-section-bg-img"
            />
          </div>
          {/* 邀请人数 */}
          <div className="current-count">{invitedCount}</div>
          <h2 className="milestones-title">
            {t("inviteFriends.friendsInvited")}
          </h2>

          {/* 用户头像 - 只显示已邀请的 */}
          <div className="invited-users">
            {userAvatars.slice(0, invitedCount).map((avatar, i) => (
              <div
                key={i}
                className="user-avatar"
                style={{ backgroundColor: avatar.color }}
              >
                {avatar.emoji}
              </div>
            ))}
          </div>

          {/* Invitation 按钮 */}
          <div className="invite-button-container">
            <PrimaryButton
              className="invite-button"
              fontSize="16px"
              onClick={handleCopy}
            >
              {t("inviteFriends.invitation")}
            </PrimaryButton>
          </div>

          {/* 里程碑奖励 */}
          <div className="reward-milestones">
            {milestones.map((milestone, index) => {
              // 计算连接线的进度百分比
              let progress = 0;
              if (index < milestones.length - 1) {
                const currentMilestone = milestone.count;
                const nextMilestone = milestones[index + 1].count;

                if (invitedCount >= nextMilestone) {
                  // 已完成，100%
                  progress = 100;
                } else if (invitedCount <= currentMilestone) {
                  // 未开始，0%
                  progress = 0;
                } else {
                  // 进行中，计算百分比
                  progress =
                    ((invitedCount - currentMilestone) /
                      (nextMilestone - currentMilestone)) *
                    100;
                }
              }

              return (
                <React.Fragment key={milestone.count}>
                  <div
                    className={`milestone-item ${milestone.unlocked ? "unlocked" : "locked"}`}
                  >
                    <img
                      src={
                        milestone.unlocked
                          ? "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-invite/bright.png"
                          : "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-invite/dark.png"
                      }
                      alt={`${milestone.count} users`}
                      className="milestone-image"
                    />
                    <div className="milestone-count">{milestone.count}</div>
                    <div className="milestone-reward">{milestone.reward}</div>
                  </div>
                  {index < milestones.length - 1 && (
                    <div
                      className={`milestone-connector ${progress > 0 ? "active" : ""}`}
                      style={
                        { "--progress": `${progress}%` } as React.CSSProperties
                      }
                    ></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invite;
