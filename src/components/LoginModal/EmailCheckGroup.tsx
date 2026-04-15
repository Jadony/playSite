import { useTranslation } from "react-i18next";
import Input from "./Input";
import PrimaryButton from "../PrimaryButton";
import { useState } from "react";
import { isValidEmail } from "@/utils/helpers";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface EmailCheckGroupProps {
  loading: boolean;
  email: string;
  invitationCode: string;
  setEmail: (email: string) => void;
  setInvitationCode: (invitationCode: string) => void;
  handleSearchEmail: () => void;
}

const EmailCheckGroup: React.FC<EmailCheckGroupProps> = ({
  loading,
  email,
  invitationCode,
  setEmail,
  setInvitationCode,
  handleSearchEmail,
}) => {
  const { t } = useTranslation();
  const [emailError, setEmailError] = useState("");

  const checkIsValidEmail = () => {
    if (isValidEmail(email)) {
      setEmailError("");
      handleSearchEmail();
    } else {
      setEmailError(t("loginOrSignUpModal.pleaseEnterValidEmailAddress"));
    }
  };
  return (
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
        {emailError && (
          <div className="mb-3.5">
            <p className="text-red-500">{emailError}</p>
          </div>
        )}
        <div>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setInvitationCode(e.target.value);
            }}
            value={invitationCode}
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
      <PrimaryButton
        disabled={loading}
        onClick={checkIsValidEmail}
        fontSize="16px"
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

export default EmailCheckGroup;
