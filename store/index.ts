// store/index.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// default import
import languageReducer from "@/store/slices/languageSlice";
import userReducer from "@/store/slices/userSlice";
import authReducer from "@/store/slices/authSlice";
import projectsReducer from "@/store/slices/projectsSlice";

// combined reducer

const rootReducer = combineReducers({
  language: languageReducer,
  user: userReducer,
  auth: authReducer,
  projects: projectsReducer,
  // other reducers...
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const persistConfig = {
  key: "root",
  version: 1,
  storage: storageSession,
  whitelist: ["language", "user", "auth", "projects"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
