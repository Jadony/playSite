import React from "react";
import { Layout } from "antd";
import {
  GithubOutlined,
  WechatOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import "./style.css";

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  return (
    <AntFooter className="game-footer">
      <div className="footer-container">
        {/* Left Section: Logo & Socials */}
        <div className="footer-brand">
          <div className="footer-logo">
            {/* Simple Logo Placeholder based on image */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="logo-icon"
            >
              <path
                d="M4 12L20 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 6L20 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M4 18L20 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="logo-text">LOGO</span>
          </div>

          <div className="footer-social">
            <a href="#" className="social-icon">
              <GithubOutlined />
            </a>
            <a href="#" className="social-icon">
              <WechatOutlined />
            </a>
            <a href="#" className="social-icon">
              <CustomerServiceOutlined />
            </a>
          </div>
        </div>

        {/* Right Section: Link Columns */}
        <div className="footer-links">
          <div className="footer-column">
            <h3>Product</h3>
            <ul>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Integrations</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
