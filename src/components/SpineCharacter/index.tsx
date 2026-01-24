import React from 'react'
import { useSpineAnimation } from '@hooks/useSpineAnimation'
import { Spin } from 'antd'
import './style.css'

export interface SpineCharacterProps {
  spineDataUrl: string
  animation?: string
  width?: number
  height?: number
  loop?: boolean
  className?: string
  loading?: boolean
}

const SpineCharacter: React.FC<SpineCharacterProps> = ({
  spineDataUrl,
  animation = 'idle',
  width = 400,
  height = 600,
  loop = true,
  className = '',
  loading = false,
}) => {
  const { containerRef } = useSpineAnimation(spineDataUrl, {
    width,
    height,
    animation,
    loop,
    autoPlay: true,
    backgroundAlpha: 0,
  })

  return (
    <div className={`spine-character-wrapper ${className}`}>
      {loading && (
        <div className="spine-loading">
          <Spin size="large" tip="加载角色中..." />
        </div>
      )}
      <div
        ref={containerRef}
        className="spine-container"
        style={{ width: `${width}px`, height: `${height}px` }}
      />
    </div>
  )
}

export default SpineCharacter
