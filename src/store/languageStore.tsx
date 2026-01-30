import { createContext, useContext, useReducer } from "react";

type LanguageContextType = {
  selectLanguage: {
    label: string;
    value: string;
  };
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

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(languageReducer, {
    selectLanguage: {
      label: "English",
      value: "en",
    },
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
