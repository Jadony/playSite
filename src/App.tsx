import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
import Payment from "@pages/Payment";
import ProtectedRoute from "./components/ProtectedRoute";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import PaymentReturn from "./pages/PaymentReturn";
import PaymentCancel from "./pages/PaymentCancel";

const { Content } = Layout;

function App() {
  const location = useLocation();
  const isShowBg = (pathname: string) => {
    let showBg = "";
    hasBgPage.forEach((item) => {
      if (pathname.includes(item)) {
        showBg = "light-star-bg";
      }
    });
    return showBg;
  };

  useEffect(() => {
    const handleScreenAuto = () => {
      const designWidth = 2560; // 此处锁定设计稿宽度
      const scale = window.innerWidth / designWidth;

      // 使用 CSS zoom 特性！它可以直接缩放真实的 DOM 盒模型占位，不会产生任何底部留白和多余的横向滚动条！
      document.body.style.zoom = String(scale);
    };

    handleScreenAuto();
    window.addEventListener("resize", handleScreenAuto);

    return () => {
      window.removeEventListener("resize", handleScreenAuto);
      document.body.style.zoom = ""; // 清理
    };
  }, []);

  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="103542172806-v9fh6gl64d995kv8hsilnj5llq8eiidu.apps.googleusercontent.com">
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
                      <Route
                        path="/payment/:orderId"
                        element={
                          <ProtectedRoute>
                            <Payment />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="/invite" element={<Invite />} />
                      <Route path="/about" element={<About />} />
                      <Route
                        path="/user-center"
                        element={
                          <ProtectedRoute>
                            <UserCenter />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/terms-of-service"
                        element={<TermsOfService />}
                      />
                      <Route
                        path="/privacy-policy"
                        element={<PrivacyPolicy />}
                      />
                      <Route path="/refund-policy" element={<RefundPolicy />} />
                      <Route
                        path="/paypal/return"
                        element={<PaymentReturn />}
                      />
                      <Route
                        path="/paypal/cancel"
                        element={<PaymentCancel />}
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
