import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types";
import { signInThunk } from "../auth/thunks";

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  hasFetched: boolean;
  message: string;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  hasFetched: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoggedIn = action.payload.isLoggedIn ?? true;
        state.loading = false;
        state.hasFetched = true;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.user = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.hasFetched = true;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
