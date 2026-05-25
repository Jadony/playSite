/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-01-30 15:34:48
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-05-22 14:47:06
 * @FilePath: /playSite/src/store/languageStore.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createContext, useContext, useReducer } from "react";

type LanguageContextType = {
  selectUnit?: {
    unit: string;
    currency: string;
  };
  selectLanguage?: string;
  unitAndLanguageList?: CountryConfigs[];
  countryConfigs?: CountryConfigs[];
  languageList?: { languageName: string; displayLanguage: string }[];
  currencyList?: { currency: string; unit: string }[];
};
const languageContext = createContext<LanguageContextType | null>(null);
const languageDispatchContext = createContext<React.Dispatch<{
  type: string;
  payload: LanguageContextType;
}> | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguageContext = () => {
  const context = useContext(languageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider",
    );
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguageDispatchContext = () => {
  const context = useContext(languageDispatchContext);
  if (!context) {
    throw new Error(
      "useLanguageDispatchContext must be used within a LanguageProvider",
    );
  }
  return context;
};

const languageReducer = (
  state: LanguageContextType,
  action: { type: string; payload: LanguageContextType },
) => {
  switch (action.type) {
    case "setSelectLanguage":
      localStorage.setItem(
        "selectLanguage",
        action.payload.selectLanguage || "",
      );
      return {
        ...state,
        selectLanguage: action.payload.selectLanguage,
      };
    case "setSelectUnit":
      return {
        ...state,
        selectUnit: action.payload.selectUnit,
      };
    case "setSelectUnitAndLanguage":
      return {
        ...state,
        unitAndLanguageList: action.payload.countryConfigs,
      };
    case "setLanguageList":
      return {
        ...state,
        languageList: action.payload.languageList,
      };
    case "setCurrencyList":
      return {
        ...state,
        currencyList: action.payload.currencyList,
      };
    case "allData":
      return {
        ...state,
        unitAndLanguageList: action.payload.countryConfigs,
        selectUnit: action.payload.selectUnit,
        selectLanguage: action.payload.selectLanguage,
      };
    default:
      return state;
  }
};

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(languageReducer, {
    selectUnit: {
      currency: "",
      unit: "",
    },
    selectLanguage: localStorage.getItem("selectLanguage") || "English",
    unitAndLanguageList: [],
    languageList: [],
    currencyList: [],
  });
  return (
    <languageContext.Provider value={state}>
      <languageDispatchContext.Provider value={dispatch}>
        {children}
      </languageDispatchContext.Provider>
    </languageContext.Provider>
  );
};

export default LanguageProvider;
