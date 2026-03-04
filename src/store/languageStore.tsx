import { getCountryAll } from "@/api/user";
import { createContext, useContext, useReducer } from "react";

type LanguageContextType = {
  selectUnit?: {
    unit: string;
    currency: string;
  };
  selectLanguage?: string;
  unitAndLanguageList?: CountryConfigs[];
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
      return {
        ...state,
        selectLanguage: action.payload.selectLanguage,
      };
    default:
      return state;
  }
};

const getCountryAllData = async () => {
  const { data } = await getCountryAll();
  const { data: countryData } = data;
  const { countryConfigs, currentCurrency, currentLanguage, currentUnit } =
    countryData;
  return {
    countryConfigs,
    currentCurrency,
    currentLanguage,
    currentUnit,
  };
};

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const countryAllData = getCountryAllData();

  let countryConfigs: CountryConfigs[] = [];
  let currentCurrency = "";
  let currentLanguage = "";
  let currentUnit = "";
  countryAllData.then((res) => {
    countryConfigs = res.countryConfigs;
    currentCurrency = res.currentCurrency;
    currentLanguage = res.currentLanguage;
    currentUnit = res.currentUnit;
  });

  const [state, dispatch] = useReducer(languageReducer, {
    selectUnit: {
      currency: currentCurrency,
      unit: currentUnit,
    },
    selectLanguage: currentLanguage,
    unitAndLanguageList: countryConfigs,
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
