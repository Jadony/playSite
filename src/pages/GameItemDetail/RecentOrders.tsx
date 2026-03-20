import { useTranslation } from "react-i18next";

type RecentOrdersProps = {
  recentOrders: RecentOrdersResponseData[];
};

const RecentOrders: React.FC<RecentOrdersProps> = ({ recentOrders }) => {
  const { t } = useTranslation();
  return (
    <div
      className="relative h-[240px] mb-10"
      style={{
        maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 60%, transparent 100%)",
      }}
    >
      <style>
        {`
          @keyframes order-scroll-up {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          .animate-order-scroll {
            animation: order-scroll-up 12s linear infinite;
          }
          .animate-order-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      <div className="animate-order-scroll flex flex-col gap-[20px]">
        {/* We duplicate the array to create a seamless scrolling loop */}
        {recentOrders.map((order, index) => (
          <div
            key={`${order.nickname}-${index}`}
            className="flex items-center gap-[14px]"
          >
            <img
              src={order.avatar}
              alt={order.nickname}
              className="w-[42px] h-[42px] rounded-full object-cover shrink-0 bg-gray-800"
            />
            <div className="flex flex-col">
              <span className="text-white text-[14px] font-semibold tracking-wide leading-tight">
                {order.nickname}
              </span>
              <span className="overflow-visible text-white text-[12px] mt-[4px] leading-tight w-[290px]">
                {t("home.selectorAndPayment.placedAnOrderForLimitedGloves")}
                {order.finishedTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
