import React, { useState } from "react";
import { message, Modal } from "antd";
import { CloseOutlined, AppleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import EmailCheckGroup from "./EmailCheckGroup";
import SignEmailGroup from "./SignEmailGroup";
import SetPWDGroup from "./SetPWDGroup";
import LoginGroup from "./LoginGroup";
import GoogleLoginGroup from "./GoogleLoginGroup";
import LeaveModal from "./LeaveModal";
import "./style.css";
import { useAuthContext } from "@/store/authStore";
import { emailCodeCheck, existEmail } from "@/api/user";

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
    frontBg:
      "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/emailSearchFrontBg.png",
    behindBg:
      "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/emailSearchBehindBg.png",
  },
  emailUnSearch: {
    frontBg:
      "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/emailUnSearchFrontBg.png",
    behindBg:
      "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/emailSearchBehindBg.png",
  },
  setNewPwd: {
    frontBg:
      "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/emailUnSearchFrontBg.png",
    behindBg:
      "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/emailSearchBehindBg.png",
  },
  login: {
    frontBg:
      "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/loginFrontBg.png",
    behindBg:
      "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/emailSearchBehindBg.png",
  },
  googleLogin: {
    frontBg:
      "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/loginFrontBg.png",
    behindBg:
      "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/emailSearchBehindBg.png",
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
      if (data.data.exist) {
        setAccount(email);
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
      console.log(error);
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
          window.location.reload();
          onClose?.();
        },
      );
    } catch (error) {
      message.error("error");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async (jwtToken: string) => {
    try {
      setLoading(true);
      const userInfo = jwtDecode<{
        email: string;
        sub: string;
        picture: string;
      }>(jwtToken);

      await loginWithGoogle({
        accessToken: jwtToken,
        googleId: userInfo.sub,
        email: userInfo.email,
        avatar: userInfo.picture,
        inviteCode: invitationCode,
      });
      initState();
      onClose?.();
    } catch (error) {
      message.error("error");
    } finally {
      setLoading(false);
    }
  };

  const leaveModalOnClose = (isContinue: boolean) => {
    setLeaveModalVisible(false);
    if (!isContinue) {
      initState();
      onClose?.();
    }
  };

  return (
    <>
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
                  "--frontBg": `url('${bgType[currentType].frontBg}')`,
                  "--behindBg": `url('${bgType[currentType].behindBg}')`,
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
              <div className="w-[46px] glass-gradient-border cursor-pointer rounded-full">
                <svg
                  width="46"
                  height="46"
                  viewBox="0 0 46 46"
                  fill="none"
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
                  style={{ padding: 0, border: "none", colorScheme: "light" }}
                >
                  <GoogleLogin
                    type="icon"
                    shape="circle"
                    theme="filled_black"
                    onSuccess={(res) => {
                      if (res.credential) handleLoginWithGoogle(res.credential);
                    }}
                    onError={() => {
                      message.error("Google Login Failed");
                    }}
                  />
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
      </Modal>
      <LeaveModal visible={leaveModalVisible} onClose={leaveModalOnClose} />
    </>
  );
};

export default LoginModal;
