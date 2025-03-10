import { webServerAxios } from "@/services/axios.lib";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAlbumsAsync = createAsyncThunk(
  "fetch/albums",
  async (_, { rejectWithValue }) => {
    try {
      const response = await webServerAxios.get("/albums");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data?.message);
    }
  }
);

const albumsSlice = createSlice({
  name: "albums",
  initialState: {
    albums: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbumsAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAlbumsAsync.fulfilled, (state, action) => {
      state.loading = false;
      action.albums = action.payload.albums;
    });
    builder.addCase(fetchAlbumsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || "Failed to fetch albums";
    });
  },
});

export default albumsSlice.reducer;
