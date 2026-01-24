import { request } from './api'

export interface CreateOrderParams {
  amount: number
  gems: number
  paymentMethod: string
}

export interface RechargeOrder {
  orderId: string
  orderNo: string
  amount: number
  gems: number
  paymentUrl?: string
  qrCode?: string
}

export interface RechargeRecord {
  id: string
  orderNo: string
  amount: number
  gems: number
  paymentMethod: string
  status: 'success' | 'pending' | 'failed'
  createTime: string
}

export interface RechargeHistoryParams {
  page?: number
  pageSize?: number
  status?: string
  startTime?: string
  endTime?: string
}

/**
 * 支付服务
 */
export const paymentService = {
  /**
   * 创建充值订单
   */
  createOrder: async (params: CreateOrderParams): Promise<RechargeOrder> => {
    return request.post('/payment/create-order', params)
  },

  /**
   * 查询订单状态
   */
  queryOrderStatus: async (orderId: string): Promise<{ status: string; data?: any }> => {
    return request.get(`/payment/order-status/${orderId}`)
  },

  /**
   * 获取支付二维码
   */
  getPaymentQRCode: async (orderId: string): Promise<{ qrCode: string }> => {
    return request.get(`/payment/qrcode/${orderId}`)
  },

  /**
   * 取消订单
   */
  cancelOrder: async (orderId: string): Promise<void> => {
    return request.post(`/payment/cancel-order/${orderId}`)
  },

  /**
   * 获取充值历史记录
   */
  getRechargeHistory: async (params: RechargeHistoryParams): Promise<{
    list: RechargeRecord[]
    total: number
    page: number
    pageSize: number
  }> => {
    return request.get('/payment/recharge-history', { params })
  },

  /**
   * 获取支付方式列表
   */
  getPaymentMethods: async (): Promise<Array<{
    value: string
    label: string
    icon: string
    enabled: boolean
  }>> => {
    return request.get('/payment/methods')
  },

  /**
   * 获取充值配置
   */
  getRechargeConfig: async (): Promise<{
    options: Array<{
      id: number
      amount: number
      gems: number
      bonus?: number
      popular?: boolean
      discount?: string
    }>
    firstChargeBonus: number
  }> => {
    return request.get('/payment/config')
  },

  /**
   * 验证支付结果
   */
  verifyPayment: async (orderId: string, paymentData: any): Promise<{
    success: boolean
    message: string
  }> => {
    return request.post('/payment/verify', { orderId, paymentData })
  },
}

export default paymentService
