import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, verifyAuth } = useAuth();

  useEffect(() => {
    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        loading...
      </h3>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/profile" replace />;
};

export default ProtectedRoute;
