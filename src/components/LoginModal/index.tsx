import React, { useState } from 'react'
import { Modal, Input, Button, Checkbox } from 'antd'
import { CloseOutlined, GoogleOutlined, AppleOutlined } from '@ant-design/icons'
import './style.css'

interface LoginModalProps {
    visible: boolean
    onClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ visible, onClose }) => {
    const [email, setEmail] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const handleLogin = () => {
        // Handle login logic here
        console.log('Login with:', { email, verificationCode })
    }

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            closeIcon={<CloseOutlined className="text-white text-xl" />}
            className="login-modal"
            width={800}
            centered
            styles={{
                mask: { backdropFilter: 'blur(8px)' }
            }}
        >
            <div className="login-modal-content">
                {/* Character Image Side */}
                <div className="login-character-side">
                    <div className="character-image-wrapper">
                        {/* Placeholder for character image - will use actual game character */}
                        <div className="character-placeholder">
                            <div className="character-glow"></div>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="login-form-side">
                    {/* Logo */}
                    <div className="login-logo">
                        <div className="logo-icon">⚡</div>
                        <span className="logo-text">LOGO</span>
                    </div>

                    {/* Form Inputs */}
                    <div className="login-form">
                        <Input
                            size="large"
                            placeholder="Please Enter Email"
                            prefix={<span className="text-gray-400">📧</span>}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                        />

                        <Input
                            size="large"
                            placeholder="Verification Code"
                            prefix={<span className="text-gray-400">🔑</span>}
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            className="login-input"
                        />

                        <Button
                            type="primary"
                            size="large"
                            block
                            className="login-button"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>

                        {/* Social Login Icons */}
                        <div className="social-login">
                            <div className="social-icon google">
                                <GoogleOutlined />
                            </div>
                            <div className="social-icon apple">
                                <AppleOutlined />
                            </div>
                            <div className="social-icon">
                                <span>💬</span>
                            </div>
                        </div>

                        {/* Terms Checkbox */}
                        <div className="terms-checkbox">
                            <Checkbox
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                            >
                                <span className="terms-text">
                                    By registering or logging in,you agree to our{' '}
                                    <a href="/privacy" className="terms-link">
                                        Privacy Policy and Terms of Service
                                    </a>
                                </span>
                            </Checkbox>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default LoginModal
