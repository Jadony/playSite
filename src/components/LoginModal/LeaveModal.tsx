import { useTranslation } from "react-i18next";
import CommonModal from "../CommonModal";
import PrimaryButton from "../PrimaryButton";
import React from "react";

type LeaveModalType = {
  visible: boolean;
  onClose: (isContinue: boolean) => void;
};

const LeaveModal: React.FC<LeaveModalType> = ({ visible, onClose }) => {
  const { t } = useTranslation();
  const handleClickContinueBtn = (isContinue: boolean) => {
    onClose(isContinue);
  };

  const handleClickLeaveBtn = (isContinue: boolean) => {
    onClose(isContinue);
  };

  return (
    <CommonModal
      className="leave-modal"
      visible={visible}
      onClose={() => onClose(true)}
      showClose={false}
      content={
        <div className="leave-modal-content">
          <img
            src="https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/leaveModalBg.png"
            alt="leaveModalBg"
          />
          <div className="leave-modal-text">
            <p className="px-4">
              {t("loginOrSignUpModal.youreOnlyOneStepAway")}
            </p>
            <p className="px-4">
              {t(
                "loginOrSignUpModal.completeRegistrationToReceiveANewUserGiftPack",
              )}
            </p>
            <div className="leave-modal-btn mt-4 px-8">
              <PrimaryButton
                onClick={() => handleClickContinueBtn(true)}
                fullWidth
                fontSize="1rem"
              >
                {t("loginOrSignUpModal.continue")}
              </PrimaryButton>
              <div
                className="underline cursor-pointer text-center mt-4 text-sm"
                onClick={() => handleClickLeaveBtn(false)}
              >
                {t("loginOrSignUpModal.leaveNow")}
              </div>
            </div>
          </div>
        </div>
      }
      width={370}
      footer={null}
    />
  );
};

export default LeaveModal;
