/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-01-30 13:37:15
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-05-17 20:33:28
 * @FilePath: /playSite/src/i18n.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/English/common";
import zhTWTranslation from "./locales/TraditionalChinese/common";

export const languages = ["English", "Traditional Chinese"];

// 资源文件（语言翻译）
const resources = {
  English: {
    translation: enTranslation,
  },
  "Traditional Chinese": {
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
