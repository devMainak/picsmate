import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, verifyAuth, loading } = useAuth();

  useEffect(() => {
    verifyAuth();
  }, []);

  if (loading) {
    return (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        loading...
      </h3>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
