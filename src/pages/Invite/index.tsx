import React, { useState } from 'react';
import { Input } from 'antd';
import PrimaryButton from '@components/PrimaryButton';
import './style.css';

// 用户头像图片（这里用颜色模拟，实际可替换为真实头像）
const userAvatars = [
  { color: '#4CAF50', emoji: '👤' },
  { color: '#2196F3', emoji: '👤' },
  { color: '#9C27B0', emoji: '👤' },
  { color: '#FF9800', emoji: '👤' },
];

const Invite: React.FC = () => {
  const [inviteCode] = useState('245KNFSHJNJK');
  const [invitedCount] = useState(4);

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    console.log('邀请码已复制');
  };

  const steps = [
    { number: 1, text: 'Share your invite code with friends' },
    { number: 2, text: 'Friends enter it on signup → Both get discount coupons' },
    { number: 3, text: 'Unlock a free coupon on their first order' },
  ];

  const milestones = [
    { count: 1, reward: '5% coupon', unlocked: true },
    { count: 3, reward: '5% coupon', unlocked: true },
    { count: 5, reward: '5% coupon', unlocked: false },
    { count: 10, reward: '5% coupon', unlocked: false },
  ];

  return (
    <div className="invite-page">
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
          <img
            src="/src/assets/invite/invite_text.png"
            alt="Invite friends to unlock discounted gift packages and cash rewards"
            className="invite-title"
            width="900"
            height="136"
          />

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
                Copy
              </button>
            </div>
          </div>

          {/* 三个步骤 */}
          <div className="invite-steps">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="invite-step">
                  <div className="step-number">{step.number}</div>
                  <div className="step-text">{step.text}</div>
                </div>
                {index < steps.length - 1 && (
                  <div className="step-arrow">
                    <img src="/src/assets/invite/arrow.png" alt="arrow" className="arrow-icon" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Milestones Section */}
        <div className="milestones-section">
          {/* 邀请人数 */}
          <div className="current-count">{invitedCount}</div>
          <h2 className="milestones-title">Cumulative number of invited users</h2>

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
              onClick={() => console.log('邀请好友')}
            >
              Invitation
            </PrimaryButton>
          </div>

          {/* 里程碑奖励 */}
          <div className="reward-milestones">
            {milestones.map((milestone, index) => (
              <React.Fragment key={milestone.count}>
                <div className={`milestone-item ${milestone.unlocked ? 'unlocked' : 'locked'}`}>
                  <img
                    src={milestone.unlocked ? '/src/assets/invite/bright.png' : '/src/assets/invite/dark.png'}
                    alt={`${milestone.count} users`}
                    className="milestone-image"
                  />
                  <div className="milestone-count">{milestone.count}</div>
                  <div className="milestone-reward">{milestone.reward}</div>
                </div>
                {index < milestones.length - 1 && (
                  <div className={`milestone-connector ${
                    milestone.unlocked && milestones[index + 1]?.unlocked ? 'active' : ''
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invite;
