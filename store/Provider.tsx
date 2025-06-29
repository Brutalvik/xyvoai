"use client";

import { store } from ".";
import { persistor } from ".";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import AppInitProvider from "@/app/AppInitProvider";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
