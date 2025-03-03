import { webServerAxios } from "@/services/axios.lib";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const googleLoginAsync = createAsyncThunk(
  "auth/google",
  async ({ rejectWithValue }) => {
    try {
      window.location.href = `${import.meta.env.WEB_SERVER_URL}/auth/google`;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (userdata, { rejectWithValue }) => {
    try {
      const response = await webServerAxios.post("/auth/login", userdata);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login Failed");
    }
  }
);

export const fetchUserAsync = createAsyncThunk(
  "fetch/user",
  async ({ rejectWithValue }) => {
    try {
      const response = await webServerAxios.get("/user/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch user.");
    }
  }
);

export const verifyAuthAsync = createAsyncThunk(
  "auth/verify",
  async ({ rejectWithValue }) => {
    try {
      const response = await webServerAxios.get("/auth/verify");
      return response.data;
    } catch (error) {
      rejectWithValue(error.response?.data || "Unauthorized Access.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error?.message || "Failed to login user";
    });
    builder.addCase(verifyAuthAsync.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    });
    builder.addCase(verifyAuthAsync.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload.error?.message || "Unauthorized Access";
    });
  },
});

export default authSlice.reducer;
