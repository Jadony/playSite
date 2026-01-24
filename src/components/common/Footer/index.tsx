import React from 'react'
import { Layout } from 'antd'
import {
  GithubOutlined,
  WechatOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons'
import './style.css'

const { Footer: AntFooter } = Layout

const Footer: React.FC = () => {
  return (
    <AntFooter className="game-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>关于我们</h3>
            <ul>
              <li><a href="#about">平台介绍</a></li>
              <li><a href="#terms">服务条款</a></li>
              <li><a href="#privacy">隐私政策</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>帮助中心</h3>
            <ul>
              <li><a href="#faq">常见问题</a></li>
              <li><a href="#guide">充值指南</a></li>
              <li><a href="#refund">退款说明</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>联系我们</h3>
            <div className="footer-social">
              <a href="#" className="social-link">
                <CustomerServiceOutlined /> 在线客服
              </a>
              <a href="#" className="social-link">
                <WechatOutlined /> 微信客服
              </a>
              <a href="#" className="social-link">
                <GithubOutlined /> GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2024 游戏充值平台. All rights reserved.
          </div>
          <div className="footer-badges">
            <span className="badge">🔒 安全认证</span>
            <span className="badge">⚡ 即时到账</span>
            <span className="badge">🎁 优惠多多</span>
          </div>
        </div>
      </div>
    </AntFooter>
  )
}

export default Footer
