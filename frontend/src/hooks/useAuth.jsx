import { loginAsync, logoutAsync } from "@/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const login = (credentials) => {
    dispatch(loginAsync(credentials));
  };

  const logout = () => {
    dispatch(logoutAsync());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
  };
};
