import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "antd";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import Home from "@pages/Home";
import Games from "@pages/Games";
import Invite from "@pages/Invite";
import "./App.css";
import AllGamesAndSelectProvider from "./store/gameStore";
import LanguageProvider from "./store/languageStore";
import { hasBgPage } from "./config";

const { Content } = Layout;

function App() {
  const location = useLocation();
  const isShowBg = (pathname: string) => {
    if (hasBgPage.includes(pathname)) {
      return "light-star-bg";
    }
    return "";
  };
  return (
    <GoogleOAuthProvider clientId="1006552427972-d6sah06kgcscm233lp3oqfvo1kt9b13r.apps.googleusercontent.com">
      <I18nextProvider i18n={i18n}>
        <Layout
          className={`min-h-screen bg-game-dark ${isShowBg(location.pathname)}`}
        >
          <LanguageProvider>
            <AllGamesAndSelectProvider>
              <Header />
              <Content className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/invite" element={<Invite />} />
                </Routes>
              </Content>
              <Footer />
            </AllGamesAndSelectProvider>
          </LanguageProvider>
        </Layout>
      </I18nextProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
