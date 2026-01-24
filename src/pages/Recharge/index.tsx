import React from 'react'
import { Row, Col } from 'antd'
import RechargePanel from '@components/RechargePanel'
import './style.css'

const Recharge: React.FC = () => {
  return (
    <div className="recharge-page">
      <div className="recharge-container">
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} lg={14}>
            <RechargePanel />
          </Col>

          <Col xs={24} lg={10}>
            <div className="recharge-showcase">
              <div className="showcase-title">
                <h2>充值即可获得</h2>
                <p>解锁更多精彩内容</p>
              </div>

              {/* Spine角色展示 - 实际项目中替换为真实Spine资源 */}
              <div className="showcase-character">
                <div className="character-display">
                  <div className="character-placeholder-large">
                    <div className="glow-effect"></div>
                    <div className="character-icon">⚔️</div>
                  </div>
                </div>
                {/* <SpineCharacter
                  spineDataUrl="/assets/spine/character_win.json"
                  width={350}
                  height={450}
                  animation="win"
                /> */}
              </div>

              <div className="showcase-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">💎</span>
                  <span className="benefit-text">钻石可用于购买道具</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">⚔️</span>
                  <span className="benefit-text">解锁专属角色皮肤</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🏆</span>
                  <span className="benefit-text">提升战斗力和等级</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Recharge
