import React, { useState } from "react";
import HeroSection from "@components/HeroSection";
import GameSelector from "@components/GameSelector";
import GameSearch from "@components/GameSearch";
import RechargeSection from "@components/RechargeSection";
import FAQSection from "@components/FAQSection";
import CommonModal from "@components/CommonModal";
import PrimaryButton from "@components/PrimaryButton";
import Coupon from "@components/Coupon";
import OrderDetailContent from "@components/OrderDetailContent";
import ProductItem from "@components/ProductItem";
import "./style.css";

const Home: React.FC = () => {
  // Modal 状态管理
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [newPasswordModalVisible, setNewPasswordModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);

  // 表单状态
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordCode, setChangePasswordCode] = useState("");
  const [name, setName] = useState("");

  const mcokOrderInfo = {
    orderNo: "12121412423678",
    paymentMethod: "银联充值",
    orderTime: "2025.12.30 15:30:23",
    originalPrice: "$199.9",
    discount: "-$56",
  };

  const mockProduct = {
    image: "/src/assets/gameItems/gameitem1.svg",
    name: "Zenless Zone Zero",
    quantity: 1,
    uid: "123224215",
    server: "132457783445345",
    totalPrice: "260.90",
  };

  return (
    <div className="home-wrap relative min-h-screen text-white selection:bg-purple-500 selection:text-white pb-24">
      {/* 7个测试按钮 */}

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
