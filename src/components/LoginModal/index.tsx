import React, { useState } from "react";
import { message, Modal } from "antd";
import {
  CloseOutlined,
  GoogleOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useGoogleLogin } from "@react-oauth/google";
import emailSearchBehindBg from "@/assets/background/emailSearchBehindBg.png";
import emailSearchFrontBg from "@/assets/background/emailSearchFrontBg.png";
import emailUnSearchFrontBg from "@/assets/background/emailUnSearchFrontBg.png";
import loginFrontBg from "@/assets/background/loginFrontBg.png";
import EmailCheckGroup from "./EmailCheckGroup";
import SignEmailGroup from "./SignEmailGroup";
import SetPWDGroup from "./SetPWDGroup";
import LoginGroup from "./LoginGroup";
import GoogleLoginGroup from "./GoogleLoginGroup";
import LeaveModal from "./LeaveModal";
import "./style.css";
import { useAuthContext } from "@/store/authStore";
import { emailCodeCheck, existEmail, getGoogleUserInfo } from "@/api/user";

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
  emailSearch: {
    frontBg: emailSearchFrontBg,
    behindBg: emailSearchBehindBg,
  },
  emailUnSearch: {
    frontBg: emailUnSearchFrontBg,
    behindBg: emailSearchBehindBg,
  },
  setNewPwd: {
    frontBg: emailUnSearchFrontBg,
    behindBg: emailSearchBehindBg,
  },
  login: {
    frontBg: loginFrontBg,
    behindBg: emailSearchBehindBg,
  },
  googleLogin: {
    frontBg: loginFrontBg,
    behindBg: emailSearchBehindBg,
  },
};

