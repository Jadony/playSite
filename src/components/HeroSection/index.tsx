/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-01-28 19:43:18
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-08-09 20:24:43
 * @FilePath: /playSite/src/components/HeroSection/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../PrimaryButton";
import "./style.css";
import { useTranslation } from "react-i18next";
import Tilt from "../Tilt";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const slides = [
    {
      id: 1,
      mainTitle: t("home.section.startingBenefits"),
      subTitle: t("home.section.startingBenefitsSubFirst"),
      content: <>{t("home.section.startingBenefitsSubSecond")}</>,
      image:
        "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/banner.png",
      cta: t("home.section.singUp"),
      link: "/invite",
    },
  ];
  return (
    <section className="relative w-full h-[950px]">
      {/* Background Image - Starry Light Effect */}
      <div className="hero-section-container w-[1280px] mx-auto relative z-10 h-full">
        {slides.map((slide) => (
          <div key={slide.id} className="h-full !flex items-center">
            <div className="w-full flex items-center justify-between">
              {/* LEFT: Content */}
              <div className="text-left whitespace-nowrap">
                <h1 className="text-6xl font-black text-white tracking-tight leading-tight">
                  {slide.mainTitle}
                </h1>
                <h1 className="text-6xl font-black text-white tracking-tight leading-tight">
                  {slide.subTitle}
                </h1>
                <p className="text-gray-400 mt-5 text-lg font-light max-w-md leading-relaxed">
                  {slide.content}
                </p>

                <div className="pt-4">
                  <PrimaryButton
                    onClick={() => navigate(slide.link)}
                    className="banner-btn absolute px-10 py-4 rounded-full text-white font-bold text-base hover:scale-105 z-20"
                  >
                    {slide.cta}
                  </PrimaryButton>
                </div>
              </div>

              {/* RIGHT: Character Image */}

              <Tilt>
                <div>
                  <img src={slide.image} alt={slide.mainTitle} />
                </div>
              </Tilt>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
