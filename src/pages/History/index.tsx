import React, { useState } from 'react'
import { Table, Card, Tag, Space, DatePicker, Select, Button } from 'antd'
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import './style.css'

const { RangePicker } = DatePicker

interface RechargeRecord {
  id: string
  orderNo: string
  amount: number
  gems: number
  paymentMethod: string
  status: 'success' | 'pending' | 'failed'
  createTime: string
}

const History: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // 模拟数据
  const mockData: RechargeRecord[] = [
    {
      id: '1',
      orderNo: '20240124001',
      amount: 68,
      gems: 780,
      paymentMethod: 'alipay',
      status: 'success',
      createTime: '2024-01-24 12:30:45',
    },
    {
      id: '2',
      orderNo: '20240123001',
      amount: 328,
      gems: 4260,
      paymentMethod: 'wechat',
      status: 'success',
      createTime: '2024-01-23 18:20:30',
    },
    {
      id: '3',
      orderNo: '20240122001',
      amount: 30,
      gems: 330,
      paymentMethod: 'alipay',
      status: 'pending',
      createTime: '2024-01-22 15:10:20',
    },
    {
      id: '4',
      orderNo: '20240121001',
      amount: 128,
      gems: 1536,
      paymentMethod: 'unionpay',
      status: 'failed',
      createTime: '2024-01-21 10:05:15',
    },
  ]

  const getStatusConfig = (status: string) => {
    const configs = {
      success: {
        color: 'success',
        icon: <CheckCircleOutlined />,
        text: '充值成功',
      },
      pending: {
        color: 'processing',
        icon: <ClockCircleOutlined />,
        text: '处理中',
      },
      failed: {
        color: 'error',
        icon: <CloseCircleOutlined />,
        text: '充值失败',
      },
    }
    return configs[status as keyof typeof configs] || configs.pending
  }

  const getPaymentMethodText = (method: string) => {
    const methods: Record<string, string> = {
      alipay: '支付宝',
      wechat: '微信支付',
      unionpay: '银联支付',
      qrcode: '扫码支付',
    }
    return methods[method] || method
  }

  const columns: ColumnsType<RechargeRecord> = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
      width: 150,
    },
    {
      title: '充值金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      render: (amount) => <span className="amount-text">¥{amount}</span>,
    },
    {
      title: '获得钻石',
      dataIndex: 'gems',
      key: 'gems',
      width: 120,
      render: (gems) => <span className="gems-text">{gems} 💎</span>,
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      width: 120,
      render: (method) => getPaymentMethodText(method),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        const config = getStatusConfig(status)
        return (
          <Tag icon={config.icon} color={config.color}>
            {config.text}
          </Tag>
        )
      },
    },
    {
      title: '充值时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
  ]

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="history-page">
      <div className="history-container">
        <Card className="history-card">
          <div className="history-header">
            <h2 className="history-title">充值记录</h2>

            <Space className="history-filters" wrap>
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: 120 }}
                options={[
                  { label: '全部状态', value: 'all' },
                  { label: '充值成功', value: 'success' },
                  { label: '处理中', value: 'pending' },
                  { label: '充值失败', value: 'failed' },
                ]}
              />

              <RangePicker
                defaultValue={[dayjs().subtract(7, 'day'), dayjs()]}
                format="YYYY-MM-DD"
              />

              <Button
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
                loading={loading}
              >
                刷新
              </Button>
            </Space>
          </div>

          <Table
            columns={columns}
            dataSource={mockData}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `共 ${total} 条记录`,
            }}
            scroll={{ x: 800 }}
          />

          <div className="history-summary">
            <div className="summary-item">
              <span className="summary-label">本月累计充值：</span>
              <span className="summary-value amount">¥554</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">本月获得钻石：</span>
              <span className="summary-value gems">6,906 💎</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default History
