import React, { useState } from 'react'
import { Button, Input, Radio, Space } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './style.css'

const Checkout: React.FC = () => {
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const [paymentMethod, setPaymentMethod] = useState('visa')
    const [couponCode, setCouponCode] = useState('')

    const basePrice = 200.50
    const discount = 234
    const subtotal = basePrice * quantity
    const handlingFee = 234
    const totalAmount = subtotal - discount + handlingFee

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <Button
                    type="text"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate(-1)}
                    className="back-button"
                >
                    Return a list of products
                </Button>

                <div className="checkout-content">
                    {/* Product Summary */}
                    <div className="product-section">
                        <div className="product-card">
                            <img
                                src="https://picsum.photos/seed/zenless/200/200"
                                alt="Zenless Zone Zero"
                                className="product-image"
                            />
                            <div className="product-info">
                                <h3 className="product-title">Zenless Zone Zero</h3>
                                <p className="product-subtitle">Top-up game available 0.1$</p>
                                <div className="product-price">$ {basePrice}</div>
                            </div>
                        </div>

                        <div className="quantity-control">
                            <Button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</Button>
                            <span className="quantity-value">{quantity}</span>
                            <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="payment-section">
                        <h3 className="section-title">Payment details</h3>

                        {/* Cost Breakdown */}
                        <div className="cost-breakdown">
                            <div className="cost-row">
                                <span>Cost of goods</span>
                                <span className="cost-value primary">${basePrice}</span>
                            </div>
                            <div className="cost-row">
                                <span>Discount</span>
                                <span className="cost-value secondary">-${discount}</span>
                            </div>
                            <div className="cost-row">
                                <span>Handling fee</span>
                                <span className="cost-value">${handlingFee}</span>
                            </div>
                            <div className="total-row">
                                <span>Total payment</span>
                                <span className="total-value">$ {totalAmount.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Coupon Code */}
                        <div className="coupon-section">
                            <Input
                                placeholder="Find the redemption code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="coupon-input"
                            />
                            <Button className="coupon-button">Confirm</Button>
                        </div>

                        {/* Payment Methods */}
                        <div className="payment-methods">
                            <Radio.Group value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <div className="payment-option">
                                        <Radio value="visa">
                                            <span className="payment-label">💳 VISA</span>
                                        </Radio>
                                        <span className="payment-amount">$234</span>
                                    </div>
                                    <div className="payment-option">
                                        <Radio value="usd">
                                            <span className="payment-label">💵 USD</span>
                                        </Radio>
                                        <span className="payment-amount">$234</span>
                                    </div>
                                    <div className="payment-option">
                                        <Radio value="usdt">
                                            <span className="payment-label">₮ USDT</span>
                                        </Radio>
                                        <span className="payment-amount">$234</span>
                                    </div>
                                    <div className="payment-option">
                                        <Radio value="other">
                                            <span className="payment-label">💰 Other</span>
                                        </Radio>
                                        <span className="payment-amount">$234</span>
                                    </div>
                                </Space>
                            </Radio.Group>
                        </div>

                        <div className="payment-note">
                            <span>Don't have the payment method you want?</span>
                        </div>

                        <Button type="primary" size="large" block className="payment-button">
                            Payment
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
