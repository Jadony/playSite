import React, { useState } from "react";
import HeroSection from "@components/HeroSection";
import GameSelector from "@components/GameSelector";
import GameSearch from "@components/GameSearch";
import RechargeSection from "@components/RechargeSection";
import FAQSection from "@components/FAQSection";
import CommonModal from "@components/CommonModal";
import PrimaryButton from "@components/PrimaryButton";
import Coupon from "@components/Coupon";
import "./style.css";

const Home: React.FC = () => {
  // Modal 状态管理
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);

  return (
    <div className="home-wrap relative min-h-screen text-white selection:bg-purple-500 selection:text-white pb-24">
      {/* 7个测试按钮 */}
      <div
        style={{
          position: "fixed",
          top: "100px",
          right: "20px",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          background: "rgba(0, 0, 0, 0.7)",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <PrimaryButton
          size="small"
          onClick={() => setSuccessModalVisible(true)}
        >
          1. 兑换成功
        </PrimaryButton>
        <PrimaryButton
          size="small"
          onClick={() => setFailureModalVisible(true)}
        >
          2. 兑换失败
        </PrimaryButton>
      </div>
      <div>
        {/* 1. 兑换成功 Modal */}
        <CommonModal
          visible={successModalVisible}
          onClose={() => setSuccessModalVisible(false)}
          title="兑换成功"
          content={
            <Coupon
              variant="purple"
              discount={5}
              minOrder={100}
              maxSave={20}
              onUse={() => console.log("使用优惠券")}
            />
          }
          width={480}
          footer={null}
        />

        {/* 2. 兑换失败 Modal */}
        <CommonModal
          visible={failureModalVisible}
          onClose={() => setFailureModalVisible(false)}
          title="兑换失败"
          content={
            <div>
              <div style={{ marginBottom: "8px" }}>
                兑换码无效，请再次尝试或联系
              </div>
              <div>找媒体管理员</div>
            </div>
          }
          width={480}
          footer={null}
        />
      </div>
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
