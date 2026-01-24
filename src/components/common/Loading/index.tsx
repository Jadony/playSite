import React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import './style.css'

interface LoadingProps {
  tip?: string
  fullScreen?: boolean
}

const Loading: React.FC<LoadingProps> = ({ tip = '加载中...', fullScreen = false }) => {
  const spinner = <LoadingOutlined style={{ fontSize: 48, color: '#6366f1' }} spin />

  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="loading-content">
          <Spin indicator={spinner} size="large" />
          <p className="loading-tip">{tip}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="loading-container">
      <Spin indicator={spinner} tip={tip} size="large" />
    </div>
  )
}

export default Loading
