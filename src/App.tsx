import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "antd";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import Home from "@pages/Home";
import Games from "@pages/Games";
import Invite from "@pages/Invite";
import "./App.css";
import { AllGamesAndSelectProvider } from "./store/gameStore";
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
    <Layout
      className={`min-h-screen bg-game-dark ${isShowBg(location.pathname)}`}
    >
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
    </Layout>
  );
}

export default App;
