import React from "react";
import HeroSection from "@components/HeroSection";
import GameSelector from "@components/GameSelector";
import GameSearch from "@components/GameSearch";
import RechargeSection from "@components/RechargeSection";
import FAQSection from "@components/FAQSection";
import "./style.css";

const Home: React.FC = () => {
  // Modal 状态管理

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
    </div>
  );
};

export default Home;
