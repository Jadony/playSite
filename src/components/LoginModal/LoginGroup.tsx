import Input from "./Input";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../PrimaryButton";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface LoginGroupProps {
  loading: boolean;
  account: string;
  accountPwd: string;
  setAccount: (account: string) => void;
  setAccountPwd: (accountPwd: string) => void;
  handleLogin: () => void;
}

const LoginGroup: React.FC<LoginGroupProps> = ({
  loading,
  account,
  accountPwd,
  setAccount,
  setAccountPwd,
  handleLogin,
}) => {
  const [loginError, setLoginError] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (account && accountPwd) {
      setLoginError("");
      return;
    }
    if (!account) {
      setLoginError(t("loginOrSignUpModal.pleaseEnterAccount"));
      return;
    }
    if (!accountPwd) {
      setLoginError(t("loginOrSignUpModal.pleaseEnterPassword"));
      return;
    }
  }, [account, accountPwd]);
  return (
    <div className="login-form mt-14">
      <div className="">
        <div className="mb-3.5">
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAccount(e.target.value);
            }}
            value={account}
            placeholder={t(
              "loginOrSignUpModal.pleaseEnterEmailAddressOrNickname",
            )}
            svgEl={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M9.99992 10.8333C12.3011 10.8333 14.1666 8.96785 14.1666 6.66667C14.1666 4.36548 12.3011 2.5 9.99992 2.5C7.69873 2.5 5.83325 4.36548 5.83325 6.66667C5.83325 8.96785 7.69873 10.8333 9.99992 10.8333Z"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.6666 17.5002C16.6666 15.7321 15.9642 14.0364 14.714 12.7861C13.4637 11.5359 11.768 10.8335 9.99992 10.8335C8.23181 10.8335 6.53612 11.5359 5.28587 12.7861C4.03563 14.0364 3.33325 15.7321 3.33325 17.5002"
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
              setAccountPwd(e.target.value);
            }}
            type="password"
            value={accountPwd}
            placeholder={t("loginOrSignUpModal.pleaseEnterAccountPassword")}
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
        {loginError && (
          <div className="mt-3.5 text-center">
            <p className="text-red-500">{loginError}</p>
          </div>
        )}
      </div>
      <PrimaryButton
        disabled={!!loginError || loading}
        onClick={handleLogin}
        fontSize="14px"
      >
        <Spin
          indicator={<LoadingOutlined spin />}
          spinning={loading}
          size="large"
        >
          {t("loginOrSignUpModal.login")}
        </Spin>
      </PrimaryButton>
    </div>
  );
};

export default LoginGroup;
