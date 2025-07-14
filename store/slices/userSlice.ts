import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { signInThunk } from "../auth/thunks";

import { User, UserState } from "@/types";

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  hasFetched: false,
  message: "",
  tokenExpiresAt: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
      state.tokenExpiresAt = action.payload.tokenExpiresAt ?? null;
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      state.tokenExpiresAt = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        const { user, tokenExpiresAt, isLoggedIn } = action.payload;

        state.user = user;
        state.isLoggedIn = isLoggedIn ?? true;
        state.loading = false;
        state.hasFetched = true;
        state.tokenExpiresAt = tokenExpiresAt ?? null;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.user = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.hasFetched = true;
        state.error = action.payload as string;
        state.tokenExpiresAt = null;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
