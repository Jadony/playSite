import React, { useEffect, useState } from "react";
import HeroSection from "@components/HeroSection";
import GameSelector from "@components/GameSelector";
import GameSearch from "@components/GameSearch";
import RechargeSection from "@components/RechargeSection";
import FAQSection from "@components/FAQSection";
import "./style.css";
import AchievementModal from "@/components/AchievementModal";
import { useAuthContext } from "@/store/authStore";
import LoginModal from "@/components/LoginModal";

const Home: React.FC = () => {
  // Modal 状态管理
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) return;
    const time = localStorage.getItem("achievementModalCloseTime") ?? "";
    const nowTime = Date.now();
    if (
      (!time && !isAuthenticated) ||
      (!isAuthenticated && nowTime - Number(time) > 24 * 60 * 60 * 1000)
    ) {
      setIsModalOpen(true);
    }
  }, [isAuthenticated]);

  const closeRegisterModal = () => {
    localStorage.setItem("achievementModalCloseTime", Date.now().toString());
    setIsModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="home-wrap relative min-h-screen text-white selection:bg-purple-500 selection:text-white pb-24">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Game Search (Sticky) */}
      <GameSearch />

      {/* 3. Game Selector (Slider) */}
      <GameSelector />

      {/* 3. Recharge Section (Sidebar + Grid) */}
      <RechargeSection />

      {/* 4. FAQ Area */}
      <section className="container mx-auto px-4 md:px-12 lg:px-24 pt-12">
        <FAQSection />
      </section>
      {isModalOpen ? (
        <AchievementModal closeRegisterModal={closeRegisterModal} />
      ) : null}
      <LoginModal
        visible={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  );
};

export default Home;
