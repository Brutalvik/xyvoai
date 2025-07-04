import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types"; // full futureproofed User type
import { fetchWithAuth } from "@/utils/api";

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  hasFetched: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  hasFetched: false,
};

// 🔄 Thunk to fetch /auth/me with cookies
export const meThunk = createAsyncThunk<User>(
  "user/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth("/auth/me", { method: "GET" });
      if (!res.user) throw new Error("Missing user in response");
      return res.user as User;
    } catch (error: any) {
      return rejectWithValue(error.message || "Unable to fetch user");
    }
  }
);

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
      .addCase(meThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(meThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
        state.hasFetched = true;
      })
      .addCase(meThunk.rejected, (state, action) => {
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
