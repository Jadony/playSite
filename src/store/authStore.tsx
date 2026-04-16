/* eslint-disable @typescript-eslint/no-explicit-any */
// contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import {
  getUserInfo,
  loginEmail,
  loginGoogle,
  registerEmail,
} from "@/api/user";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  registerEmailLogin: (
    params: RegisterEmailRequestParams,
    callback?: () => void,
  ) => void;
  login: (params: LoginEmailRequestParams, callback?: () => void) => void;
  loginWithGoogle: (
    params: LoginGoogleRequestParams,
    callback?: () => void,
  ) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  // 状态：用户信息和加载状态
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkLoginAuth = async () => {
    try {
      const { data } = await getUserInfo();
      if (data.code === 200) {
        const userInfo = localStorage.getItem("user");
        setUser(JSON.parse(userInfo || "{}"));
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  // 初始化：检查登录态
  useEffect(() => {
    checkLoginAuth();
  }, []);

  const registerEmailLogin = async (
    params: RegisterEmailRequestParams,
    callback?: () => void,
  ) => {
    try {
      const { data } = await registerEmail(params);
      if (data.code === 200) {
        setUser(data.data);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        callback?.();
        message.success("success");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const loginWithGoogle = async (
    params: LoginGoogleRequestParams,
    callback?: () => void,
  ) => {
    try {
      const { data } = await loginGoogle(params);
      if (data.code === 200) {
        setUser(data.data);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        callback?.();
        message.success("success");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const login = async (
    params: LoginEmailRequestParams,
    callback?: () => void,
  ) => {
    try {
      const { data } = await loginEmail(params);
      if (data.data && data.data.userId) {
        setUser(data.data);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        callback?.();
      } else {
        message.error(t("common.incorrectEmailOrPassword"));
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  // 核心方法：登出
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    // 可选：通知后端 token 失效
  };

  // 暴露的 context 值
  const value = {
    user,
    loading,
    registerEmailLogin,
    login,
    loginWithGoogle,
    logout,
    setUser,
    isAuthenticated: !!user, // 便捷的认证状态
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

// 自定义 Hook，方便在任何组件中使用
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 内使用");
  }
  return context;
};
