import React from "react";
import { Layout } from "antd";
import faceBook from "@assets/footerIcon/facebook-02.svg";
import linkedIn from "@assets/footerIcon/linkedin-02.svg";
import telegram from "@assets/footerIcon/telegram.svg";
import threads from "@assets/footerIcon/threads.svg";
import { useTranslation } from "react-i18next";
import "./style.css";

const { Footer: AntFooter } = Layout;

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <AntFooter className="game-footer">
      <div className="footer-container">
        {/* Left Section: Logo & Socials */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-text">LOGO</span>
          </div>

          <div className="footer-social">
            <a href="#" className="social-icon">
              <img src={faceBook} alt="" />
            </a>
            <a href="#" className="social-icon">
              <img src={linkedIn} alt="" />
            </a>
            <a href="#" className="social-icon">
              <img src={telegram} alt="" />
            </a>
            <a href="#" className="social-icon">
              <img src={threads} alt="" />
            </a>
          </div>
        </div>

        {/* Right Section: Link Columns */}
        <div className="footer-links">
          <div className="footer-column">
            <h3>{t("footer.product")}</h3>
            <ul>
              <li>
                <a href="#">{t("footer.features")}</a>
              </li>
              <li>
                <a href="#">{t("footer.pricing")}</a>
              </li>
              <li>
                <a href="#">{t("footer.integrations")}</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>{t("footer.company")}</h3>
            <ul>
              <li>
                <a href="#">{t("footer.aboutUs")}</a>
              </li>
              <li>
                <a href="#">{t("footer.blog")}</a>
              </li>
              <li>
                <a href="#">{t("footer.contact")}</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>{t("footer.resources")}</h3>
            <ul>
              <li>
                <a href="#">{t("footer.privacyPolicy")}</a>
              </li>
              <li>
                <a href="#">{t("footer.termsOfService")}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
