/**
 * 格式化金额
 * @param amount 金额
 * @param decimals 小数位数
 * @returns 格式化后的金额字符串
 */
export const formatAmount = (amount: number, decimals: number = 2): string => {
  return amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * 格式化数字（带单位）
 * @param num 数字
 * @returns 格式化后的数字字符串
 */
export const formatNumber = (num: number): string => {
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1) + "亿";
  } else if (num >= 10000) {
    return (num / 10000).toFixed(1) + "万";
  } else {
    return num.toString();
  }
};

/**
 * 防抖函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

/**
 * 节流函数
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;

  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * 深拷贝
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as any;

  const clonedObj = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
};

/**
 * 生成唯一ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * 存储到 localStorage
 */
export const storage = {
  set: (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to set localStorage:", error);
    }
  },

  get: <T = any>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Failed to get localStorage:", error);
      return null;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Failed to remove localStorage:", error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Failed to clear localStorage:", error);
    }
  },
};

/**
 * 复制到剪贴板
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
};

/**
 * 下载文件
 */
export const downloadFile = (url: string, filename: string): void => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
};

interface EmailOptions {
  allowDisplayName?: boolean;
  requireTld?: boolean;
  customRegex?: RegExp;
}

export function isValidEmail(
  email: string,
  options: EmailOptions = {},
): boolean {
  const { allowDisplayName = false, requireTld = true, customRegex } = options;

  if (customRegex) {
    return customRegex.test(email);
  }

  const baseEmailRegex =
    /^(?=[A-Za-z0-9][A-Za-z0-9@._%+-]{0,253}$)(?:[A-Za-z0-9._%+-]+@)(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?$/;
  const displayNameRegex =
    /^[^<>]+<[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?>$/;

  let regex = baseEmailRegex;
  if (allowDisplayName) {
    regex = new RegExp(`${displayNameRegex.source}|${baseEmailRegex.source}`);
  }

  if (!requireTld) {
    regex =
      /^(?=[A-Za-z0-9][A-Za-z0-9@._%+-]{0,253}$)(?:[A-Za-z0-9._%+-]+@)(?:[A-Za-z0-9-]+\.)+[A-Za-z0-9]+$/;
  }

  return regex.test(email);
}

export const isPasswordValid = (password: string) => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;
  return passwordRegex.test(password);
};
