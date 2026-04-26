import request from "@/utils/request";

const urls = {
  calculate: "/front/coupons/calculate",
  availableForOrder: "/front/coupons/available-for-order",
  recentOrders: "/front/orders/recent",
  createOrder: "/front/orders/create",
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
