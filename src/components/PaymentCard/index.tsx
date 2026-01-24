import React, { useState } from 'react'
import { Button, Radio, Space } from 'antd'
import {
  AlipayOutlined,
  WechatOutlined,
  CreditCardOutlined,
  QrcodeOutlined
} from '@ant-design/icons'
import './style.css'

interface PaymentCardProps {
  amount: number
  onConfirm: (paymentMethod: string) => void
  onCancel: () => void
}

const paymentMethods = [
  {
    value: 'alipay',
    label: '支付宝',
    icon: <AlipayOutlined style={{ color: '#1677FF', fontSize: 24 }} />,
    description: '推荐使用，安全快捷',
  },
  {
    value: 'wechat',
    label: '微信支付',
    icon: <WechatOutlined style={{ color: '#07C160', fontSize: 24 }} />,
    description: '支持微信扫码支付',
  },
  {
    value: 'unionpay',
    label: '银联支付',
    icon: <CreditCardOutlined style={{ color: '#E23838', fontSize: 24 }} />,
    description: '支持各类银行卡',
  },
  {
    value: 'qrcode',
    label: '扫码支付',
    icon: <QrcodeOutlined style={{ color: '#8B5CF6', fontSize: 24 }} />,
    description: '通用扫码支付',
  },
]

const PaymentCard: React.FC<PaymentCardProps> = ({
  amount,
  onConfirm,
  onCancel,
}) => {
  const [selectedMethod, setSelectedMethod] = useState('alipay')

  return (
    <div className="payment-card">
      <div className="payment-amount">
        <span className="payment-label">支付金额：</span>
        <span className="payment-value">¥{amount}</span>
      </div>

      <div className="payment-methods">
        <Radio.Group
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
          style={{ width: '100%' }}
        >
          <Space direction="vertical" style={{ width: '100%' }} size={12}>
            {paymentMethods.map((method) => (
              <Radio
                key={method.value}
                value={method.value}
                className="payment-method-item"
              >
                <div className="payment-method-content">
                  <div className="payment-method-left">
                    {method.icon}
                    <div className="payment-method-info">
                      <div className="payment-method-label">{method.label}</div>
                      <div className="payment-method-description">
                        {method.description}
                      </div>
                    </div>
                  </div>
                </div>
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>

      <div className="payment-actions">
        <Button size="large" onClick={onCancel}>
          取消
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => onConfirm(selectedMethod)}
        >
          确认支付
        </Button>
      </div>

      <div className="payment-security">
        🔒 采用银行级加密技术，保障您的支付安全
      </div>
    </div>
  )
}

export default PaymentCard
