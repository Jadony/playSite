import usePurchaseHistoryTypes from "@/config/userPurchaseHistoryTypes";
import { useState } from "react";
import ProductItem from "../ProductItem";
import OrderDetailContent from "../OrderDetailContent";
import CommonModal from "../CommonModal";

const mockProduct = {
  image: "/src/assets/gameItems/gameitem1.svg",
  name: "Zenless Zone Zero",
  quantity: 1,
  uid: "123224215",
  server: "132457783445345",
  totalPrice: "260.90",
  date: "2025.12.30 15:30",
};

const mcokOrderInfo = {
  orderNo: "12121412423678",
  paymentMethod: "银联充值",
  orderTime: "2025.12.30 15:30:23",
  originalPrice: "$199.9",
  discount: "-$56",
};

const PurchaseHistory = () => {
  const [curType, setCurType] = useState("ALL");
  const [visible, setVisible] = useState(false);

  const changePurchaseType = (type: string) => {
    setCurType(type);
  };
  return (
    <div>
      <div className="flex gap-2.5 mt-5">
        {usePurchaseHistoryTypes().map((item) => {
          return (
            <div
              onClick={() => changePurchaseType(item.value)}
              className="px-6 py-2.5 border border-white/10 p-2 rounded-lg cursor-pointer hover:bg-white/10 text-sm font-medium"
              style={{
                backgroundColor:
                  curType === item.value ? "rgba(255,255,255,0.1)" : "",
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
      <div>
        <ProductItem
          onClick={() => {
            setVisible(true);
          }}
          showBorderTop={false}
          product={mockProduct}
          status="in_progress"
        />
        <ProductItem product={mockProduct} status="paying" />
        <ProductItem product={mockProduct} status="completed" />
        <ProductItem product={mockProduct} status="refund" />
        {/* <ProductItem product={mockProduct} status="pending" /> */}
        <ProductItem product={mockProduct} status="cancelled" />
        {/* <OrderDetailContent
          status="in_progress"
          product={mockProduct}
          orderInfo={mcokOrderInfo}
          onBack={() => console.log("返回")}
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
          status="cancelled"
          product={mockProduct}
          orderInfo={mcokOrderInfo}
          onBack={() => console.log("返回")}
          /> */}
        {/* <OrderDetailContent
            status="pending"
            product={mockProduct}
            orderInfo={mcokOrderInfo}
            onBack={() => console.log("返回")}
          /> */}
      </div>
      <CommonModal
        className="p-0"
        visible={visible}
        width={945}
        onClose={() => setVisible(false)}
        showClose={false}
        content={
          <OrderDetailContent
            status="paying"
            product={mockProduct}
            orderInfo={mcokOrderInfo}
            onBack={() => setVisible(false)}
            countdown={5}
          />
        }
        footer={null}
      />
    </div>
  );
};

export default PurchaseHistory;
