import CommonModal from "../CommonModal";
import exchangeErr from "../../assets/userPanel/exchangeErr.png";

type CouponExchangeErrProps = {
  visible: boolean;
  onClose: () => void;
};

const CouponExchangeErr: React.FC<CouponExchangeErrProps> = ({
  visible,
  onClose,
}) => {
  return (
    <CommonModal
      visible={visible}
      onClose={onClose}
      title="兑换失败"
      content={
        <div>
          <div className="w-[155px] mx-auto" style={{ marginBottom: "8px" }}>
            <img width={155} src={exchangeErr} alt="" />
          </div>
          <div className="text-center text-sm text-white">
            兑换码无效，请检查后重试
          </div>
        </div>
      }
      width={480}
      footer={null}
    />
  );
};

export default CouponExchangeErr;
