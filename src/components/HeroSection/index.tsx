import React from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "antd";
import sectionImg from "../../assets/background/sectionImg.png";
import PrimaryButton from "../PrimaryButton";
import "./style.css";
import { useTranslation } from "react-i18next";

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
      image: sectionImg,
      cta: t("singUp"),
      link: "/invite",
    },
    {
      id: 2,
      title: "Genshin Impact",
      subtitle: (
        <>
          Explore a vast world of adventure
          <br />
          New character summons available now
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1560942485-b2a11cc13456?auto=format&fit=crop&w=1000&q=80",
      cta: "Top Up",
      link: "/payment",
    },
    {
      id: 3,
      title: "PUBG Mobile",
      subtitle: (
        <>
          Battle Royale excitement
          <br />
          Get your Unknown Cash instantly
        </>
      ),
      image:
        "https://images.unsplash.com/photo-1593305841991-05c29736f4de?auto=format&fit=crop&w=1000&q=80",
      cta: "Buy UC",
      link: "/games",
    },
  ];
  return (
    <section className="relative w-full h-[950px] overflow-hidden flex items-center">
      {/* Background Image - Starry Light Effect */}

      <div className="hero-section-container container mx-auto px-4 md:px-12 lg:px-24 relative z-10 h-full">
        <Carousel
          autoplay
          effect="fade"
          autoplaySpeed={5000}
          className="h-full hero-carousel"
        >
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
                      className="banner-btn absolute px-10 py-4 rounded-full text-white font-bold text-2xl hover:scale-105 z-20"
                    >
                      {slide.cta}
                    </PrimaryButton>
                  </div>
                </div>

                {/* RIGHT: Character Image */}
                <div className="relative h-[750px] w-[780px] flex items-center justify-start lg:justify-end">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] mask-image-b-fade"
                  />
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default HeroSection;
