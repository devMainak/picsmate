import { webServerAxios } from "@/services/axios.lib";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAlbumsAsync = createAsyncThunk(
  "fetch/albums",
  async (_, { rejectWithValue }) => {
    try {
      const response = await webServerAxios.get("/albums");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message ||
          error.message ||
          "Failed to fetch albums."
      );
    }
  }
);

export const createAlbumAsync = createAsyncThunk(
  "album/create",
  async (album, { rejectWithValue }) => {
    try {
      const response = await webServerAxios.post("/albums", {
        albumdata: album,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message ||
          error.message ||
          "Failed to create album."
      );
    }
  }
);

export const updateAlbumAsync = createAsyncThunk(
  "album/update",
  async (album, { rejectWithValue }) => {
    try {
      const response = await webServerAxios.put(`/albums/${album._id}`, {
        albumdata: album,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message ||
          error.message ||
          "Failed to update album."
      );
    }
  }
);

export const shareAlbumAsync = createAsyncThunk(
  "album/share",
  async ({ albumId, emails }, { rejectWithValue }) => {
    try {
      const response = await webServerAxios.post(`/albums/${albumId}/share`, {
        emails,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message ||
          error.message ||
          "Failed to share album."
      );
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
    builder.addCase(createAlbumAsync.fulfilled, (state, action) => {
      state.albums.push(action.payload.album);
    });
    builder.addCase(updateAlbumAsync.fulfilled, (state, action) => {
      const { updatedAlbum } = action.payload;
      state.albums = state.albums.map((album) =>
        album._id === updatedAlbum._id ? updatedAlbum : album
      );
    });
    builder.addCase(shareAlbumAsync.fulfilled, (state, action) => {
      const { updatedAlbum } = action.payload;
      state.albums = state.albums.map((album) =>
        album._id === updatedAlbum._id ? updatedAlbum : album
      );
    });
  },
});

export default albumsSlice.reducer;
