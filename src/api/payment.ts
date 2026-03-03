import request from "@/utils/request";

const urls = {
  calculate: "/front/coupons/calculate",
  availableForOrder: "/front/coupons/available-for-order",
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
