import React from 'react'
import HeroSection from '@components/HeroSection'
import GameSelector from '@components/GameSelector'
import RechargeSection from '@components/RechargeSection'
import FAQSection from '@components/FAQSection'
import './style.css'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-game-background text-white selection:bg-game-primary selection:text-white">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Game Selector (Search + Slider) */}
      <GameSelector />

      {/* 3. Recharge Section (Sidebar + Grid) */}
      <RechargeSection />

      {/* 4. Footer/FAQ Area */}
      <section className="pb-12 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4 pt-12">
          <h2 className="text-2xl font-bold text-center mb-12 text-gray-500">FAQ & Support</h2>
          <FAQSection />
        </div>
      </section>
    </div>
  )
}

export default Home
