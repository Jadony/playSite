type CalculateRequestParams = {
  skuId: number;
  quantity: number;
  couponId?: number;
  orderAmount?: number;
};

type CalculateResponseData = {
  originalPrice: number;
  platformPrice: number;
  platformDiscount: number;
  couponDiscount: number;
  totalDiscount: number;
  finalPrice: number;
  selectedCoupon: {
    id: number;
    couponCode: string;
    couponName: string;
    couponType: string;
    discountValue: number;
    minOrderAmount: number;
    maxDiscountAmount: number;
    validFrom: string;
    validTo: string;
    status: number;
    statusDesc: string;
    rules: string;
    source: string;
    remainingSeconds: number;
    available: boolean;
  };
  availableCoupons: {
    id: number;
    couponCode: string;
    couponName: string;
    couponType: string;
    discountValue: number;
    minOrderAmount: number;
    maxDiscountAmount: number;
    validFrom: string;
    validTo: string;
    status: number;
    statusDesc: string;
    rules: string;
    source: string;
    remainingSeconds: number;
    available: boolean;
  }[];
};

type AvailableForOrderParams = {
  orderAmount: string;
};

type AvailableForOrderResponseData = {
  id: number;
  couponCode: string;
  couponName: string;
  couponType: string;
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount: number;
  validFrom: string;
  validTo: string;
  status: number;
  statusDesc: string;
  rules: string;
  source: string;
  remainingSeconds: number;
  available: boolean;
};