const LoginModal: React.FC<LoginModalProps> = ({ visible, onClose }) => {
  const [email, setEmail] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [currentType, setCurrentType] = useState("emailSearch");
  const [verificationCode, setVerificationCode] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [account, setAccount] = useState("");
  const [accountPwd, setAccountPwd] = useState("");
  const [leaveModalVisible, setLeaveModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { registerEmailLogin, login, loginWithGoogle } = useAuthContext();
  const { t } = useTranslation();

  const initState = () => {
    setEmail("");
    setInvitationCode("");
    setCurrentType("emailSearch");
    setVerificationCode("");
    setPwd("");
    setConfirmPwd("");
  };

  const goToLogin = () => {
    setCurrentType("login");
  };

  const handleSearchEmail = async () => {
    try {
      setLoading(true);
      const { data } = await existEmail({ email });
      if (data.data.data) {
        if (data.data.fetchGoogle) {
          setCurrentType("googleLogin");
        } else {
          setCurrentType("login");
        }
      } else {
        setCurrentType("emailUnSearch");
      }
    } catch (error) {
      message.error("error");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckVerificationCode = async (
    setVerificationCodeError: (error: string) => void,
  ) => {
    try {
      setLoading(true);
      const { data } = await emailCodeCheck({
        email,
        code: verificationCode,
      });
      if (data.data) {
        setCurrentType("setNewPwd");
      } else {
        setVerificationCodeError(t("loginOrSignUpModal.verificationCodeError"));
      }
    } catch (error) {
      message.error("error");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckPWD = async () => {
    try {
      setLoading(true);
      await registerEmailLogin(
        {
          email,
          password: pwd,
          invitationCode,
        },
        () => {
          initState();
          onClose?.();
        },
      );
    } catch (error) {
      message.error("error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(
        {
          account: account,
          password: accountPwd,
        },
        () => {
          initState();
          onClose?.();
        },
      );
    } catch (error) {
      message.error("error");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const { access_token } = credentialResponse;
      try {
        const { data } = await getGoogleUserInfo({ accessToken: access_token });
        await loginWithGoogle({
          accessToken: access_token,
          googleId: data.sub,
          email: data.email,
          avatar: data.picture,
          inviteCode: invitationCode,
        });
        console.log("登录成功，未解码的用户信息:", data);
      } catch (error) {
        message.error("error");
      }
    },
    onError: () => {
      message.error("error");
    },
  });

  const leaveModalOnClose = (isContinue: boolean) => {
    if (!isContinue) {
      initState();
      onClose?.();
    }
    setLeaveModalVisible(false);
  };

  return (
    <Modal
      open={visible}
      onCancel={() => {
        if (currentType === "emailUnSearch" || currentType === "setNewPwd") {
          setLeaveModalVisible(true);
        } else {
          initState();
          onClose?.();
        }
      }}
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
          {currentType !== "setNewPwd" && currentType !== "googleLogin" ? (
            <div className="login-logo">
              <div className="logo-icon">⚡</div>
              <span className="logo-text">LOGO</span>
            </div>
          ) : (
            <div>
              <svg
                width="46"
                height="46"
                viewBox="0 0 46 46"
                fill="none"
                className="cursor-pointer border border-white rounded-full"
                onClick={() => {
                  setCurrentType("emailSearch");
                  initState();
                }}
              >
                <rect
                  width="46"
                  height="46"
                  rx="23"
                  transform="matrix(-1 0 0 1 46 0)"
                  fill="white"
                  fill-opacity="0.1"
                />
                <path
                  d="M18.5387 23.7506L30.8874 23.7506L30.8874 22.1807L18.5387 22.1807L23.4776 17.2411L22.3669 16.1312L15.534 22.9656L22.3685 29.8001L23.4791 28.6902L18.5387 23.7506Z"
                  fill="white"
                />
              </svg>
            </div>
          )}

          {/* Form Inputs */}
          {currentType === "emailSearch" && (
            <EmailCheckGroup
              loading={loading}
              email={email}
              invitationCode={invitationCode}
              setEmail={setEmail}
              setInvitationCode={setInvitationCode}
              handleSearchEmail={handleSearchEmail}
            />
          )}
          {currentType === "emailUnSearch" && (
            <SignEmailGroup
              loading={loading}
              email={email}
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              handleCheckVerificationCode={handleCheckVerificationCode}
            />
          )}
          {currentType === "setNewPwd" && (
            <SetPWDGroup
              loading={loading}
              email={email}
              pwd={pwd}
              setPwd={setPwd}
              confirmPwd={confirmPwd}
              setConfirmPwd={setConfirmPwd}
              handleCheckPWD={handleCheckPWD}
            />
          )}
          {currentType === "login" && (
            <LoginGroup
              loading={loading}
              account={account}
              accountPwd={accountPwd}
              setAccount={setAccount}
              setAccountPwd={setAccountPwd}
              handleLogin={handleLogin}
            />
          )}
          {currentType === "googleLogin" && (
            <GoogleLoginGroup
              loading={loading}
              email={email}
              handleLoginWithGoogle={handleLoginWithGoogle}
            />
          )}
          {currentType !== "login" && currentType !== "googleLogin" && (
            <div className="text-white text-center text-sm mt-4">
              {t("loginOrSignUpModal.alreadyHaveAnAccount")}
              <span
                className="text-[#B706FA] cursor-pointer underline"
                onClick={goToLogin}
              >
                {t("loginOrSignUpModal.login")}
              </span>
            </div>
          )}
          {/* Social Login Icons */}
          {currentType !== "googleLogin" && (
            <div className="social-login mt-8">
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
          )}

          {/* Terms */}
          <div className="terms text-center text-xs mt-4">
            <span className="terms-text text-white">
              {t(
                "loginOrSignUpModal.byRegisteringAnAccountOrLoggingInYouAgreeToThePrivacyPolicyTermsOfServiceCookiePlicy",
              )}
            </span>
          </div>
        </div>
      </div>
      <LeaveModal visible={leaveModalVisible} onClose={leaveModalOnClose} />
    </Modal>
  );
};

export default LoginModal;
