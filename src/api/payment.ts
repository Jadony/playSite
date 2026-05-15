/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-03-03 19:31:25
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-05-14 16:07:08
 * @FilePath: /playSite/src/api/payment.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/utils/request";

const urls = {
  calculate: "/front/coupons/calculate",
  availableForOrder: "/front/coupons/available-for-order",
  recentOrders: "/front/orders/recent",
  createOrder: "/front/orders/create",
  createPayPalOrder: "/front/paypal/orders",
  capturePayPalOrder: "/front/paypal/orders/capture",
};

export const availableForOrder = (params: AvailableForOrderParams) => {
  return request<AvailableForOrderResponseData[]>({
    url: urls.availableForOrder,
    method: "get",
    params,
  });
};

export const calculate = (params: CalculateRequestParams) => {
  return request<CalculateResponseData>({
    url: urls.calculate,
    method: "post",
    params,
  });
};

export const recentOrders = (params: RecentOrdersParams) => {
  return request<RecentOrdersResponseData[]>({
    url: `${urls.recentOrders}/${params.skuId}`,
    method: "post",
  });
};

export const createOrder = (params: CreateOrderParams) => {
  return request<CreateOrderResponseData>({
    url: urls.createOrder,
    method: "post",
    params,
  });
};

/**
 * 创建 PayPal 订单
 */
export const createPayPalOrder = (data: createPayPalOrderParams) => {
  return request<createPayPalOrderData>({
    url: urls.createPayPalOrder,
    method: "post",
    params: data,
  });
};

/**
 * 捕获 PayPal 支付
 */
export const capturePayPalOrder = (data: capturePayPalOrderParams) => {
  return request<capturePayPalOrderData>({
    url: urls.capturePayPalOrder,
    method: "post",
    params: data,
  });
};
