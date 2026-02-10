import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/store/authStore";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    // 可以返回一个加载组件
    return <div>加载中...</div>;
  }

  if (!isAuthenticated) {
    // 未登录则重定向到登录页，并携带当前路径以便登录后返回
    return <Navigate to="/" replace />;
  }

  // 已登录则渲染子组件（受保护的页面）
  return children;
};

export default ProtectedRoute;
