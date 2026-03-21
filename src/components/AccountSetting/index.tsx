import { useTranslation } from "react-i18next";
import InfoBox from "./InfoBox";
import CommonModal from "../CommonModal";
import { useState, useRef, useEffect, useMemo } from "react";
import {
  useLanguageContext,
  useLanguageDispatchContext,
} from "@/store/languageStore";
import PrimaryButton from "../PrimaryButton";
import { DatePicker, DatePickerProps, message, Upload } from "antd";
import { isPasswordValid, isValidEmail } from "@/utils/helpers";
import {
  bindEmail,
  emailCodeCheck,
  sendEmailCode,
  setNewPassword,
  updateUserInfo,
} from "@/api/user";
import dayjs, { Dayjs } from "dayjs";
import { UploadChangeParam } from "antd/es/upload";

type AccountSettingProps = {
  getUserAllInfo: () => void;
  userData: {
    userInfo?: UserInfoResponseData;
    gender: string;
  };
};

const AccountSetting = ({ getUserAllInfo, userData }: AccountSettingProps) => {
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [editBirthdayModalVisible, setEditBirthdayModalVisible] =
    useState(false);
  const [birthday, setBirthday] = useState<Dayjs>();
  const [name, setName] = useState("");
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPasswordModalVisible, setNewPasswordModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);
  const [changePasswordCode, setChangePasswordCode] = useState("");
  const { t, i18n } = useTranslation();
  const [showLang, setShowLang] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const { userInfo, gender } = userData;

  const langRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("token");

  const { selectLanguage, unitAndLanguageList, selectUnit } =
    useLanguageContext();
  const languageDispatch = useLanguageDispatchContext();

  const genderMap = useMemo(() => {
    return [
      { value: "male", label: t("userCenter.male") },
      { value: "female", label: t("userCenter.female") },
      { value: "other", label: t("userCenter.other") },
    ];
  }, []);

  const initState = () => {
    setName("");
    setEmail("");
    setVerificationCode("");
    setPassword("");
    setConfirmPassword("");
    setChangePasswordCode("");
  };

  const editProfile = () => {
    setEditProfileModalVisible(true);
  };

  const selectGenderClick = () => {
    setGenderModalVisible(true);
  };

  const changeBirthdayClick = () => {
    setEditBirthdayModalVisible(true);
  };

  const changeEmailClick = () => {
    setEmailModalVisible(true);
  };

  const setNewPasswordClick = () => {
    setNewPasswordModalVisible(true);
  };

  const changePasswordClick = () => {
    setChangePasswordModalVisible(true);
  };

  const sendEmailCodeClick = async () => {
    if (countDown > 0) {
      return;
    }
    if (!isValidEmail(userInfo?.email || "")) {
      message.error("Please enter your email");
      return;
    }
    try {
      const { data } = await sendEmailCode({ email: userInfo?.email || "" });
      if (data.data) {
        message.success("success");
        setCountDown(60);
      }
    } catch (error) {
      message.error("error");
    }
  };

  useEffect(() => {
    if (countDown > 0) {
      const timer = setInterval(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [countDown]);

  useEffect(() => {
    getUserAllInfo();
  }, []);

  const updateNormalInfo = async (
    params: UpdateUserInfoRequestParams,
    callback?: () => void,
  ) => {
    try {
      const { data } = await updateUserInfo(params);
      if (data.data) {
        message.success("success");
        getUserAllInfo();
        initState();
        callback?.();
      } else {
        message.error("error");
      }
    } catch (error) {
      message.error("error");
    }
  };

  const updatePassword = async () => {
    try {
      const { data } = await setNewPassword({
        newPassword: password,
        confirmPassword: confirmPassword,
        code: changePasswordCode,
      });
      if (data.data) {
        message.success("success");
        getUserAllInfo();
        initState();
        setChangePasswordModalVisible(false);
      } else {
        message.error("error");
      }
    } catch (error) {
      message.error("error");
    }
  };

  const changeEmail = async () => {
    try {
      const { data } = await bindEmail({
        email,
        code: verificationCode,
      });
      if (data.data) {
        message.success("success");
        getUserAllInfo();
        initState();
        setEmailModalVisible(false);
      } else {
        message.error("error");
      }
    } catch (error) {
      message.error("error");
    }
  };

  const checkCode = async () => {
    try {
      const { data } = await emailCodeCheck({
        email,
        code: verificationCode,
        scene: "RESET_PASSWORD",
      });
      if (data.data) {
        message.success("success");
        initState();
        setChangePasswordModalVisible(false);
        setNewPasswordModalVisible(true);
      } else {
        message.error("error");
      }
    } catch (error) {
      message.error("error");
    }
  };

  const updateUserInfoData = async (type: string, param?: string | Dayjs) => {
    switch (type) {
      case "nickname":
        updateNormalInfo({ nickname: param as string }, () => {
          setEditProfileModalVisible(false);
        });
        break;
      case "gender":
        updateNormalInfo({ gender: param as string });
        break;
      case "email":
        changeEmail();
        break;
      case "birthday":
        updateNormalInfo({
          birthday: dayjs(param as Dayjs).format("YYYY-MM-DD"),
        });
        break;
      case "setPassword":
        updatePassword();
        break;
      case "avatar":
        updateNormalInfo({ avatar: param as string });
        break;
    }
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    languageDispatch({
      type: "setSelectLanguage",
      payload: {
        selectLanguage: lang,
      },
    });
    setShowLang(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (langRef.current && !langRef.current.contains(event.target as Node)) {
      setShowLang(false);
    }
    if (
      currencyRef.current &&
      !currencyRef.current.contains(event.target as Node)
    ) {
      setShowCurrency(false);
    }
  };

  const uplodOnChange = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      message.success("success");
      updateUserInfoData("avatar", info.file.response.data);
    } else if (info.file.status === "error") {
      message.error("error");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="py-5 pb-0">
      <div className="mb-5">
        <div className="relative flex justify-center items-center">
          <img
            className="rounded-full"
            width={120}
            src={userData.userInfo?.avatar}
            alt=""
          />
          <Upload
            accept=".png,.jpg,.jpeg,.webp"
            action="/front/oss/upload"
            showUploadList={false}
            headers={{
              authorization: token || "",
            }}
            onChange={uplodOnChange}
          >
            <svg
              className="absolute left-[50%] translate-x-[30%] bottom-[-10px] cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              width="47"
              height="47"
              viewBox="0 0 47 47"
              fill="none"
            >
              <foreignObject
                x="-47.5909"
                y="-47.5909"
                width="141.545"
                height="141.546"
              >
                <div
                  style={{
                    backdropFilter: "blur(23.8px)",
                    clipPath: "url(#bgblur_0_129_592_clip_path)",
                    height: "100%",
                    width: "100%",
                  }}
                ></div>
              </foreignObject>
              <g data-figma-bg-blur-radius="47.5909">
                <rect
                  x="2.72727"
                  y="2.72727"
                  width="40.9091"
                  height="40.9091"
                  rx="20.4545"
                  fill="white"
                  fill-opacity="0.1"
                />
                <rect
                  x="2.72727"
                  y="2.72727"
                  width="40.9091"
                  height="40.9091"
                  rx="20.4545"
                  stroke="#18171B"
                  stroke-width="5.45455"
                />
                <path
                  d="M29.7244 19.4805C30.1015 19.1034 30.3134 18.592 30.3135 18.0588C30.3136 17.5255 30.1018 17.0141 29.7248 16.6369C29.3477 16.2598 28.8364 16.0479 28.3031 16.0479C27.7698 16.0478 27.2584 16.2596 26.8812 16.6366L17.3617 26.1583C17.1961 26.3234 17.0736 26.5267 17.005 26.7503L16.0628 29.8546C16.0443 29.9162 16.043 29.9818 16.0588 30.0442C16.0746 30.1066 16.107 30.1636 16.1525 30.2091C16.1981 30.2546 16.2551 30.2869 16.3175 30.3026C16.38 30.3183 16.4455 30.3168 16.5072 30.2982L19.6121 29.3567C19.8355 29.2887 20.0388 29.167 20.2041 29.0022L29.7244 19.4805Z"
                  stroke="white"
                  stroke-width="1.63636"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M25.3213 18.187L28.1744 21.0402"
                  stroke="white"
                  stroke-width="1.63636"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath
                  id="bgblur_0_129_592_clip_path"
                  transform="translate(47.5909 47.5909)"
                >
                  <rect
                    x="2.72727"
                    y="2.72727"
                    width="40.9091"
                    height="40.9091"
                    rx="20.4545"
                  />
                </clipPath>
              </defs>
            </svg>
          </Upload>
        </div>
      </div>
      <div>
        <div className="relative border-b border-white/10 py-5">
          <div className="flex justify-between mb-5">
            <InfoBox
              label={t("userCenter.nickname")}
              value={userInfo?.nickname}
              rightBtnClick={editProfile}
            />
            <InfoBox
              label={t("userCenter.gender")}
              value={
                genderMap.find((item) => item.value === userInfo?.gender)?.label
              }
              rightBtnClick={selectGenderClick}
            />
          </div>
          <div className="flex justify-between">
            <InfoBox
              label={t("userCenter.birthday")}
              value={
                userInfo?.birthday ? (
                  userInfo?.birthday
                ) : (
                  <div className="font-semibold text-white/50">
                    {t("userCenter.perfectInformation")}
                  </div>
                )
              }
              rightBtnClick={changeBirthdayClick}
            />
          </div>
        </div>
        <div className="relative py-5">
          <div className="flex justify-between">
            <InfoBox
              label={t("userCenter.email")}
              value={userInfo?.email}
              rightBtnClick={changeEmailClick}
            />
            <InfoBox
              label={t("userCenter.password")}
              value={
                <div className="font-semibold text-white/50">
                  {!userInfo?.fetchPassword
                    ? t("userCenter.notSet")
                    : "********"}
                </div>
              }
              rightEl={
                userInfo?.fetchPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    onClick={changePasswordClick}
                  >
                    <path
                      d="M16.1564 6.51808C16.5112 6.16336 16.7105 5.68222 16.7106 5.18051C16.7107 4.6788 16.5114 4.19762 16.1567 3.84281C15.802 3.488 15.3208 3.28864 14.8191 3.28857C14.3174 3.28851 13.8362 3.48775 13.4814 3.84247L4.52515 12.8008C4.36934 12.9561 4.25411 13.1474 4.18961 13.3578L3.30311 16.2783C3.28577 16.3363 3.28446 16.398 3.29932 16.4567C3.31418 16.5154 3.34466 16.569 3.38753 16.6118C3.4304 16.6546 3.48405 16.685 3.54279 16.6998C3.60154 16.7146 3.66319 16.7132 3.7212 16.6957L6.64242 15.8099C6.85258 15.746 7.04384 15.6314 7.19942 15.4764L16.1564 6.51808Z"
                      stroke="white"
                      stroke-opacity="0.5"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.0137 5.30176L14.698 7.98609"
                      stroke="white"
                      stroke-opacity="0.5"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ) : (
                  <div onClick={setNewPasswordClick}>
                    |&nbsp;&nbsp;{t("userCenter.settings")}
                  </div>
                )
              }
            />
          </div>
        </div>
        <div className="relative py-5">
          <div className="text-base font-medium mb-5">
            Language and currency setting
          </div>
          <div className="flex justify-between">
            <InfoBox
              label={t("userCenter.language")}
              value={selectLanguage}
              rightEl={
                <div className="relative" ref={langRef}>
                  <div
                    onClick={() => {
                      setShowLang(!showLang);
                      setShowCurrency(false);
                    }}
                    className="cursor-pointer flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className={`transition-transform duration-300 ${
                        showLang ? "rotate-90" : ""
                      }`}
                    >
                      <g opacity="0.5">
                        <path
                          d="M6.26366 3.45701C6.38386 3.33685 6.54324 3.26387 6.71274 3.25138C6.88224 3.23888 7.05059 3.28771 7.18711 3.38895L7.26651 3.45701L12.3072 8.49864C12.4272 8.61867 12.5002 8.77779 12.5129 8.94708C12.5256 9.11638 12.4771 9.28459 12.3762 9.42114L12.3072 9.50054L7.26651 14.5422C7.14002 14.669 6.9702 14.7433 6.7912 14.75C6.61219 14.7567 6.43728 14.6954 6.30162 14.5785C6.16596 14.4615 6.07962 14.2975 6.05995 14.1194C6.04028 13.9414 6.08875 13.7625 6.19561 13.6187L6.26366 13.5393L10.8034 8.99959L6.26366 4.45985C6.1435 4.33965 6.07052 4.18028 6.05803 4.01077C6.04554 3.84127 6.09437 3.67292 6.19561 3.5364L6.26366 3.45701Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </div>
                  {showLang && (
                    <div className="absolute top-full right-0 mt-2 w-32 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl py-2 z-50 backdrop-blur-md">
                      {unitAndLanguageList?.map((item) => (
                        <div
                          key={item.displayLanguage}
                          onClick={() => changeLanguage(item.displayLanguage)}
                          className={`px-4 py-2 text-sm cursor-pointer hover:bg-white/10 transition-colors ${
                            selectLanguage === item.displayLanguage
                              ? "text-white font-bold"
                              : "text-gray-400"
                          }`}
                        >
                          {item.displayLanguage}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              }
            />
            <InfoBox
              label={t("userCenter.currency")}
              value={selectUnit?.unit + " " + selectUnit?.currency}
              rightEl={
                <div className="relative" ref={currencyRef}>
                  <div
                    onClick={() => {
                      setShowCurrency(!showCurrency);
                      setShowLang(false);
                    }}
                    className="cursor-pointer flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className={`transition-transform duration-300 ${
                        showCurrency ? "rotate-90" : ""
                      }`}
                    >
                      <g opacity="0.5">
                        <path
                          d="M6.26366 3.45701C6.38386 3.33685 6.54324 3.26387 6.71274 3.25138C6.88224 3.23888 7.05059 3.28771 7.18711 3.38895L7.26651 3.45701L12.3072 8.49864C12.4272 8.61867 12.5002 8.77779 12.5129 8.94708C12.5256 9.11638 12.4771 9.28459 12.3762 9.42114L12.3072 9.50054L7.26651 14.5422C7.14002 14.669 6.9702 14.7433 6.7912 14.75C6.61219 14.7567 6.43728 14.6954 6.30162 14.5785C6.16596 14.4615 6.07962 14.2975 6.05995 14.1194C6.04028 13.9414 6.08875 13.7625 6.19561 13.6187L6.26366 13.5393L10.8034 8.99959L6.26366 4.45985C6.1435 4.33965 6.07052 4.18028 6.05803 4.01077C6.04554 3.84127 6.09437 3.67292 6.19561 3.5364L6.26366 3.45701Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </div>
                  {showCurrency && (
                    <div className="absolute top-full right-0 mt-2 w-24 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl py-2 z-50 backdrop-blur-md">
                      {unitAndLanguageList?.map((item) => (
                        <div
                          key={item.currency}
                          onClick={() => {
                            languageDispatch({
                              type: "setSelectUnit",
                              payload: {
                                selectUnit: {
                                  unit: item.unit,
                                  currency: item.currency,
                                },
                              },
                            });
                            setShowCurrency(false);
                          }}
                          className={`px-4 py-2 text-sm cursor-pointer hover:bg-white/10 transition-colors ${
                            selectUnit?.currency === item.currency
                              ? "text-white font-bold"
                              : "text-gray-400"
                          }`}
                        >
                          {item.unit + " " + item.currency}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              }
            />
          </div>
        </div>
      </div>
      <div>
        {/* 编辑姓名 Modal */}
        <CommonModal
          visible={editProfileModalVisible}
          onClose={() => setEditProfileModalVisible(false)}
          title={t("userCenter.nickname")}
          content={
            <input
              type="text"
              placeholder={t("userCenter.pleaseInputYourNickname")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                background: "#2a2a2a",
                border: "1px solid #444",
                borderRadius: "9999px",
                color: "#fff",
                fontSize: "14px",
              }}
            />
          }
          primaryButtonText={t("userCenter.confirm")}
          onPrimaryClick={() => {
            updateUserInfoData("nickname", name);
          }}
          primaryButtonDisabled={!name}
        />

        {/* 修改性别 Modal */}
        <CommonModal
          visible={genderModalVisible}
          onClose={() => setGenderModalVisible(false)}
          title={t("userCenter.gender")}
          width={460}
          content={
            <div style={{ textAlign: "left" }}>
              {genderMap.map((option, index) => (
                <label
                  key={option.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px",
                    marginBottom: index < 2 ? "8px" : 0,
                    height: "62px",
                    cursor: "pointer",
                    borderRadius: "10px",
                    backgroundColor:
                      gender === option.value
                        ? "rgba(255, 255, 255, 0.1)"
                        : "transparent",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={userInfo?.gender === option.value}
                    onChange={(e) => {
                      updateUserInfoData("gender", e.target.value);
                    }}
                    className="gender-radio"
                    style={{ marginRight: "12px", cursor: "pointer" }}
                  />
                  <span style={{ color: "#fff" }}>{option.label}</span>
                </label>
              ))}
            </div>
          }
          footer={null}
        />

        {/* 修改生日 Modal */}
        <CommonModal
          visible={editBirthdayModalVisible}
          onClose={() => setEditBirthdayModalVisible(false)}
          title={t("userCenter.birthday")}
          content={
            <DatePicker
              size="large"
              placeholder={t("userCenter.pleaseInputYourBirthday")}
              value={birthday}
              style={{ width: "100%" }}
              onChange={(data): DatePickerProps["onChange"] => {
                setBirthday(data);
                return;
              }}
              format={"YYYY-MM-DD"}
            />
          }
          primaryButtonText={t("userCenter.confirm")}
          onPrimaryClick={() => {
            updateUserInfoData("birthday", birthday);
            setEditBirthdayModalVisible(false);
          }}
          primaryButtonDisabled={!birthday}
        />

        {/* 修改邮箱 Modal */}
        <CommonModal
          visible={emailModalVisible}
          onClose={() => setEmailModalVisible(false)}
          title={t("userCenter.setEmail")}
          content={
            <div>
              {/* 邮箱地址输入框 */}
              <div
                style={{
                  position: "relative",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "16px",
                    zIndex: 1,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M18.3337 5.8335L10.8412 10.606C10.5869 10.7537 10.2981 10.8315 10.0041 10.8315C9.71004 10.8315 9.42125 10.7537 9.16699 10.606L1.66699 5.8335"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.667 3.3335H3.33366C2.41318 3.3335 1.66699 4.07969 1.66699 5.00016V15.0002C1.66699 15.9206 2.41318 16.6668 3.33366 16.6668H16.667C17.5875 16.6668 18.3337 15.9206 18.3337 15.0002V5.00016C18.3337 4.07969 17.5875 3.3335 16.667 3.3335Z"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder={t("userCenter.pleaseEnterEmailAddress")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 40px",
                    background: "#2a2a2a",
                    border: "1px solid #444",
                    borderRadius: "9999px",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                />
              </div>

              {/* 验证码输入框 */}
              <div
                style={{
                  position: "relative",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div style={{ position: "relative", flex: 1 }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "16px",
                      zIndex: 1,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M10.0003 14.1667C10.4606 14.1667 10.8337 13.7936 10.8337 13.3333C10.8337 12.8731 10.4606 12.5 10.0003 12.5C9.54009 12.5 9.16699 12.8731 9.16699 13.3333C9.16699 13.7936 9.54009 14.1667 10.0003 14.1667Z"
                        stroke="white"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.8333 8.3335H4.16667C3.24619 8.3335 2.5 9.07969 2.5 10.0002V16.6668C2.5 17.5873 3.24619 18.3335 4.16667 18.3335H15.8333C16.7538 18.3335 17.5 17.5873 17.5 16.6668V10.0002C17.5 9.07969 16.7538 8.3335 15.8333 8.3335Z"
                        stroke="white"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.83301 8.33317V5.83317C5.83301 4.7281 6.27199 3.66829 7.0534 2.88689C7.8348 2.10549 8.89461 1.6665 9.99967 1.6665C11.1047 1.6665 12.1646 2.10549 12.946 2.88689C13.7274 3.66829 14.1663 4.7281 14.1663 5.83317V8.33317"
                        stroke="white"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder={t("userCenter.pleaseEnterVerificationCode")}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 80px 12px 40px",
                      background: "#2a2a2a",
                      border: "1px solid #444",
                      borderRadius: "9999px",
                      color: "#fff",
                      fontSize: "14px",
                    }}
                  />
                  <button
                    onClick={() => sendEmailCodeClick()}
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "6px",
                      color: "#999",
                      fontSize: "12px",
                      cursor: countDown > 0 ? "not-allowed" : "pointer",
                      zIndex: 1,
                    }}
                  >
                    {countDown > 0 ? `${countDown}s` : t("userCenter.send")}
                  </button>
                </div>
              </div>

              {/* 说明文字 */}
              <div
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  color: "#fff",
                  textAlign: "left",
                  lineHeight: "20px",
                }}
              >
                一个账户只能绑定一个固定电子邮箱，用于接受重要通知，验证密码等
              </div>
            </div>
          }
          primaryButtonText="确认"
          onPrimaryClick={() => {
            updateUserInfoData("email");
          }}
          primaryButtonDisabled={!email || !verificationCode}
        />

        {/* 设定新密码 Modal */}
        <CommonModal
          visible={newPasswordModalVisible}
          onClose={() => setNewPasswordModalVisible(false)}
          title={t("userCenter.setNewPassword")}
          content={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              {/* 新密码输入框 */}
              <div
                style={{
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "16px",
                    zIndex: 1,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10.0003 14.1667C10.4606 14.1667 10.8337 13.7936 10.8337 13.3333C10.8337 12.8731 10.4606 12.5 10.0003 12.5C9.54009 12.5 9.16699 12.8731 9.16699 13.3333C9.16699 13.7936 9.54009 14.1667 10.0003 14.1667Z"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.8333 8.3335H4.16667C3.24619 8.3335 2.5 9.07969 2.5 10.0002V16.6668C2.5 17.5873 3.24619 18.3335 4.16667 18.3335H15.8333C16.7538 18.3335 17.5 17.5873 17.5 16.6668V10.0002C17.5 9.07969 16.7538 8.3335 15.8333 8.3335Z"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.83301 8.33317V5.83317C5.83301 4.7281 6.27199 3.66829 7.0534 2.88689C7.8348 2.10549 8.89461 1.6665 9.99967 1.6665C11.1047 1.6665 12.1646 2.10549 12.946 2.88689C13.7274 3.66829 14.1663 4.7281 14.1663 5.83317V8.33317"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder={t("userCenter.pleaseEnterNewPassword")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 40px",
                    background: "#2a2a2a",
                    border: "1px solid #444",
                    borderRadius: "9999px",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                />
              </div>

              {/* 确认密码输入框 */}
              <div
                style={{
                  position: "relative",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "16px",
                    zIndex: 1,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10.0003 14.1667C10.4606 14.1667 10.8337 13.7936 10.8337 13.3333C10.8337 12.8731 10.4606 12.5 10.0003 12.5C9.54009 12.5 9.16699 12.8731 9.16699 13.3333C9.16699 13.7936 9.54009 14.1667 10.0003 14.1667Z"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.8333 8.3335H4.16667C3.24619 8.3335 2.5 9.07969 2.5 10.0002V16.6668C2.5 17.5873 3.24619 18.3335 4.16667 18.3335H15.8333C16.7538 18.3335 17.5 17.5873 17.5 16.6668V10.0002C17.5 9.07969 16.7538 8.3335 15.8333 8.3335Z"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.83301 8.33317V5.83317C5.83301 4.7281 6.27199 3.66829 7.0534 2.88689C7.8348 2.10549 8.89461 1.6665 9.99967 1.6665C11.1047 1.6665 12.1646 2.10549 12.946 2.88689C13.7274 3.66829 14.1663 4.7281 14.1663 5.83317V8.33317"
                      stroke="white"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder={t("userCenter.pleaseReEnterNewPassword")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 40px",
                    background: "#2a2a2a",
                    border: "1px solid #444",
                    borderRadius: "9999px",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>
          }
          primaryButtonText={t("userCenter.confirm")}
          onPrimaryClick={() => {
            if (password !== confirmPassword) {
              message.error(t("userCenter.pwdConfirmError"));
              return;
            }
            if (!isPasswordValid(password)) {
              message.error(t("userCenter.passwordPatternError"));
              return;
            }
            updateUserInfoData("setPassword");
          }}
          primaryButtonDisabled={!password || !confirmPassword}
        />

        {/* 修改密码 Modal（带两个按钮） */}
        <CommonModal
          visible={changePasswordModalVisible}
          onClose={() => setChangePasswordModalVisible(false)}
          title={t("userCenter.changePassword")}
          content={
            <div>
              {/* 验证码输入框 */}
              <div
                style={{
                  position: "relative",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div style={{ position: "relative", flex: 1 }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "16px",
                      zIndex: 1,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M10.0003 14.1667C10.4606 14.1667 10.8337 13.7936 10.8337 13.3333C10.8337 12.8731 10.4606 12.5 10.0003 12.5C9.54009 12.5 9.16699 12.8731 9.16699 13.3333C9.16699 13.7936 9.54009 14.1667 10.0003 14.1667Z"
                        stroke="white"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.8333 8.3335H4.16667C3.24619 8.3335 2.5 9.07969 2.5 10.0002V16.6668C2.5 17.5873 3.24619 18.3335 4.16667 18.3335H15.8333C16.7538 18.3335 17.5 17.5873 17.5 16.6668V10.0002C17.5 9.07969 16.7538 8.3335 15.8333 8.3335Z"
                        stroke="white"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.83301 8.33317V5.83317C5.83301 4.7281 6.27199 3.66829 7.0534 2.88689C7.8348 2.10549 8.89461 1.6665 9.99967 1.6665C11.1047 1.6665 12.1646 2.10549 12.946 2.88689C13.7274 3.66829 14.1663 4.7281 14.1663 5.83317V8.33317"
                        stroke="white"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder={t("userCenter.pleaseEnterVerificationCode")}
                    value={changePasswordCode}
                    onChange={(e) => setChangePasswordCode(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px 80px 12px 40px",
                      background: "#2a2a2a",
                      border: "1px solid #444",
                      borderRadius: "9999px",
                      color: "#fff",
                      fontSize: "14px",
                    }}
                  />
                  <button
                    onClick={() => sendEmailCodeClick()}
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "6px",
                      color: "#999",
                      fontSize: "12px",
                      cursor: countDown > 0 ? "not-allowed" : "pointer",
                      zIndex: 1,
                    }}
                  >
                    {countDown > 0 ? `${countDown}s` : t("userCenter.send")}
                  </button>
                </div>
              </div>
            </div>
          }
          footer={
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "100%",
              }}
            >
              <PrimaryButton
                onClick={() => {
                  checkCode();
                }}
                disabled={!changePasswordCode}
                fullWidth
              >
                {t("userCenter.confirm")}
              </PrimaryButton>
              <button
                onClick={() => {
                  setChangePasswordModalVisible(false);
                  setEmailModalVisible(true);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#DB7DFF",
                  fontSize: "12px",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                {t("userCenter.linkEmail")}
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default AccountSetting;
