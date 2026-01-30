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
      question: t("home.faq.whatIs"),
      answer: t("home.faq.whatIsText"),
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
    <div className="faq-section">
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
