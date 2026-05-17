/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-01-28 12:30:23
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-05-17 18:57:43
 * @FilePath: /playSite/src/components/FAQSection/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { useTranslation } from "react-i18next";
import "./style.css";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items?: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = () => {
  const { t } = useTranslation();
  const defaultFAQItems: FAQItem[] = [
    {
      question: t("home.faq.whatIsPlayDD"),
      answer: t("home.faq.whatIsPlayDDText"),
    },
    {
      question: t("home.faq.whyChooseUs"),
      answer: t("home.faq.whyChooseUsText"),
    },
    {
      question: t("home.faq.howToUseCoupons"),
      answer: t("home.faq.howToUseCouponsText"),
    },
    {
      question: t("home.faq.howLongAfterPurchase"),
      answer: t("home.faq.howLongAfterPurchaseText"),
    },
    {
      question: t(
        "home.faq.whatIfTheGoodsAreNotSuccessfullyRechargedAfterPayment",
      ),
      answer: t(
        "home.faq.whatIfTheGoodsAreNotSuccessfullyRechargedAfterPaymentText",
      ),
    },
  ];
  return (
    <div className="faq-section relative">
      <h2 className="faq-title">FAQ</h2>
      {defaultFAQItems.map((item, index) => (
        <div key={index} className="faq-item">
          <h3 className="faq-question">{item.question}</h3>
          <p className="faq-answer">{item.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
