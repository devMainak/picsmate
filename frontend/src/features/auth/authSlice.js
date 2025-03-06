import { webServerAxios } from "@/services/axios.lib";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const googleLoginAsync = createAsyncThunk(
  "auth/google",
  async (_, { rejectWithValue }) => {
    try {
      window.location.href = `${
        import.meta.env.VITE_WEB_SERVER_BASE_URL
      }/auth/google`;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await webServerAxios.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || "Login Failed");
    }
  }
);

export const fetchUserAsync = createAsyncThunk(
  "fetch/user",
  async (_, { rejectWithValue }) => {
    try {
      const response = await webServerAxios.get("/user/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch user."
      );
    }
  }
);

export const verifyAuthAsync = createAsyncThunk(
  "auth/verify",
  async (_, { rejectWithValue }) => {
    try {
      const response = await webServerAxios.get("/auth/verify");
      return response.data;
    } catch (error) {
      rejectWithValue(error.response?.data.message || "Unauthorized Access.");
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await webServerAxios.post("/auth/logout");
      return response.data;
    } catch (error) {
      rejectWithValue(error.reponse?.data.message || "Failed to logout user");
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
    builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
    });
  },
});

export default authSlice.reducer;
