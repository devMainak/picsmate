import { webServerAxios } from "@/services/axios.lib";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchImagesAsync = createAsyncThunk(
  "fetch/images",
  async (albumId, { rejectWithValue }) => {
    try {
      const response = await webServerAxios.get(`/albums/${albumId}/images`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message ||
          error.message ||
          "Failed to fetch images."
      );
    }
  }
);

export const fetchImagesByTag = createAsyncThunk(
  "images/fetchByTag",
  async ({ albumId, tags }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/images/${albumId}?tags=${tags.join(",")}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load images."
      );
    }
  }
);

export const uploadImageAsync = createAsyncThunk(
  "upload/image",
  async ({ formData, albumId }, { rejectWithValue }) => {
    try {
      const response = await webServerAxios.post(
        `/albums/${albumId}/images`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message ||
          error.message ||
          "Failed to upload image."
      );
    }
  }
);

export const addFavouriteImageAsync = createAsyncThunk(
  "favourite/image",
  async ({ imageId, albumId }, { rejectWithValue }) => {
    try {
      const response = await webServerAxios.put(
        `/albums/${albumId}/images/${imageId}/favourite`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message ||
          error.message ||
          "Failed to change favourite status of image."
      );
    }
  }
);

export const addCommentAsync = createAsyncThunk(
  "comment/image",
  async ({ albumId, comment, imageId }, { rejectWithValue }) => {
    try {
      const response = await webServerAxios.post(
        `/albums/${albumId}/images/${imageId}/comments`,
        {
          comment,
        }
      );
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

export const deleteImageAsync = createAsyncThunk(
  "delete/image",
  async ({ albumId, imageId }, { rejectWithValue }) => {
    try {
      const response = await webServerAxios.delete(
        `/albums/${albumId}/images/${imageId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data?.message ||
          error.message ||
          "Failed to delete album."
      );
    }
  }
);

const imagesSlice = createSlice({
  name: "images",
  initialState: {
    images: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // fetchAlbumAsync promise cases
    builder.addCase(fetchImagesAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchImagesAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.images = action.payload.images;
    });
    builder.addCase(fetchImagesAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message || "Failed to fetch images";
    });
    // uploadImage promise cases
    builder.addCase(uploadImageAsync.fulfilled, (state, action) => {
      state.images.push(action.payload.savedImage);
    });
    builder.addCase(uploadImageAsync.rejected, (state, action) => {
      state.error = action.payload;
    });
    // addFavouriteImageAsync promise cases
    builder.addCase(addFavouriteImageAsync.fulfilled, (state, action) => {
      const { updatedImage } = action.payload;
      state.images = state.images.map((image) => {
        if (image._id === updatedImage._id) {
          image.comments.push(comment);
          return image;
        }
        return image;
      });
    });
    // addCommentAsync promise cases
    builder.addCase(addCommentAsync.fulfilled, (state, action) => {
      const { updatedImage, comment } = action.payload;

      state.images = state.images.map((image) => {
        if (image._id === updatedImage._id) {
          return {
            ...image,
            comments: [...(image.comments || []), comment],
          };
        }
        return image;
      });
    });
    // deleteImageAsync promise cases
    builder.addCase(deleteImageAsync.fulfilled, (state, action) => {
      const { deletedImage } = action.payload;
      state.images = state.images.filter(
        (image) => image._id !== deletedImage._id
      );
    });
  },
});

export const { clearError } = imagesSlice.actions;

export default imagesSlice.reducer;
