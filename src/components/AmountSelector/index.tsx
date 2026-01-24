import React from 'react'
import { Card } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'
import classNames from 'classnames'
import './style.css'

export interface RechargeOption {
  id: number
  amount: number // 人民币金额
  gems: number // 钻石数量
  bonus?: number // 额外赠送
  popular?: boolean // 是否热门
  discount?: string // 折扣标签
}

interface AmountSelectorProps {
  options: RechargeOption[]
  selected?: number
  onChange?: (option: RechargeOption) => void
}

const AmountSelector: React.FC<AmountSelectorProps> = ({
  options,
  selected,
  onChange,
}) => {
  return (
    <div className="amount-selector-grid">
      {options.map((option) => {
        const isSelected = selected === option.id

        return (
          <Card
            key={option.id}
            className={classNames('amount-card', {
              'amount-card-selected': isSelected,
              'amount-card-popular': option.popular,
            })}
            onClick={() => onChange?.(option)}
            hoverable
          >
            {option.popular && (
              <div className="amount-card-badge">热门</div>
            )}
            {option.discount && (
              <div className="amount-card-discount">{option.discount}</div>
            )}

            <div className="amount-card-content">
              <div className="amount-price">
                <span className="amount-currency">¥</span>
                <span className="amount-value">{option.amount}</span>
              </div>

              <div className="amount-gems">
                <img
                  src="/assets/images/gem-icon.png"
                  alt="钻石"
                  className="gem-icon"
                  onError={(e) => {
                    // 如果图片加载失败，使用emoji作为fallback
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
                <span className="gem-amount">{option.gems}</span>
                <span className="gem-unit">钻石</span>
              </div>

              {option.bonus && (
                <div className="amount-bonus">
                  额外赠送 <span className="bonus-value">+{option.bonus}</span>
                </div>
              )}
            </div>

            {isSelected && (
              <CheckCircleFilled className="amount-check-icon" />
            )}
          </Card>
        )
      })}
    </div>
  )
}

export default AmountSelector
