import React from "react";
import "./style.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 按钮变体
   * - primary: 主要按钮，带渐变背景
   * - secondary: 次要按钮，透明背景带边框
   * - ghost: 幽灵按钮，无背景无边框
   * - gradient: 自定义渐变按钮
   */
  variant?: "primary" | "secondary" | "ghost" | "gradient";
  /**
   * 按钮尺寸
   */
  size?: "small" | "medium" | "large";
  /**
   * 是否全宽
   */
  fullWidth?: boolean;
  /**
   * 自定义渐变背景（仅当 variant="gradient" 时生效）
   */
  gradient?: string;
  /**
   * 边框宽度（单位：px），支持小数如 0.5px
   */
  borderWidth?: number;
  /**
   * 边框颜色
   */
  borderColor?: string;
  /**
   * 是否显示发光效果
   */
  glow?: boolean;
  /**
   * 发光颜色
   */
  glowColor?: string;
  /**
   * 是否禁用按钮
   */
  disabled?: boolean;
  /**
   * 子元素
   */
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  gradient,
  borderWidth,
  borderColor = "#FFFFFFCC",
  glow = false,
  glowColor = "rgba(236,72,153,0.5)",
  disabled = false,
  className = "",
  style,
  children,
  ...props
}) => {
  const baseClasses = "custom-button";
  const variantClasses = {
    primary: "button-primary",
    secondary: "button-secondary",
    ghost: "button-ghost",
    gradient: "button-gradient",
  };
  const sizeClasses = {
    small: "button-small",
    medium: "button-medium",
    large: "button-large",
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "button-full-width",
    glow && "button-glow",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const customStyle: React.CSSProperties = {
    ...style,
  };

  // 处理渐变背景（disabled 时也保留）
  if (variant === "gradient" && gradient) {
    customStyle.background = gradient;
    customStyle.backgroundSize = "100% 100%";
    customStyle.backgroundPosition = "center";
  }

  // 处理边框和发光效果（disabled 时会被 CSS 覆盖）
  // 对于细边框，使用 box-shadow inset 来模拟，这是最兼容的方式
  const shadows: string[] = [];

  if (borderWidth !== undefined && borderWidth > 0) {
    customStyle.border = "none";
    shadows.push(`inset 0 0 0 ${borderWidth}px ${borderColor}`);
  }

  if (glow && !disabled) {
    shadows.push(`0 0 20px ${glowColor}`);
  }

  if (shadows.length > 0 && !disabled) {
    customStyle.boxShadow = shadows.join(", ");
  }

  // 如果有发光效果且未禁用，设置 CSS 变量用于 hover 时的增强效果
  if (glow && !disabled) {
    const hoverGlowColor = glowColor.replace(/0\.\d+/, (match) => {
      const num = parseFloat(match);
      return Math.min(num + 0.3, 1).toFixed(1);
    });
    const hoverShadows = [
      ...(borderWidth !== undefined && borderWidth > 0 ? [`inset 0 0 0 ${borderWidth}px ${borderColor}`] : []),
      `0 0 30px ${hoverGlowColor}`,
    ];
    // 使用 React 的 style 对象设置 CSS 变量
    (customStyle as React.CSSProperties & { [key: `--${string}`]: string })["--hover-shadow"] = hoverShadows.join(", ");
  }

  return (
    <button className={classes} style={customStyle} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
