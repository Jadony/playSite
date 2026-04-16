import { useTranslation } from "react-i18next";
type InputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  svgEl?: React.ReactNode;
  hasSendBtn?: boolean;
  isSend?: boolean;
  handleSendBtn?: () => void;
  time?: number;
  type?: string;
  disabled?: boolean;
};

const Input: React.FC<InputProps> = ({
  onChange,
  value,
  placeholder,
  svgEl,
  hasSendBtn = false,
  isSend,
  handleSendBtn,
  time,
  type = "text",
  disabled = false,
}) => {
  const { t } = useTranslation();
  return (
    <div className="relative glass-gradient-border rounded-full">
      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white">
        {svgEl}
      </div>
      <input
        disabled={disabled}
        onChange={onChange}
        value={value}
        type={type}
        placeholder={placeholder}
        className="bg-black/5 login-input w-full rounded-full py-3.5 pl-12 pr-12 text-base text-white focus:outline-none focus:border-white"
      />
      {hasSendBtn && (
        <div
          onClick={handleSendBtn}
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-right w-20 h-8 flex items-center justify-end text-white opacity-50 cursor-pointer ${isSend ? "disabled" : ""}`}
        >
          {isSend ? `${time}s` : t("loginOrSignUpModal.reSend")}
        </div>
      )}
    </div>
  );
};

export default Input;
