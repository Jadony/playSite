import usePurchaseHistoryTypes from "@/config/userPurchaseHistoryTypes";
import { useEffect, useState } from "react";
import ProductItem from "../ProductItem";
import OrderDetailContent from "../OrderDetailContent";
import CommonModal from "../CommonModal";
import {
  getOrderDetail,
  getOrderList,
  orderCancel,
  orderRefresh,
} from "@/api/user";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useLanguageContext } from "@/store/languageStore";

const PurchaseHistory = () => {
  const [curType, setCurType] = useState("ALL");
  const [visible, setVisible] = useState(false);
  const [orderData, setOrderData] = useState<OrderListResponseData>();
  const [curOrder, setCurOrder] = useState<OrderDetailResponseData | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const { selectUnit, selectLanguage } = useLanguageContext();
  const navigate = useNavigate();

  const getUserOrderList = async () => {
    try {
      const { data } = await getOrderList({ status: curType });
      setOrderData(data.data);
    } catch (error) {
      message.error("error");
    }
  };

  const getUserOrderDetail = async (orderId: string) => {
    try {
      const { data } = await getOrderDetail(orderId);
      setCurOrder(data.data);
      setVisible(true);
    } catch (error) {
      message.error("error");
    }
  };

  const getOrderRefresh = async (orderId: string) => {
    setLoading(true);
    try {
      const { data } = await orderRefresh(orderId);
      setCurOrder(data.data);
    } catch (error) {
      message.error("error");
    } finally {
      setLoading(false);
    }
  };

  const getOrderCancel = async (orderId: string) => {
    setLoading(true);
    try {
      const { data } = await orderCancel(orderId);
      if (data.data) {
        message.success("success");
      }
    } catch (error) {
      message.error("error");
    } finally {
      setLoading(false);
    }
  };

  const onPayNow = () => {
    navigate(`/payment/${curOrder?.orderNo}`, {
      state: { from: "/user-center" },
    });
  };

  useEffect(() => {
    getUserOrderList();
  }, [curType, selectUnit?.unit, selectLanguage]);

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
        {orderData?.records.map((item) => {
          return (
            <ProductItem
              onClick={() => {
                getUserOrderDetail(item.orderNo);
              }}
              showBorderTop={false}
              product={item}
              status={item.status}
            />
          );
        })}
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
            loading={loading}
            status={curOrder?.status}
            product={curOrder}
            orderInfo={curOrder}
            unit={selectUnit?.unit || ""}
            onPayNow={onPayNow}
            onCancelOrder={() => getOrderCancel(curOrder?.orderNo || "")}
            onRefresh={() => getOrderRefresh(curOrder?.orderNo || "")}
            onBack={() => setVisible(false)}
            countdown={curOrder?.createTimeStamp}
          />
        }
        footer={null}
      />
    </div>
  );
};

export default PurchaseHistory;
