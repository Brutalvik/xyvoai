// store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWithAuth } from "@/utils/api";

export const refreshSession = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchWithAuth("/auth/refresh", {
        method: "POST",
      });
      return res.user;
    } catch (err: any) {
      return rejectWithValue("Session expired. Please login again.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    signOut(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(refreshSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
