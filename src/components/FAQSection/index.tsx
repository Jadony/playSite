import React, { useState } from 'react'
import { Collapse } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import './style.css'

const { Panel } = Collapse

interface FAQItem {
    question: string
    answer: string
}

interface FAQSectionProps {
    items?: FAQItem[]
}

const defaultFAQItems: FAQItem[] = [
    {
        question: 'What is Skins?',
        answer: 'Skins are cosmetic items that change the appearance of your character or weapons in the game. They do not affect gameplay but allow you to customize your gaming experience and stand out from other players.',
    },
    {
        question: 'How to Buy Skins?',
        answer: 'You can purchase skins through our platform by selecting the game, choosing the skin you want, and completing the payment process. The skin will be delivered to your game account immediately after successful payment.',
    },
    {
        question: 'How to use Coupons?',
        answer: 'To use a coupon, enter the coupon code in the designated field during checkout. The discount will be automatically applied to your total amount. Please note that coupons may have expiration dates and usage restrictions.',
    },
    {
        question: 'How long after purchase?',
        answer: 'Most purchases are delivered instantly to your game account. In some cases, delivery may take up to 5-10 minutes. If you do not receive your items within 24 hours, please contact our customer support team.',
    },
    {
        question: 'What if the goods are not successfully recharged after purchase?',
        answer: 'If you encounter any issues with your purchase, please contact our 24/7 customer support immediately. We will investigate the issue and ensure you receive your items or provide a full refund if necessary.',
    },
]

const FAQSection: React.FC<FAQSectionProps> = ({ items = defaultFAQItems }) => {
    const [activeKey, setActiveKey] = useState<string | string[]>([])

    return (
        <div className="faq-section">
            <h2 className="faq-title">FAQ</h2>
            <Collapse
                activeKey={activeKey}
                onChange={setActiveKey}
                expandIcon={({ isActive }) =>
                    isActive ? (
                        <MinusOutlined className="faq-icon" />
                    ) : (
                        <PlusOutlined className="faq-icon" />
                    )
                }
                className="faq-collapse"
                ghost
            >
                {items.map((item, index) => (
                    <Panel header={item.question} key={index.toString()} className="faq-panel">
                        <p className="faq-answer">{item.answer}</p>
                    </Panel>
                ))}
            </Collapse>
        </div>
    )
}

export default FAQSection
