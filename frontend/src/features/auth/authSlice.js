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
      return rejectWithValue(error.response?.data?.message || "Login Failed");
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
        error.response?.data?.message || "Failed to fetch user."
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
      return rejectWithValue(
        error.response?.data?.message || "Unauthorized Access."
      );
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
      return rejectWithValue(
        error.response?.data?.message || "Failed to logout user"
      );
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
      state.error = null;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload || "Failed to login user";
    });

    builder.addCase(verifyAuthAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyAuthAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(verifyAuthAsync.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload || "Unauthorized Access";
    });

    builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });

    builder.addCase(logoutAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    });
    builder.addCase(logoutAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to logout user";
    });
  },
});

export default authSlice.reducer;
