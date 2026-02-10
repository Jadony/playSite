import { useTranslation } from "react-i18next";
import UserAchievement from "@/components/UserAchievement";
import AccountSetting from "@/components/AccountSetting";
import PurchaseHistory from "@/components/PurchaseHistory";
import { useState } from "react";
import Coupons from "@/components/Coupons";
export default function useMenuData(
  leftElOnClick?: (exchangeCode: string) => void,
) {
  const [exchangeCode, setExchangeCode] = useState("");
  const { t } = useTranslation();

  return [
    {
      id: "myAchievements",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M16.6663 10.8335C16.6663 15.0002 13.7497 17.0835 10.283 18.2919C10.1015 18.3534 9.90429 18.3505 9.72467 18.2835C6.24967 17.0835 3.33301 15.0002 3.33301 10.8335V5.00021C3.33301 4.7792 3.42081 4.56724 3.57709 4.41096C3.73337 4.25468 3.94533 4.16688 4.16634 4.16688C5.83301 4.16688 7.91634 3.16688 9.36634 1.90021C9.54289 1.74938 9.76747 1.6665 9.99967 1.6665C10.2319 1.6665 10.4565 1.74938 10.633 1.90021C12.0913 3.17521 14.1663 4.16688 15.833 4.16688C16.054 4.16688 16.266 4.25468 16.4223 4.41096C16.5785 4.56724 16.6663 4.7792 16.6663 5.00021V10.8335Z"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.31348 15.7582C5.66907 14.8017 6.30883 13.9769 7.14683 13.3945C7.98483 12.8122 8.98096 12.5002 10.0014 12.5005C11.0219 12.5008 12.0179 12.8133 12.8556 13.3961C13.6932 13.9788 14.3326 14.804 14.6876 15.7607"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.0003 12.5002C11.8413 12.5002 13.3337 11.0078 13.3337 9.16683C13.3337 7.32588 11.8413 5.8335 10.0003 5.8335C8.15938 5.8335 6.66699 7.32588 6.66699 9.16683C6.66699 11.0078 8.15938 12.5002 10.0003 12.5002Z"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      label: t("userCenter.myAchievements"),
      comp: <UserAchievement />,
    },
    {
      id: "accountSettings",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M8.33366 12.5H5.00033C4.11627 12.5 3.26842 12.8512 2.6433 13.4763C2.01818 14.1014 1.66699 14.9493 1.66699 15.8333V17.5"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.9209 13.7749L12.6901 13.4565"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12.6901 11.5433L11.9209 11.2241"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.0438 10.1901L13.7246 9.4209"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.0438 14.8101L13.7246 15.5801"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.957 10.1901L16.2762 9.4209"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M16.2754 15.5801L15.957 14.8101"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.3096 11.5433L18.0796 11.2241"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M17.3096 13.4565L18.0796 13.7757"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 15C16.3807 15 17.5 13.8807 17.5 12.5C17.5 11.1193 16.3807 10 15 10C13.6193 10 12.5 11.1193 12.5 12.5C12.5 13.8807 13.6193 15 15 15Z"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7.50033 9.16667C9.34127 9.16667 10.8337 7.67428 10.8337 5.83333C10.8337 3.99238 9.34127 2.5 7.50033 2.5C5.65938 2.5 4.16699 3.99238 4.16699 5.83333C4.16699 7.67428 5.65938 9.16667 7.50033 9.16667Z"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      label: t("userCenter.accountSettings"),
      comp: <AccountSetting />,
    },
    {
      id: "purchaseHistory",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M10.0003 18.3332C14.6027 18.3332 18.3337 14.6022 18.3337 9.99984C18.3337 5.39746 14.6027 1.6665 10.0003 1.6665C5.39795 1.6665 1.66699 5.39746 1.66699 9.99984C1.66699 14.6022 5.39795 18.3332 10.0003 18.3332Z"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 5V10L13.3333 11.6667"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      label: t("userCenter.purchaseHistory"),
      comp: <PurchaseHistory />,
    },
    {
      id: "coupons",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M1.66699 7.49984C2.33003 7.49984 2.96592 7.76323 3.43476 8.23207C3.9036 8.70091 4.16699 9.3368 4.16699 9.99984C4.16699 10.6629 3.9036 11.2988 3.43476 11.7676C2.96592 12.2364 2.33003 12.4998 1.66699 12.4998V14.1665C1.66699 14.6085 1.84259 15.0325 2.15515 15.345C2.46771 15.6576 2.89163 15.8332 3.33366 15.8332H16.667C17.109 15.8332 17.5329 15.6576 17.8455 15.345C18.1581 15.0325 18.3337 14.6085 18.3337 14.1665V12.4998C17.6706 12.4998 17.0347 12.2364 16.5659 11.7676C16.0971 11.2988 15.8337 10.6629 15.8337 9.99984C15.8337 9.3368 16.0971 8.70091 16.5659 8.23207C17.0347 7.76323 17.6706 7.49984 18.3337 7.49984V5.83317C18.3337 5.39114 18.1581 4.96722 17.8455 4.65466C17.5329 4.3421 17.109 4.1665 16.667 4.1665H3.33366C2.89163 4.1665 2.46771 4.3421 2.15515 4.65466C1.84259 4.96722 1.66699 5.39114 1.66699 5.83317V7.49984Z"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.833 4.1665V5.83317"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.833 14.1665V15.8332"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.833 9.1665V10.8332"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      label: t("userCenter.coupons"),
      leftEl: (
        <div className="flex bg-white/10 w-[334px] ml-auto rounded-[10px] py-[11px] px-3.5">
          <input
            value={exchangeCode}
            onChange={(e) => setExchangeCode(e.target.value)}
            className="w-[220px] bg-transparent outline-none"
            type="text"
          />
          <div
            onClick={() => leftElOnClick?.(exchangeCode)}
            className="ml-auto cursor-pointer"
          >
            ｜ exchange
          </div>
        </div>
      ),
      comp: <Coupons />,
    },
    // {
    //   id: "inviteFriends",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="20"
    //       height="20"
    //       viewBox="0 0 20 20"
    //       fill="none"
    //     >
    //       <path
    //         d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
    //         stroke="white"
    //         stroke-width="1.25"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //       <path
    //         d="M10 13.75C10 14.4917 9.78007 15.2167 9.36801 15.8334C8.95596 16.4501 8.37029 16.9307 7.68506 17.2145C6.99984 17.4984 6.24584 17.5726 5.51841 17.4279C4.79098 17.2833 4.1228 16.9261 3.59835 16.4017C3.0739 15.8772 2.71675 15.209 2.57206 14.4816C2.42736 13.7542 2.50162 13.0002 2.78545 12.3149C3.06928 11.6297 3.54993 11.044 4.16661 10.632C4.7833 10.2199 5.50832 10 6.25 10C5.50832 10 4.7833 9.78007 4.16661 9.36801C3.54993 8.95596 3.06928 8.37029 2.78545 7.68506C2.50162 6.99984 2.42736 6.24584 2.57206 5.51841C2.71675 4.79098 3.0739 4.1228 3.59835 3.59835C4.1228 3.0739 4.79098 2.71675 5.51841 2.57206C6.24584 2.42736 6.99984 2.50162 7.68506 2.78545C8.37029 3.06928 8.95596 3.54993 9.36801 4.16661C9.78007 4.7833 10 5.50832 10 6.25C10 5.50832 10.2199 4.7833 10.632 4.16661C11.044 3.54993 11.6297 3.06928 12.3149 2.78545C13.0002 2.50162 13.7542 2.42736 14.4816 2.57206C15.209 2.71675 15.8772 3.0739 16.4017 3.59835C16.9261 4.1228 17.2833 4.79098 17.4279 5.51841C17.5726 6.24584 17.4984 6.99984 17.2145 7.68506C16.9307 8.37029 16.4501 8.95596 15.8334 9.36801C15.2167 9.78007 14.4917 10 13.75 10C14.4917 10 15.2167 10.2199 15.8334 10.632C16.4501 11.044 16.9307 11.6297 17.2145 12.3149C17.4984 13.0002 17.5726 13.7542 17.4279 14.4816C17.2833 15.209 16.9261 15.8772 16.4017 16.4017C15.8772 16.9261 15.209 17.2833 14.4816 17.4279C13.7542 17.5726 13.0002 17.4984 12.3149 17.2145C11.6297 16.9307 11.044 16.4501 10.632 15.8334C10.2199 15.2167 10 14.4917 10 13.75Z"
    //         stroke="white"
    //         stroke-width="1.25"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //       <path
    //         d="M10 6.25V7.5"
    //         stroke="white"
    //         stroke-width="1.25"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //       <path
    //         d="M6.25 10H7.5"
    //         stroke="white"
    //         stroke-width="1.25"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //       <path
    //         d="M13.75 10H12.5"
    //         stroke="white"
    //         stroke-width="1.25"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //       <path
    //         d="M10 13.75V12.5"
    //         stroke="white"
    //         stroke-width="1.25"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //       <path
    //         d="M6.66699 6.6665L8.23366 8.23317"
    //         stroke="white"
    //         stroke-width="1.25"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //       <path
    //         d="M11.7666 8.23317L13.3333 6.6665"
    //         stroke="white"
    //         stroke-width="1.25"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //       <path
    //         d="M6.66699 13.3333L8.23366 11.7666"
    //         stroke="white"
    //         stroke-width="1.25"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //       <path
    //         d="M11.7666 11.7666L13.3333 13.3333"
    //         stroke="white"
    //         stroke-width="1.25"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //     </svg>
    //   ),
    //   label: t("userCenter.inviteFriends"),
    // },
    // {
    //   id: "feedbackAndSuggestions",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="20"
    //       height="20"
    //       viewBox="0 0 20 20"
    //       fill="none"
    //     >
    //       <path
    //         d="M11.667 7.49984C11.667 7.94186 11.4914 8.36579 11.1788 8.67835C10.8663 8.99091 10.4424 9.1665 10.0003 9.1665H5.00033L1.66699 12.4998V3.33317C1.66699 2.89114 1.84259 2.46722 2.15515 2.15466C2.46771 1.8421 2.89163 1.6665 3.33366 1.6665H10.0003C10.4424 1.6665 10.8663 1.8421 11.1788 2.15466C11.4914 2.46722 11.667 2.89114 11.667 3.33317V7.49984Z"
    //         stroke="white"
    //         stroke-width="1.25"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //       <path
    //         d="M14.9997 7.5H16.6663C17.1084 7.5 17.5323 7.6756 17.8449 7.98816C18.1574 8.30072 18.333 8.72464 18.333 9.16667V18.3333L14.9997 15H9.99967C9.55765 15 9.13372 14.8244 8.82116 14.5118C8.5086 14.1993 8.33301 13.7754 8.33301 13.3333V12.5"
    //         stroke="white"
    //         stroke-width="1.25"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //     </svg>
    //   ),
    //   label: t("userCenter.feedbackAndSuggestions"),
    // },
    // {
    //   id: "helpCenter",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="20"
    //       height="20"
    //       viewBox="0 0 20 20"
    //       fill="none"
    //     >
    //       <path
    //         d="M10.0003 18.3332C14.6027 18.3332 18.3337 14.6022 18.3337 9.99984C18.3337 5.39746 14.6027 1.6665 10.0003 1.6665C5.39795 1.6665 1.66699 5.39746 1.66699 9.99984C1.66699 14.6022 5.39795 18.3332 10.0003 18.3332Z"
    //         stroke="white"
    //         stroke-width="1.25"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //       <path
    //         d="M7.5752 7.49999C7.77112 6.94304 8.15782 6.47341 8.66682 6.17426C9.17583 5.87512 9.77427 5.76577 10.3562 5.86558C10.9381 5.96539 11.4659 6.26792 11.8461 6.71959C12.2263 7.17126 12.4344 7.74292 12.4335 8.33332C12.4335 9.99999 9.93353 10.8333 9.93353 10.8333"
    //         stroke="white"
    //         stroke-width="1.25"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //       <path
    //         d="M10 14.1665H10.0083"
    //         stroke="white"
    //         stroke-width="1.25"
    //         stroke-linecap="round"
    //         stroke-linejoin="round"
    //       />
    //     </svg>
    //   ),
    //   label: t("userCenter.helpCenter"),
    // },
  ];
}
