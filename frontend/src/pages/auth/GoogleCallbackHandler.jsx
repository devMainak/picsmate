// src/pages/GoogleCallbackHandler.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserAsync } from "@/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const GoogleCallbackHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store token (localStorage or cookie)
      localStorage.setItem("access_token", token);

      // Fetch user with the token
      dispatch(fetchUserAsync()).then(() => {
        navigate("/photos");
      });
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return <div>Logging you in...</div>;
};

export default GoogleCallbackHandler;
