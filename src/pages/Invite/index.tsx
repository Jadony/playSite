import React, { useEffect, useState } from "react";
import { Input, message } from "antd";
import { useTranslation } from "react-i18next";
import PrimaryButton from "@components/PrimaryButton";
import "./style.css";
import { useAuthContext } from "@/store/authStore";
import { getInviteActivity } from "@/api/user";
import LoginModal from "@/components/LoginModal";

const Invite: React.FC = () => {
  const { t } = useTranslation();
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [inviteActivityData, setInviteActivityData] =
    useState<GetInviteActivity>();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      getInviteActivity().then((res) => {
        const { data } = res;
        const { data: inviteActivity } = data;
        setInviteActivityData(inviteActivity);
      });
    }
  }, [isAuthenticated]);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteActivityData?.inviteCode || "");
    message.success(t("inviteFriends.invitationCodeCopySuccess"));
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
              src="https://play-test.oss-cn-hangzhou.aliyuncs.com/front-invite/invitePNG.png"
              alt="Fist Bump"
              className="fist-image"
            />
          </div>

          {/* 主标题 */}
          <div className="invite-title">{t("inviteFriends.subTitle")}</div>

          {/* 邀请码输入框 */}
          <div className="invite-code-section">
            {isAuthenticated ? (
              <div className="invite-code-wrapper">
                <Input
                  value={inviteActivityData?.inviteCode}
                  readOnly
                  size="large"
                  className="invite-code-input"
                />
                <button className="copy-button" onClick={handleCopy}>
                  {t("inviteFriends.copy")}
                </button>
              </div>
            ) : (
              <PrimaryButton
                fontSize="16px"
                onClick={() => setLoginModalVisible(true)}
              >
                {t("loginOrSignUpModal.logIn")}
              </PrimaryButton>
            )}
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
          <div className="current-count">
            {isAuthenticated ? inviteActivityData?.totalInviteCount : 0}
          </div>
          <h2 className="milestones-title">
            {t("inviteFriends.friendsInvited")}
          </h2>

          {/* 用户头像 - 只显示已邀请的 */}
          <div className="invited-users">
            {inviteActivityData?.invitedUsers.map((user) => (
              <div key={user.userId} className="user-avatar">
                <img src={user.avatar} alt="" />
              </div>
            ))}
          </div>

          {/* Invitation 按钮 */}
          <div className="invite-button-container">
            <PrimaryButton
              className="invite-button"
              fontSize="16px"
              onClick={handleCopy}
              disabled={!isAuthenticated}
            >
              {t("inviteFriends.invitation")}
            </PrimaryButton>
          </div>

          {/* 里程碑奖励 */}
          <div className="reward-milestones">
            {inviteActivityData?.rewardProgress.map((milestone, index) => {
              // 计算连接线的进度百分比
              let progress = 0;
              if (index < inviteActivityData?.rewardProgress.length - 1) {
                const currentMilestone = milestone.targetCount;
                const nextMilestone =
                  inviteActivityData?.rewardProgress[index + 1].targetCount;

                if (inviteActivityData?.totalInviteCount >= nextMilestone) {
                  // 已完成，100%
                  progress = 100;
                } else if (
                  inviteActivityData?.totalInviteCount <= currentMilestone
                ) {
                  // 未开始，0%
                  progress = 0;
                } else {
                  // 进行中，计算百分比
                  progress =
                    ((inviteActivityData?.totalInviteCount - currentMilestone) /
                      (nextMilestone - currentMilestone)) *
                    100;
                }
              }

              return (
                <React.Fragment key={milestone.targetCount}>
                  <div
                    className={`milestone-item ${milestone.achieved ? "unlocked" : "locked"}`}
                  >
                    <img
                      src={
                        milestone.achieved
                          ? "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-invite/bright.png"
                          : "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-invite/dark.png"
                      }
                      alt={`${milestone.targetCount} users`}
                      className="milestone-image"
                    />
                    <div className="milestone-count">
                      {milestone.targetCount}
                    </div>
                    <div className="milestone-reward">
                      {milestone.rewardDesc}
                    </div>
                  </div>
                  {index < inviteActivityData?.rewardProgress.length - 1 && (
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
      <LoginModal
        visible={loginModalVisible}
        onClose={() => setLoginModalVisible(false)}
      />
    </div>
  );
};

export default Invite;
