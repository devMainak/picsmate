import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "../features/auth/authSlice";
import albumsReducer from "../features/albums/albumsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "albums"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  albums: albumsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// For making the store fluid
// persistor.purge()

export default store;
