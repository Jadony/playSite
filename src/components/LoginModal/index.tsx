import React, { useState } from "react";
import { Modal } from "antd";
import {
  CloseOutlined,
  GoogleOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useGoogleLogin } from "@react-oauth/google";
import loginBehindBg from "@/assets/background/loginBehindBg.png";
import loginFrontBg from "@/assets/background/loginFrontBg.png";
import PrimaryButton from "../PrimaryButton";
import Input from "./Input";
import "./style.css";

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

type BgType = {
  [key: string]: {
    frontBg: string;
    behindBg: string;
  };
};

const bgType: BgType = {
  login: {
    frontBg: loginFrontBg,
    behindBg: loginBehindBg,
  },
};

const LoginModal: React.FC<LoginModalProps> = ({ visible, onClose }) => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [currentType, setCurrentType] = useState("login");
  const { t } = useTranslation();

  const handleLogin = () => {
    // Handle login logic here
    console.log("Login with:", { email, verificationCode });
  };

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log("登录成功，未解码的用户信息:", credentialResponse);
    },
    onError: () => {
      console.error("登录失败");
    },
  });

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closeIcon={<CloseOutlined className="text-white text-xl" />}
      className="login-modal"
      width={890}
      centered
      styles={{
        mask: { backdropFilter: "blur(8px)" },
      }}
    >
      <div className="login-modal-content">
        {/* Character Image Side */}
        <div className="login-character-side">
          <div
            className="character-image-wrapper"
            style={
              {
                "--frontBg": `url(${bgType[currentType].frontBg})`,
                "--behindBg": `url(${bgType[currentType].behindBg})`,
              } as React.CSSProperties
            }
          ></div>
        </div>

        {/* Form Side */}
        <div className="login-form-side">
          {/* Logo */}
          <div className="login-logo">
            <div className="logo-icon">⚡</div>
            <span className="logo-text">LOGO</span>
          </div>

          {/* Form Inputs */}
          <div className="login-form">
            <div className="mb-7">
              <div className="mb-3.5">
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  placeholder={t("loginOrSignUpModal.pleaseEnterEmailAddress")}
                  svgEl={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M18.3332 5.8335L10.8407 10.606C10.5864 10.7537 10.2976 10.8315 10.0036 10.8315C9.70956 10.8315 9.42076 10.7537 9.1665 10.606L1.6665 5.8335"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.6665 3.3335H3.33317C2.4127 3.3335 1.6665 4.07969 1.6665 5.00016V15.0002C1.6665 15.9206 2.4127 16.6668 3.33317 16.6668H16.6665C17.587 16.6668 18.3332 15.9206 18.3332 15.0002V5.00016C18.3332 4.07969 17.587 3.3335 16.6665 3.3335Z"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
              </div>
              <div>
                <Input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setVerificationCode(e.target.value);
                  }}
                  value={verificationCode}
                  placeholder={t("loginOrSignUpModal.invitationCode")}
                  svgEl={
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M9.02274 13.6494C8.14953 14.0907 7.16727 14.2698 6.19452 14.1651C5.22177 14.0604 4.3001 13.6764 3.54077 13.0595C2.78144 12.4425 2.2169 11.619 1.9153 10.6883C1.61369 9.75757 1.58791 8.75945 1.84107 7.8144L6.35107 9.02274C5.9098 8.14953 5.7307 7.16727 5.83537 6.19452C5.94005 5.22177 6.32404 4.3001 6.94098 3.54077C7.55793 2.78144 8.38146 2.2169 9.31218 1.9153C10.2429 1.61369 11.241 1.58791 12.1861 1.84107L10.9777 6.35107C11.8509 5.9098 12.8332 5.7307 13.806 5.83537C14.7787 5.94005 15.7004 6.32404 16.4597 6.94098C17.219 7.55793 17.7836 8.38146 18.0852 9.31218C18.3868 10.2429 18.4126 11.241 18.1594 12.1861L13.6494 10.9777C14.0907 11.8509 14.2698 12.8332 14.1651 13.806C14.0604 14.7787 13.6764 15.7004 13.0595 16.4597C12.4425 17.219 11.619 17.7836 10.6883 18.0852C9.75757 18.3868 8.75945 18.4126 7.8144 18.1594L9.02274 13.6494Z"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 10V10.0083"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
            <PrimaryButton onClick={handleLogin} fontSize="14px">
              {t("loginOrSignUpModal.login")}
            </PrimaryButton>

            {/* Social Login Icons */}
            <div className="social-login">
              <div
                className="social-icon google"
                onClick={() => handleLoginWithGoogle()}
              >
                <GoogleOutlined />
              </div>
              <div className="social-icon apple">
                <AppleOutlined />
              </div>
              <div className="social-icon">
                <span>💬</span>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="terms text-center text-xs">
              <span className="terms-text text-white">
                {t(
                  "loginOrSignUpModal.byRegisteringAnAccountOrLoggingInYouAgreeToThePrivacyPolicyTermsOfServiceCookiePlicy",
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
