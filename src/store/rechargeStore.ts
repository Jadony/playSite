import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface RechargeOrder {
  amount: number
  gems: number
  paymentMethod: string
}

interface RechargeRecord {
  id: string
  orderNo: string
  amount: number
  gems: number
  paymentMethod: string
  status: 'success' | 'pending' | 'failed'
  createTime: string
}

interface RechargeState {
  // 状态
  isProcessing: boolean
  currentOrder: RechargeOrder | null
  rechargeHistory: RechargeRecord[]
  userBalance: {
    gems: number
    totalRecharge: number
  }

  // 操作
  createOrder: (order: RechargeOrder) => Promise<void>
  updateOrderStatus: (orderId: string, status: string) => void
  fetchRechargeHistory: () => Promise<void>
  updateUserBalance: (gems: number) => void
  reset: () => void
}

const initialState = {
  isProcessing: false,
  currentOrder: null,
  rechargeHistory: [],
  userBalance: {
    gems: 1234,
    totalRecharge: 0,
  },
}

export const useRechargeStore = create<RechargeState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        createOrder: async (order: RechargeOrder) => {
          set({ isProcessing: true })

          try {
            // 模拟API调用
            await new Promise((resolve) => setTimeout(resolve, 1500))

            const newRecord: RechargeRecord = {
              id: Date.now().toString(),
              orderNo: `ORD${Date.now()}`,
              amount: order.amount,
              gems: order.gems,
              paymentMethod: order.paymentMethod,
              status: 'success',
              createTime: new Date().toLocaleString('zh-CN'),
            }

            set((state) => ({
              rechargeHistory: [newRecord, ...state.rechargeHistory],
              userBalance: {
                gems: state.userBalance.gems + order.gems,
                totalRecharge: state.userBalance.totalRecharge + order.amount,
              },
              currentOrder: null,
              isProcessing: false,
            }))
          } catch (error) {
            set({ isProcessing: false })
            throw error
          }
        },

        updateOrderStatus: (orderId: string, status: string) => {
          set((state) => ({
            rechargeHistory: state.rechargeHistory.map((record) =>
              record.id === orderId
                ? { ...record, status: status as RechargeRecord['status'] }
                : record
            ),
          }))
        },

        fetchRechargeHistory: async () => {
          try {
            // 模拟API调用
            await new Promise((resolve) => setTimeout(resolve, 500))
            // 这里可以从API获取充值历史
          } catch (error) {
            console.error('Failed to fetch recharge history:', error)
          }
        },

        updateUserBalance: (gems: number) => {
          set((state) => ({
            userBalance: {
              ...state.userBalance,
              gems: state.userBalance.gems + gems,
            },
          }))
        },

        reset: () => {
          set(initialState)
        },
      }),
      {
        name: 'recharge-storage',
        partialize: (state) => ({
          rechargeHistory: state.rechargeHistory,
          userBalance: state.userBalance,
        }),
      }
    )
  )
)
