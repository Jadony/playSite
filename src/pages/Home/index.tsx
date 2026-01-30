import React, { useState } from "react";
import HeroSection from "@components/HeroSection";
import GameSelector from "@components/GameSelector";
import GameSearch from "@components/GameSearch";
import RechargeSection from "@components/RechargeSection";
import FAQSection from "@components/FAQSection";
import CommonModal from "@components/CommonModal";
import PrimaryButton from "@components/PrimaryButton";
import Coupon from '@components/Coupon';
import OrderDetailContent from '@components/OrderDetailContent';
import ProductItem from '@components/ProductItem';
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
  }

  const mockProduct = {
    image: "/src/assets/gameItems/gameitem1.svg",
    name: "Zenless Zone Zero",
    quantity: 1,
    uid: "123224215",
    server: "132457783445345",
    totalPrice: "260.90",
  }

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
        <PrimaryButton size="small" onClick={() => setGenderModalVisible(true)}>
          3. 选择性别
        </PrimaryButton>
        <PrimaryButton size="small" onClick={() => setEmailModalVisible(true)}>
          4. 设定邮箱
        </PrimaryButton>
        <PrimaryButton
          size="small"
          onClick={() => setNewPasswordModalVisible(true)}
        >
          5. 设定新密码
        </PrimaryButton>
        <PrimaryButton
          size="small"
          onClick={() => setChangePasswordModalVisible(true)}
        >
          6. 修改密码
        </PrimaryButton>
        <PrimaryButton
          size="small"
          onClick={() => setEditProfileModalVisible(true)}
        >
          7. 编辑资料
        </PrimaryButton>
      </div>

      {/* 1. 兑换成功 Modal */}
      <CommonModal
        visible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
        title="兑换成功"
        content={
          <Coupon variant="purple" discount={5} minOrder={100} maxSave={20} onUse={() => console.log("使用优惠券")} />
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

      {/* 3. 选择性别 Modal */}
      <CommonModal
        visible={genderModalVisible}
        onClose={() => setGenderModalVisible(false)}
        title="Gender"
        width={460}
        content={
          <div style={{ textAlign: "left" }}>
            {[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ].map((option, index) => (
              <label
                key={option.value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px",
                  marginBottom: index < 2 ? "8px" : 0,
                  height: "62px",
                  cursor: "pointer",
                  borderRadius: "10px",
                  backgroundColor:
                    gender === option.value
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                  transition: "background-color 0.2s ease",
                }}
              >
                <input
                  type="radio"
                  name="gender"
                  value={option.value}
                  checked={gender === option.value}
                  onChange={(e) => {
                    setGender(e.target.value);
                    console.log("选择的性别:", e.target.value);
                  }}
                  className="gender-radio"
                  style={{ marginRight: "12px", cursor: "pointer" }}
                />
                <span style={{ color: "#fff" }}>{option.label}</span>
              </label>
            ))}
          </div>
        }
        footer={null}
      />

      {/* 4. 设定邮箱 Modal */}
      <CommonModal
        visible={emailModalVisible}
        onClose={() => setEmailModalVisible(false)}
        title="设定邮箱"
        content={
          <div>
            {/* 邮箱地址输入框 */}
            <div
              style={{
                position: "relative",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "16px",
                  zIndex: 1,
                }}
              >
                图
              </span>
              <input
                type="email"
                placeholder="请输入邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  background: "#2a2a2a",
                  border: "1px solid #444",
                  borderRadius: "9999px",
                  color: "#fff",
                  fontSize: "14px",
                }}
              />
            </div>

            {/* 验证码输入框 */}
            <div
              style={{
                position: "relative",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div style={{ position: "relative", flex: 1 }}>
                <span
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "16px",
                    zIndex: 1,
                  }}
                >
                  图
                </span>
                <input
                  type="text"
                  placeholder="请输入验证码"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 80px 12px 40px",
                    background: "#2a2a2a",
                    border: "1px solid #444",
                    borderRadius: "9999px",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                />
                <button
                  onClick={() => console.log("发送验证码")}
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    color: "#999",
                    fontSize: "12px",
                    cursor: "pointer",
                    zIndex: 1,
                  }}
                >
                  Send
                </button>
              </div>
            </div>

            {/* 说明文字 */}
            <div
              style={{
                marginTop: "8px",
                fontSize: "14px",
                color: "#fff",
                textAlign: "left",
                lineHeight: "20px",
              }}
            >
              一个账户只能绑定一个固定电子邮箱，用于接受重要通知，验证密码等
            </div>
          </div>
        }
        primaryButtonText="确认"
        onPrimaryClick={() => {
          console.log("设定的邮箱:", email);
          console.log("验证码:", verificationCode);
          setEmailModalVisible(false);
        }}
        primaryButtonDisabled={!email || !verificationCode}
      />

      {/* 5. 设定新密码 Modal */}
      <CommonModal
        visible={newPasswordModalVisible}
        onClose={() => setNewPasswordModalVisible(false)}
        title="设定新密码"
        content={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            {/* 新密码输入框 */}
            <div
              style={{
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "16px",
                  zIndex: 1,
                }}
              >
                图
              </span>
              <input
                type="password"
                placeholder="请输入新密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  background: "#2a2a2a",
                  border: "1px solid #444",
                  borderRadius: "9999px",
                  color: "#fff",
                  fontSize: "14px",
                }}
              />
            </div>

            {/* 确认密码输入框 */}
            <div
              style={{
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "16px",
                  zIndex: 1,
                }}
              >
                图
              </span>
              <input
                type="password"
                placeholder="请再次输入新密码"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  background: "#2a2a2a",
                  border: "1px solid #444",
                  borderRadius: "9999px",
                  color: "#fff",
                  fontSize: "14px",
                }}
              />
            </div>
          </div>
        }
        primaryButtonText="确认"
        onPrimaryClick={() => {
          if (password !== confirmPassword) {
            alert("两次密码不一致");
            return;
          }
          console.log("设定的新密码");
          setNewPasswordModalVisible(false);
        }}
        primaryButtonDisabled={!password || !confirmPassword}
      />

      {/* 6. 修改密码 Modal（带两个按钮） */}
      <CommonModal
        visible={changePasswordModalVisible}
        onClose={() => setChangePasswordModalVisible(false)}
        title="修改密码"
        content={
          <div>
            {/* 验证码输入框 */}
            <div
              style={{
                position: "relative",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div style={{ position: "relative", flex: 1 }}>
                <span
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "16px",
                    zIndex: 1,
                  }}
                >
                  图
                </span>
                <input
                  type="text"
                  placeholder="请输入验证码"
                  value={changePasswordCode}
                  onChange={(e) => setChangePasswordCode(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 80px 12px 40px",
                    background: "#2a2a2a",
                    border: "1px solid #444",
                    borderRadius: "9999px",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                />
                <button
                  onClick={() => console.log("发送验证码")}
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    color: "#999",
                    fontSize: "12px",
                    cursor: "pointer",
                    zIndex: 1,
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        }
        footer={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              width: "100%",
            }}
          >
            <PrimaryButton
              onClick={() => {
                console.log("确认修改密码");
                setChangePasswordModalVisible(false);
              }}
              disabled={!changePasswordCode}
              fullWidth
            >
              确认
            </PrimaryButton>
            <button
              onClick={() => console.log("去绑定邮箱")}
              style={{
                background: "transparent",
                border: "none",
                color: "#DB7DFF",
                fontSize: "12px",
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              去绑定邮箱
            </button>
          </div>
        }
      />

      {/* 7. 编辑资料 Modal */}
      <CommonModal
        visible={editProfileModalVisible}
        onClose={() => setEditProfileModalVisible(false)}
        title="编辑姓名"
        content={
          <input
            type="text"
            placeholder="请输入您的昵称"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              background: "#2a2a2a",
              border: "1px solid #444",
              borderRadius: "9999px",
              color: "#fff",
              fontSize: "14px",
            }}
          />
        }
        primaryButtonText="确认"
        onPrimaryClick={() => {
          console.log("编辑的姓名:", name);
          setEditProfileModalVisible(false);
        }}
        primaryButtonDisabled={!name}
      />
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

        <div className="flex gap-4">
          {/* 紫色样式（带纸屑） */}
          <Coupon variant="purple" discount={5} minOrder={100} maxSave={20} onUse={() => console.log("使用优惠券")} />

          {/* 深灰色样式 */}
          <Coupon variant="dark" discount={5} minOrder={100} maxSave={20} onUse={() => console.log("使用优惠券")} />
        </div>

        <ProductItem product={mockProduct} status="in_progress" />
        <ProductItem product={mockProduct} status="paying" />
        <ProductItem product={mockProduct} status="completed" />
        <ProductItem product={mockProduct} status="refund" />
        <ProductItem product={mockProduct} status="pending" />
        <ProductItem product={mockProduct} status="cancelled" />

        <OrderDetailContent
          status="paying"
          product={mockProduct}
          orderInfo={mcokOrderInfo}
          onBack={() => console.log("返回")}
          countdown="00:00:43"
        />

        <OrderDetailContent
          status="completed"
          product={mockProduct}
          orderInfo={mcokOrderInfo}
          onBack={() => console.log("返回")}
        />

        <OrderDetailContent
          status="refund"
          product={mockProduct}
          orderInfo={mcokOrderInfo}
          onBack={() => console.log("返回")}
        />

        <OrderDetailContent
          status="pending"
          product={mockProduct}
          orderInfo={mcokOrderInfo}
          onBack={() => console.log("返回")}
        />

        <OrderDetailContent
          status="cancelled"
          product={mockProduct}
          orderInfo={mcokOrderInfo}
          onBack={() => console.log("返回")}
        />

        <OrderDetailContent
          status="in_progress"
          product={mockProduct}
          orderInfo={mcokOrderInfo}
          onBack={() => console.log("返回")}
        />

        <FAQSection />


      </section>
    </div>
  );
};

export default Home;
