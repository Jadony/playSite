import React, { useState } from 'react'
import { Button, Card, message, Modal, Divider } from 'antd'
import {
  WalletOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
  GiftOutlined
} from '@ant-design/icons'
import AmountSelector, { RechargeOption } from '@components/AmountSelector'
import PaymentCard from '@components/PaymentCard'
import { useRechargeStore } from '@store/rechargeStore'
import './style.css'

const rechargeOptions: RechargeOption[] = [
  { id: 1, amount: 6, gems: 60, bonus: 0 },
  { id: 2, amount: 30, gems: 300, bonus: 30, popular: true },
  { id: 3, amount: 68, gems: 680, bonus: 100, discount: '首充双倍' },
  { id: 4, amount: 128, gems: 1280, bonus: 256, popular: true },
  { id: 5, amount: 328, gems: 3280, bonus: 980 },
  { id: 6, amount: 648, gems: 6480, bonus: 2160, discount: '超值' },
]

const RechargePanel: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<RechargeOption | null>(null)
  const [paymentModalVisible, setPaymentModalVisible] = useState(false)
  const { createOrder, isProcessing } = useRechargeStore()

  const handleRecharge = async () => {
    if (!selectedOption) {
      message.warning('请选择充值金额')
      return
    }

    setPaymentModalVisible(true)
  }

  const handlePaymentConfirm = async (paymentMethod: string) => {
    if (!selectedOption) return

    try {
      await createOrder({
        amount: selectedOption.amount,
        gems: selectedOption.gems,
        paymentMethod,
      })

      message.success('支付成功！')
      setPaymentModalVisible(false)
      setSelectedOption(null)
    } catch (error) {
      message.error('支付失败，请重试')
    }
  }

  const totalGems = selectedOption
    ? selectedOption.gems + (selectedOption.bonus || 0)
    : 0

  return (
    <div className="recharge-panel">
      <Card className="recharge-card">
        <div className="recharge-header">
          <h2 className="recharge-title">
            <WalletOutlined /> 选择充值金额
          </h2>
          <div className="recharge-features">
            <div className="feature-item">
              <SafetyOutlined />
              <span>安全支付</span>
            </div>
            <div className="feature-item">
              <ThunderboltOutlined />
              <span>即时到账</span>
            </div>
            <div className="feature-item">
              <GiftOutlined />
              <span>首充优惠</span>
            </div>
          </div>
        </div>

        <AmountSelector
          options={rechargeOptions}
          selected={selectedOption?.id}
          onChange={setSelectedOption}
        />

        <Divider />

        {selectedOption && (
          <div className="recharge-summary">
            <div className="summary-item">
              <span className="summary-label">支付金额：</span>
              <span className="summary-value price">¥{selectedOption.amount}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">获得钻石：</span>
              <span className="summary-value gems">{selectedOption.gems}</span>
            </div>
            {selectedOption.bonus && selectedOption.bonus > 0 && (
              <div className="summary-item bonus">
                <span className="summary-label">额外赠送：</span>
                <span className="summary-value">+{selectedOption.bonus} 💎</span>
              </div>
            )}
            <div className="summary-item total">
              <span className="summary-label">总计钻石：</span>
              <span className="summary-value total-gems">{totalGems} 💎</span>
            </div>
          </div>
        )}

        <Button
          type="primary"
          size="large"
          block
          disabled={!selectedOption || isProcessing}
          loading={isProcessing}
          onClick={handleRecharge}
          className="recharge-button"
        >
          {isProcessing ? '处理中...' : '立即充值'}
        </Button>

        <div className="recharge-tips">
          <p>💡 温馨提示：</p>
          <ul>
            <li>充值成功后钻石将即时到账</li>
            <li>首次充值可享受双倍奖励</li>
            <li>充值遇到问题请联系客服</li>
          </ul>
        </div>
      </Card>

      <Modal
        title="选择支付方式"
        open={paymentModalVisible}
        onCancel={() => setPaymentModalVisible(false)}
        footer={null}
        width={500}
      >
        <PaymentCard
          amount={selectedOption?.amount || 0}
          onConfirm={handlePaymentConfirm}
          onCancel={() => setPaymentModalVisible(false)}
        />
      </Modal>
    </div>
  )
}

export default RechargePanel
