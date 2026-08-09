/*
 * @Author: 安风 2196477263@qq.com
 * @Date: 2026-07-23 16:15:19
 * @LastEditors: 安风 2196477263@qq.com
 * @LastEditTime: 2026-08-09 22:35:28
 * @FilePath: /playSite/src/components/Tilt/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

// 自定义选项类型（完全独立，不会与任何外部类型冲突）
interface TiltOptions {
  max?: number;
  speed?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
  "max-glare"?: number;
  axis?: "x" | "y" | null;
}

interface TiltProps {
  className?: string;
  children: React.ReactNode;
  options?: TiltOptions;
}

const Tilt: React.FC<TiltProps> = ({ children, className, options }) => {
  const tiltRef = useRef<HTMLDivElement>(null);
  // 用 any 存储实例，避开所有类型推断麻烦
  const instanceRef = useRef<any>(null);

  useEffect(() => {
    const element = tiltRef.current;
    if (!element) return;

    // 清理之前的实例（如果有）
    if (instanceRef.current) {
      instanceRef.current.destroy?.();
      instanceRef.current = null;
    }

    const defaultOptions: TiltOptions = {
      max: 10,
      speed: 400,
    };

    const finalOptions = { ...defaultOptions, ...options };

    // 初始化并强制断言为 any，确保不报类型错误
    // 运行时真实返回一个包含 destroy 的对象
    const instance: any = VanillaTilt.init(element, finalOptions);

    // 如果返回有效对象且具有 destroy 方法，则保存
    if (instance && typeof instance.destroy === "function") {
      instanceRef.current = instance;
    } else {
      // 极少数情况下，可能返回 undefined 或没有 destroy，
      // 此时尝试通过 DOM 属性获取实例（备用方案）
      const fallbackInstance = (element as any).vanillaTilt;
      if (fallbackInstance && typeof fallbackInstance.destroy === "function") {
        instanceRef.current = fallbackInstance;
      }
    }

    // 清理函数
    return () => {
      if (instanceRef.current) {
        instanceRef.current.destroy?.();
        instanceRef.current = null;
      }
    };
  }, [options]);

  return (
    <div ref={tiltRef} className={className}>
      {children}
    </div>
  );
};

export default Tilt;
