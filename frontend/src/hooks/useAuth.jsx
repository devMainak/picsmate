import {
  fetchUserAsync,
  googleLoginAsync,
  loginAsync,
  logoutAsync,
  verifyAuthAsync,
} from "@/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@/contexts/theme-provider";

export const useAuth = () => {
  const { setTheme } = useTheme();
  const dispatch = useDispatch();

  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const login = (credentials) => {
    dispatch(loginAsync(credentials));
  };

  const loginWithGoogle = () => {
    dispatch(googleLoginAsync());
  };

  const logout = () => {
    setTheme("light");
    dispatch(logoutAsync()).then(() => {
      localStorage.removeItem("access_token");
      navigate("/login");
    });
  };

  const verifyAuth = () => {
    dispatch(verifyAuthAsync());
  };

  const fetchUserDetails = () => {
    dispatch(fetchUserAsync());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    loginWithGoogle,
    logout,
    verifyAuth,
    fetchUserDetails,
  };
};
