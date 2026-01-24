import React, { useState } from 'react'
import { Button, Input } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import './style.css'

const Invite: React.FC = () => {
    const [inviteCode] = useState('2469DF3LhJuK')
    const [invitedCount] = useState(4)

    const handleCopy = () => {
        navigator.clipboard.writeText(inviteCode)
        // Show success message
    }

    const milestones = [
        { count: 1, reward: '5% coupon', status: 'completed' },
        { count: 3, reward: '5% coupon', status: 'completed' },
        { count: 5, reward: '5% coupon', status: 'current' },
        { count: 10, reward: '5% coupon', status: 'locked' },
    ]

    return (
        <div className="invite-page">
            <div className="invite-container">
                {/* Hero Section */}
                <div className="invite-hero">
                    <div className="invite-rewards-visual">
                        {/* Floating rewards illustration */}
                        <div className="floating-rewards">
                            <div className="reward-box gold">🎁</div>
                            <div className="reward-box purple">💎</div>
                            <div className="reward-box blue">🎫</div>
                        </div>
                    </div>

                    <h1 className="invite-title">
                        Invite friends to unlock discounted gift
                        <br />
                        packages and cash rewards
                    </h1>

                    {/* Invite Code Input */}
                    <div className="invite-code-section">
                        <Input
                            value={inviteCode}
                            readOnly
                            size="large"
                            className="invite-code-input"
                            suffix={
                                <Button
                                    type="primary"
                                    icon={<CopyOutlined />}
                                    onClick={handleCopy}
                                    className="copy-button"
                                >
                                    Copy
                                </Button>
                            }
                        />
                    </div>

                    {/* Steps */}
                    <div className="invite-steps">
                        <div className="invite-step">
                            <div className="step-icon">1️⃣</div>
                            <div className="step-content">
                                <div className="step-title">Share your invite code with friends</div>
                            </div>
                        </div>
                        <div className="step-arrow">➜</div>
                        <div className="invite-step">
                            <div className="step-icon">2️⃣</div>
                            <div className="step-content">
                                <div className="step-title">Friends enter in "Upgrade 3-item" gift discount coupons</div>
                            </div>
                        </div>
                        <div className="step-arrow">➜</div>
                        <div className="invite-step">
                            <div className="step-icon">3️⃣</div>
                            <div className="step-content">
                                <div className="step-title">Unlock a free coupon on their first order</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Milestones Section */}
                <div className="milestones-section">
                    <h2 className="milestones-title">Cumulative number of invited users</h2>

                    <div className="invited-users">
                        {Array.from({ length: invitedCount }).map((_, i) => (
                            <div key={i} className="user-avatar active">
                                <span>👤</span>
                            </div>
                        ))}
                        {Array.from({ length: 10 - invitedCount }).map((_, i) => (
                            <div key={i + invitedCount} className="user-avatar">
                                <span>👤</span>
                            </div>
                        ))}
                    </div>

                    <div className="current-count">{invitedCount}</div>

                    <Button type="primary" size="large" className="invite-button">
                        Invite now
                    </Button>

                    {/* Reward Milestones */}
                    <div className="reward-milestones">
                        {milestones.map((milestone, index) => (
                            <div key={index} className={`milestone ${milestone.status}`}>
                                <div className="milestone-icon">
                                    {milestone.status === 'completed' ? '🏆' :
                                        milestone.status === 'current' ? '📦' : '🔒'}
                                </div>
                                <div className="milestone-count">{milestone.count}</div>
                                <div className="milestone-reward">{milestone.reward}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invite
