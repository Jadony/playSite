/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-01-30 13:37:15
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-05-20 14:46:29
 * @FilePath: /playSite/src/i18n.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/English/common";
import zhTWTranslation from "./locales/TraditionalChinese/common";
import french from "./locales/French/common";
import german from "./locales/German/common";
import italian from "./locales/Italian/common";
import japanese from "./locales/Japanese/common";
import korean from "./locales/Korean/common";
import indonesian from "./locales/Indonesian/common";
import malay from "./locales/Malay/common";
import russian from "./locales/Russian/common";

export const languages = ["English", "Traditional Chinese"];

// 资源文件（语言翻译）
const resources = {
  English: {
    translation: enTranslation,
  },
  "Traditional Chinese": {
    translation: zhTWTranslation,
  },
  French: {
    translation: french,
  },
  German: {
    translation: german,
  },
  Italian: {
    translation: italian,
  },
  Japanese: {
    translation: japanese,
  },
  Korean: {
    translation: korean,
  },
  Indonesian: {
    translation: indonesian,
  },
  Malay: {
    translation: malay,
  },
  Russian: {
    translation: russian,
  },
};

i18n
  .use(initReactI18next) // 初始化插件
  .init({
    resources: resources || {
      English: {
        translation: enTranslation,
      },
    }, // 资源
    lng: "English", // 默认语言
    interpolation: {
      escapeValue: false, // react已经处理了XSS问题，这里设置为false
    },
  });

export default i18n;
