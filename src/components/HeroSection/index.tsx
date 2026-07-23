/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-01-28 19:43:18
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-07-23 16:28:36
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
      title: t("home.section.startingBenefits"),
      subtitle: (
        <>
          {t("home.section.startingBenefitsSubFirst")}
          <br />
          {t("home.section.startingBenefitsSubSecond")}
        </>
      ),
      image:
        "https://play-test.oss-cn-hangzhou.aliyuncs.com/front-home/sectionImg.png",
      cta: t("home.section.singUp"),
      link: "/invite",
    },
  ];
  return (
    <section className="relative w-full h-[950px] overflow-hidden flex items-center">
      {/* Background Image - Starry Light Effect */}
      <div className="hero-section-container container mx-auto px-4 md:px-12 lg:px-24 relative z-10 h-full">
        {slides.map((slide) => (
          <div key={slide.id} className="h-full !flex items-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
              {/* LEFT: Content */}
              <div className="text-left space-y-6">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
                  {slide.title}
                </h1>
                <p className="text-gray-400 text-lg md:text-xl font-light max-w-md leading-relaxed">
                  {slide.subtitle}
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

              <Tilt className="w-[780px]">
                <div className="relative h-[750px] w-[780px] flex items-center justify-start lg:justify-end">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] mask-image-b-fade"
                  />
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
