/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-08-09 20:42:09
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-09-13 19:58:06
 * @FilePath: /playSite/src/pages/About/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { useTranslation } from "react-i18next";
import "./style.css";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-wrap flex flex-col text-white bg-[#000]">
      {/* Hero Section */}
      <div className="w-[1280px] mx-auto">
        <div className="relative w-full h-[1400px] bg-cover bg-center flex flex-col justify-center items-start px-10 md:px-20 lg:px-40">
          <div className="relative z-10 max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {t("about.welcomeTo")}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              {t("about.weProvide")}
            </p>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto px-6 pb-20">
          {/* Story Section */}
          <div className="w-full text-center space-y-8 animate-slide-up border-b border-gray-700 pb-20 mb-40">
            <div className="w-full relative inline-block mb-12">
              <div className="w-full text-5xl md:text-4xl font-bold mb-2 border-b border-gray-500 pb-8">
                {t("about.ourStory")}
              </div>
              <div className="absolute top-[85%] left-0 w-1/6 h-2 bg-[#611e91]"></div>
              <div className="absolute top-[85%] right-0 w-1/6 h-2 bg-[#611e91]"></div>
            </div>

            <div className="w-full text-white text-lg text-left">
              <p className="mb-4 px-12">{t("about.onMost")}</p>
              <p className="px-12">{t("about.asCreators")}</p>
            </div>
          </div>

          {/* Mission Box */}
          <div className="border border-gray-800 rounded-2xl p-12 pl-16 relative overflow-hidden group animate-slide-up bg-[#070707]">
            <h3 className="text-xl font-bold mb-8 text-white">
              {t("about.ifGaming")}
            </h3>
            <h3 className="text-xl font-bold mb-8 text-white">
              {t("about.weDecided")}
            </h3>

            <ul className="space-y-6 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="leading-relaxed text-base text-white pl-8">
                  {t("about.securityComes")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="leading-relaxed text-base text-white pl-8">
                  {t("about.valueIsOurPromise")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="leading-relaxed text-base text-white pl-8">
                  {t("about.funIsTheSoul")}
                </span>
              </li>
            </ul>
          </div>

          {/* Footer Tagline */}
          <div className="text-center py-10 animate-slide-up border-t border-gray-700 mt-40 pt-20">
            <div className="w-full text-white text-lg text-left mb-40">
              <p className="mb-4">{t("about.currentlyInItsEarly")}</p>
              <p>{t("about.weAreNotJustAServiceProvider")}</p>
            </div>
            <p className="text-2xl md:text-3xl font-medium text-white leading-normal">
              {t("about.gameHasBegun")}
              <br />
              <span className="text-white font-bold mt-2 block">
                {t("about.welcomeAboard")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
