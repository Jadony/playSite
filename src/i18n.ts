import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/English/common";
import zhTWTranslation from "./locales/zhTW/common";

export const languages = ["English", "zh-TW"];

// 资源文件（语言翻译）
const resources = {
  English: {
    translation: enTranslation,
  },
  "zh-TW": {
    translation: zhTWTranslation,
  },
};

i18n
  .use(initReactI18next) // 初始化插件
  .init({
    resources, // 资源
    lng: "English", // 默认语言
    interpolation: {
      escapeValue: false, // react已经处理了XSS问题，这里设置为false
    },
  });

export default i18n;
