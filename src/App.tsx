import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "antd";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConfigProvider, theme } from "antd";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import Home from "@pages/Home";
import Games from "@pages/Games";
import Invite from "@pages/Invite";
import "./App.css";
import AllGamesAndSelectProvider from "./store/gameStore";
import LanguageProvider from "./store/languageStore";
import { hasBgPage } from "./config";
import AuthProvider from "./store/authStore";
import GameItemDetail from "@pages/GameItemDetail";
import About from "@pages/About";
import UserCenter from "@pages/UserCenter";
import ProtectedRoute from "./components/ProtectedRoute";

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
    <AuthProvider>
      <GoogleOAuthProvider clientId="1006552427972-d6sah06kgcscm233lp3oqfvo1kt9b13r.apps.googleusercontent.com">
        <I18nextProvider i18n={i18n}>
          <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
            <Layout
              className={`min-h-screen bg-game-dark ${isShowBg(location.pathname)}`}
            >
              <LanguageProvider>
                <AllGamesAndSelectProvider>
                  <Header />
                  <Content className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/games" element={<Games />}></Route>
                      <Route path="/games/:id" element={<GameItemDetail />} />
                      <Route path="/invite" element={<Invite />} />
                      <Route path="/about" element={<About />} />
                      <Route
                        path="/user-center"
                        element={
                          // <ProtectedRoute>
                          <UserCenter />
                          // </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </Content>
                  <Footer />
                </AllGamesAndSelectProvider>
              </LanguageProvider>
            </Layout>
          </ConfigProvider>
        </I18nextProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
