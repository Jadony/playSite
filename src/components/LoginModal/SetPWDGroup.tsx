import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../PrimaryButton";
import Input from "./Input";
import { isPasswordValid } from "@/utils/helpers";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type SetPWDGroupProps = {
  loading: boolean;
  email: string;
  pwd: string;
  confirmPwd: string;
  setPwd: (pwd: string) => void;
  setConfirmPwd: (confirmPwd: string) => void;
  handleCheckPWD: () => void;
};
const SetPWDGroup: React.FC<SetPWDGroupProps> = ({
  loading,
  email,
  pwd,
  confirmPwd,
  setPwd,
  setConfirmPwd,
  handleCheckPWD,
}) => {
  const [pwdError, setPwdError] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (isPasswordValid(pwd) && pwd === confirmPwd) {
      setPwdError("");
      return;
    }
    if (pwd !== confirmPwd) {
      setPwdError(t("loginOrSignUpModal.pwdConfirmError"));
      return;
    }
    if (!isPasswordValid(pwd)) {
      setPwdError(t("loginOrSignUpModal.passwordPatternError"));
      return;
    }
  }, [pwd, confirmPwd]);
  return (
    <div className="login-form mt-14">
      <div className="">
        <div className="text-white text-left text-sm mb-3">
          {t("loginOrSignUpModal.mail")}
          {email}
        </div>
        <div className="mb-3.5">
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPwd(e.target.value);
            }}
            type="password"
            value={pwd}
            placeholder={t("loginOrSignUpModal.pleaseEnterPassword")}
            svgEl={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M9.99999 14.1667C10.4602 14.1667 10.8333 13.7936 10.8333 13.3333C10.8333 12.8731 10.4602 12.5 9.99999 12.5C9.53975 12.5 9.16666 12.8731 9.16666 13.3333C9.16666 13.7936 9.53975 14.1667 9.99999 14.1667Z"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.8333 8.33333H4.16667C3.24619 8.33333 2.5 9.07952 2.5 9.99999V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V9.99999C17.5 9.07952 16.7538 8.33333 15.8333 8.33333Z"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.83334 8.33334V5.83334C5.83334 4.72827 6.27233 3.66846 7.05373 2.88706C7.83513 2.10566 8.89494 1.66667 10 1.66667C11.1051 1.66667 12.1649 2.10566 12.9463 2.88706C13.7277 3.66846 14.1667 4.72827 14.1667 5.83334V8.33334"
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
              setConfirmPwd(e.target.value);
            }}
            type="password"
            value={confirmPwd}
            placeholder={t("loginOrSignUpModal.pleaseReEnterPassword")}
            svgEl={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M9.99999 14.1667C10.4602 14.1667 10.8333 13.7936 10.8333 13.3333C10.8333 12.8731 10.4602 12.5 9.99999 12.5C9.53975 12.5 9.16666 12.8731 9.16666 13.3333C9.16666 13.7936 9.53975 14.1667 9.99999 14.1667Z"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.8333 8.33333H4.16667C3.24619 8.33333 2.5 9.07952 2.5 9.99999V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V9.99999C17.5 9.07952 16.7538 8.33333 15.8333 8.33333Z"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.83334 8.33334V5.83334C5.83334 4.72827 6.27233 3.66846 7.05373 2.88706C7.83513 2.10566 8.89494 1.66667 10 1.66667C11.1051 1.66667 12.1649 2.10566 12.9463 2.88706C13.7277 3.66846 14.1667 4.72827 14.1667 5.83334V8.33334"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        </div>
        {pwdError && (
          <div className="mt-3.5 text-center">
            <p className="text-red-500">{pwdError}</p>
          </div>
        )}
      </div>
      <PrimaryButton
        disabled={!!pwdError || loading}
        onClick={handleCheckPWD}
        fontSize="14px"
      >
        <Spin
          indicator={<LoadingOutlined spin />}
          spinning={loading}
          size="large"
        >
          {t("loginOrSignUpModal.completeRegistration")}
        </Spin>
      </PrimaryButton>
    </div>
  );
};

export default SetPWDGroup;
