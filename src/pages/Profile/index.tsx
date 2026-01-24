import React from 'react'
import { Card, Avatar, Descriptions, Button, Progress, Row, Col, Statistic } from 'antd'
import {
  UserOutlined,
  EditOutlined,
  TrophyOutlined,
  CrownOutlined,
  RiseOutlined,
} from '@ant-design/icons'
import './style.css'

const Profile: React.FC = () => {
  const userInfo = {
    username: '玩家12345',
    userId: 'UID: 123456789',
    email: 'player@example.com',
    phone: '138****8888',
    registerTime: '2023-06-15',
    vipLevel: 5,
    vipProgress: 65,
    totalRecharge: 1234,
    totalGems: 15680,
    rank: 128,
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <Row gutter={[24, 24]}>
          {/* 用户信息卡片 */}
          <Col xs={24} lg={16}>
            <Card className="profile-card">
              <div className="profile-header">
                <Avatar
                  size={100}
                  icon={<UserOutlined />}
                  className="profile-avatar"
                />
                <div className="profile-info">
                  <div className="profile-name">
                    <h2>{userInfo.username}</h2>
                    <div className="vip-badge">
                      <CrownOutlined /> VIP {userInfo.vipLevel}
                    </div>
                  </div>
                  <p className="profile-id">{userInfo.userId}</p>
                  <Button type="primary" icon={<EditOutlined />} size="small">
                    编辑资料
                  </Button>
                </div>
              </div>

              <div className="vip-progress-section">
                <div className="progress-header">
                  <span>VIP {userInfo.vipLevel} 进度</span>
                  <span>{userInfo.vipProgress}%</span>
                </div>
                <Progress
                  percent={userInfo.vipProgress}
                  strokeColor={{
                    '0%': '#fbbf24',
                    '100%': '#f59e0b',
                  }}
                  showInfo={false}
                />
                <p className="progress-tip">
                  再充值 ¥350 即可升级到 VIP {userInfo.vipLevel + 1}
                </p>
              </div>

              <Descriptions
                title="基本信息"
                column={2}
                className="profile-descriptions"
              >
                <Descriptions.Item label="邮箱">
                  {userInfo.email}
                </Descriptions.Item>
                <Descriptions.Item label="手机">
                  {userInfo.phone}
                </Descriptions.Item>
                <Descriptions.Item label="注册时间">
                  {userInfo.registerTime}
                </Descriptions.Item>
                <Descriptions.Item label="账号状态">
                  <span className="status-active">正常</span>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          {/* 统计卡片 */}
          <Col xs={24} lg={8}>
            <div className="stats-cards">
              <Card className="stat-mini-card">
                <Statistic
                  title="累计充值"
                  value={userInfo.totalRecharge}
                  prefix="¥"
                  valueStyle={{ color: '#6366f1' }}
                  suffix={
                    <span style={{ fontSize: 14, color: '#10b981' }}>
                      <RiseOutlined /> +12%
                    </span>
                  }
                />
              </Card>

              <Card className="stat-mini-card">
                <Statistic
                  title="钻石余额"
                  value={userInfo.totalGems}
                  valueStyle={{ color: '#a855f7' }}
                  suffix="💎"
                />
              </Card>

              <Card className="stat-mini-card">
                <Statistic
                  title="排行榜"
                  value={userInfo.rank}
                  prefix={<TrophyOutlined />}
                  valueStyle={{ color: '#fbbf24' }}
                  suffix={
                    <span style={{ fontSize: 14 }}>
                      / 10,000
                    </span>
                  }
                />
              </Card>
            </div>
          </Col>
        </Row>

        {/* VIP特权卡片 */}
        <Card className="privileges-card" title="VIP 特权">
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={8} md={6}>
              <div className="privilege-item">
                <div className="privilege-icon">🎁</div>
                <div className="privilege-text">每日礼包</div>
              </div>
            </Col>
            <Col xs={12} sm={8} md={6}>
              <div className="privilege-item">
                <div className="privilege-icon">⚡</div>
                <div className="privilege-text">充值加成</div>
              </div>
            </Col>
            <Col xs={12} sm={8} md={6}>
              <div className="privilege-item">
                <div className="privilege-icon">💰</div>
                <div className="privilege-text">专属折扣</div>
              </div>
            </Col>
            <Col xs={12} sm={8} md={6}>
              <div className="privilege-item">
                <div className="privilege-icon">👑</div>
                <div className="privilege-text">VIP标识</div>
              </div>
            </Col>
            <Col xs={12} sm={8} md={6}>
              <div className="privilege-item">
                <div className="privilege-icon">🎯</div>
                <div className="privilege-text">优先客服</div>
              </div>
            </Col>
            <Col xs={12} sm={8} md={6}>
              <div className="privilege-item">
                <div className="privilege-icon">🎨</div>
                <div className="privilege-text">专属皮肤</div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  )
}

export default Profile
