import { createContext, useContext, useReducer } from "react";

type LanguageContextType = {
  selectUnit?: {
    unit: string;
    currency: string;
  };
  selectLanguage?: string;
  unitAndLanguageList?: CountryConfigs[];
  countryConfigs?: CountryConfigs[];
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
    selectLanguage: "",
    unitAndLanguageList: [],
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
