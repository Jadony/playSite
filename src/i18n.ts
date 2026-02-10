import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en/common";
import zhTWTranslation from "./locales/zhTW/common";

export const languages = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "繁體中文",
    value: "zh-TW",
  },
];

// 资源文件（语言翻译）
const resources = {
  en: {
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
    lng: "en", // 默认语言
    interpolation: {
      escapeValue: false, // react已经处理了XSS问题，这里设置为false
    },
  });

export default i18n;
