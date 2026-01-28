import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Header from "@components/common/Header";
import Footer from "@components/common/Footer";
import Home from "@pages/Home";
import Recharge from "@pages/Recharge";
import History from "@pages/History";
import Profile from "@pages/Profile";
import Games from "@pages/Games";
import Trade from "@pages/Trade";
import Checkout from "@pages/Checkout";
import Invite from "@pages/Invite";
import Dashboard from "@pages/Dashboard";
import SpinePlayer from "@components/SpinePlayer";

const { Content } = Layout;

function App() {
  return (
    <Layout className="min-h-screen bg-game-dark">
      <Header />
      <Content className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recharge" element={<Recharge />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/games" element={<Games />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Content>
      <Footer />
      <div className="flex justify-center pb-4">
        <SpinePlayer
          jsonUrl="/spine/yifuna.json"
          atlasUrl="/spine/yifuna.atlas"
          pngUrl="/spine/yifuna.png"
          animationName="loop"
          scale={0.5}
          width={800}
          height={800}
        />
        <SpinePlayer
          jsonUrl="/spine/bili.json"
          atlasUrl="/spine/bili.atlas"
          pngUrl="/spine/bili.png"
          animationName="loop"
          scale={0.5}
          width={800}
          height={800}
        />
      </div>
    </Layout>
  );
}

export default App;
