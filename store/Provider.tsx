"use client";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import { store } from ".";
import { persistor } from ".";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
